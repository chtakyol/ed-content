import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { escapeHtml, truncate } from "./markdown.mjs";
import { tagSlug } from "./api.mjs";

const SITE_NAME = "Learning Cards";

function writePage(outDir, relativePath, html) {
  const target = join(outDir, relativePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
}

function layout({ title, description, root, body }) {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(fullTitle)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; manifest-src 'self'; worker-src 'self'; base-uri 'none'">
<meta name="theme-color" content="#0f172a">
<link rel="manifest" href="${root}manifest.webmanifest">
<link rel="icon" href="${root}icon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${root}assets/style.css">
</head>
<body data-root="${root}">
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <a class="brand" href="${root}">${escapeHtml(SITE_NAME)}</a>
  <nav aria-label="Main">
    <a href="${root}search/">Search</a>
    <a href="${root}api/">API</a>
    <a href="${root}data/ed-content.db" download>DB</a>
  </nav>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <p>Generated from Markdown · <a href="${root}api/">REST API</a> · <a href="${root}data/ed-content.db" download>SQLite</a> · <a href="${root}api/v1/version.json">version.json</a></p>
</footer>
<script src="${root}assets/app.js" defer></script>
</body>
</html>
`;
}

function tagLinks(tags, root) {
  if (!tags.length) return "";
  return `<ul class="tags">${tags
    .map(
      (tag) =>
        `<li><a class="tag" href="${root}search/?tag=${encodeURIComponent(tagSlug(tag))}">${escapeHtml(tag)}</a></li>`,
    )
    .join("")}</ul>`;
}

function renderHome({ model, meta }) {
  const sections = model.tracks.flatMap((track) =>
    track.sections.map((section) => ({ track, section })),
  );
  const tagCount = new Set(model.cards.flatMap((card) => card.tags)).size;

  const body = `<section class="hero">
  <h1>${escapeHtml(SITE_NAME)}</h1>
  <p class="lead">Kotlin, OOP, SOLID, coroutines, flows, and Android architecture, one card at a time. Read online, search offline, or pull the whole database into your app.</p>
  <div class="actions">
    <a class="button" href="#sections">Browse ${sections.length} sections</a>
    <a class="button ghost" href="search/">Search</a>
    <a class="button ghost" href="data/ed-content.db" download>Download SQLite</a>
  </div>
  <dl class="stats">
    <div><dt>Cards</dt><dd>${model.cards.length}</dd></div>
    <div><dt>Sections</dt><dd>${sections.length}</dd></div>
    <div><dt>Tags</dt><dd>${tagCount}</dd></div>
    <div><dt>Build</dt><dd><code>${escapeHtml(meta.contentHash.slice(0, 10))}</code></dd></div>
  </dl>
</section>
${model.tracks
  .map(
    (track, trackIndex) => `<section class="track"${trackIndex === 0 ? ' id="sections"' : ""}>
  <h2>${escapeHtml(track.title)}</h2>
  <ul class="section-grid">
${track.sections
  .map(
    (section) => `    <li>
      <a class="section-card" href="topics/${section.slug}/">
        <span class="section-index">${String(section.order).padStart(2, "0")}</span>
        <span class="section-title">${escapeHtml(section.title)}</span>
        <span class="section-count">${section.cards.length} cards</span>
      </a>
    </li>`,
  )
  .join("\n")}
  </ul>
</section>`,
  )
  .join("\n")}`;

  writePage(
    meta.outDir,
    "index.html",
    layout({
      title: "",
      description: `${model.cards.length} Kotlin, OOP, SOLID, coroutines, flows, and Android architecture learning cards across ${sections.length} sections.`,
      root: "./",
      body,
    }),
  );
}

function renderTopic({ model, meta, track, section }) {
  const index = track.sections.findIndex((item) => item.slug === section.slug);
  const previous = index > 0 ? track.sections[index - 1] : null;
  const next = index < track.sections.length - 1 ? track.sections[index + 1] : null;
  const root = "../../";

  const body = `<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="${root}">Home</a> <span>/</span> <a href="${root}#sections">${escapeHtml(track.title)}</a> <span>/</span> <span aria-current="page">${escapeHtml(section.title)}</span>
</nav>
<header class="page-head">
  <h1>${escapeHtml(section.title)}</h1>
  <p class="lead">${section.cards.length} cards in ${escapeHtml(track.title)}.</p>
</header>
<ol class="card-list">
${section.cards
  .map(
    (card) => `  <li>
    <a class="card-link" href="${root}cards/${card.id}/">
      <span class="card-number">${String(card.order).padStart(2, "0")}</span>
      <span class="card-body">
        <span class="card-title">${escapeHtml(card.title)}</span>
        <span class="snippet">${escapeHtml(truncate(card.explanationText, 150))}</span>
      </span>
    </a>
    ${tagLinks(card.tags, root)}
  </li>`,
  )
  .join("\n")}
</ol>
<nav class="pager" aria-label="Sections">
  ${previous ? `<a class="prev" href="${root}topics/${previous.slug}/"><span>Previous</span>${escapeHtml(previous.title)}</a>` : "<span></span>"}
  ${next ? `<a class="next" href="${root}topics/${next.slug}/"><span>Next</span>${escapeHtml(next.title)}</a>` : "<span></span>"}
</nav>
<p class="aside">API: <a href="${root}api/v1/topics/${section.slug}/index.json"><code>api/v1/topics/${section.slug}/index.json</code></a></p>`;

  writePage(
    meta.outDir,
    `topics/${section.slug}/index.html`,
    layout({
      title: section.title,
      description: `${section.cards.length} cards about ${section.title.toLowerCase()} in ${track.title}.`,
      root,
      body,
    }),
  );
}

function renderCard({ model, meta, card }) {
  const root = "../../";
  const related = card.related
    .map((id) => model.byId.get(id))
    .filter(Boolean)
    .map((item) => `<li><a href="${root}cards/${item.id}/">${escapeHtml(item.title)}</a></li>`)
    .join("");

  const sources = card.sources
    .map(
      (source) =>
        `<li><a href="${escapeHtml(source)}" rel="noopener noreferrer">${escapeHtml(source.replace(/^https?:\/\//, ""))}</a></li>`,
    )
    .join("");

  const code = card.code
    ? `<div class="code-block">
  <div class="code-head"><span>${escapeHtml(card.code.lang || "code")}</span><button class="copy" type="button" data-copy="code-${card.id}">Copy</button></div>
  <pre><code id="code-${card.id}" class="language-${escapeHtml(card.code.lang || "text")}">${escapeHtml(card.code.code)}</code></pre>
</div>`
    : "";

  const prev = card.prev ? model.byId.get(card.prev) : null;
  const next = card.next ? model.byId.get(card.next) : null;

  const body = `<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="${root}">Home</a> <span>/</span> <a href="${root}topics/${card.section}/">${escapeHtml(card.sectionTitle)}</a> <span>/</span> <span aria-current="page">${escapeHtml(card.title)}</span>
</nav>
<article class="card-page">
  <header class="page-head">
    <p class="eyebrow">${escapeHtml(card.sectionTitle)} · Card ${String(card.order).padStart(2, "0")}</p>
    <h1>${escapeHtml(card.title)}</h1>
    ${tagLinks(card.tags, root)}
  </header>
  <div class="prose">
${card.explanationHtml}
    ${code}
  </div>
  ${
    related
      ? `<section class="related">
    <h2>Related cards</h2>
    <ul>${related}</ul>
  </section>`
      : ""
  }
  ${
    sources
      ? `<section class="sources">
    <h2>Sources</h2>
    <ul>${sources}</ul>
  </section>`
      : ""
  }
</article>
<nav class="pager" aria-label="Cards">
  ${prev ? `<a class="prev" href="${root}cards/${prev.id}/"><span>Previous</span>${escapeHtml(prev.title)}</a>` : "<span></span>"}
  ${next ? `<a class="next" href="${root}cards/${next.id}/"><span>Next</span>${escapeHtml(next.title)}</a>` : "<span></span>"}
</nav>
<p class="aside">API: <a href="${root}api/v1/cards/${card.id}.json"><code>api/v1/cards/${card.id}.json</code></a></p>`;

  writePage(
    meta.outDir,
    `cards/${card.id}/index.html`,
    layout({
      title: card.title,
      description: truncate(card.explanationText, 180),
      root,
      body,
    }),
  );
}

function renderSearch({ meta }) {
  const root = "../";
  const body = `<header class="page-head">
  <h1>Search</h1>
  <p class="lead">Search titles, tags, and explanations. Runs fully in your browser, so it also works offline.</p>
</header>
<form class="search-box" role="search" onsubmit="return false">
  <label for="search-input">Search cards</label>
  <input id="search-input" type="search" name="q" placeholder="e.g. dispatcher, cancellation, async" autocomplete="off" autofocus>
</form>
<p class="search-status" id="search-status" aria-live="polite">Type to search ${meta.cardCount} cards.</p>
<ul class="search-results" id="search-results"></ul>
<noscript><p class="aside">Search needs JavaScript. You can still browse from the <a href="${root}">home page</a>.</p></noscript>`;

  writePage(
    meta.outDir,
    "search/index.html",
    layout({
      title: "Search",
      description: "Search all cards by title, tag, or explanation.",
      root,
      body,
    }),
  );
}

function renderApiDocs({ model, meta }) {
  const root = "../";
  const rows = [
    ["index.json", "API metadata and endpoint index"],
    ["version.json", "Content hash for cheap change detection"],
    ["cards/index.json", "All cards with full payload"],
    ["cards/{id}.json", "A single card"],
    ["topics/index.json", "Sections with card counts"],
    ["topics/{slug}/index.json", "One section with card summaries"],
    ["tags/index.json", "All tags with counts"],
    ["tags/{slug}/index.json", "Cards carrying a tag"],
    ["search-index.json", "Flat documents for client-side search"],
    ["openapi.json", "OpenAPI 3 contract"],
  ];

  const body = `<header class="page-head">
  <h1>REST API</h1>
  <p class="lead">A read-only API generated at build time and served as static JSON. No authentication, no rate limiting, no query parameters — filter on the client.</p>
</header>
<table class="api-table">
  <thead><tr><th>Path</th><th>Description</th></tr></thead>
  <tbody>
${rows
  .map(
    ([path, description]) =>
      `    <tr><td><a href="${root}api/v1/${path.replace("{id}", model.cards[0]?.id ?? "id").replace("{slug}", model.tracks[0]?.sections[0]?.slug ?? "slug")}"><code>api/v1/${escapeHtml(path)}</code></a></td><td>${escapeHtml(description)}</td></tr>`,
  )
  .join("\n")}
  </tbody>
</table>
<h2>Database download</h2>
<p><a href="${root}data/ed-content.db" download>ed-content.db</a> — ${(meta.dbBytes / 1024).toFixed(1)} KB, SQLite 3, FTS5 enabled.
Checksum: <a href="${root}data/ed-content.db.sha256"><code>ed-content.db.sha256</code></a>.</p>
<h2>Conventions</h2>
<ul class="prose-list">
  <li>All paths are relative to the site root.</li>
  <li><code>url</code> fields point at HTML pages; <code>apiUrl</code> fields point at JSON.</li>
  <li>Use <code>version.json</code> (<code>contentHash</code>) or <code>ETag</code> to avoid re-downloading unchanged content.</li>
  <li>The API is public and read-only. Writes, auth, and server-side filtering are out of scope by design.</li>
</ul>`;

  writePage(
    meta.outDir,
    "api/index.html",
    layout({
      title: "REST API",
      description: "Static read-only JSON API for the learning cards.",
      root,
      body,
    }),
  );
}

export function renderSite({ outDir, model, meta, siteDir }) {
  renderHome({ model, meta: { ...meta, outDir } });
  renderApiDocs({ model, meta: { ...meta, outDir } });
  renderSearch({ meta: { ...meta, outDir, cardCount: model.cards.length } });

  for (const track of model.tracks) {
    for (const section of track.sections) {
      renderTopic({ model, meta: { ...meta, outDir }, track, section });
    }
  }

  for (const card of model.cards) {
    renderCard({ model, meta: { ...meta, outDir }, card });
  }

  const serviceWorker = readFileSync(join(siteDir, "sw.js"), "utf8").replaceAll(
    "__VERSION__",
    meta.contentHash.slice(0, 12),
  );
  writeFileSync(join(outDir, "sw.js"), serviceWorker);
}
