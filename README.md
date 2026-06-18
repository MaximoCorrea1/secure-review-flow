# Secure Review Flow

A curated **Flowy** Flow: hand-picked best-of-breed security-review skills + a `FLOW.md` router. Install it and FLOW.md routing makes the right security skill fire at each phase of a review — scope, OWASP pass, static analysis, variant hunting, diff review, and finding triage.

## Install

```
/flowy:secure-review-flow
```

## What it routes

| Phase | Skill | Source |
|---|---|---|
| Scope an audit | `audit-context-building` | Trail of Bits |
| OWASP / ASVS pass | `owasp-security` | agamm |
| Static analysis (SAST) | `semgrep` | Trail of Bits |
| Hunt bug variants | `variant-analysis` | Trail of Bits |
| Review a diff / PR | `differential-review` | Trail of Bits |
| Triage findings | `fp-check` | Trail of Bits |

## Credits & license

Skills are vendored from their upstream authors — see [ATTRIBUTION.md](./ATTRIBUTION.md). `owasp-security` is MIT (agamm); the Trail of Bits skills are CC-BY-SA-4.0. Because the bundle includes CC-BY-SA-4.0 material, **this Flow is licensed CC-BY-SA-4.0 as a whole** (see [LICENSE](./LICENSE)). FLOW.md routing by Flowy.
