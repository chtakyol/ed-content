import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";

import { parseFrontmatter } from "./frontmatter.mjs";
import { extractCode, renderMarkdown, toPlainText } from "./markdown.mjs";

const CARDS_DIR = "cards";
const STOP_WORDS = new Set(["and", "or", "of", "the", "vs", "to", "in", "for"]);
const DISPLAY_WORDS = new Map([
  ["ui", "UI"],
  ["api", "API"],
  ["viewmodel", "ViewModel"],
  ["datastore", "DataStore"],
  ["oop", "OOP"],
  ["solid", "SOLID"],
]);

const TRACK_ORDER = ["kotlin", "oop", "solid", "coroutines", "flows", "architecture"];

function trackRank(slug) {
  const index = TRACK_ORDER.indexOf(slug);
  return index === -1 ? TRACK_ORDER.length : index;
}

export function titleFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word, index) => {
      if (DISPLAY_WORDS.has(word)) return DISPLAY_WORDS.get(word);
      return index > 0 && STOP_WORDS.has(word)
        ? word
        : word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function listDirectories(path) {
  return readdirSync(path)
    .filter((name) => !name.startsWith("."))
    .filter((name) => statSync(join(path, name)).isDirectory())
    .sort();
}

function listMarkdown(path) {
  return readdirSync(path)
    .filter((name) => name.endsWith(".md") && !name.startsWith("."))
    .sort();
}

/** Split a card body into "## Heading" sections. */
function splitSections(body) {
  const sections = Object.create(null);
  let current = null;
  let buffer = [];

  for (const line of body.replace(/\r\n/g, "\n").split("\n")) {
    const heading = /^##\s+(.+?)\s*$/.exec(line);
    if (heading) {
      if (current) sections[current] = buffer.join("\n").trim();
      current = heading[1];
      buffer = [];
      continue;
    }
    if (current) buffer.push(line);
  }
  if (current) sections[current] = buffer.join("\n").trim();

  return sections;
}

export function loadModel(rootDir = process.cwd()) {
  const cardsRoot = join(rootDir, CARDS_DIR);
  const tracks = [];
  const cards = [];
  const diagnostics = [];

  for (const trackDir of listDirectories(cardsRoot)) {
    const track = {
      slug: trackDir,
      title: titleFromSlug(trackDir),
      sections: [],
    };

    for (const sectionDirName of listDirectories(join(cardsRoot, trackDir))) {
      const named = /^(\d+)-(.+)$/.exec(sectionDirName);
      const order = named ? Number(named[1]) : Number.MAX_SAFE_INTEGER;
      const sectionSlug = named ? named[2] : sectionDirName;

      const section = {
        slug: sectionSlug,
        dirName: sectionDirName,
        order,
        title: titleFromSlug(sectionSlug),
        track: track.slug,
        cards: [],
      };

      const sectionPath = join(cardsRoot, trackDir, sectionDirName);

      for (const fileName of listMarkdown(sectionPath)) {
        const absolute = join(sectionPath, fileName);
        const sourcePath = [CARDS_DIR, trackDir, sectionDirName, fileName].join("/");
        const raw = readFileSync(absolute, "utf8");

        let parsed;
        try {
          parsed = parseFrontmatter(raw, sourcePath);
        } catch (error) {
          diagnostics.push({ level: "error", file: sourcePath, message: error.message });
          continue;
        }

        const filePrefix = /^(\d+)-/.exec(fileName);
        const sections = splitSections(parsed.body);
        const explanationMarkdown = sections.Explanation ?? "";

        const card = {
          id: parsed.data.id ?? "",
          title: parsed.data.title ?? "",
          topic: parsed.data.topic ?? "",
          tags: Array.isArray(parsed.data.tags) ? parsed.data.tags : [],
          related: Array.isArray(parsed.data.related) ? parsed.data.related : [],
          sources: Array.isArray(parsed.data.sources) ? parsed.data.sources : [],
          track: track.slug,
          section: section.slug,
          sectionTitle: section.title,
          sectionOrder: section.order,
          order: filePrefix ? Number(filePrefix[1]) : Number.MAX_SAFE_INTEGER,
          fileName,
          sourcePath,
          explanationMarkdown,
          explanationText: toPlainText(explanationMarkdown),
          explanationHtml: renderMarkdown(explanationMarkdown),
          code: extractCode(sections.Code ?? ""),
          url: `cards/${parsed.data.id ?? "missing-id"}/`,
          apiUrl: `api/v1/cards/${parsed.data.id ?? "missing-id"}.json`,
          unknownFrontmatter: Object.keys(parsed.data).filter(
            (key) => !["id", "topic", "title", "tags", "related", "sources"].includes(key),
          ),
        };

        section.cards.push(card);
        cards.push(card);
      }

      section.cards.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
      track.sections.push(section);
    }

    track.sections.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
    tracks.push(track);
  }

  tracks.sort(
    (a, b) => trackRank(a.slug) - trackRank(b.slug) || a.slug.localeCompare(b.slug),
  );

  cards.sort(
    (a, b) =>
      trackRank(a.track) - trackRank(b.track) ||
      a.sectionOrder - b.sectionOrder ||
      a.order - b.order,
  );

  const byId = new Map();
  for (const card of cards) {
    if (card.id && !byId.has(card.id)) byId.set(card.id, card);
  }

  for (const track of tracks) {
    for (const section of track.sections) {
      section.cards.forEach((card, index, list) => {
        card.prev = index > 0 ? list[index - 1].id : null;
        card.next = index < list.length - 1 ? list[index + 1].id : null;
      });
    }
  }

  const contentHash = createHash("sha256")
    .update(
      JSON.stringify(
        cards.map((card) => ({
          id: card.id,
          title: card.title,
          topic: card.topic,
          tags: card.tags,
          related: card.related,
          sources: card.sources,
          explanation: card.explanationMarkdown,
          code: card.code,
        })),
      ),
    )
    .digest("hex");

  return { tracks, cards, byId, contentHash, diagnostics };
}

export function findSection(model, slug) {
  for (const track of model.tracks) {
    for (const section of track.sections) {
      if (section.slug === slug) return section;
    }
  }
  return null;
}

export function sectionNeighbours(model, section) {
  const track = model.tracks.find((item) => item.slug === section.track);
  if (!track) return { previous: null, next: null };
  const index = track.sections.findIndex((item) => item.slug === section.slug);
  return {
    previous: index > 0 ? track.sections[index - 1] : null,
    next: index >= 0 && index < track.sections.length - 1 ? track.sections[index + 1] : null,
  };
}
