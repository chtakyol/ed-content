import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { loadModel } from "./model.mjs";
import { validate } from "./validate.mjs";
import { buildDatabase } from "./db.mjs";
import { buildApi } from "./api.mjs";
import { renderSite } from "./render.mjs";

const rootDir = process.cwd();
const outDir = join(rootDir, "public");
const siteDir = join(rootDir, "site");
const validateOnly = process.argv.includes("--validate-only");

function siteBase() {
  if (process.env.SITE_BASE) return process.env.SITE_BASE;
  const repository = process.env.GITHUB_REPOSITORY;
  if (repository) {
    const [owner, name] = repository.split("/");
    return name === `${owner}.github.io`
      ? `https://${owner}.github.io/`
      : `https://${owner}.github.io/${name}/`;
  }
  return "http://localhost:4173/";
}

const started = Date.now();
const model = loadModel(rootDir);
const { errors, warnings } = validate(model);

console.log(`Parsed ${model.cards.length} cards from ${model.tracks.length} track(s).`);

if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const warning of warnings) console.log(`  ! ${warning}`);
}

if (errors.length) {
  console.log(`\nErrors (${errors.length}):`);
  for (const error of errors) console.log(`  x ${error}`);
  process.exitCode = 1;
} else {
  console.log("Validation passed.");
}

if (validateOnly || errors.length) {
  process.exit(process.exitCode ?? 0);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const meta = {
  contentHash: model.contentHash,
  generatedAt: new Date().toISOString(),
  gitSha: (process.env.GITHUB_SHA || "local").slice(0, 12),
  siteBase: siteBase(),
};

const database = buildDatabase(join(outDir, "data", "ed-content.db"), model, meta);
writeFileSync(
  join(outDir, "data", "ed-content.db.sha256"),
  `${database.sha256}  ed-content.db\n`,
);

buildApi({ outDir, model, meta });
renderSite({ outDir, model, meta: { ...meta, dbBytes: database.bytes }, siteDir });

mkdirSync(join(outDir, "assets"), { recursive: true });
cpSync(join(siteDir, "assets"), join(outDir, "assets"), { recursive: true });
cpSync(join(siteDir, "manifest.webmanifest"), join(outDir, "manifest.webmanifest"));
cpSync(join(siteDir, "icon.svg"), join(outDir, "icon.svg"));
writeFileSync(join(outDir, ".nojekyll"), "");

const sectionCount = model.tracks.reduce((total, track) => total + track.sections.length, 0);
const duration = ((Date.now() - started) / 1000).toFixed(2);

console.log(`
Built in ${duration}s
  cards      ${model.cards.length}
  sections   ${sectionCount}
  hash       ${meta.contentHash.slice(0, 12)}
  database   ${(database.bytes / 1024).toFixed(1)} KB
  output     ${outDir}
`);
