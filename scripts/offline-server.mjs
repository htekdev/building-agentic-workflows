import { createServer } from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const base = '/building-agentic-workflows/';
const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.pdf': 'application/pdf', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.mp4': 'video/mp4', '.webm': 'video/webm', '.vtt': 'text/vtt',
};

/** Serve only packaged files on loopback; no dependencies or outbound connections. */
export function createOfflineServer(directory) {
  const root = resolve(directory);
  return createServer(async (request, response) => {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    let path;
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      if (!pathname.startsWith(base)) {
        response.writeHead(404).end('Not found');
        return;
      }
      const relative = pathname.slice(base.length) || 'index.html';
      if (/[\\:]/.test(relative) || relative.split('/').some((part) => part.startsWith('.'))) {
        response.writeHead(404).end('Not found');
        return;
      }
      path = resolve(root, relative);
    } catch {
      response.writeHead(400).end('Invalid URL');
      return;
    }
    try {
      const actual = await realpath(path);
      const actualRoot = await realpath(root);
      if (!actual.startsWith(`${actualRoot}${sep}`)) {
        response.writeHead(404).end('Not found');
        return;
      }
      const contents = await readFile(actual);
      response.writeHead(200, {
        'Content-Type': mime[extname(actual)] ?? 'application/octet-stream',
        'Content-Length': contents.length,
        'X-Content-Type-Options': 'nosniff',
      });
      response.end(request.method === 'HEAD' ? undefined : contents);
    } catch {
      response.writeHead(404).end('Not found');
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT ?? 4173);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be 1-65535.');
  createOfflineServer(fileURLToPath(new URL('./', import.meta.url)))
    .listen(port, '127.0.0.1', () => console.log(`Open http://127.0.0.1:${port}${base}`));
}
