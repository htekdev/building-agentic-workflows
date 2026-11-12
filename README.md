# Building Agentic Workflows with GitHub Copilot

A conceptual developer presentation by Hector Flores, with public speaker notes,
research links, an accessible reading handout, and printable PDFs.

The presentation covers Copilot's evolution, GitHub Agentic Workflows, Copilot
dynamic workflows, deterministic extension tools, human review, and adoption.

## November 12, 2026 research refresh

Start with the [presentation resource map](docs/README.md): timed outline, expanded
talk track, inner/outer-loop diagrams, engineering scenarios, governance, scaling,
safe demo runbook, and dated claim/source matrix.

**Status:** GitHub Agentic Workflows (`gh-aw`) became generally available on
[October 28, 2026](https://github.blog/changelog/2026-10-28-github-agentic-workflows-generally-available/).
[Dynamic workflows](https://docs.github.com/en/copilot/concepts/agents/dynamic-workflows)
remain a separate public-preview feature. Neither statement implies feature parity.
The [verification record](docs/verification.md) distinguishes local checks from
model-backed demonstrations that have **not** been executed.

The outline offers 30/45/60-minute adaptations, not a confirmed event duration.
No private invitation, correspondence, attendee information, or internal document
content belongs in this public repository.

## Status

The deck includes three **proposed demo storyboards**, not completed recordings.
Scripts and capture decisions must be approved with the presenter before recording.
No simulated output is represented as a successful model run. Public examples and
small deterministic fixtures are included under `examples/`.

## Run locally

Use Node.js 24 or newer:

```shell
npm ci
npx playwright install chromium
npm run dev
```

Open the address printed by Vite under `/building-agentic-workflows/`.
Arrow keys navigate, Esc opens overview, S opens speaker view, F toggles fullscreen.
All speaker notes are public in the static source and the handout.

## Validate and build

```shell
npm run check
```

This runs lint, type checking, Vitest with enforced coverage, content validation,
the production build, PDF generation, and Playwright checks under the Pages subpath.
Coverage minimums: statements/functions/lines 80%, branches 75%. No model API calls
are made by tests.

`npm run build` alone creates the site; `npm run export:pdf` then adds the PDF
downloads. Deployments use the full check command, never the incomplete build alone.

To present without an external network, keep the generated `dist/` folder or
download the `offline-presentation` Actions artifact. Extract it and run
`node serve.mjs` from that directory, then open the printed local address.
The package requires only Node.js: no npm install, CDNs, or external services.
Use this local server rather than opening HTML with `file://`.

## Edit content

`src/content/slides.md` supplies the deck and handout. Each slide uses a stable ID,
public source IDs, Markdown content, and public notes:

```text
<!-- my-slide | G1 -->
## A bounded goal
The key idea.
Note:
Purpose, qualifications, and transition.
```

Separate slides with `---`. Add public sources to `src/content/sources.json`.
Citation provenance distinguishes official documentation from author experience.
Historical tutorial examples should be checked against current product behavior.

## Example tool and workflow

`npm run demo:validate` runs the deterministic synthetic contract validator. It
rejects invalid proposals and prints a review packet for a corrected proposal.
It performs no network calls or repository writes.

`examples/extension.mjs` registers that tool and a two-investigator dynamic workflow.
It is **not loaded automatically** by this project. To try it deliberately, copy
`extension.mjs`, `investigation.mjs`, `fixture.mjs`, and `validator.mjs` together into a trusted
Copilot extension directory, consult the current bundled extension guide, reload,
and verify it loaded. Dynamic workflows/CLI extensions remain preview/experimental.
Agree on tool scope and a usage budget before any model-backed run.

The workflow collects a synthetic in-memory endpoint regression and passes it to
two registered investigators with empty tool allowlists. This fixture simulates
response objects; it is not an HTTP service or a production observation.
The workflow investigates this supplied evidence, validates a fixed contract,
and pauses. Resuming returns a review packet; it does not apply or deploy code.
Programmatic workflow execution does not present interactive permission prompts.

`examples/workflows/issue-triage.md` is a bounded gh-aw example, not an enabled
workflow in this repository. It was compiler-checked with `gh aw` v1.0.1 using
`gh aw compile --dir examples/workflows --no-emit`. This version accepts string
tool allowlists; newer documentation also describes per-tool call-limit objects.
Compile against your installed version rather than assuming schema compatibility.

## Publishing

The Pages workflow tests PRs and main pushes; only successful main builds deploy.
Its official actions are pinned to reviewed SHAs. Coverage and test artifacts are
retained for 14 days. The job summary reports coverage without granting fork code
write permissions to post a PR comment.

Enable GitHub Pages with the Actions build source and require **Test and coverage**
in branch protection. The public project URL is:
https://htekdev.github.io/building-agentic-workflows/

## Sources and license

Official GitHub documentation and public [htek.dev](https://htek.dev) articles are
linked per slide and in the handout. External source material and trademarks retain
their owners' rights. Original code and presentation content are MIT licensed.
