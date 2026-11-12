# Verification record — November 12, 2026

## Completed evidence

| Check | Actual result / scope |
|---|---|
| Current product status | Official October 28 GHAW GA announcement read; current Dynamic concepts explicitly public preview |
| Current release | Official v1.2.2 release, November 10; release binary downloaded in an isolated temporary directory |
| Compiler integrity | Windows ARM64 binary SHA-256 matched official release `checksums.txt`; shared v1.0.1 extension unchanged |
| GHAW schema validation | v1.2.2 `compile --dir examples/workflows --no-emit --no-check-update`: two workflows succeeded, zero warnings |
| Local deterministic example | `npm run demo:validate`: invalid contract rejected; corrected proposal accepted; no model/network/repository write |
| Source URLs | All 37 distinct URLs across resource pack and slide bibliography returned HTTP 200 after following redirects |
| Privacy | No WorkIQ source data retrieved or copied; no private invite, correspondence, attendees or internal document contents included |
| Governance assessment | Existing presentation guardrails and tests retained; no new extension, reload, service or recurring job |

Compiler checking does not prove runtime tool access, network connectivity,
Copilot entitlement, model quality, absence of every vulnerability, or billing.
No cloud run, model-backed Dynamic execution, paid trial, production effect,
recording, merge or deployment was performed for this refresh.

## Test evidence and remediation

The initial `npm run check` passed lint, TypeScript, all **54 tests in 9 files**,
content validation, production build and PDF export. Coverage:
**95.19% statements, 93.08% branches, 98% functions, 94.7% lines**.
The existing configured global thresholds passed; this is not a claim that every
individual module exceeds every threshold.

Four of five structured E2E tests initially passed. The handout test expected a
hard-coded 35 articles, while the three added slides correctly produced 38.
The assertion was changed to compare handout articles with the actual deck slide
count and explicitly require the three new sections. This preserves the parity
check rather than deleting it.

**Final `npm run check`: PASS**, exit 0. Lint, TypeScript, all 54 unit/integration
tests, coverage gates, content validation, production build, PDF generation and
**all five structured Chromium E2E tests** passed. The deck/handout contains
**38 slides and 26 public source entries**. E2E checks include speaker view,
navigation, accessibility, PDFs, reduced motion, every-slide canvas fit and
narrow-screen handout layout. All relative resource links resolve.

## Manual review scope

- Original pedagogical framing explicitly preserves pre-AI iteration and
  continuous planning in DevOps.
- GA and preview belong to distinct products; current public docs correct the
  researcher's over-narrow “runtime-only” Dynamic characterization.
- Safe outputs, staged preview, local checkpoint and platform approval gates are
  distinguished. No claim that every permitted effect gets human review.
- Examples are outside active workflow paths; no scheduled GHAW activated.
- Local versus cloud comparison makes no unsupported engine/API parity claim.
- Existing storyboards remain labeled **not recorded**. No fabricated run evidence.
- Product facts have dated official links; architecture/pilot advice is labeled
  recommendation or teaching synthesis.

## Remaining verification boundaries

Exact event details remain unavailable, so no confirmed duration or audience is
asserted. A separately authorized sandbox run and presenter-approved recordings
are still needed before describing either agent demo as executed.
This resource pack is not an independent security audit or an organization
approval record. Recheck mutable product status and the presentation runtime
immediately before rehearsal.
