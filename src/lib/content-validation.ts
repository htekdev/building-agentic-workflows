/** A reviewed primary source or attributed author perspective. */
export interface Source { id: string; title: string; url: string; kind: string }
/** A content slide, authored in Markdown with public speaker notes. */
export interface Slide { id: string; body: string; notes: string; sources: string[] }

/** Parse the deck's strict, intentionally small authoring format. */
export function parseSlides(markdown: string, sources: Source[]): Slide[] {
  const known = new Set(sources.map((source) => source.id));
  const seen = new Set<string>();
  return markdown.trim().split(/\r?\n---\r?\n/).map((chunk) => {
    const match = /^<!-- ([a-z0-9-]+) \| ([A-Z0-9,]+) -->\r?\n([\s\S]+)$/.exec(chunk.trim());
    if (!match) throw new Error('Each slide needs an ID and source IDs.');
    const [, id, refs, text] = match;
    if (seen.has(id)) throw new Error(`Duplicate slide: ${id}`);
    seen.add(id);
    const sourceIds = refs.split(',');
    for (const ref of sourceIds) if (!known.has(ref)) throw new Error(`Unknown source: ${ref}`);
    const [body, ...noteParts] = text.split(/\r?\nNote:\r?\n/);
    const notes = noteParts.join('\n').trim();
    if (!notes || !/^##? /m.test(body)) throw new Error(`Missing heading or notes: ${id}`);
    return { id, body: body.trim(), notes, sources: sourceIds };
  });
}

/** Validate public provenance before rendering it into a link. */
export function validateSources(sources: Source[]): void {
  const seen = new Set<string>();
  for (const source of sources) {
    const url = new URL(source.url);
    if (url.protocol !== 'https:' || !source.title || seen.has(source.id)) {
      throw new Error(`Invalid source: ${source.id}`);
    }
    seen.add(source.id);
  }
}

/** Resolve a local playback/download asset safely under a project Pages base. */
export function assetUrl(base: string, asset: string): string {
  if (!asset || /(?:^|\/)\.\.(?:\/|$)|[\\:#?]/.test(asset) || asset.startsWith('/')) {
    throw new Error('Assets must be relative paths without traversal or URL syntax.');
  }
  return `${base.endsWith('/') ? base : `${base}/`}${asset}`;
}
