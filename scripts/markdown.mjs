/**
 * Tiny Markdown renderer for the subset actually present in the cards:
 * paragraphs, inline code, fenced code blocks, headings, plus the common
 * emphasis/link constructs. HTML is escaped before anything else is emitted.
 */

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let paragraph = [];

  const flush = () => {
    const text = paragraph.join(" ").trim();
    paragraph = [];
    if (text) out.push(`<p>${renderInline(text)}</p>`);
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    const fence = /^```(\S*)\s*$/.exec(line);
    if (fence) {
      flush();
      const lang = fence[1];
      const code = [];
      i += 1;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) {
        code.push(lines[i]);
        i += 1;
      }
      const cls = lang ? ` class="language-${escapeHtml(lang)}"` : "";
      out.push(`<pre><code${cls}>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      flush();
      const level = heading[1].length;
      out.push(`<h${level}>${renderInline(heading[2].trim())}</h${level}>`);
      continue;
    }

    if (!line.trim()) {
      flush();
      continue;
    }

    paragraph.push(line.trim());
  }

  flush();
  return out.join("\n");
}

function renderInline(text) {
  const parts = [];
  let plain = "";

  for (let i = 0; i < text.length; i += 1) {
    if (text[i] === "`") {
      const end = text.indexOf("`", i + 1);
      if (end !== -1) {
        parts.push(escapeHtml(plain));
        plain = "";
        parts.push(`<code>${escapeHtml(text.slice(i + 1, end))}</code>`);
        i = end;
        continue;
      }
    }
    plain += text[i];
  }
  parts.push(escapeHtml(plain));

  return parts
    .join("")
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" rel="noopener noreferrer">$1</a>',
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
}

/**
 * Plain text version, used for search, snippets, and the SQLite FTS table.
 *
 * Strips Markdown markers line-wise so that angle brackets in generics survive:
 * `Deferred<T>` must stay `Deferred<T>`, not become `Deferred<T`.
 */
export function toPlainText(markdown) {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/```[^\n]*\n([\s\S]*?)```/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/^\s{0,3}[-*+]\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*\n]+)\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** Extract a single fenced code block from a "## Code" section. */
export function extractCode(section) {
  const trimmed = section.trim();
  if (!trimmed) return null;

  const fence = /```(\S*)\n([\s\S]*?)```/.exec(trimmed);
  if (!fence) return { lang: "", code: trimmed };

  return { lang: fence[1] || "text", code: fence[2].replace(/\n$/, "") };
}

export function truncate(value, max = 160) {
  const text = value.trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).trimEnd()}…`;
}
