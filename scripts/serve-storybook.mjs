import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist/storybook');
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};
http
  .createServer(async (req, res) => {
    try {
      const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const file = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
      if (!file.startsWith(root + path.sep)) {
        res.writeHead(403).end();
        return;
      }
      const data = await readFile(file);
      res
        .writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream' })
        .end(data);
    } catch {
      res.writeHead(404).end('Not found');
    }
  })
  .listen(6007, '127.0.0.1', () => console.log('Storybook: http://127.0.0.1:6007'));
