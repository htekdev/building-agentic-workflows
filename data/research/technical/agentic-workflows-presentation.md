---
topic: Building agentic workflows with GitHub Copilot
created: 2026-11-12
last-updated: 2026-11-12
status: active
author: coding-agent
sources:
  - https://github.blog/changelog/2026-10-28-github-agentic-workflows-generally-available/
  - https://github.blog/changelog/2026-10-01-dynamic-workflows-in-copilot-cli-and-the-copilot-app/
  - https://github.com/github/gh-aw/releases/tag/v1.2.2
tags:
  - agentic-workflows
  - github-copilot
  - presentation
---

# Evidence and claim matrix

## Summary

GitHub Agentic Workflows (`gh-aw`) became **generally available October 28, 2026**,
following technical preview in February and public preview in June. The official
release page identifies **v1.2.2, November 10, 2026** as the latest release checked
on November 12. GA is specific to GHAW, not all similarly named Copilot features.
[S1–S4]

Dynamic workflows are a **separate public-preview feature**, announced October 1,
2026 for CLI, app and SDK. Public documentation supports code-defined orchestration,
agent stages, parallelism and checkpoints. Calling the feature internal-only would
be incorrect; calling every installed preview API stable would also be incorrect.
Deterministic orchestration does not make agent reasoning deterministic. [S5–S7]

The presentation's inner/outer-loop framing is original teaching synthesis.
Continuous planning and iteration predate AI. Continuous AI here means repeatedly
observing opportunities and feeding evidence-backed proposals to a governed
engineering inner loop—not guaranteed autonomous maintenance.

## Key findings: claim / evidence / date / limitation

All rows verified November 12, 2026 unless explicitly labeled historical.

| Claim | Primary source | Published date / qualification |
|---|---|---|
| GHAW technical preview | S1 | February 13, 2026; historical milestone |
| GHAW public preview | S2 | June 11, 2026; superseded by GA |
| GHAW GA | S3 | October 28, 2026; named product scope only |
| Latest release checked is v1.2.2 | S4 | November 10, 2026; mutable “latest” can change |
| GHAW sources are Markdown/frontmatter compiled into Actions YAML | S3, S8 | Review source and generated lock; not plain Actions YAML authoring |
| GHAW uses scoped reads and mediated safe-output writes | S3, S9 | Separate handlers; permitted effects may still be wrong |
| Staged safe outputs preview rather than apply writes | S9 | Not a durable human approval queue |
| Toolsets and allowlists constrain exposed GitHub tools | S10 | Tool availability is distinct from credential scope |
| Copilot is supported; other engines exist | S11 | Engine capabilities vary; no parity claim |
| Network policy and hosted retrieval require separate attention | S12 | Don't infer every retrieval surface follows one domain list |
| API auth and Copilot inference auth/entitlement are separate concerns | S13 | Check actual organization/account setup; no token generated here |
| Dynamic workflows are public preview | S5, S6 | October 1 announcement plus current explicit preview notice |
| Dynamic workflows are extension-hosted code-defined processes | S5–S7 | Sequences/parallel agents/checkpoints; runtime compatibility matters |
| CLI experimental enablement is documented | S5 | `--experimental` or `/experimental on`; do not change shared runtime for this pack |
| Local checkpoints are not repository deployment gates | S6, S14 | App interaction support and configured authority matter |
| Branch and deployment protections are platform controls | S14, S15 | Must be configured; availability depends on plan/repository |
| Current compiler accepts both repository examples | Local validation below | v1.2.2, two successes, zero warnings; not runtime evidence |

## What changed since the old overview?

The historical public [Task Tracker repository](https://github.com/htekdev/github-agentic-workflows-demo)
was last pushed April 23, 2026 when inspected. It contains four workflow
source/lock pairs: issue triage, PR review, docs updater and weekly digest.
Its `.github/aw/actions-lock.json` references setup **v0.45.2**. The README still
says workflow files are “coming soon,” despite those files already existing.
This is a documentation mismatch, not proof the workflows never worked.

| Older material | Evidence-backed update |
|---|---|
| Preview-era compiler/artifacts | GHAW passed public preview June 11 and reached GA October 28 [S2, S3]; validate with a pinned current compiler |
| Event-triggered writes are the obvious first demo | Add a manual-triggered staged proposal so the permission/output boundary is observable [S9] |
| Overview focuses on repository automation | Add distinct local Dynamic orchestration, publicly announced October 1 [S5] |
| Action automation alone explains governance | Separate GHAW tool/output controls from branch/environment review controls [S9, S14, S15] |
| Static snippets imply current compatibility | Both present examples actually compiler-checked on v1.2.2; runtime not inferred |
| Unspecified prioritization story | Make opportunity detection, human selection and inner-loop delivery explicit as teaching synthesis |

The GA announcement lists added forecasting, engine/model choices, runner support
and isolation improvements since public preview [S3]. The November 10 release
adds reliability and firewall/proxy hardening [S4]. Avoid claiming a feature is
available in an April or v1.0.1 artifact merely because mutable main docs describe it.

## Raw data and validation evidence

- Three focused read-only researchers covered event context, public GHAW, and
  existing assets/CLI independently; synthesis excluded private work data.
- Existing presentation repository discovered November 12: public
  `htekdev/building-agentic-workflows`, created earlier that day, with deck, tests,
  fixture, extension and storyboards. Reused through isolated branch/PR.
- Installed gh-aw extension: v1.0.1. Isolated official v1.2.2 Windows ARM64 binary
  downloaded from S4 and SHA-256 matched against its release `checksums.txt`.
  No shared extension upgraded.
- Actual current-binary command:
  `windows-arm64.exe compile --dir examples/workflows --no-emit --no-check-update`.
  Result: **2 workflows succeeded, 0 warnings**, exit 0.
- No lock emitted, Actions dispatch, model call, inference entitlement check,
  cloud behavior, production write, or paid trial is implied by compiler success.
- CLI documentation helper returned live help but could not read its packaged
  README. Public official docs, not that missing file, ground feature claims.

## Sources and citations

1. **S1** [Technical preview](https://github.blog/changelog/2026-02-13-github-agentic-workflows-are-now-in-technical-preview/) — historical status.
2. **S2** [Public preview](https://github.blog/changelog/2026-06-11-github-agentic-workflows-is-now-in-public-preview/) — June milestone.
3. **S3** [GHAW generally available](https://github.blog/changelog/2026-10-28-github-agentic-workflows-generally-available/) — dated GA and safeguards.
4. **S4** [v1.2.2 release](https://github.com/github/gh-aw/releases/tag/v1.2.2) — release date, notes and binary assets.
5. **S5** [Dynamic workflows announcement](https://github.blog/changelog/2026-10-01-dynamic-workflows-in-copilot-cli-and-the-copilot-app/) — public feature, surfaces and CLI enablement.
6. **S6** [Dynamic workflow concepts](https://docs.github.com/en/copilot/concepts/agents/dynamic-workflows) — public-preview label, limits and permissions.
7. **S7** [Using Dynamic workflows](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-dynamic-workflows) — operational walkthrough.
8. **S8** [Compilation process](https://github.github.com/gh-aw/reference/compilation-process/) — source and artifact boundary.
9. **S9** [Safe outputs](https://github.github.com/gh-aw/reference/safe-outputs/) — staged mode, caps and mediated effects.
10. **S10** [GitHub tools](https://github.github.com/gh-aw/reference/github-tools/) — toolsets/allowlists.
11. **S11** [Engines](https://github.github.com/gh-aw/reference/engines/) — supported engines; no parity inference.
12. **S12** [Network](https://github.github.com/gh-aw/reference/network/) — egress and hosted-retrieval distinctions.
13. **S13** [Authentication](https://github.github.com/gh-aw/reference/auth/) — API/inference requirements.
14. **S14** [Deployments and environments](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments) — Actions protection controls.
15. **S15** [Protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) — repository review/check requirements.

## Open questions

- Exact presentation invite, audience, duration and organizer objectives remain
  unverified. The adaptable outline labels its timing assumption.
- A model-backed sandbox rehearsal and approved recordings have not been performed.
- Current account entitlement, actual runner/network behavior, model result quality
  and deployment approvals are not established by compile/unit tests.
- Preview SDK APIs must be rechecked against the actual presentation runtime.
- All date-sensitive statuses and links need a final check before the talk.

## Related documents

- [Resource map](../../../docs/README.md)
- [Governance](../../../docs/governance.md)
- [Demo runbook](../../../docs/demo-runbook.md)
- [Verification record](../../../docs/verification.md)
