import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve(new URL('../dist', import.meta.url).pathname);
const port = Number(process.env.PORT || 3000);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.pdf':'application/pdf','.svg':'image/svg+xml','.avif':'image/avif','.woff2':'font/woff2'};
createServer(async (req, res) => {
  try {
    const path = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (path !== root && !path.startsWith(root + sep)) { res.writeHead(403).end('Forbidden'); return; }
    const file = path === root ? resolve(root, 'index.html') : path;
    const content = await readFile(file);
    res.writeHead(200, {'Content-Type':types[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache'}).end(content);
  } catch { res.writeHead(404, {'Content-Type':'text/plain'}).end('Not found'); }
}).listen(port, '127.0.0.1', () => console.log(`VJ's Bar & Burger: http://localhost:${port}`));
