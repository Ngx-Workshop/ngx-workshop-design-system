# Handoff: Reese’s light and dark themes

Status: Complete
Updated: 2026-10-28

## Delivered

Added Reese’s / Light (`reeses-light`) and Reese’s / Dark (`reeses-dark`). Light pairs cream surfaces with burnt orange, chocolate and peanut-butter gold. Dark pairs chocolate surfaces with vivid orange, peanut-butter gold and cream text. Both use complete semantic colors with correct Material/native schemes and document-scoped overlay inheritance. Light has no glow, Dark a restrained orange halo; neither uses scanlines. Existing code colors and component behavior remain intact.

Registered Storybook toolbar entries, dedicated overview stories and both palettes in the eleven-theme showcase cycle. Updated README, architecture, docs/tokens.md (exact hex table), package selector assertions, contrast/overlay/theme tests and eleven-palette axe coverage. Color inspiration is the official Reese’s product page https://www.hersheyland.com/reeses; interface colors are adjusted for readability, not claimed official brand hex values. No logo, product imagery, dependency, deployment or sibling repository changes.

## Verification

- npm run verify: PASS — library, standalone demo, story typecheck, static Storybook and packed Angular/Sass consumer. Selector assertions include both palettes.
- npx playwright test tests/themes.spec.ts tests/catalog.spec.ts --workers=3: PASS, 18 tests in 18.6 seconds, including all-story runtime smoke, all-eleven overview axe checks, real manager selection and full palette cycling.
- Both new palettes pass 14 semantic text/action/status foreground/background pairs at 4.5:1, correct Material roles/native scheme, dialog/select inheritance and mobile width checks at 390px.
- Desktop and mobile previews for both visually inspected: test-results/theme-reeses-{light,dark}-{desktop,mobile}.png.
- git diff --check: PASS.

## Remaining work

None for local theme scope. Consumers select `data-ngx-theme="reeses-light"` or `"reeses-dark"` with the existing ngx.theme() inclusion. No publication or deployment performed. Existing uncommitted work preserved. Full unrelated suite was not repeated; the existing Material button axe limitation is documented in feature 012, while relevant theme/catalog checks passed without excluding rules.
