# FLOW.md: Secure Review

> Routes a security review so the right skill fires at each phase: scope the audit and build context, assess the code against OWASP and a SAST pass, expand each finding into its variants, review the changes that introduced risk, then triage every candidate to a verdict before any "secure" claim.
> Skills vendored from agamm (MIT) and Trail of Bits (CC-BY-SA-4.0) — see ATTRIBUTION.md. Routing by Flowy.

<!-- The Flowy engine supplies the universal contract (announce ritual, invoke/READ,
     host-wins, post-compaction re-read). This file carries only the routing. -->

## Phases

1. **Scope** — entry: a review is starting, target + boundaries not yet fixed. Gate: the scope, threat surface, and architectural context recorded before any finding.
2. **Assess** — entry: context exists, need to surface candidate issues. Gate: an OWASP-mapped review AND a SAST pass run; a candidate-issue list exists.
3. **Expand** — entry: an initial issue is found. Gate: the issue's variants searched across the codebase; each occurrence logged.
4. **Review changes** — entry: a diff / PR / commit introduced the risk. Gate: the change reviewed for security regressions; blast radius noted.
5. **Triage** — entry: candidate issues exist. Gate: every candidate carries a TRUE / FALSE POSITIVE verdict with evidence before any "secure" claim.

## Routing

```
USER MESSAGE RECEIVED
│
├─ INTAKE / TRIAGE  (always first)
│   └─ new review request or first message, scope + context not yet fixed?
│       → invoke audit-context-building
│       Gate: scope, threat surface, and architectural context recorded before any finding
│
├─ SCOPE  (entry: target/boundaries not yet fixed)
│   └─ "review this repo for security" / "where do I start the audit?"
│       → invoke audit-context-building
│       Gate: the code's structure + trust boundaries mapped before hunting bugs
│
├─ ASSESS  (entry: context exists, surface candidate issues)
│   ├─ "check this against OWASP" / "is this code secure?" / authn-authz-input review?
│   │   → invoke owasp-security
│   │   Gate: findings mapped to OWASP Top 10 / ASVS; a candidate-issue list exists
│   └─ "run a static scan" / "SAST this" / "find vulns automatically"?
│       → invoke semgrep
│       Gate: a Semgrep pass run; results triaged into the candidate-issue list
│
├─ EXPAND  (entry: an initial issue is found)
│   └─ "are there more like this?" / "find variants of this bug"?
│       → invoke variant-analysis
│       Gate: the pattern searched across the codebase; every occurrence logged
│
├─ REVIEW CHANGES  (entry: a diff / PR / commit introduced the risk)
│   └─ "review this PR / commit / diff for security regressions"?
│       → invoke differential-review
│       Gate: the change reviewed for regressions; blast radius + test coverage noted
│
├─ DONE-CHECK / VERIFY  (before any "secure" / "no issue" / "done" claim)
│   └─ about to call a finding real, dismiss it, or declare the review done?
│       → invoke fp-check
│       Gate: each candidate carries a TRUE / FALSE POSITIVE verdict with evidence before the claim
│
├─ ADVISE-ONLY  (asking me to advise / explain, not to run the review)
│   └─ "should I…?" / "explain how X is exploited"?
│       → answer only; do not start a phase
│       Gate: (soft) advice given; Routing: none
│
├─ SCOPE CHANGE  (a new target, repo, or threat boundary mid-stream)
│   └─ the brief changed after context was built?
│       → re-enter SCOPE for the new target
│       Gate: the new target's context + boundaries recorded before assessing
│
├─ BLOCKED  (waiting on source access, a build, or a tool to run)
│   └─ cannot scan or review until something external lands?
│       → park; do not assert "no issues found" on unscanned code
│       Gate: the blocker named, the resume condition set
│
├─ REVIEW-LOOP  (a fix or finding came back for re-review)
│   └─ a security change or contested finding came back?
│       → invoke differential-review
│       Gate: the change re-reviewed; no new regression; verdict re-confirmed via fp-check
│
└─ DEFAULT / NO-MATCH  (always last)
    └─ nothing above fits this message?
        → answer only; ask one scoping question
        Gate: (soft) Routing: none — ask, do not guess
```

## Priority on collision

When more than one leaf could fire on the same message, resolve in this order:

1. **Blocked / waiting on external** — surface a known blocker before starting new work; never claim "clean" on code you could not scan.
2. **Scope changed** — a new target or boundary invalidates the old context; re-scope first.
3. **Done-check / verify** — any "it is secure / no issue / done" claim runs fp-check before the claim.
4. **Lifecycle order** — otherwise advance the spine: Scope → Assess → Expand → Review changes → Triage.
5. **Advisory** — a pure "explain / should I" question answers without starting a phase.
6. **Default / no-match** — loses to everything; fires only when nothing else matches.

## You are rationalizing if you think…

- "Skip the scope, just grep for vulns." → Scope first. Without trust boundaries and context you will miss the bugs that matter and chase the ones that don't.
- "OWASP review OR the SAST scan, not both." → Both. The scanner catches mechanical patterns; the OWASP pass catches design and authz flaws no rule encodes.
- "Found one, that's the bug, move on." → Expand. One occurrence is a pattern; variant-analysis finds the other five copies before they ship.
- "It looks exploitable, report it." → Triage. Run fp-check and produce a TRUE/FALSE POSITIVE verdict with evidence before the finding leaves your mouth.
- "I know which phase I am in after compaction." → Re-read this file and restate the phase before continuing.

## Attribution

- `owasp-security` by **agamm** (https://github.com/agamm/claude-code-owasp), MIT.
- `audit-context-building`, `semgrep`, `variant-analysis`, `differential-review`, `fp-check` by **Trail of Bits** (https://github.com/trailofbits/skills), CC-BY-SA-4.0.
- FLOW.md routing by **Flowy**, CC-BY-SA-4.0. The vendored skills keep their own licenses; the Flow bundle as a whole is CC-BY-SA-4.0 because it includes the Trail of Bits skills under that ShareAlike license (see LICENSE + ATTRIBUTION.md). `owasp-security` is included under its own MIT terms.
