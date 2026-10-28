# Handoff: Teal naming and Amber Dawn

Status: Complete
Updated: 2026-10-28

## Delivered

Renamed the film-named pair to Teal / Light (`teal-light`) and Teal / Dark (`teal-dark`) throughout runtime styles, toolbar, story exports, package checks, tests and current docs. Palette values are unchanged. Previous local film-based selectors are replaced; historical spec evidence is retained with a superseding note.

Added Amber / Dawn (`amber-light`) with warm ivory canvas/surface, amber primary, olive secondary, gold instrument accent and terracotta alerts. It uses the public light Material adapter with no glow/scanlines. Existing Amber / Dusk continues using `amber`. Both toolbar and standalone cycle expose all seven palettes. Dedicated Dawn and renamed Teal stories are included.

## Evidence

- npm run verify: PASS — library, standalone demo, story types, static Storybook and packed Angular/Sass consumer.
- npx playwright test tests/themes.spec.ts tests/catalog.spec.ts --workers=3: PASS, 14 tests in 17.4 seconds, including all-story runtime smoke, seven-palette axe checks, real manager selection, complete palette cycle, contrast, correct Material roles/scheme and overlay inheritance.
- Dawn: 14 semantic foreground/background pairs meet 4.5:1; desktop/mobile screenshots visually inspected; 390px width check passed. Screenshots: test-results/theme-amber-light-{desktop,mobile}.png.
- git diff --check: PASS. No film-based names remain in current projects/docs/tests/scripts/README.

## Remaining work and consumers

None within local feature scope. Select `amber-light` for Dawn, `amber` for Dusk, `teal-light`/`teal-dark` for Teal. No release, deployment, sibling changes or publication performed. Existing uncommitted work preserved. Unrelated full-suite Material button axe limitation remains documented in feature 012; relevant theme/catalog checks passed without weakening rules.

README, docs/tokens.md (including Dawn/Dusk hex comparison), docs/architecture.md and feature index updated.
