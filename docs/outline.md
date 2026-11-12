# Adaptable speaker outline

**Timing assumption, not an invitation fact:** the central version is 45 minutes
including questions. Confirm the real event requirements before final rehearsal.
Objectives below are proposed learning outcomes, not claims about the organizer.

After the session, a developer should be able to:
1. Define a useful agent goal, bounded tools, evidence, and a stopping condition.
2. Distinguish an agent-assisted engineering inner loop from an opportunity-finding
   Continuous AI outer loop.
3. Explain GHAW's source/compiled artifact and read/mediated-write boundaries.
4. Choose local code-defined orchestration or Actions-hosted automation deliberately.
5. Design a first pilot with real review controls and a measurable pause condition.

| Elapsed | Segment | Presenter move / evidence |
|---|---|---|
| 0–4 | Why workflows, not just prompts? | Ask where time is lost between identifying work and verifying delivery |
| 4–10 | Feedback-loop framing | Show phased delivery → shorter DevOps loops → agent-assisted inner loop; explicitly preserve continuous planning |
| 10–15 | Fundamentals | Intent, context, tools, credentials, outputs, verification, stop/escalation |
| 15–23 | Cloud GHAW | Show Markdown/frontmatter, compile check, staged issue proposal, generated Actions boundary |
| 23–29 | Local Dynamic workflows | Preview label; synthetic fixture and deterministic validator; explain code-defined stages and human checkpoint |
| 29–35 | Human feedback and governance | Walk one issue through acceptance criteria, PR review, checks, merge and deployment gates |
| 35–40 | Continuous AI and scaling | Opportunity signal → evidence packet → human prioritization → inner loop; baseline before expansion |
| 40–45 | Questions and pilot commitment | One owner, one reversible task, one feedback measure, one stop condition |

## 30-minute adaptation

Opening 2; loops 5; fundamentals 3; cloud example 7; local comparison 4;
governance/rollout 5; questions 4. Use the deterministic fixture rather than a live
model run. Cut secondary scenarios, not safety qualifications.

## 60-minute adaptation

Opening 4; loops 8; fundamentals 7; cloud walkthrough 12; local walkthrough 9;
governance 8; rollout 5; questions 7. Spend the extra time inspecting actual
configuration and rejecting a malformed proposal, not adding more agents.

## Rehearsal decisions

- Beginner audience: spend more time on tool access versus API permissions.
- Experienced platform audience: emphasize artifact review, trust boundaries,
  aggregate cost, catalog ownership, failure recovery and branch protections.
- No confirmed audience yet: keep both routes ready; do not imply either is known.
- No live inference authorization: use compiler output and fixture validation;
  call them exactly that. A storyboard is not run evidence.
- No account entitlement: explain the prerequisites and show source; never borrow
  unrelated credentials or weaken controls to rescue a demo.

See [talk track](talk-track.md) and [demo runbook](demo-runbook.md).
