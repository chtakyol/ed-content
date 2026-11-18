import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";

const root = resolve(process.cwd(), "public");
const port = Number(process.env.PORT) || 4173;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".db": "application/vnd.sqlite3",
  ".sha256": "text/plain; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

async function resolveFile(urlPath) {
  let candidate = resolve(join(root, decodeURIComponent(urlPath)));
  if (candidate !== root && !candidate.startsWith(root + sep)) return null;

  try {
    const info = await stat(candidate);
    if (info.isDirectory()) candidate = join(candidate, "index.html");
    else if (extname(candidate) === "") {
      const withIndex = join(candidate, "index.html");
      const indexInfo = await stat(withIndex).catch(() => null);
      if (indexInfo?.isFile()) candidate = withIndex;
    }
  } catch {
    return null;
  }

  try {
    const info = await stat(candidate);
    return info.isFile() ? candidate : null;
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const file = await resolveFile(url.pathname);

  if (!file) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("404 Not Found\n");
    console.log(`404 ${url.pathname}`);
    return;
  }

  const body = await readFile(file);
  res.writeHead(200, {
    "content-type": MIME[extname(file)] || "application/octet-stream",
    "cache-control": "no-store",
  });
  res.end(body);
  console.log(`200 ${url.pathname}`);
});

server.listen(port, () => {
  console.log(`Serving ${root}\nhttp://localhost:${port}/`);
});
