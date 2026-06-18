---
name: secure-review-flow
description: Hand-picked security-review skills + a FLOW.md router. Scope, OWASP, SAST, variant hunt, diff review, triage.
version: 0.1.0
license: CC-BY-SA-4.0
domain: software-engineering
---

# Secure Review Flow

A curated **Flowy** Flow: hand-picked best-of-breed security-review skills, wired into a `FLOW.md` router that fires the right one at each phase. Scope the audit and build context first, assess the code against OWASP and a SAST pass, expand each finding into its variants, review the changes that introduced risk, then triage every candidate to a verdict before any "secure" claim leaves your mouth.

## Attribution

The skills in `skills/` are not Flowy's work. They are by:

- **agamm** — `owasp-security` (from [claude-code-owasp](https://github.com/agamm/claude-code-owasp), MIT).
- **Trail of Bits** — `audit-context-building`, `semgrep`, `variant-analysis`, `differential-review`, `fp-check` (from [trailofbits/skills](https://github.com/trailofbits/skills), CC-BY-SA-4.0).

What Flowy added: the `FLOW.md` routing layer. See [ATTRIBUTION.md](./ATTRIBUTION.md) for per-skill license + source, and [LICENSE](./LICENSE) for the bundle license. The bundle as a whole is **CC-BY-SA-4.0** because it includes the Trail of Bits skills under that ShareAlike license; `owasp-security` is included under its own MIT terms (compatible with redistribution in a CC-BY-SA collection).

## How to use

Run `/flowy:secure-review-flow` to activate. The Flowy hook then enforces FLOW.md routing for the rest of the session, with no manual setup. (`/flowy:secure-review-flow status` to verify; `/flowy:secure-review-flow deactivate` to turn off.)
