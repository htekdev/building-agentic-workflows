# Feedback loops and trust boundaries

Original conceptual diagrams; not product topology or a historical exclusivity claim.

## Continuous AI feeds the engineering inner loop

```mermaid
flowchart TD
  O[Observe maintenance and improvement signals] --> I[Investigate and cite evidence]
  I --> P[Propose bounded work]
  P --> H{Human prioritization}
  H -->|Accept| PLAN[Plan with acceptance criteria]
  H -->|Reject or defer| O
  PLAN --> BUILD[Build isolated change]
  BUILD --> TEST[Test and inspect evidence]
  TEST -->|Revise| PLAN
  TEST -->|Checks and review pass| DELIVER[Deliver through release gates]
  DELIVER --> O
```

Outer loop: observe → investigate → propose → prioritize.
Inner loop: plan → build → test → deliver, including revision and human decisions.
Both existed as engineering concerns before AI; assistance changes possible speed
and delegation, not accountability. Continuous AI here is an operating pattern,
not a promise that every signal becomes a correct fix.

## GHAW artifact and authority boundaries

```mermaid
flowchart LR
  S[Reviewed Markdown and frontmatter] --> C[Compiler]
  C --> L[Reviewed Actions lock YAML]
  L --> A[Agent with scoped reads]
  A --> R[Structured output request]
  R --> V[Safe-output validation and handler]
  V --> E[Permitted effect]
```

Repository policy and Actions controls surround execution. Required PR reviews,
merge checks and deployment environment approvals must actually be configured;
their presence is not inferred from the diagram.

## Local orchestration: fixed flow, uncertain findings

```mermaid
flowchart LR
  F[Synthetic fixture] --> A[Investigator A]
  F --> B[Investigator B]
  A --> V[Deterministic contract check]
  B --> V
  V --> H[Pause for human review]
  H --> R[Review packet only]
```

The existing local example does not apply or deploy a patch. Independent agents
can disagree or repeat the same error. A validated schema is not proof of truth.
Product references: [Dynamic workflows](https://docs.github.com/en/copilot/concepts/agents/dynamic-workflows),
[safe outputs](https://github.github.com/gh-aw/reference/safe-outputs/).
