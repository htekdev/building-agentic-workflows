# Presentation conventions

This repository is a static reveal.js presentation, built with Vite and TypeScript.
Use Primer tokens/CSS for controls and layout. Do not introduce a backend or React.

`src/content/slides.md` is the canonical deck and handout content. Each slide begins
with `<!-- stable-id | SOURCE1,SOURCE2 -->`, has a heading, and ends with `Note:`
and public speaker notes. `src/content/sources.json` stores public source provenance.
No confidential content belongs in notes: the static source is public.

All demo sections are explicitly labeled storyboards until the presenter approves
scripts and real recordings are captured. Never fabricate run evidence or video.
Keep existing htekdev repositories unchanged. Use synthetic data only.

Run `npm run check` before publishing. Vitest includes authored helpers, examples,
and governance policy in coverage; Playwright checks built output under the Pages
subpath. Add meaningful behavior tests with source changes. Do not lower thresholds.

Use reveal.js built-ins for navigation and speaker view. URLs for local assets must
respect `/building-agentic-workflows/`. Publish through the tested Pages workflow.
Project governance is in `.github/extensions/presentation-guardrails/`; use the
bundled Copilot extension guide before changing extension APIs.
