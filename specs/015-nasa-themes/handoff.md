# Handoff: NASA themes

Status: Complete
Updated: 2026-10-28

## Delivered

NASA / Light (`nasa-light`) uses cool white surfaces, deep blue primary, red secondary and slate instruments. NASA / Dark (`nasa-dark`) uses space navy, readable light blue/red accents and silver instruments. Both omit glow/scanlines. The existing instrument token `--ngx-color-violet` carries slate/silver, preserving the contract.

Added document-scoped selectors, Storybook toolbar entries, dedicated overview stories and nine-palette standalone cycling. Public Material roles and CDK overlays inherit the palette; light mode uses the public light adapter. Code remains independently Synthwave. No existing palette, component behavior, dependency, deployment or sibling repository was changed. Existing uncommitted work preserved.

Color inspiration is NASA's published legacy palette: https://nasa.github.io/nasawds-site/components/colors/ (archived reference, read 2026-10-28). Interface colors are contrast-adjusted and no insignia/assets are shipped. README, docs/tokens.md and architecture describe the pair and exact hex roles.

## Verification

- npm run verify: PASS — library, standalone demo, story typecheck, static Storybook and packed Angular/Sass consumer; selector assertions cover both NASA palettes.
- npx playwright test tests/themes.spec.ts tests/catalog.spec.ts --workers=3: PASS, 16 tests in 19.3 seconds, including all-story runtime smoke, nine-palette overview axe scan, real manager selection and full cycle.
- Both NASA palettes pass 14 semantic foreground/background pairs at 4.5:1, Material schemes/roles, dialog/select inheritance and 390px width checks.
- Screenshot timing improved to wait for select dismissal and removal of overlay panes. Rerun tests/themes.spec.ts: PASS, 9 tests in 5.9 seconds.
- Visually reviewed both desktop and mobile NASA previews at test-results/theme-nasa-{light,dark}-{desktop,mobile}.png.
- git diff --check: PASS.

## Remaining work

None within local feature scope. Select `data-ngx-theme="nasa-light"` or `"nasa-dark"` after including the existing ngx.theme() mixin. No publication/deployment performed. Existing unrelated Material button axe limitation is recorded in feature 012; full unrelated suite was not repeated. Relevant checks passed without rule exclusions.
