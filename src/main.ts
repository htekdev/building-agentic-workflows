import Reveal from 'reveal.js';
import RevealNotes from 'reveal.js/plugin/notes';
import 'reveal.js/reveal.css';
import '@primer/primitives/dist/css/base/size/size.css';
import '@primer/primitives/dist/css/base/typography/typography.css';
import '@primer/primitives/dist/css/functional/size/border.css';
import '@primer/primitives/dist/css/functional/size/size.css';
import '@primer/primitives/dist/css/functional/typography/typography.css';
import '@primer/primitives/dist/css/functional/themes/dark.css';
import '@primer/primitives/dist/css/functional/themes/light.css';
import '@primer/css/dist/base.css';
import '@primer/css/dist/buttons.css';
import './styles/theme.css';
import './styles/print.css';
import markdown from './content/slides.md?raw';
import sourceData from './content/sources.json';
import { parseSlides, validateSources } from './lib/content-validation';
import { renderHandout, renderSlide } from './lib/render';
import { pauseVideos, syncSlideFocus } from './lib/media';

validateSources(sourceData);
const slides = parseSlides(markdown, sourceData);
const handout = document.querySelector<HTMLElement>('#handout');

if (handout) {
  handout.innerHTML = renderHandout(slides, sourceData);
  document.querySelector('#print')?.addEventListener('click', () => window.print());
} else {
  document.querySelector('.slides')!.innerHTML = slides.map((slide) => renderSlide(slide, sourceData)).join('');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const deck = new Reveal({
    hash: true,
    history: true,
    width: 1440,
    height: 900,
    margin: 0.1,
    slideNumber: 'c/t',
    controls: true,
    progress: true,
    transition: reducedMotion ? 'none' : 'fade',
    backgroundTransition: 'none',
    plugins: [RevealNotes],
    pdfSeparateFragments: false,
    pdfMaxPagesPerSlide: 1,
    disableLayout: false,
  });
  const update = () => {
    pauseVideos(document);
    const current = deck.getCurrentSlide();
    syncSlideFocus(document.querySelectorAll<HTMLElement>('.slides > section'), current);
  };
  deck.on('slidechanged', update);
  deck.on('ready', update);
  deck.on('overviewshown', () => {
    pauseVideos(document);
    syncSlideFocus(document.querySelectorAll<HTMLElement>('.slides > section'), null);
  });
  deck.on('overviewhidden', update);
  await deck.initialize();
  document.querySelector('#speaker')?.addEventListener('click', () => {
    const notes = deck.getPlugin('notes');
    if (notes && 'open' in notes && typeof notes.open === 'function') notes.open();
  });
}
