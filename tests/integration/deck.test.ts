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

  it('preserves the inner/outer-loop distinction and independently dated product status', () => {
    const slides = parseSlides(readFileSync('src/content/slides.md', 'utf8'), sources);
    const feedback = slides.find((slide) => slide.id === 'feedback-loops');
    const outer = slides.find((slide) => slide.id === 'continuous-ai');
    const status = slides.find((slide) => slide.id === 'product-status');
    expect(feedback?.body).toContain('DevOps already includes continuous planning');
    expect(outer?.body).toContain('Human decision');
    expect(outer?.body).toContain('Plan / build / test / deliver');
    expect(outer?.notes).toContain('not a product guarantee');
    expect(status?.body).toContain('GA October 28');
    expect(status?.body).toContain('Public preview');
    expect(status?.body).toContain('November 12, 2026');
  });

  it('keeps the new cloud example manually triggered, staged and bounded', () => {
    const example = readFileSync('examples/workflows/backlog-briefing.md', 'utf8');
    expect(example).toContain('workflow_dispatch:');
    expect(example).not.toContain('schedule:');
    expect(example).toContain('staged: true');
    expect(example).toContain('max: 1');
    expect(example).toContain('bash: false');
    expect(example).toContain('cli-proxy: false');
    expect(example).toContain('untrusted evidence');
    expect(example).toContain('must not publish the issue');
    expect(example).not.toContain('contents: write');
  });
});
