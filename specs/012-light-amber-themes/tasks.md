# Tasks: Light and Amber themes

Spec: [spec.md](spec.md)
Plan: [plan.md](plan.md)
Updated: 2026-10-28

- [x] T001 — Implement semantic palettes and complete Material roles in styles/\_index.scss (FR-001/002/004, AC-001).
- [x] T002 — Expose palettes in preview, showcase and foundation stories; use semantic showcase decoration (FR-003, AC-002).
- [x] T003 — Verify theme switching, contrast, overlays, mobile, axe and packaged export (AC-001/002/003).
- [x] T004 — Update README, token/architecture docs and handoff with actual build/browser evidence.

No external work required. Preserve the existing background changes.

## Evidence

T001/T002: Packaged styles, root theme selectors, toolbar entries and dedicated stories implemented. T003: `npm run verify` and updated `npm run verify:package` passed; all four new theme tests and four-palette overview axe passed. Final full suite: 62 passed, one confirmed existing Material button axe contrast warning (see handoff). T004: README, token/architecture docs, index and handoff updated; desktop/mobile screenshots reviewed.
