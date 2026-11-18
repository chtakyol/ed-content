import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { dirname } from "node:path";
import { createHash } from "node:crypto";
import { DatabaseSync } from "node:sqlite";

const SCHEMA = `
PRAGMA foreign_keys = ON;

CREATE TABLE build_info (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE topics (
  id         TEXT PRIMARY KEY,
  track      TEXT NOT NULL,
  slug       TEXT NOT NULL,
  title      TEXT NOT NULL,
  position   INTEGER NOT NULL,
  card_count INTEGER NOT NULL,
  url        TEXT NOT NULL,
  api_url    TEXT NOT NULL
);

CREATE TABLE cards (
  id               TEXT PRIMARY KEY,
  topic_id         TEXT NOT NULL REFERENCES topics(id),
  track            TEXT NOT NULL,
  section          TEXT NOT NULL,
  title            TEXT NOT NULL,
  tags_json        TEXT NOT NULL,
  sources_json     TEXT NOT NULL,
  explanation_md   TEXT NOT NULL,
  explanation_text TEXT NOT NULL,
  code             TEXT,
  code_lang        TEXT,
  position         INTEGER NOT NULL,
  url              TEXT NOT NULL,
  api_url          TEXT NOT NULL,
  source_path      TEXT NOT NULL,
  content_hash     TEXT NOT NULL
);

CREATE TABLE card_links (
  card_id    TEXT NOT NULL REFERENCES cards(id),
  related_id TEXT NOT NULL,
  PRIMARY KEY (card_id, related_id)
);

CREATE TABLE questions (
  id         TEXT PRIMARY KEY,
  card_id    TEXT REFERENCES cards(id),
  prompt     TEXT NOT NULL,
  answer_md  TEXT NOT NULL,
  type       TEXT,
  difficulty TEXT
);

CREATE VIRTUAL TABLE cards_fts USING fts5(
  id UNINDEXED,
  title,
  tags,
  explanation
);

CREATE INDEX idx_cards_topic ON cards(topic_id, position);
CREATE INDEX idx_cards_track ON cards(track, section, position);
CREATE INDEX idx_card_links_related ON card_links(related_id);
`;

export function buildDatabase(dbPath, model, meta) {
  rmSync(dbPath, { force: true });
  rmSync(`${dbPath}-journal`, { force: true });
  mkdirSync(dirname(dbPath), { recursive: true });

  const db = new DatabaseSync(dbPath);
  db.exec(SCHEMA);

  const insertInfo = db.prepare("INSERT INTO build_info (key, value) VALUES (?, ?)");
  const insertTopic = db.prepare(
    `INSERT INTO topics (id, track, slug, title, position, card_count, url, api_url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  const insertCard = db.prepare(
    `INSERT INTO cards (id, topic_id, track, section, title, tags_json, sources_json,
                        explanation_md, explanation_text, code, code_lang, position, url,
                        api_url, source_path, content_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  );
  const insertLink = db.prepare(
    "INSERT OR IGNORE INTO card_links (card_id, related_id) VALUES (?, ?)",
  );
  const insertFts = db.prepare(
    "INSERT INTO cards_fts (id, title, tags, explanation) VALUES (?, ?, ?, ?)",
  );

  db.exec("BEGIN");
  try {
    const info = {
      version: "1",
      content_hash: meta.contentHash,
      git_sha: meta.gitSha,
      built_at: meta.generatedAt,
      card_count: String(model.cards.length),
      section_count: String(
        model.tracks.reduce((total, track) => total + track.sections.length, 0),
      ),
      track_count: String(model.tracks.length),
    };
    for (const [key, value] of Object.entries(info)) insertInfo.run(key, value);

    let position = 0;
    for (const track of model.tracks) {
      for (const section of track.sections) {
        insertTopic.run(
          `${track.slug}/${section.slug}`,
          track.slug,
          section.slug,
          section.title,
          position,
          section.cards.length,
          `topics/${section.slug}/`,
          `api/v1/topics/${section.slug}/index.json`,
        );
        position += 1;
      }
    }

    for (const card of model.cards) {
      const cardHash = createHash("sha256")
        .update(
          JSON.stringify([
            card.id,
            card.title,
            card.tags,
            card.sources,
            card.explanationMarkdown,
            card.code,
          ]),
        )
        .digest("hex")
        .slice(0, 16);

      insertCard.run(
        card.id,
        `${card.track}/${card.section}`,
        card.track,
        card.section,
        card.title,
        JSON.stringify(card.tags),
        JSON.stringify(card.sources),
        card.explanationMarkdown,
        card.explanationText,
        card.code ? card.code.code : null,
        card.code ? card.code.lang : null,
        card.order,
        card.url,
        card.apiUrl,
        card.sourcePath,
        cardHash,
      );

      for (const related of card.related) insertLink.run(card.id, related);

      insertFts.run(card.id, card.title, card.tags.join(" "), card.explanationText);
    }

    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }

  db.exec("VACUUM");
  db.close();

  const bytes = readFileSync(dbPath);
  const sha256 = createHash("sha256").update(bytes).digest("hex");

  return { bytes: bytes.length, sha256 };
}
