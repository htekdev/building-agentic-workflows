<!-- welcome | G1,G7,H3 -->
<p class="kicker">Hector Flores / htek.dev</p>

# Building Agentic Workflows with GitHub Copilot

**Define the outcome. Bound the action. Verify the result.**

Note:
Purpose: set an engineering, not a magic-demo, expectation. This session explores how developers can adopt agent-driven workflows while retaining accountability. We will follow one synthetic engineering issue across repository automation, code-defined orchestration, and deterministic tools. The three demo sections currently contain proposed storyboards; recordings will be produced only after script approval. Transition: what actually changes about a developer's job?
---
<!-- outcomes | H2,H3 -->
## The artifact is no longer the only thing you design

<div class="flow" aria-label="Shift in developer emphasis"><span>Before<small>Specify each implementation step</small></span><span>Now also<small>Specify the outcome and boundaries</small></span><span>Always<small>Own the evidence and decision</small></span></div>

**Intent becomes an engineering artifact.**

Note:
Purpose: establish the thesis as a proposed way of working, not a universal replacement for programming. Requirements, acceptance criteria, context, and workflow definitions deserve the same review discipline as code. Humans still design systems and inspect results. Hector's feedback-loop framing motivates this shift. Transition: locate it in Copilot's evolution.
---
<!-- evolution | G12,G13,G14,G3 -->
## From suggestions to governed processes

<div class="flow" aria-label="Copilot evolution"><span>Assistance<small>Suggest code in the editor</small></span><span>Agent loop<small>Plan, act, test, iterate</small></span><span>Workflow<small>Reuse steps, rules, and handoffs</small></span></div>

The shift is **who owns the next step**.

Note:
Purpose: explain evolution without pretending older modes disappeared. GitHub introduced Copilot's technical preview on June 29, 2021 and made it generally available on June 21, 2022. The modern terminal-native Copilot CLI became GA on February 25, 2026. Dynamic workflows were announced October 1, 2026. These are selected milestones, not an exhaustive product history. Do not confuse the modern agentic CLI with the older gh copilot shell-command extension. Transition: define agentic work.
---
<!-- agentic-loop | G1,G7 -->
## A goal, a loop, and a stop condition

<div class="flow" aria-label="Agentic loop"><span>Observe<small>Relevant context</small></span><span>Decide<small>Analysis and judgment</small></span><span>Act<small>Permitted tools</small></span><span>Verify<small>Evidence and feedback</small></span></div>

Stop when the **acceptance criteria** are met, not when the answer sounds complete.

Note:
Purpose: provide a conceptual model rather than a formal product definition. A workflow combines work that needs judgment with operations that should be mechanically checked. Ask the audience to identify where they already have a repetitive observe-decide-act loop. Transition: automation is useful only when authority is explicit.
---
<!-- bounded-autonomy | G10,G1 -->
## Agency is not unlimited authority

| The agent may | A human still owns |
| --- | --- |
| Investigate within scope | The goal and acceptable risk |
| Propose a change | The delivery decision |
| Request a permitted effect | Policy and approval boundaries |

**More autonomy is a choice, not a maturity score.**

Note:
Purpose: separate capability from authority. Safe-output jobs can execute permitted writes automatically; they do not imply that someone reviewed each action. Similarly a workflow checkpoint creates a pause, not necessarily an authenticated approval record. We must design the actual decision and its evidence. Transition: use a small engineering scenario to make these concepts tangible.
---
<!-- scenario | H8,H1 -->
## One issue. Three surfaces.

> A Task Tracker endpoint handles an invalid status inconsistently.

<div class="flow" aria-label="Connected demo scenario"><span>GitHub<small>Triage the issue</small></span><span>Copilot workflow<small>Investigate the behavior</small></span><span>Extension tool<small>Validate the proposal</small></span><span>Human<small>Review the evidence</small></span></div>

Synthetic fixture, not a claim about a current production defect.

Note:
Purpose: introduce the common thread. Hector's public repository demonstrates triage, reviews, docs updates, and weekly digests around a Task Tracker API. We will use the same domain but an isolated fixture. The invalid-status scenario is controlled demonstration data. There is no assumed automatic bridge from a GitHub event into a local CLI session. Transition: write the goal before adding agents.
---
<!-- good-goal | H2,G1 -->
## A good goal describes observable success

**Weak:** "Fix our API."

**Better:** "Explain why invalid task statuses are accepted. Produce a failing acceptance test and a minimal proposal. Do not change unrelated endpoints."

> Outcome + scope + evidence + stop condition

Note:
Purpose: show a reusable requirements pattern. The better instruction is our proposed example, not product syntax. Add who owns approval and what must happen if evidence is missing. Avoid asking agents to infer unstated product behavior. A developer should first agree whether invalid input should be rejected and what response contract is intended. Transition: constraints are not an afterthought.
---
<!-- constraints | G9,G10,G11 -->
## Constraints are part of the solution

- **Scope:** this issue, these files, this repository
- **Authority:** read, propose, or execute?
- **Resources:** agreed budget and concurrency
- **Escalation:** missing evidence, ambiguity, or rejected validation

Note:
Purpose: translate a broad goal into an operating envelope. These are independent dimensions: a tool can be exposed but denied by credentials, or have credentials but be inappropriate for the task. Agree on resource limits from user requirements and measured cost; do not present guessed budgets as guaranteed safety. Transition: bounded authority still needs relevant context.
---
<!-- context | H2,H3 -->
## Better context beats a bigger prompt

<div class="flow" aria-label="Context assembly"><span>Intent<small>Requirements and non-goals</small></span><span>Grounding<small>Relevant code and conventions</small></span><span>Feedback<small>Failing tests and real results</small></span></div>

Give each stage **what it needs**, not everything you have.

Note:
Purpose: adapt Hector's context-engineering principle. A workflow should pass evidence and bounded questions instead of dumping the entire conversation into every agent. Keep trusted instructions distinct from untrusted issue text. Update durable conventions through review rather than automatically canonizing every model answer. Transition: decide how much orchestration the task actually needs.
---
<!-- simple-orchestration | G1,H6 -->
## Use the simplest sufficient process

| Task shape | Start with |
| --- | --- |
| Small local question | One agent |
| Dependent stages | A sequence |
| Independent investigations | Parallel workers |
| Consequential action | Verification and a human handoff |

**An agent count is not an outcome metric.**

Note:
Purpose: counter the temptation to build an agent swarm for every request. Hector's maturity-curve essay argues for earned simplicity; present that as his experience, not a universal law. Parallelism helps independent work but adds coordination and resource costs. If workers must edit the same files, first solve isolation and integration. Transition: map the GitHub surfaces before showing them.
---
<!-- surface-map | G7,G1,G4 -->
## Three surfaces. Different responsibilities.

| Surface | Primary role |
| --- | --- |
| GitHub Agentic Workflows | Event/schedule-driven repository automation in Actions |
| Copilot dynamic workflows | A reusable process defined in code |
| CLI extensions | Session-aware capabilities implemented in JavaScript |

An extension can **host** a dynamic workflow.

Note:
Purpose: prevent terminology collisions. Dynamic workflows are a feature across Copilot CLI, the Copilot app, and SDK; the CLI is our demonstration surface. Hookflow is a separate community governance system, not a synonym for gh-aw. CLI extensions are also distinct from the retired GitHub App-based Copilot Extensions integration and ordinary IDE extensions. Transition: start where repository events happen.
---
<!-- gh-aw | G7,H1 -->
## Put repository events to work

<div class="flow" aria-label="GitHub Agentic Workflows execution"><span>Trigger<small>Issue, PR, schedule</small></span><span>Definition<small>Markdown + frontmatter</small></span><span>Actions<small>Agent execution</small></span><span>Result<small>Permitted outputs</small></span></div>

**GitHub Agentic Workflows complements CI/CD.**

Note:
Purpose: introduce gh-aw without suggesting that all CI should become probabilistic. Deterministic builds and tests still belong in normal automation. Markdown instructions and configuration are compiled into Actions workflows. Useful tasks include repository triage and maintenance. Revalidate exact schema and authentication before using historical tutorial snippets. Transition: where do effects occur?
---
<!-- safe-outputs | G10 -->
## Separate reasoning from write execution

<div class="flow" aria-label="Safe-output boundary"><span>Agent step<small>Analyze with scoped reads</small></span><span>Request<small>Structured permitted output</small></span><span>Handler job<small>Validate and execute</small></span></div>

**An upper bound is not a promise of exactly one action.**

Note:
Purpose: explain safe outputs as separation of permissions, not perfect model safety. The agent requests actions; separate permission-controlled jobs process them. A configured maximum limits actions rather than requiring that count. Current docs describe implicit default outputs when none are configured, so specify and inspect the effective configuration. Some outputs publish automatically. Transition: layer the controls rather than relying on one.
---
<!-- tool-management | G8,G9,G11 -->
## Tool management is architecture

| Question | Control to inspect |
| --- | --- |
| What can it call? | Toolsets and individual allowlists |
| What can it access? | Credential and repository scope |
| Where can it connect? | Network and hosted-retrieval policy |
| What can it change? | Outputs, permissions, policy gates |

**Exposure, permission, and approval are different things.**

Note:
Purpose: make tool management the central technical lesson. Toolsets load API groups; allowed narrows tools and can bound calls. Do not assume a runner-domain allowlist also governs provider-hosted retrieval. MCP connects external tools but does not remove authentication, data-scope, or trust concerns. Read the effective configuration and test a denied action as well as a successful one. Transition: walk through the first proposed recording.
---
<!-- demo-triage | H8,G9,G10 -->
<p class="badge">Demo 1 / proposed storyboard / not recorded</p>

## The issue enters the workflow

1. Open a synthetic invalid-status issue.
2. Observe the configured event and run.
3. Inspect the scoped read tools.
4. Review the bounded triage result.

**Evidence:** issue, workflow revision, run, and actual output.

Note:
Recording cue: start on the synthetic issue, then show only the configuration that explains authority. End at the posted classification, not a code merge. Before capture, obtain a fresh successful rehearsal and check labels, credentials, schema, and permissions. Existing scheduled runs in the source repository were not recording-ready at planning time. Static fallback: these four steps plus captured screenshots and run evidence. Transition: why did this work?
---
<!-- debrief-triage | G7,G10,H2 -->
## The useful part was not the label

- A clear goal made the decision bounded.
- Relevant context made it explainable.
- Narrow output permissions limited the effect.
- A human still decides what work to accept.

> Automate the repetitive decision without hiding its consequences.

Note:
Purpose: return from a demo to a transferable pattern. Triage is valuable when it routes work consistently and preserves evidence, not merely when an AI leaves a comment. Review classification mistakes and unexpected outputs before broadening automation. Do not equate a friendly explanation with correct judgment. Transition: what if the investigation itself has a repeatable structure?
---
<!-- dynamic-feature | G1,G2,G3 -->
<p class="badge">Copilot dynamic workflows / public preview</p>

## Define the process in code

Combine **deterministic operations** with **agent judgment**.

Sequence. Branch. Parallelize. Verify. Pause. Resume.

Available across CLI, app, and SDK; CLI demonstrations require experimental features.

Note:
Purpose: introduce dynamic workflows as their own product feature. They live inside extensions and reuse an author's process rather than leaving every handoff to the model. The same process can produce different agent answers. Check current eligibility and billing caveats in documentation; do not promise universal availability from an older announcement. Transition: compare it to familiar CLI modes.
---
<!-- modes | G1 -->
## Autonomy, delegation, and orchestration

| Feature | Who chooses the process? |
| --- | --- |
| Autopilot | The agent keeps choosing next steps |
| Fleet | The agent divides and coordinates work |
| Dynamic workflow | The author defines steps and handoffs in code |

**Not three names for "more agents."**

Note:
Purpose: give the audience a feature-selection model. Autopilot concerns autonomy; fleet encourages agent-selected parallel delegation; a dynamic workflow encodes a process. None inherently proves correctness. A workflow may need only one agent between deterministic steps. Transition: show a process whose handoffs are worth reusing.
---
<!-- orchestrate | G1,G2 -->
## Orchestrate the process, not every thought

<div class="flow" aria-label="Dynamic investigation process"><span>Collect<small>Issue and fixture</small></span><span>Investigate<small>Independent bounded questions</small></span><span>Synthesize<small>Structured findings</small></span><span>Verify<small>Evidence and checkpoint</small></span></div>

Write code for **control flow**. Ask agents for **judgment**.

Note:
Purpose: explain why deterministic orchestration is useful even though the underlying model is variable. Each worker should have a distinct objective, permitted tools, evidence requirements, and a completion contract. Preserve incomplete results. A structured object helps handoff, but semantic validity still needs checking. Transition: the second storyboard deliberately starts with a human handoff.
---
<!-- demo-investigation | G1,G2,H8 -->
<p class="badge">Demo 2 / proposed storyboard / not recorded</p>

## Investigate with structured handoffs

1. Explicitly pass the triaged issue into Copilot.
2. Collect the fixture and acceptance criteria.
3. Ask API and test investigators distinct questions.
4. Combine evidence; pause before applying a change.

**No assumed Actions-to-local-CLI bridge.**

Note:
Recording cue: show the deliberate handoff and named workflow, then phases and independent worker results. Finish at evidence-backed findings and a review checkpoint. Capture actual usage rather than promising a fixed cost. Include an incomplete-result example in supporting material. Static fallback: this process diagram and reviewed structured-result excerpts. No recording is represented as completed yet. Transition: a real process must survive failure.
---
<!-- failures | G2,G6 -->
## Design for the run that does not finish

- Keep partial evidence visibly incomplete.
- Make retried side effects idempotent.
- Validate meaning, not only JSON shape.
- Observe limits and pause at explicit boundaries.

**"The workflow stopped" is not "the work is done."**

Note:
Purpose: introduce operational discipline. The bundled runtime guide documents journaled steps and distinct failure behaviors; code against the tested runtime, not an old snippet. Repeated execution can happen after failure, so journaling is not an exactly-once transaction. Credit ceilings can be soft. Programmatic runs do not show interactive permission prompts; configure permitted capabilities deliberately. Transition: make the low-level operation less ambiguous.
---
<!-- extensions | G4,H4,H5 -->
<p class="badge">Copilot CLI extensions / experimental</p>

## Knowledge is not capability

<div class="flow" aria-label="Architecture responsibilities"><span>Instructions / skills<small>What the agent should know</small></span><span>Extensions / tools<small>Operations implemented in code</small></span><span>Hooks / policy<small>Checks at defined boundaries</small></span></div>

A CLI extension runs alongside the session as a Node.js process.

Note:
Purpose: adapt Hector's layered architecture while grounding product facts in current docs. An extension can expose tools, commands, and session-aware behavior. A hook is a lifecycle integration, not a complete sandbox. MCP is an external tool integration surface; a plugin can distribute capabilities. Use the surface matching the need. Transition: choose a deterministic task worth extracting into code.
---
<!-- deterministic-tool | G4,H7 -->
## Turn a vague action into a narrow contract

**Not:** "Run whatever command fixes this."

**Instead:** validate a proposed task-status contract.

<div class="flow" aria-label="Deterministic validator"><span>Input<small>Known schema</small></span><span>Fixed code<small>No shell interpolation</small></span><span>Result<small>Pass/fail + reasons</small></span></div>

Note:
Purpose: demonstrate granular tool design. The included validator checks a synthetic status-contract proposal with fixed code and returns structured evidence. It does not write a repository, execute arbitrary commands, or prove an application is correct. The operation has predictable mechanics even if the agent's choice of proposal varies. Transition: observe useful rejection rather than only a happy path.
---
<!-- demo-validation | G4,H7 -->
<p class="badge">Demo 3 / proposed storyboard / not recorded</p>

## Rejection is useful feedback

1. Submit an invalid status-contract proposal.
2. Inspect the validator's concrete rejection.
3. Correct it and validate again.
4. Present evidence for a human decision.

**A passing check is not permission to merge.**

Note:
Recording cue: show the invalid and corrected proposals and actual validator responses. End with a proposed handoff packet and a deliberate approve/reject decision; rejected approval leaves changes unapplied. No agent should weaken the contract just to get green. Static fallback: inputs, failure reasons, passing result, and review checklist. Script and final media approval are still required. Transition: make review an explicit design element.
---
<!-- human-loop | G1,G10 -->
## Human-in-the-loop, not human-as-cleanup

| Boundary | Review question |
| --- | --- |
| Before execution | Is this the right scope and authority? |
| After investigation | Does the evidence support the finding? |
| Before delivery | Do we accept the change and its risk? |

**Make rejection a normal, tested path.**

Note:
Purpose: connect to the invitation's human-in-the-loop promise. Decide what can happen automatically and what remains a proposal. Approval must apply to the exact artifact and consequence, not a different result produced after review. Pausing a run is useful but does not replace an approval policy. Transition: show failure modes hidden by polished demonstrations.
---
<!-- gotchas | G9,G11,H7,H2 -->
## What a polished demo can hide

- Untrusted issue text becomes an instruction.
- Context drifts; workers duplicate or conflict.
- Tests turn green by weakening assertions.
- Credentials, rate limits, retries, or costs surprise you.

> Evaluate failures as deliberately as successes.

Note:
Purpose: balance inspiration with concrete gotchas. Treat fetched content as data, enforce authority outside prompts, isolate edits, and inspect meaningful assertions. Coverage is a useful gate but not proof of quality. Separate observations from hypotheses and preserve missing evidence. These are engineering risks to evaluate, not claims that one tool solves every risk. Transition: choose realistic first applications.
---
<!-- use-cases | G7,G1,H1 -->
## Scenarios worth trying

| Need | First bounded artifact |
| --- | --- |
| Issue intake | Classification with evidence |
| Documentation drift | A reviewed update proposal |
| Failing CI | A diagnosis and reproducer |
| Release readiness | A checklist with explicit blockers |
| Migration | An isolated, tested change set |

Note:
Purpose: offer choices for different companies without prescribing one architecture. Match each candidate to data access, available validation, review capacity, and acceptable blast radius. Start with a useful artifact that someone can reject. Do not begin with unattended production remediation just because the platform can call an API. Transition: adoption changes the operating model too.
---
<!-- scaling | G9,G11,H3,H6 -->
## Scale the operating model

**Ownership** / Who maintains the workflow?

**Isolation** / What data, tools, and workspaces are shared?

**Evidence** / How do we know it helped?

**Economics** / What does a useful result actually cost?

Note:
Purpose: address the invitation's scaling promise. Version prompts and tool contracts, assign owners, evaluate regressions, and route feedback into improvements. Measure accepted useful results, escaped defects, reviewer effort, and observed resource use rather than agent count or generated lines. Enterprise policy, data residency, and approvals must be checked in the actual organization. Transition: give the audience a small adoption action.
---
<!-- adoption | G7,G1,H6 -->
## Pick one measurable workflow

<div class="flow" aria-label="Adoption ladder"><span>Read-only<small>Report with evidence</small></span><span>Propose<small>Human-reviewed artifact</small></span><span>Automate narrowly<small>Known effects and rollback</small></span></div>

Keep the simplest level that delivers value.

Note:
Purpose: end with a practical adoption ladder. Choose one repetitive task, define its acceptance criteria, expose only necessary capabilities, and test the failure paths. Expand authority based on evidence, not novelty. Some organizations should stay at read-only reports, and that is a valid outcome. Transition: summarize with one durable idea.
---
<!-- close | H3,G1,G7 -->
## Define the outcome.
## Bound the action.
## Verify the result.

**Your next engineering artifact might be the workflow.**

[Explore the handout, notes, and sources](./handout.html)

Note:
Purpose: close the conceptual talk and open discussion. Ask the audience to think of one task where a bounded proposal would remove repetitive effort without removing ownership. The companion handout contains the public sources and qualifications. Do not imply the three proposed recordings have been produced. Transition: Q&A; use appendix slides only when useful.
---
<!-- appendix-status | G1,G2,G4,G5 -->
<p class="kicker">Appendix / availability</p>

## Check the recording environment

- Dynamic workflows: **public preview**
- CLI dynamic workflows: experimental features enabled
- CLI extensions: **experimental**
- Check current eligibility, policy, permissions, and billing

Documentation reviewed for this presentation on November 12, 2026.

Note:
Purpose: retain visible feature-status caveats without burdening every conceptual slide. Announcements describe launch availability; current documentation can add exceptions, including legacy annual-plan billing. Record the runtime and tested behavior with each clip. Availability and controls may change after this review, so revalidate before presenting.
---
<!-- appendix-config | G9,G10,G11 -->
<p class="kicker">Appendix / control checklist</p>

## Inspect the effective configuration

| Layer | Ask |
| --- | --- |
| GitHub tools | Which groups and individual calls? |
| Authentication | Which repositories and permission scopes? |
| Network | Runner egress and hosted retrieval? |
| Safe outputs | Which writes and maximum counts? |
| Policy | What requires a separate human decision? |

Note:
Purpose: provide a durable checklist instead of a potentially stale configuration snippet. The old public demo uses broad defaults and historical settings; do not copy it unchanged. Compile and validate the exact current frontmatter and inspect generated jobs. Explicitly account for implicit output defaults. Keep credentials out of configuration committed to source.
---
<!-- appendix-process | G1,G2 -->
<p class="kicker">Appendix / conceptual pseudocode</p>

## A reusable investigation process

```text
validate input and collect bounded evidence
ask independent investigators distinct questions
preserve incomplete results explicitly
combine and verify findings
pause for review of this exact proposal
return evidence; do not deploy
```

Illustration of control flow, not copy-paste API syntax.

Note:
Purpose: explain orchestration without claiming a snippet is executable. Production code should handle ordinary failed results separately from cancellation, validate semantics, version durable keys, and make retries safe. A workflow's structured result is an interface contract, not evidence that the finding is true. Use the bundled guide for the installed runtime.
---
<!-- appendix-tool-choice | G4,G1 -->
<p class="kicker">Appendix / choose a surface</p>

## What do you actually need?

| Requirement | Start with |
| --- | --- |
| Reusable instructions and resources | Skill |
| External service tools | MCP |
| A lifecycle command | Hook |
| Session-aware JavaScript capability | CLI extension |
| Repeatable code-defined process | Dynamic workflow |
| Distributable capability bundle | Plugin |

Note:
Purpose: give the audience a practical product vocabulary. These surfaces compose; they are not competing maturity levels. A dynamic workflow is hosted in an extension, and a plugin may distribute it. Keep authority, authentication, and validation independent of packaging. Avoid conflating local extension processes with the retired GitHub App integration.
---
<!-- appendix-delivery | P1,P2 -->
<p class="kicker">Appendix / presentation controls</p>

## Take the material with you

- Arrow keys navigate; Esc opens overview.
- S opens speaker view; F toggles fullscreen.
- The handout includes public notes and source links.
- Download slide and handout PDFs from the toolbar.

All notes are public. Demo sections are currently **storyboards**.

Note:
Purpose: explain the companion site honestly. Speaker view keeps notes out of the projected display, but static source and the handout expose those notes publicly. PDFs replace video with readable storyboard content until approved recordings exist. For local delivery, serve the built site from a local static web server; opening index.html directly is not the supported route.
