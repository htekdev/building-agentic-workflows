import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createOfflineServer } from '../../scripts/offline-server.mjs';
import type { AddressInfo } from 'node:net';

let directory: string;
let origin: string;
let server: ReturnType<typeof createOfflineServer>;

beforeAll(async () => {
  directory = await mkdtemp(join(tmpdir(), 'presentation-offline-test-'));
  await writeFile(join(directory, 'index.html'), '<h1>Offline deck</h1>');
  await writeFile(join(directory, 'slides.pdf'), '%PDF-example');
  await writeFile(join(directory, 'opaque.data'), 'packaged bytes');
  server = createOfflineServer(directory);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  origin = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});
afterAll(async () => {
  await new Promise<void>((resolve, reject) => server.close((error?: Error) => error ? reject(error) : resolve()));
  await rm(directory, { recursive: true });
});

describe('dependency-free offline package', () => {
  it('serves the deck and PDF with correct content types under the Pages base', async () => {
    const response = await fetch(`${origin}/building-agentic-workflows/`);
    expect(await response.text()).toContain('Offline deck');
    expect(response.headers.get('content-type')).toContain('text/html');
    const pdf = await fetch(`${origin}/building-agentic-workflows/slides.pdf`, { method: 'HEAD' });
    expect(pdf.headers.get('content-type')).toBe('application/pdf');
    expect(await pdf.text()).toBe('');
    expect((await fetch(`${origin}/building-agentic-workflows/opaque.data`)).headers.get('content-type')).toBe('application/octet-stream');
  });
  it.each(['/private', '/building-agentic-workflows/missing', '/building-agentic-workflows/%2Egit/config', '/building-agentic-workflows/a%5Cb', '/building-agentic-workflows/C%3Asecret'])('does not expose unsafe or nonexistent path %s', async (path) => {
    expect((await fetch(`${origin}${path}`)).status).toBe(404);
  });
  it('rejects malformed URLs and disallows write methods', async () => {
    expect((await fetch(`${origin}/building-agentic-workflows/%ff`)).status).toBe(400);
    expect((await fetch(`${origin}/building-agentic-workflows/`, { method: 'POST' })).status).toBe(405);
  });
});
