# Engineering scenario catalog

Recommendations for pilot design, not claims that every scenario is an installed
template. Official [workflow examples](https://github.github.com/gh-aw/examples/)
and the [GA announcement](https://github.blog/changelog/2026-10-28-github-agentic-workflows-generally-available/)
ground the GHAW task families. Verify each integration before enabling it.

| Scenario | Prerequisites / signal | Bounded agency | Human feedback / evidence |
|---|---|---|---|
| Issue triage | Defined categories, readable issue, owner | Propose one classification/comment; no code or closure | Clarify ambiguous intent; inspect issue link and rationale |
| CI failure analysis | Log access, failed run URL, retention policy | Read capped recent runs; propose reproduction and likely cause; no reruns by default | Owner checks cited log lines and reproduces before accepting fix |
| Documentation drift | Known authoritative API/schema and docs paths | Identify concrete mismatches; propose a draft docs change only | Domain reviewer decides correctness; avoid private-data leakage |
| Test-gap investigation | Stable baseline, test runner, behavioral specification | Identify uncovered behavior; propose meaningful assertions, not a coverage-only patch | Reviewer verifies tests fail for the intended defect |
| Dependency maintenance | Lockfile, support policy, security constraints | Investigate one upgrade and breaking changes; isolated proposal | CI/security checks and owner approve; no automatic broad update |
| Weekly maintenance briefing | Issue/PR access, duplicate rules, cutoff | Sample a bounded backlog; one staged issue/report | Maintainer accepts, combines, defers or rejects opportunities |
| Release readiness | Deterministic check commands, known release owner | Collect results and explain failures; pause at decision | Release owner authorizes separately; do not equate pause with deploy approval |
| Cross-repo improvement | Explicit allowlist and per-repo owners | Evidence gathering and separately reviewable changes | Independent review per repo; detect stale source revisions and partial failures |

## Worked outer-loop scenario: backlog briefing

1. Manual trigger, not a newly activated recurring schedule.
2. Read at most twenty issues and state the actual selection method.
3. Group evidence by maintenance theme; surface missing information.
4. Produce one **staged** issue proposal with links, not a live backlog mutation.
5. A maintainer decides priority and acceptance criteria.
6. Only approved bounded work enters plan/build/test/deliver.

The complete source is [backlog-briefing.md](../examples/workflows/backlog-briefing.md).
The result is a proposal, not proof the backlog was exhaustively analyzed.

## Worked inner-loop scenario: invalid status

The repository's fixture simulates an endpoint accepting an invalid status.
Use it to discuss agreed behavior, a failing assertion, a minimal fix proposal,
and deterministic output validation. It is not a live server or production incident.
The existing extension's review packet is deliberately not a write/deployment tool.

## Tasks to reject as first pilots

- Unrestricted “improve this repository” with no owner or acceptance criteria.
- Broad cross-repository writes with one shared credential.
- Secret rotation, deployment or merge driven only by agent confidence.
- Automatic issue creation with no deduplication or reviewer-capacity limit.
- A security conclusion inferred solely from another agent agreeing.

These exclusions are recommended risk controls, not product limitations.
