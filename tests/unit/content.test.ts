import { describe, expect, it } from 'vitest';
import { assetUrl, parseSlides, validateSources } from '../../src/lib/content-validation';
import { renderHandout, renderSlide } from '../../src/lib/render';

const sources = [{ id: 'G1', title: 'Docs & reference', url: 'https://docs.github.com/', kind: 'official' }];
const content = '<!-- first | G1 -->\n## First\nA **bounded** goal.\nNote:\nExplain the boundary.';

describe('content contract', () => {
  it('renders the same content and citations in slides and handout', () => {
    const slides = parseSlides(content, sources);
    expect(renderSlide(slides[0], sources)).toContain('<strong>bounded</strong>');
    expect(renderSlide(slides[0], sources)).toContain('class="notes"');
    const handout = renderHandout(slides, sources);
    expect(handout).toContain('class="handout-notes"');
    expect(handout).toContain('Explain the boundary.');
    expect(handout).toContain('Docs &amp; reference');
    expect(handout).toContain('href="#first"');
  });
  it.each([
    ['missing metadata', '## No ID\nNote:\nNotes'],
    ['duplicate ID', `${content}\n---\n${content}`],
    ['unknown source', content.replace('| G1', '| G2')],
    ['missing notes', content.split('\nNote:')[0]],
    ['missing heading', content.replace('## First', 'First')],
  ])('rejects %s instead of silently publishing incomplete content', (_label, markdown) => {
    expect(() => parseSlides(markdown, sources)).toThrow();
  });
  it('does not render a missing provenance reference', () => {
    expect(() => renderSlide(parseSlides(content, sources)[0], [])).toThrow('Missing source');
  });
  it('accepts public HTTPS sources and rejects unsafe or duplicate references', () => {
    expect(() => validateSources(sources)).not.toThrow();
    expect(() => validateSources([{ ...sources[0], url: 'http://example.com' }])).toThrow();
    expect(() => validateSources([{ ...sources[0], title: '' }])).toThrow();
    expect(() => validateSources([...sources, ...sources])).toThrow();
  });
  it('handles Windows-authored CRLF content', () => {
    expect(parseSlides(content.replaceAll('\n', '\r\n'), sources)[0].id).toBe('first');
  });
});

describe('project asset paths', () => {
  it('preserves project subpaths for media and downloads', () => {
    expect(assetUrl('/building-agentic-workflows/', 'demos/triage.mp4')).toBe('/building-agentic-workflows/demos/triage.mp4');
    expect(assetUrl('/project', 'downloads/slides.pdf')).toBe('/project/downloads/slides.pdf');
  });
  it.each(['', '../private', '/root.mp4', 'https://evil.test', 'a\\b', 'a/../b', 'x?y', 'x#y'])('rejects unsafe path %s', (path) => {
    expect(() => assetUrl('/project/', path)).toThrow();
  });
});
