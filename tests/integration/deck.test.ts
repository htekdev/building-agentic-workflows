import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parseSlides, validateSources } from '../../src/lib/content-validation';
import { renderHandout, renderSlide } from '../../src/lib/render';
import sources from '../../src/content/sources.json';

describe('authored presentation', () => {
  it('renders all authored slides, public notes, sources, and honest demo labels', () => {
    validateSources(sources);
    const slides = parseSlides(readFileSync('src/content/slides.md', 'utf8'), sources);
    const rendered = slides.map((slide) => renderSlide(slide, sources)).join('');
    const handout = renderHandout(slides, sources);
    for (const slide of slides) {
      expect(rendered).toContain(`id="${slide.id}"`);
      expect(handout).toContain(`id="${slide.id}"`);
      expect(slide.notes.length).toBeGreaterThan(100);
    }
    for (const id of ['demo-triage', 'demo-investigation', 'demo-validation']) {
      expect(slides.find((slide) => slide.id === id)?.body).toContain('not recorded');
    }
    expect(rendered).not.toContain('<video');
    expect(handout).toContain('Research sources');
  });
});
