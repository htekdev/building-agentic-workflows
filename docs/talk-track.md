# Expanded speaker talk track

These are original pedagogical notes. Product statements are grounded in the
[claim matrix](../data/research/technical/agentic-workflows-presentation.md);
the feedback-loop framing is a teaching model, not an exclusive history of DevOps.

## 1. Start with the wait, not the agent

“Think of a maintenance task that everyone agrees matters but nobody has time to
investigate. We want to shorten the distance from signal to evidence to decision.
An agent is useful when judgment is needed between steps. A reliable workflow also
defines the steps that should never depend on judgment.”

Ask: which wait is expensive—discovering the problem, reproducing it, implementing
the fix, reviewing the change, or approving release? Do not assume a team needs
more generation when review capacity is its bottleneck.

## 2. A progression of feedback loops

“A phased plan/build/test/release picture is useful for showing handoffs. DevOps
shortened feedback loops through integration, testing, delivery and operational
feedback. It did not exclude continuous planning, nor did AI invent iteration.”

“Agent assistance can compress the local plan/build/test/deliver loop: propose a
plan, inspect code, make a bounded change, run tests, inspect failures, revise.
Faster generation still requires reliable tests and a definition of done.”

“Expanded agency can also help identify and prioritize possible work. Our
Continuous AI outer loop observes a repository, investigates signals, and proposes
an evidence packet. A maintainer can accept, reject, combine or defer that work.
Accepted work enters the engineering inner loop; delivery and operational results
inform the next observation. This is not a guaranteed autonomous maintainer.”

Use the [diagrams](diagrams.md). Ask where human judgment should be most visible:
often prioritization and consequential action, not approval of every harmless read.

## 3. Fundamentals: the operating contract

“A strong workflow has a goal, trusted instructions, relevant context, permitted
tools, scoped credentials, constrained outputs, and a stop condition.”

Use the synthetic invalid-status issue: explain current observed behavior;
agree on desired rejection semantics; require an acceptance test and minimal
proposal; exclude unrelated endpoints. If the expected API contract is unknown,
clarification is a successful stop, not failure to be autonomous.

Distinguish four questions:
- Is a tool exposed to the agent?
- Can its credential access this resource?
- Is the requested effect permitted by deterministic validation?
- Has an authorized person approved the consequential action when required?

An answer to one does not answer the others.

## 4. Cloud: GHAW on GitHub Actions

“GitHub Agentic Workflows is GA as of October 28, 2026. A Markdown source contains
YAML frontmatter for configuration and a natural-language task. The compiler emits
standard Actions lock YAML. Review both intent and executable artifact.”

Show the manual [backlog briefing](../examples/workflows/backlog-briefing.md).
Point to scoped issue reads, no shell tools, a maximum of one proposal, and staged
outputs. Staging previews the effect; it is not an approval queue that publishes
automatically after a person reads it.

Explain the boundary: the agent reasons with scoped reads; safe-output handlers
process permitted write requests separately. Output caps constrain blast radius,
not factual correctness. A permitted wrong issue can still waste a maintainer's
time. Keep normal deterministic CI for builds and tests.

## 5. Local: code-defined orchestration, probabilistic judgment

“Dynamic workflows are a separate public-preview feature across Copilot CLI,
app and SDK. Their program can define sequences, parallel investigations, validation
and checkpoints. Repeating control flow does not reproduce an agent's conclusions.”

Show the existing synthetic fixture and run `npm run demo:validate`. A rejection
is evidence that the validator enforces a contract, not evidence that the proposed
code is correct. Explain the two-investigator extension without running it here.
A pause supports review; the workflow still needs a defined approver and authority.

Do not call Dynamic workflows internal-only: GitHub publicly documents the feature.
Conversely, do not promise every installed SDK method is a stable public contract.
There is no automatic cloud-event-to-local-session bridge in this example.

## 6. Human feedback at the right boundaries

“An issue is a place to clarify goals. A PR is a reviewable proposal. Required
checks and branch rules decide merge eligibility. Environments can gate deployment
when configured and supported. These Actions/repository controls are not all
GHAW-native features.”

Demonstrate the difference between:
1. A recommendation that asks a human to approve.
2. A UI pause or comment containing the word “approved.”
3. An authenticated platform policy that prevents the action without approval.

Only the third is an enforcement boundary. Safe outputs do not automatically add
per-action human review. See the [control ownership table](governance.md).

## 7. Scale the operating system, not the agent count

“Start with one owner and a read-only shadow task. Measure useful findings,
omissions, cost and reviewer effort. Move to staged proposals. Expand permissions
only after observing reliable behavior and testing the failure path.”

Catalog reusable workflow versions, accepted inputs, expected output schemas,
budgets, owners and rollback procedures. An unowned shared prompt scales mistakes
as efficiently as good practice. Parallel investigators help independent questions;
they add cost and may share the same mistaken assumption.

Close: “Choose one repetitive, reversible task. Name its owner and evidence.
Decide what a wrong answer costs, where approval belongs, and when to stop.
That is an engineering workflow—not just a longer prompt.”
