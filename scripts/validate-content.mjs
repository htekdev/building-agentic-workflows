import { readFileSync } from 'node:fs';
import { parseSlides, validateSources } from '../src/lib/content-validation.ts';

const sources = JSON.parse(readFileSync('src/content/sources.json', 'utf8'));
validateSources(sources);
const slides = parseSlides(readFileSync('src/content/slides.md', 'utf8'), sources);
console.log(`Validated ${slides.length} slides with notes and ${sources.length} public sources.`);
