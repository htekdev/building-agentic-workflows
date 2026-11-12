# Demo runbook: safe checks first

No model-backed workflow was dispatched for this refresh. Compiler checks and
fixture validation are valuable evidence, but are not an end-to-end agent run.
Record actual results in [verification](verification.md).

## Prerequisites

- Existing locked project dependencies, Node 24+, and the repository's normal
  test/build tools. Use `npm ci`; do not change dependencies to rescue a demo.
- GitHub CLI and a reviewed gh-aw compiler. Record `gh aw version`.
  This refresh additionally used an isolated checksum-verified v1.2.2 release
  binary without upgrading the shared installed v1.0.1 extension.
- For a later real run: authorized disposable repository, Copilot entitlement and
  supported authentication, Actions policy/runner access, scoped read permissions,
  approved inference/compute budget and an owner who can stop the run.
- Never display credentials, private invitations, internal documents or real
  production logs. The public fixture is synthetic.

Authentication is deployment-specific: see [GHAW auth](https://github.github.com/gh-aw/reference/auth/).
Do not assume a nonempty token is usable, or that API access implies inference
entitlement. Do not create credentials in front of an audience.

## Demo A: GHAW source to validated artifact

1. Open [backlog-briefing.md](../examples/workflows/backlog-briefing.md).
2. Explain `workflow_dispatch`, scoped reads, disabled shell/proxy tools,
   `engine: copilot`, an explicit output maximum and `staged: true`.
3. From the repository root, validate without emitting or dispatching:

   ```shell
   gh aw compile --dir examples/workflows --no-emit --no-check-update
   ```

4. Expected: compiler reports success for compatible examples. Any warning or
   schema error is a real result to inspect, not permission to disable lint.
5. For a future approved enablement only: place reviewed source in
   `.github/workflows/` in a disposable repo; compile the lock YAML with the pinned
   compiler, inspect permissions/actions/jobs and commit both through review.
   No copied source is executable by Actions until its compiled workflow is enabled.

The examples stay under `examples/`, not active `.github/workflows/`. No GHAW
schedule or cloud trigger is enabled by this resource pack.

## Demo B: deterministic contract validation

```shell
npm run demo:validate
```

Expected: the existing synthetic invalid proposal is rejected and a corrected
proposal produces a review packet. Inspect the validator and its tests.
This is real local code execution, not a live HTTP endpoint or model result.
Neither proposal applies code or deploys anything.

## Demo C: proposed Dynamic workflow recording

Use the existing source and [local workflow notes](local-and-cloud.md).
This remains a proposed storyboard until script approval and authorized rehearsal.
Show registration, structured input, investigators, validator and checkpoint in
source; do not fabricate recordings or results. A model-backed run can incur cost.

## What a real cloud rehearsal would prove

After separate authorization, manually dispatch in the disposable repository.
Expected behavior: inspect a bounded sample; create at most one **staged proposal**
in the run summary, with source links and limitations; no issue publication.
Verify both intended output and absence of GitHub writes. Record the exact source
and lock revisions, compiler, run URL, input sample, outputs, cost and anomalies.

Staging is a preview, not delayed approval. A later real-write configuration is a
separate reviewed change. Do not remove staging during a live presentation.
Safe outputs mediate effects but do not inherently require human approval.

## Recovery and fallback

| Failure | Safe response |
|---|---|
| Compiler rejects current schema | Stop; show error and source/version mismatch; use checked source and verification record |
| No Copilot entitlement/authentication | Do not substitute unrelated credentials; use source/compile walkthrough |
| No network or Actions access | Use local source, generated offline presentation and fixture; don't claim cloud execution |
| Missing tool or blocked egress | Preserve error; don't broaden scope or add MCP servers live |
| Model output lacks evidence or exceeds contract | Reject packet; show the validator/review boundary |
| Timeout, rate limit or cost concern | Stop the owned run through supported controls; preserve logs; avoid repeated paid retries |
| Wrong write in sandbox | Stop entry point, retain evidence, let owner perform approved cleanup; do not erase audit history |

Avoid `gh aw run`, ordinary `gh aw trial`, or programmatic Dynamic execution
for this validation pass: they can dispatch real work and incur charges.
“Dry run,” “compile,” “staged,” and “not executed” are distinct labels, not synonyms.
