# Local and cloud: complementary, not interchangeable

Verified November 12, 2026. [GHAW GA announcement](https://github.blog/changelog/2026-10-28-github-agentic-workflows-generally-available/);
[Dynamic workflows announcement](https://github.blog/changelog/2026-10-01-dynamic-workflows-in-copilot-cli-and-the-copilot-app/);
[current Dynamic concepts](https://docs.github.com/en/copilot/concepts/agents/dynamic-workflows).

| Dimension | GitHub Agentic Workflows | Copilot Dynamic workflows |
|---|---|---|
| Status | GA October 28, 2026 | Public preview; announced October 1, 2026 |
| Definition | Markdown + YAML frontmatter compiled into Actions lock YAML | Program in a Copilot extension defining stages and agent participation |
| Execution surface | GitHub Actions runners | Copilot CLI, app and SDK; client/runtime support matters |
| Good fit | Repository events, scheduled maintenance, shared automation | Reusable code-defined multi-step investigations and checkpoints |
| Deterministic part | Compilation, configured triggers, validation and handlers | Programmed control flow, collection, schema checks and handoffs |
| Probabilistic part | Agent analysis and proposed changes | Agent analysis and structured findings |
| Human control | Repository reviews and Actions policies plus configured GHAW controls | Supported user interactions/checkpoints plus explicit application authority |
| What does not transfer automatically? | Local tools, local credentials, runtime workflow objects | GHAW schema, Actions identity, safe outputs, environment gates |

GHAW also supports engines besides Copilot; this session deliberately demonstrates
Copilot. Do not imply that different engines have identical tools or permissions.
See [engine reference](https://github.github.com/gh-aw/reference/engines/).

## Public feature versus installed implementation

Dynamic workflows are publicly documented, **not an internal-only capability**.
The public announcement describes extension-hosted code, sequences, parallel agents,
structured handoffs, pauses and resume. CLI access uses experimental features
as documented; account and runtime availability must be checked before rehearsal.

This repository already contains [extension.mjs](../examples/extension.mjs) and
[investigation.mjs](../examples/investigation.mjs). They are examples for the
installed API version, not a promise of stable preview API compatibility.
Consult the current bundled extension/workflow authoring guide and
[SDK documentation](https://github.com/github/copilot-sdk) before loading them.
Registration in source is not proof that the extension loaded or that agents ran.

The research session exposed guide/list/inspect/run/resume tools, but **no workflow
was authored or run to organize this project**. Normal focused research agents
were sufficient. A specific local method or tool schema is evidence about that
installation, not proof every client exposes it.

## Demonstration without inference

Run `npm run demo:validate` to exercise the existing deterministic validator.
Discuss the program's synthetic evidence → two bounded investigators → validation
→ checkpoint → review packet path using source and the [diagram](diagrams.md).
This makes no claim that a model completed the investigation.

## Future authorized model-backed rehearsal

First agree tool scope, trusted extension source and a usage budget. Load the
extension in an isolated trusted session, verify real registration, inspect the
workflow definition, then request execution explicitly. Check that the investigators
have the intended empty tool allowlists and only receive the synthetic fixture.
Confirm pause/resume behavior in the supported client.

Record actual runtime version, inputs, findings, validation and completion status.
Do not infer a deploy permission from resume. Do not run this during repository
setup just to turn a proposed storyboard into a green badge.

## Determinism language for the stage

Say: “The program defines the process; agents do the judgment-heavy work.”
Avoid: “The answer is deterministic,” “two agents guarantee correctness,”
“preview equals GA,” or “this is a local clone of GHAW.”
