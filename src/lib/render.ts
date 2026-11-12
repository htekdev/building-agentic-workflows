import { marked } from 'marked';
import type { Slide, Source } from './content-validation';

const escape = (text: string): string => text.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]!));

/** Render trusted repository-authored Markdown, never untrusted user content. */
export function renderSlide(slide: Slide, sources: Source[], handout = false): string {
  const references = slide.sources.map((id) => {
    const source = sources.find((item) => item.id === id);
    if (!source) throw new Error(`Missing source: ${id}`);
    return `<a href="${escape(source.url)}">${escape(source.title)}</a>`;
  }).join(' <span aria-hidden="true">/</span> ');
  const notes = `<aside class="${handout ? 'handout-notes' : 'notes'}">${marked.parse(slide.notes)}</aside>`;
  const tag = handout ? 'article' : 'section';
  return `<${tag} id="${escape(slide.id)}" ${handout ? '' : 'data-auto-animate="false"'}>${marked.parse(slide.body)}
    <div class="sources" aria-label="Slide sources">${references}</div>${notes}</${tag}>`;
}

/** Generate a linear reading experience from exactly the presentation content. */
export function renderHandout(slides: Slide[], sources: Source[]): string {
  return `<h1>Building Agentic Workflows with GitHub Copilot</h1>
    <p class="lead">Hector Flores / htek.dev / Developer session</p>
    <p>Use this handout as a reading guide. Demo sections are proposed storyboards, not recordings or claims of executed runs.</p>
    <nav aria-label="Contents"><h2>Contents</h2><ol>${slides.map((slide) =>
      `<li><a href="#${escape(slide.id)}">${escape(slide.body.match(/^##? (.+)$/m)![1])}</a></li>`).join('')}</ol></nav>
    ${slides.map((slide) => renderSlide(slide, sources, true)).join('')}
    <section id="references"><h2>Research sources</h2><ul>${sources.map((source) =>
      `<li id="source-${source.id}"><a href="${escape(source.url)}">${escape(source.title)}</a> <span>(${escape(source.kind)})</span></li>`).join('')}</ul></section>`;
}
