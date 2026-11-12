# Presentation resource map

**Building agentic workflows with GitHub Copilot** — Hector Flores / htek.dev  
Research cutoff: **November 12, 2026**.

This is a usable presenter resource pack, not a proposal for a future pack.
The [canonical slide source](../src/content/slides.md) supplies the deck and
handout; its `Note:` sections are public speaker notes.

| Resource | Use |
|---|---|
| [Timed outline](outline.md) | Choose 30, 45, or 60 minutes; timing is an explicit assumption |
| [Expanded talk track](talk-track.md) | Fundamentals, transitions, audience questions, closing |
| [Loop diagrams](diagrams.md) | Continuous AI outer loop feeding a verified engineering inner loop |
| [Scenario catalog](scenarios.md) | Select tasks by prerequisites, bounded agency, and human decisions |
| [Governance and rollout](governance.md) | Threat model, actual approval boundaries, ownership, scaling |
| [Local versus cloud](local-and-cloud.md) | GHAW GA versus Dynamic workflows public preview |
| [Demo runbook](demo-runbook.md) | Prerequisites, exact checks, expected outputs, recovery and fallback |
| [Research and claim matrix](../data/research/technical/agentic-workflows-presentation.md) | Official sources, status dates, historical changes, unknowns |
| [Verification record](verification.md) | What actually passed; what was not executed |
| [Staged cloud example](../examples/workflows/backlog-briefing.md) | Manual trigger; one proposed issue, staged rather than posted |
| [Existing local fixture](../examples/validator.mjs) | Real deterministic contract validation, no model inference |

## Repository decision

Reuse **htekdev/building-agentic-workflows**, rather than fragmenting the material.
It already existed publicly on November 12 with a deck, handout/PDF build, tests,
three honestly labeled demo storyboards, and synthetic local examples.
This refresh is an isolated branch/PR; it does not deploy or merge the changes.

The older [Task Tracker demo](https://github.com/htekdev/github-agentic-workflows-demo)
remains a historical reference, unchanged. Its April-era compiled workflows and
v0.45.2 action lock are not evidence of present-day execution compatibility.
Its README's old “coming soon” statement is contradicted by four source/lock pairs.
This pack reuses the domain story, not those compiled artifacts.

## Event and privacy boundary

The event's exact date, audience, duration, and organizer objectives have **not**
been established. Do not invent them from “next week.” Work-context retrieval
was unavailable during research. The outline therefore stays adaptable.
No scheduling change or duplicate event was created.

Keep internal requirements and private source records outside this public repo.
Official public links and original synthesis are appropriate here; a private
document's availability to a presenter is not permission to publish it.

## Ready versus gated

- Ready: source-backed learning resources, editable deck/notes, bounded examples,
  deterministic fixture, and documented validation.
- Gated: approved recording scripts, an authorized model-backed sandbox rehearsal,
  exact event requirements, final timing and public sharing review.
- Not authorized by this pack: automatic merges, production deployment, scheduled
  maintenance, broad credentials, or copying internal work data into prompts.
