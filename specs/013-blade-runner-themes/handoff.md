# Handoff: Blade Runner 2049 themes

Status: Complete
Updated: 2026-10-28
Spec: [spec.md](spec.md)
Plan: [plan.md](plan.md)
Tasks: [tasks.md](tasks.md)

## Delivered

Added `blade-runner-light` and `blade-runner-dark` document selectors, Storybook toolbar entries and dedicated overview stories. Standalone switching cycles all six palettes. Both use teal/orange/gold inspired by the supplied poster, with contrast-adjusted ivory or indigo surfaces. Public Material adapters and overlays inherit semantic colors; the independent code palette remains unchanged. Existing uncommitted work is preserved.

README, docs/tokens.md and architecture document the pair; docs/tokens.md includes a side-by-side hexadecimal palette reference. The existing violet instrument token carries gold, preserving API compatibility. The poster is inspiration only and is not shipped.

## Verification

- `npm run verify`: PASS (library, demo, story typecheck, static Storybook, packed Angular/Sass consumer). Package assertions include both new selectors.
- `npx playwright test tests/themes.spec.ts tests/catalog.spec.ts --workers=3`: PASS, 13 tests, including all-story runtime smoke, all-six-theme overview axe scan, real toolbar selection and full cycle.
- Both new palettes pass 14 semantic text/action/status pairs at 4.5:1 or better, correct Material scheme/roles, dialog/select overlay inheritance and 390px width checks.
- Desktop screenshots of both themes and the light mobile screenshot visually inspected; screenshots available at `test-results/theme-blade-runner-{light,dark}-{desktop,mobile}.png`.
- `git diff --check`: PASS.

Existing full-suite Material button axe warning documented under feature 012 remains outside this scope. Full unrelated component suite was not repeated; the relevant theme/catalog suite passed without excluding rules.

## Remaining work

None for local theme scope. No deployment or publication performed. Consumers select `data-ngx-theme="blade-runner-light"` or `"blade-runner-dark"` after the existing `ngx.theme()` inclusion. No external owner action required.

## Naming update

Superseded by feature 014: current display names are Teal / Light and Teal / Dark; selectors are `teal-light` and `teal-dark`. Earlier names above are historical verification evidence.
