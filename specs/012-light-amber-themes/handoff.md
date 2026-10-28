# Handoff: Light and Amber themes

Status: Complete (new theme scope; existing regression limitation recorded below)
Spec: [spec.md](spec.md)
Plan: [plan.md](plan.md)
Tasks: [tasks.md](tasks.md)
Updated: 2026-10-28

## Delivered behavior

Added `light` (Light / Daylight) and `amber` (Amber / Dusk) root theme selectors. Light uses white/pale surfaces with deep cyan/magenta; Amber uses olive-charcoal with amber/sage/ember. Material color roles, native color scheme and CDK overlays follow the theme. Existing default Neon/Neutral selection is preserved, and code retains its independent Synthwave palette.

Storybook's toolbar includes all four choices, with dedicated Daylight/Dusk overview stories. The standalone showcase cycles through all four palettes. Showcase decoration and swatch labels now adapt to palette changes. Existing uncommitted background work remains intact.

## Acceptance and verification

- `npm run verify`: PASS — Angular library, standalone demo, story typecheck, static Storybook and packed Angular/Sass consumer.
- `npm run verify:package` after adding export assertions: PASS — both selectors, light scheme and amber primary ship through the public theme export.
- `npx playwright test tests/themes.spec.ts --workers=2`: PASS, 4 tests — schemes, semantic Material roles, 14 WCAG AA token pairs per new palette, dialogs/select overlays, mobile width, theme cycling and real manager toolbar.
- Expanded catalog axe scan: PASS for Neon, Neutral, Light and Amber; no serious/critical violations in the overview.
- Visually inspected full desktop and mobile screenshots of both new themes, generated under `test-results/theme-{light,amber}-{desktop,mobile}.png`.
- Final `npx playwright test --workers=4`: 62 passed, 1 failed in 24.0 seconds. The sole failure is the confirmed existing Material button accessibility warning described below. All new theme tests passed.

## Existing limitation

`tests/material.spec.ts` representative accessibility test reports a Neon HUD button label against the underlying dark surface (1.22:1). Reproduced independently by compiling the original HEAD `_index.scss`, applying that original CSS to the same story and running axe; the exact same selector and contrast report remain. The decorative button background is supplied by an owned pseudo-element. No axe rules were disabled or existing tests weakened. This issue is outside the new theme scope.

## Contract and consumer handoff

Consumers may set `<html data-ngx-theme="light">` or `"amber"` after including the existing `ngx.theme()` mixin. The public `material-adapter($theme-type: dark)` mixin now optionally accepts `light`; existing zero-argument calls remain compatible. A paired `--ngx-color-on-error` token completes error foreground mapping. No sibling repository change, publication or deployment was performed.

## Context maintenance

Updated README, docs/tokens.md, docs/architecture.md and feature index. No remaining local theme tasks. New themes are implemented and verified locally; publishing remains a separate action.
