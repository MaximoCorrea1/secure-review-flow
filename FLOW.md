# FLOW.md: Secure Review

> Routes a curated set of security-review skills so the right one fires at each phase of an audit: scope the code, run an OWASP pass, run static analysis, hunt variants, review the diff, and triage findings.
> Skills vendored from agamm (MIT) and Trail of Bits (CC-BY-SA-4.0) — see ATTRIBUTION.md. Routing by Flowy.

<!-- The Flowy engine supplies the universal contract (announce ritual, invoke/READ,
     host-wins, post-compaction re-read). This file carries only the routing. -->

## Routing

```
USER MESSAGE
  ├─ starting an audit / unfamiliar code to secure?     → invoke audit-context-building   gate: attack-surface map written
  ├─ web app, auth, or OWASP Top-10 / ASVS pass?        → invoke owasp-security
  ├─ want an automated static-analysis / pattern scan?  → invoke semgrep
  ├─ found one bug — are there more of the same class?  → invoke variant-analysis
  ├─ reviewing a PR / only the changed code?            → invoke differential-review
  ├─ is this finding real or a false positive?          → invoke fp-check                 gate: triaged before reporting
  └─ question, not security work?                        → answer only; no scan
```

## Priority on collision

When more than one branch matches, resolve top-down:

1. **Context first**: never scan code you have not mapped — `audit-context-building` precedes the assessment skills on an unfamiliar codebase.
2. **Triage before reporting**: a candidate finding goes through `fp-check` before it is reported as real.
3. **Variant sweep**: once a real bug is confirmed, `variant-analysis` runs before the class is closed.
4. Otherwise lifecycle order: scope → assess → expand → review → triage.

## Phases

1. **Scope**: audit-context-building. Gate: a written context / attack-surface map.
2. **Assess**: owasp-security (standards + manual pass) and semgrep (automated SAST).
3. **Expand**: variant-analysis. Gate: the confirmed bug class swept across the codebase.
4. **Review changes**: differential-review (for PRs / incremental diffs).
5. **Triage**: fp-check. Gate: every reported finding survived false-positive review.

**Shortcut:** quick PR security pass → differential-review → fp-check (skip full scope).

## Attribution

- `owasp-security` by **agamm** (https://github.com/agamm/claude-code-owasp), MIT.
- `audit-context-building`, `semgrep`, `variant-analysis`, `differential-review`, `fp-check` by **Trail of Bits** (https://github.com/trailofbits/skills), CC-BY-SA-4.0.
- FLOW.md routing by **Flowy**, CC-BY-SA-4.0. Because this bundle includes CC-BY-SA-4.0 material, the Flow as a whole is licensed CC-BY-SA-4.0 (ShareAlike); see LICENSE + ATTRIBUTION.md.
