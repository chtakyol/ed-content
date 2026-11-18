/**
 * Minimal parser for the restricted YAML subset used by the content cards:
 *
 *   id: some-id
 *   tags: [a, b]
 *   sources:
 *     - https://example.com
 *
 * Anything outside that subset is rejected loudly instead of guessed at.
 */

export function parseFrontmatter(raw, file = "unknown") {
  const text = raw.replace(/\r\n/g, "\n");
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!match) {
    throw new Error(`${file}: missing opening/closing "---" frontmatter block`);
  }

  const data = Object.create(null);
  const lines = match[1].split("\n");

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim() || line.trimStart().startsWith("#")) continue;

    if (/^\s/.test(line)) {
      throw new Error(
        `${file}:${i + 2}: unexpected indentation outside a block list: ${line.trim()}`,
      );
    }

    const colon = line.indexOf(":");
    if (colon === -1) {
      throw new Error(`${file}:${i + 2}: expected "key: value", got "${line}"`);
    }

    const key = line.slice(0, colon).trim();
    const rest = line.slice(colon + 1).trim();

    if (rest === "") {
      const items = [];
      while (i + 1 < lines.length && /^\s+-\s+/.test(lines[i + 1])) {
        i += 1;
        items.push(unquote(lines[i].replace(/^\s+-\s+/, "").trim()));
      }
      data[key] = items;
      continue;
    }

    if (rest.startsWith("[")) {
      if (!rest.endsWith("]")) {
        throw new Error(`${file}:${i + 2}: unterminated inline list for "${key}"`);
      }
      const inner = rest.slice(1, -1).trim();
      data[key] = inner === "" ? [] : splitInlineList(inner).map(unquote);
      continue;
    }

    data[key] = unquote(rest);
  }

  return { data, body: text.slice(match[0].length) };
}

function splitInlineList(value) {
  const items = [];
  let current = "";
  let quote = null;

  for (const char of value) {
    if (quote) {
      if (char === quote) quote = null;
      current += char;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      current += char;
      continue;
    }
    if (char === ",") {
      items.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }

  if (quote) throw new Error(`unterminated quote in inline list: ${value}`);
  items.push(current.trim());
  return items.filter((item) => item !== "");
}

function unquote(value) {
  const trimmed = value.trim();
  if (
    trimmed.length >= 2 &&
    ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'")))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}
