# Governance, oversight and scaling

Engineering recommendations are labeled as such. Product boundaries are grounded
in the [GA safeguards](https://github.blog/changelog/2026-10-28-github-agentic-workflows-generally-available/),
[safe outputs](https://github.github.com/gh-aw/reference/safe-outputs/),
[network policy](https://github.github.com/gh-aw/reference/network/), and
[Actions deployment environments](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments).

## Which layer enforces what?

| Decision / control | Owner / actual boundary | Do not claim |
|---|---|---|
| Goal and acceptance criteria | Human issue author/maintainer; reviewed instructions | An issue description is an authorization token |
| Available reads and credentials | GHAW tools, GitHub API permissions, token scope, MCP authentication | Loading a tool grants every resource |
| Agent-side isolation and egress | GHAW sandbox/firewall and configured network policy | Prompt instructions alone prevent exfiltration |
| Permitted output requests | GHAW safe-output schema, caps, separate handler jobs | Every safe output waits for a human |
| Proposed-effect preview | `safe-outputs.staged: true` | Staging is a durable approval queue |
| Workflow changes | Source and generated YAML review under repository rules | Generated files can be trusted without review |
| PR eligibility and merge | Repository rules, required reviews/checks, authorized merge path | GHAW supplies every branch protection automatically |
| Deployment approval | Actions environment protection, where configured and available | GHAW intrinsically gates every deployment |
| Local checkpoint | Dynamic workflow pause/resume and application support | A checkpoint authenticates an approver or enforces separation of duties |
| Billing/concurrency | Configured workflow/client/platform controls and monitoring | Any soft credit limit is a hard invoice ceiling |

See [protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
and [Dynamic workflow permissions/limits](https://docs.github.com/en/copilot/concepts/agents/dynamic-workflows).
Plan/organization restrictions affect which platform protections are available.

## Threat and failure model

| Input / failure | Risk | Recommended control and test |
|---|---|---|
| Issue, PR, log or retrieved page says “ignore instructions” | Prompt injection crosses data/instruction boundary | Treat as evidence; minimal tools, integrity filtering, egress policy; test malicious fixtures |
| Sensitive logs or private work context | Disclosure in prompts, logs, artifacts or public outputs | Classify/redact; approved endpoints; public-output review; never paste private documents into public research |
| Excessive credential scope | A permitted tool causes an unintended write | Short-lived scoped credentials; separate handlers; denied-write test |
| Fabricated conclusion with valid schema | Polished but wrong recommendation | Require source links and reproduction; deterministic checks plus independent human judgment |
| Concurrent or replayed work | Duplicate issues/PRs, stale changes | Dedup keys, caps, baseline revision, idempotent handlers; test retry and partial failure |
| Unbounded investigation or retries | Compute/inference cost and reviewer overload | Agreed timeout/concurrency/credit controls, monitoring, stop owner; test cancellation |
| Stale compiled artifact | Executable behavior differs from reviewed intent | Pin compiler, recompile source, inspect lock diff; revalidate after updates |
| Two agents agree | Correlated error masquerades as assurance | Different evidence/questions; validate with tests and sources, not voting alone |

Layered safeguards reduce exposure; they do not prove prompt injection impossible.
Do not install additional MCP servers or broaden network policy during a failed demo.

## Human feedback contract

Every proposed issue or PR should answer: What was observed? Which exact sources
and revisions? What is uncertain? What is proposed? What is excluded? What checks
actually ran? Who decides? What happens on rejection?

Require identity-bound approval for consequential actions through the team's
supported platform controls. A comment saying “approved,” an agent's confidence,
and a passed content validator are not interchangeable with that control.

## Scaling ladder (recommendation)

1. **Readiness:** select a repetitive task, data boundary, accountable owner,
   manual baseline and reversible scope.
2. **Shadow reads:** compare reports with maintainer work; track omissions.
3. **Staged proposals:** evaluate usefulness, source quality and review effort.
4. **Bounded metadata:** allow one narrowly defined effect after denied-path tests.
5. **Issue-to-draft-PR:** require curated acceptance criteria, isolated changes,
   meaningful tests and existing review/merge rules.
6. **Team catalog:** version workflows, compiler, tools, schemas, owners and runbooks;
   review updates before broad rollout.
7. **Cross-repo:** scope each repository, correlate lineage and handle partial failure
   without silently widening permissions.

Measure useful accepted findings, incorrect findings, escaped defects, reviewer
minutes, queue age, retries, cost per useful outcome and recovery time.
Do not invent universal success percentages. Agree thresholds from the team's
baseline. Pause for unauthorized successful action, credential exposure, bypassed
approval, unexplained spend or inability to reconstruct an execution.

Rollback means disable the affected entry point, preserve evidence, and restore
the reviewed version through normal change control—not delete audit history.
