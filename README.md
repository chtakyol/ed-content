# ed-content

Markdown learning cards compiled into three artifacts at build time:

1. a **SQLite database** (`public/data/ed-content.db`) you can ship inside an app,
2. a **static JSON API** (`public/api/v1/**`) served by GitHub Pages,
3. a **static site** with search and offline support (`public/`).

No runtime dependencies, no server, no build framework — plain Node.

Eleven tracks ship today: Kotlin **language**, **OOP**, **SOLID**, Kotlin
**coroutines**, Kotlin **flows**, **Jetpack Compose**, **Activities**,
**app navigation**, **dependency injection**, Android app **architecture**, and
Android **security** built on OWASP MASVS controls.

## Quick start

```bash
npm run build     # writes public/
npm run serve     # http://localhost:4173
npm run validate  # parse + validate only, no output
```

Requires Node 24+ (`node:sqlite`, FTS5).

## Content format

Cards live at `cards/<track>/<NN-section>/<NN-slug>.md`:

````markdown
---
id: coroutines-what-is-coroutine
topic: coroutines/basic
title: What is a coroutine?
tags: [suspend, concurrency, basics]
related: [coroutines-suspend-functions]
sources:
  - https://kotlinlang.org/docs/coroutines-basics.html
---

## Explanation
Paragraph text, with `inline code`.

## Code
```kotlin
val job = scope.launch { work() }
```
````

Rules enforced by `npm run validate`:

- `id`, `topic`, `title` required, `id` unique and kebab-case
- `## Explanation` required
- `related` ids must exist
- section slugs must be unique across tracks (they become URLs)
- sources must be `http(s)` URLs

Missing tags/sources and id/filename drift are warnings, not failures.

## Output

```
public/
├─ index.html                     # tracks + sections
├─ topics/<slug>/index.html       # section card list
├─ cards/<id>/index.html          # card detail
├─ search/index.html              # client-side search
├─ api/index.html                 # API documentation page
├─ api/v1/…                       # static JSON API
├─ data/ed-content.db             # SQLite database
├─ data/ed-content.db.sha256      # checksum
├─ sw.js                          # service worker (offline)
└─ manifest.webmanifest
```

`public/` is generated and gitignored; CI publishes it.

## API

Read-only, no auth, no query parameters. Every endpoint is a JSON file.

| Path | Contents |
| --- | --- |
| `api/v1/index.json` | metadata + endpoint index |
| `api/v1/version.json` | `contentHash` for cheap change detection |
| `api/v1/cards/index.json` | all cards, full payload |
| `api/v1/cards/{id}.json` | one card |
| `api/v1/topics/index.json` | sections with card counts |
| `api/v1/topics/{slug}/index.json` | one section + card summaries |
| `api/v1/tags/index.json` | tags with counts |
| `api/v1/tags/{slug}/index.json` | cards with one tag |
| `api/v1/search-index.json` | flat documents for client search |
| `api/v1/openapi.json` | OpenAPI 3 contract |
| `data/ed-content.db` | SQLite with FTS5 |

Card `url` fields are site-root-relative (`cards/<id>/`), `apiUrl` fields likewise
(`api/v1/cards/<id>.json`). Resolve them against the Pages base URL
(`https://<owner>.github.io/<repo>/`).

## Database

Tables: `topics`, `cards`, `card_links`, `questions` (reserved), `cards_fts` (FTS5),
`build_info`.

```sql
SELECT title FROM cards WHERE tags_json LIKE '%cancellation%';
SELECT id FROM cards_fts WHERE cards_fts MATCH 'dispatcher';
```

`build_info` carries the content hash, git sha, build time, and counts.

## Deploy

Push to `main`; `.github/workflows/pages.yml` builds and deploys `public/` to
GitHub Pages. `SITE_BASE` is derived from `GITHUB_REPOSITORY`, so project-site
base paths work without extra configuration.

## Notes

- Everything in this repo and the published artifact is public.
- `github.io` sends no CORS headers. Native apps are unaffected; browser clients
  on another origin should use `cdn.jsdelivr.net/gh/<owner>/<repo>@main/public/…`
  or `raw.githubusercontent.com` (both send `Access-Control-Allow-Origin: *`).
- Writes, auth, and server-side filtering are out of scope; add a Cloudflare
  Worker + D1 or Supabase if they become necessary.
