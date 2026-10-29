# Handoff

Status: Complete

NASA Light/Dark now select Inter headings, Public Sans body/interface text and DM Mono labels/numbers. Public Material typography follows semantic families, including dialogs. Embedded Latin WOFF2 subsets work without network or asset configuration, with SIL OFL licenses packaged beside NASA-ASSETS.md. Default fonts restore when leaving NASA; code colors/fonts remain independent.

Official insignia blue #0032a0 and red #e4002b are reference tokens. Light uses blue and a darker red on cool neutrals; dark uses readable pale blue/red on black and raised graphite surfaces. Grid panels add a faint repeating full-color insignia with source geometry intact, separate light/dark opacity and generous spacing. Solid panels retain their behavior; NASA Light glass uses a 45% surface fill to expose the backdrop. Override --ngx-panel-grid-image to disable it.

Preview: Foundations / NASA / Light and Dark. Existing uncommitted overlay/surface changes preserved. No publishing or sibling edits.

Validation:
- npm run verify passed library, demo, story types, Storybook and packed consumer. After adding the new comparison stories, story types and Storybook rebuilt successfully.
- Final library and packed-consumer checks passed after source documentation was added, including embedded fonts/artwork and license files.
- Initial 49-test catalog/panel/overlay/theme matrix: 47 passed; two newly added tests failed because the heading selector also matched hidden Storybook error headings. Scoped selector to the story main element.
- Final tests/themes.spec.ts: all 13 passed, including both new NASA tests, actual font loading without external requests, typography reset, panel surface isolation, dialog font inheritance, semantic contrast, theme manager/cycling and mobile checks.
- The other 36 matrix tests passed, including all-story runtime smoke, eleven-palette overview axe checks, overlay behavior and panel interaction/accessibility.
- Visually inspected all four NASA comparison desktop/mobile screenshots; no horizontal overflow at 390px.
- git diff --check passed.

Known build output: upstream Angular Material Sass deprecation and Storybook bundle notices remain nonblocking. Embedded fonts add approximately 110KB of binary font data before Base64 encoding; they are declared globally and requested by the browser only when used. Other scripts use system fallbacks.

## 2026-10-29 follow-up

Removed visible grid lines from NASA patterned panels. The tile now repeats every 144px with rows 120px apart, and each alternate row shifts 72px. Logo dimensions stay 88 × 74px; opacity is 14% light and 18% dark. The prior repeat width was 176px. Documentation records optional grid color/size tokens.

The glass filter was already enabled; the NASA story previously put glass over a flat canvas and the 65% light fill reduced visible backdrop detail. NASA Light now uses 45% fill; the comparison story puts blue/red bands behind glass. Pixel screenshots with filtering enabled/disabled differ in both palettes, confirming visible blur rather than merely a CSS declaration. Reduced-transparency fallback remains opaque and unfiltered.

Validation: npm run verify passed library/demo/story types/Storybook/packed consumer. Library and packed consumer rebuilt successfully after asset documentation changes. The 49-test catalog/panel/overlay/theme run passed 47; the two new pattern checks initially selected an inner source SVG group instead of the tile opacity group. Corrected the test selector and both NASA tests passed, including staggered positions, opacity, hidden grid lines, visible blur, typography reset and mobile sizing. All 49 distinct checks are covered by the passing runs. Light/dark desktop and light mobile previews visually reviewed; git diff --check passed. No deployment performed.
