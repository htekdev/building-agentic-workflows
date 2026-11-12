import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { preview } from 'vite';

const server = await preview({ preview: { host: '127.0.0.1', port: 4174, strictPort: true } });
let browser;
try {
  browser = await chromium.launch();
  const page = await browser.newPage();
  await mkdir('dist/downloads', { recursive: true });
  await page.goto('http://127.0.0.1:4174/building-agentic-workflows/?print-pdf');
  await page.waitForSelector('.reveal.ready');
  await page.pdf({ path: 'dist/downloads/slides.pdf', printBackground: true, preferCSSPageSize: true });
  await page.goto('http://127.0.0.1:4174/building-agentic-workflows/handout.html');
  await page.waitForSelector('#references');
  await page.pdf({ path: 'dist/downloads/handout.pdf', printBackground: true, format: 'A4' });
  await copyFile('scripts/offline-server.mjs', 'dist/serve.mjs');
  await writeFile('dist/START.txt', 'Offline presentation\n\nRequires Node.js 24 or newer. From this extracted directory, run:\n\nnode serve.mjs\n\nOpen the printed local address. No npm installation or external network is needed.\nAll speaker notes are public. Demo sections are proposed storyboards, not recordings.\n');
} finally {
  await browser?.close();
  await new Promise((resolve, reject) => server.httpServer.close((error) => error ? reject(error) : resolve()));
}
