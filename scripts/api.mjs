import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export function tagSlug(tag) {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function writeJson(filePath, value) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(value)}\n`);
}

function summary(card) {
  return {
    id: card.id,
    title: card.title,
    track: card.track,
    section: card.section,
    tags: card.tags,
    url: card.url,
    apiUrl: card.apiUrl,
  };
}

function full(card) {
  return {
    id: card.id,
    title: card.title,
    topic: card.topic,
    track: card.track,
    section: card.section,
    position: card.order,
    tags: card.tags,
    related: card.related,
    sources: card.sources,
    explanation: {
      markdown: card.explanationMarkdown,
      text: card.explanationText,
      html: card.explanationHtml,
    },
    code: card.code,
    url: card.url,
    apiUrl: card.apiUrl,
    sourcePath: card.sourcePath,
    prevId: card.prev ?? null,
    nextId: card.next ?? null,
  };
}

function sectionSummary(track, section) {
  return {
    slug: section.slug,
    title: section.title,
    track: track.slug,
    order: section.order,
    cardCount: section.cards.length,
    url: `topics/${section.slug}/`,
    apiUrl: `api/v1/topics/${section.slug}/index.json`,
  };
}

export function buildApi({ outDir, model, meta }) {
  const apiRoot = join(outDir, "api", "v1");
  const sections = model.tracks.flatMap((track) =>
    track.sections.map((section) => ({ track, section })),
  );

  const endpoints = {
    index: "api/v1/index.json",
    version: "api/v1/version.json",
    cards: "api/v1/cards/index.json",
    card: "api/v1/cards/{id}.json",
    topics: "api/v1/topics/index.json",
    topic: "api/v1/topics/{slug}/index.json",
    tags: "api/v1/tags/index.json",
    tag: "api/v1/tags/{slug}/index.json",
    search: "api/v1/search-index.json",
    database: "data/ed-content.db",
    databaseChecksum: "data/ed-content.db.sha256",
    openapi: "api/v1/openapi.json",
  };

  writeJson(join(apiRoot, "index.json"), {
    name: "ed-content",
    apiVersion: 1,
    contentHash: meta.contentHash,
    generatedAt: meta.generatedAt,
    gitSha: meta.gitSha,
    cardCount: model.cards.length,
    sectionCount: sections.length,
    trackCount: model.tracks.length,
    note: "Static read-only API. Filtering happens client-side; see openapi.json.",
    endpoints,
  });

  writeJson(join(apiRoot, "version.json"), {
    contentHash: meta.contentHash,
    generatedAt: meta.generatedAt,
    cardCount: model.cards.length,
    sectionCount: sections.length,
  });

  writeJson(join(apiRoot, "cards", "index.json"), {
    count: model.cards.length,
    contentHash: meta.contentHash,
    generatedAt: meta.generatedAt,
    cards: model.cards.map(full),
  });

  for (const card of model.cards) {
    writeJson(join(apiRoot, "cards", `${card.id}.json`), full(card));
  }

  writeJson(join(apiRoot, "topics", "index.json"), {
    count: sections.length,
    sections: sections.map(({ track, section }) => sectionSummary(track, section)),
    tracks: model.tracks.map((track) => ({
      slug: track.slug,
      title: track.title,
      sections: track.sections.map((section) => ({
        slug: section.slug,
        title: section.title,
        order: section.order,
        cardCount: section.cards.length,
        url: `topics/${section.slug}/`,
      })),
    })),
  });

  for (const { track, section } of sections) {
    writeJson(join(apiRoot, "topics", section.slug, "index.json"), {
      ...sectionSummary(track, section),
      cards: section.cards.map(summary),
    });
  }

  const tags = new Map();
  for (const card of model.cards) {
    for (const tag of card.tags) {
      const slug = tagSlug(tag);
      if (!slug) continue;
      if (!tags.has(slug)) tags.set(slug, { tag, slug, cards: [] });
      tags.get(slug).cards.push(card);
    }
  }

  writeJson(join(apiRoot, "tags", "index.json"), {
    count: tags.size,
    tags: [...tags.values()]
      .map((entry) => ({ tag: entry.tag, slug: entry.slug, count: entry.cards.length }))
      .sort((a, b) => a.slug.localeCompare(b.slug)),
  });

  for (const entry of tags.values()) {
    writeJson(join(apiRoot, "tags", entry.slug, "index.json"), {
      tag: entry.tag,
      slug: entry.slug,
      count: entry.cards.length,
      cards: entry.cards.map(summary),
    });
  }

  writeJson(join(apiRoot, "search-index.json"), {
    generatedAt: meta.generatedAt,
    documents: model.cards.map((card) => ({
      id: card.id,
      title: card.title,
      tags: card.tags,
      section: card.section,
      track: card.track,
      text: card.explanationText,
      url: card.url,
    })),
  });

  const byIdPath = {
    get: {
      summary: "Fetch a single card by id",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          example: model.cards[0]?.id ?? "example-card",
        },
      ],
      responses: {
        200: {
          description: "Card",
          content: { "application/json": { schema: { $ref: "#/components/schemas/Card" } } },
        },
        404: { description: "Static host returns its global 404 page" },
      },
    },
  };

  writeJson(join(apiRoot, "openapi.json"), {
    openapi: "3.0.3",
    info: {
      title: "ed-content API",
      version: String(meta.contentHash.slice(0, 12)),
      description:
        "Read-only, statically generated API. Every endpoint is a JSON file served by GitHub Pages. " +
        "There are no query parameters, no writes, and no authentication. " +
        "Use api/v1/version.json to detect content changes, and data/ed-content.db for full offline access.",
    },
    servers: [{ url: meta.siteBase, description: "GitHub Pages" }],
    tags: [{ name: "cards" }, { name: "topics" }, { name: "tags" }, { name: "meta" }],
    paths: {
      "/api/v1/index.json": {
        get: {
          tags: ["meta"],
          summary: "API metadata and endpoint index",
          responses: { 200: { description: "Metadata" } },
        },
      },
      "/api/v1/version.json": {
        get: {
          tags: ["meta"],
          summary: "Cheap content-change check",
          responses: { 200: { description: "Version" } },
        },
      },
      "/api/v1/cards/index.json": {
        get: {
          tags: ["cards"],
          summary: "All cards, full payload (sync endpoint)",
          responses: {
            200: {
              description: "Card collection",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      count: { type: "integer" },
                      contentHash: { type: "string" },
                      cards: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Card" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/cards/{id}.json": byIdPath,
      "/api/v1/topics/index.json": {
        get: {
          tags: ["topics"],
          summary: "Sections and tracks",
          responses: { 200: { description: "Sections" } },
        },
      },
      "/api/v1/topics/{slug}/index.json": {
        get: {
          tags: ["topics"],
          summary: "One section with card summaries",
          parameters: [
            { name: "slug", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: { 200: { description: "Section" } },
        },
      },
      "/api/v1/tags/index.json": {
        get: {
          tags: ["tags"],
          summary: "All tags with counts",
          responses: { 200: { description: "Tags" } },
        },
      },
      "/api/v1/tags/{slug}/index.json": {
        get: {
          tags: ["tags"],
          summary: "Cards carrying one tag",
          parameters: [
            { name: "slug", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: { 200: { description: "Tag" } },
        },
      },
      "/api/v1/search-index.json": {
        get: {
          tags: ["meta"],
          summary: "Flat search documents for client-side search",
          responses: { 200: { description: "Search index" } },
        },
      },
    },
    components: {
      schemas: {
        Card: {
          type: "object",
          required: ["id", "title", "explanation"],
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            topic: { type: "string" },
            track: { type: "string" },
            section: { type: "string" },
            position: { type: "integer" },
            tags: { type: "array", items: { type: "string" } },
            related: { type: "array", items: { type: "string" } },
            sources: { type: "array", items: { type: "string", format: "uri" } },
            explanation: {
              type: "object",
              properties: {
                markdown: { type: "string" },
                text: { type: "string" },
                html: { type: "string" },
              },
            },
            code: {
              nullable: true,
              type: "object",
              properties: {
                lang: { type: "string" },
                code: { type: "string" },
              },
            },
            url: { type: "string" },
            apiUrl: { type: "string" },
            sourcePath: { type: "string" },
            prevId: { type: "string", nullable: true },
            nextId: { type: "string", nullable: true },
          },
        },
      },
    },
  });
}
