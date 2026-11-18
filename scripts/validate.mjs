const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validate(model) {
  const errors = model.diagnostics
    .filter((item) => item.level === "error")
    .map((item) => `${item.file}: ${item.message}`);
  const warnings = model.diagnostics
    .filter((item) => item.level === "warning")
    .map((item) => `${item.file}: ${item.message}`);

  const seenIds = new Map();
  const seenSections = new Map();

  for (const track of model.tracks) {
    for (const section of track.sections) {
      if (seenSections.has(section.slug)) {
        errors.push(
          `duplicate section slug "${section.slug}" in ${seenSections.get(section.slug)} and ${track.slug}/${section.dirName} (URLs would collide)`,
        );
      } else {
        seenSections.set(section.slug, `${track.slug}/${section.dirName}`);
      }

      if (section.cards.length === 0) {
        warnings.push(`section ${track.slug}/${section.dirName} has no cards`);
      }
    }
  }

  for (const card of model.cards) {
    const where = card.sourcePath;

    if (!card.id) {
      errors.push(`${where}: missing "id"`);
    } else if (!ID_PATTERN.test(card.id)) {
      errors.push(`${where}: id "${card.id}" must be kebab-case [a-z0-9-]`);
    } else if (seenIds.has(card.id)) {
      errors.push(`${where}: duplicate id "${card.id}" (also in ${seenIds.get(card.id)})`);
    } else {
      seenIds.set(card.id, where);
    }

    if (!card.title.trim()) errors.push(`${where}: missing "title"`);
    if (!card.topic.trim()) errors.push(`${where}: missing "topic"`);
    if (!card.explanationMarkdown.trim()) {
      errors.push(`${where}: missing "## Explanation" section`);
    }

    for (const key of card.unknownFrontmatter) {
      warnings.push(`${where}: unknown frontmatter key "${key}" (ignored)`);
    }

    if (card.tags.length === 0) {
      warnings.push(`${where}: no tags`);
    }
    if (new Set(card.tags).size !== card.tags.length) {
      warnings.push(`${where}: duplicate tags`);
    }

    if (card.sources.length === 0) {
      warnings.push(`${where}: no sources`);
    }
    for (const source of card.sources) {
      if (!/^https?:\/\//.test(source)) {
        errors.push(`${where}: source "${source}" is not an http(s) URL`);
      }
    }

    if (card.topic && !card.topic.startsWith(`${card.track}/`)) {
      warnings.push(
        `${where}: topic "${card.topic}" does not start with track "${card.track}/"`,
      );
    }

    const slugFromFile = card.fileName.replace(/^\d+-/, "").replace(/\.md$/, "");
    if (card.id !== slugFromFile && !card.id.endsWith(`-${slugFromFile}`)) {
      warnings.push(
        `${where}: id "${card.id}" does not end with file slug "${slugFromFile}" (fine, ids win)`,
      );
    }

    for (const related of card.related) {
      if (related === card.id) {
        warnings.push(`${where}: relates to itself`);
      } else if (!model.byId.has(related)) {
        errors.push(`${where}: related id "${related}" does not exist`);
      }
    }
  }

  const total = model.cards.length;
  if (total === 0) errors.push("no cards found under cards/**/*.md");

  return { errors: [...new Set(errors)], warnings: [...new Set(warnings)] };
}
