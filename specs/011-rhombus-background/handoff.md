# Handoff: Rhombus fractal background

Status: Complete
Updated: 2026-10-28
Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md) · Tasks: [tasks.md](tasks.md)

## Delivered

Public `NgxBackground` standalone/OnPush component renders configurable deterministic recursive rhombi, grouped into one structure path and eight bounded trace paths per level. Soft bottom fade and entrance support slow dashed outline flow through live semantic palette colors. No runtime assets or timers. Container/viewport placement, still input and three documented CSS controls are available. Reduced motion removes all animations, including on runtime changes; pointer/keyboard/accessibility behavior leaves content usable.

Overview uses the viewport field. Foundations/Backgrounds includes fullscreen pause/resume, still, viewport and contained stories. docs/backgrounds.md documents integration. Public packaged-consumer validation compiles the new component.

## Verification

- `npm run verify`: PASS — production library, standalone demo, story typecheck, static Storybook and packed Angular/Sass consumer.
- `npm run build-storybook`: PASS after final mobile caption layout adjustment.
- `npx playwright test tests/background.spec.ts tests/catalog.spec.ts --workers=4`: PASS, 10 tests including all-story runtime smoke, accessibility in both palettes, mobile layout, interactive forms/overlays and background motion/preferences.
- Desktop 1440×1000 and mobile 390×844 screenshots inspected. No horizontal overflow. Screenshots: /tmp/ngx-background-desktop.png and /tmp/ngx-background-mobile.png.
- `git diff --check`: PASS.

The first catalog run caught an existing stale assertion reading the transparent button wrapper. HEAD already draws button fill on `.ngx-button-decoration::before`; the test now checks that visible layer. No button behavior or styles changed.

Existing upstream Sass deprecation and Storybook bundle warnings persist. No external integrations were mocked or required. This feature is verified locally; publishing/deployment was not requested. Future consuming apps can import NgxBackground after the normal package release.

## Remaining work

None within local acceptance scope. The local preview server runs on http://127.0.0.1:6007; open Foundations → Backgrounds → Rhombus Fractal.

README, architecture, feature index and the dedicated background guide reflect the new API. Constitution and deployment policy are unchanged.

## Configuration extension — 2026-10-28

Added reactive `size`, `aspectRatio`, `depth`, `spacing` and `childScale` inputs, finite-value fallbacks, numeric bounds and rounded recursion depth (1–4). Default geometry retains the original composition. Computed geometry updates in place only when geometry inputs change. Added line-width and trace-width CSS tokens.

The fullscreen story now uses a development-only BackgroundLab with seven live sliders, pause/resume and reset. Added Open Lattice, Intricate and Square Diamonds presets; Storybook Controls also configure geometry. The contained story forwards every geometry input. Updated the guide and packed-consumer check with all public configuration inputs.

Verification: `npm run verify` PASS; `npm run verify:package` PASS with the extended consumer; `npx playwright test tests/background.spec.ts tests/catalog.spec.ts --workers=4` PASS (13 tests). Tests cover live geometry changes without SVG replacement, reset, intensity/duration, bounded extreme values, invalid story arguments, mobile intricate configuration, reduced motion and the full catalog runtime smoke. Desktop and mobile lab screenshots inspected at /tmp/ngx-background-config-desktop.png and /tmp/ngx-background-config-mobile.png. `git diff --check` PASS. No external publication or deployment performed; no remaining local tasks.

## Outline styling extension — 2026-10-28

Delivered four CSS palette stops (`--ngx-background-color-1` through `-4`) with semantic theme fallbacks; independent `--ngx-background-flow-duration` and `--ngx-background-color-duration` with the original duration retained as their shared fallback. Base outlines use color 1, still/reduced-motion traces color 2. Existing line/trace width tokens now have separate live controls. New `rotation` input rotates each complete recursive motif around its root center, normalizing finite degrees modulo 360 and falling back to 0 for non-finite values.

BackgroundLab adds four color pickers, a theme-color restore button, separate cycle sliders, separate thickness sliders and rotation. Reset restores all local styles and selected-story geometry. Controls use a two-column desktop layout and a single-column narrow-mobile layout. Added Rotated story; contained story and packed-consumer validation include rotation. Updated public background guide.

Validation: `npm run verify` PASS (library/demo/story types/Storybook/packed consumer). `npx playwright test tests/background.spec.ts tests/catalog.spec.ts --workers=4` PASS, 15 tests. Final additional independent-duration assertion verified by a focused palette test PASS. Checks verify all four rendered stops, separate 5s/90s durations, widths, chosen reduced-motion color, reset, in-place rotation and equivalent -330°/30° geometry. Desktop/mobile screenshot review PASS; `git diff --check` PASS. Browser tests use real SVG/CSS animations and no external mocks. No remaining local tasks; publication/deployment not requested.

## Trace staggering extension — 2026-10-28

Delivered eight trace groups per recursion scale, with reproducible seeded start delays. One group per scale starts immediately; others stay hidden until a fraction of `--ngx-background-trace-delay` (default 8s), then loop continuously. Color animation remains independent. `traceSeed` (default 1) reshuffles delays without rebuilding geometry; non-finite seeds fall back to 1. Maximum animation count is bounded by four scales, not recursive polygon count.

`--ngx-background-trace-length` (default 80) controls a visible dash inside a constant 720-unit cycle, clamped to 1–719. Live Trace length and Random delay sliders plus Reshuffle trace delays are included in the preview; Reset restores length, delay and seed. Still/reduced-motion traces are immediately visible.

Validation: `npm run verify` PASS, including packed consumer with traceSeed. Background/catalog browser suite PASS, 17 tests. New checks verify randomized delay ranges and repeatability, zero-delay synchronization, hidden delayed traces until their start, immediate reduced-motion rendering, reshuffle without geometry changes, trace-length endpoints, independent durations and reset. Desktop/mobile screenshots inspected; `git diff --check` PASS. Documentation updated in docs/backgrounds.md and architecture. No remaining local tasks; changes remain unpublished.

## Random trace lengths and configuration export — 2026-10-28

Delivered seeded per-group random trace lengths, separate from delay factors and independent of geometry generation. Default library range is 40–160; public `--ngx-background-trace-min-length` / `--ngx-background-trace-max-length` accept numeric bounds, clamp to 1–719 and normalize reversed/equal endpoints. Existing fixed `--ngx-background-trace-length` overrides both fallback endpoints. Lab min/max sliders maintain a valid range; Reshuffle traces changes lengths and delays through the shared reproducible seed. Reset restores defaults.

Copy background configuration uses CDK Clipboard and exports full-precision Angular inputs, placement, current paused state, seed, complete styling and custom palette or theme inheritance, with import/theme setup guidance and wrapper isolation. Success state is tied to the copied source; View configuration always supplies selectable text, including when copy fails.

Validation: final `npm run verify` PASS. Final `npx playwright test tests/background.spec.ts tests/catalog.spec.ts --workers=4` PASS, 19 tests. New checks cover randomized/equal/reversed/default/legacy lengths, reshuffle stability, exact clipboard values, changed-state feedback, inherited/custom palettes and clipboard failure fallback. Exact clipboard markup and CSS from /tmp/ngx-background-current-configuration.txt also compiled successfully in an independent Angular consumer against dist/ngx-workshop-ui, with Sass compilation of the exported stylesheet. Desktop/mobile screenshot inspection PASS. `git diff --check` PASS.

Public background guide and architecture updated. No remaining local work; publishing/deployment not requested. Exported animations restart in the destination app; inherited colors follow its theme.

## Recursion removed for performance — 2026-10-28

User superseded the recursive-pattern requirement. Removed recursive generation entirely, the public depth/childScale inputs, both lab controls and corresponding copied markup. The lattice now has one static path, eight trace paths and eight independent delay/length factors. Default geometry is verified as 24 rhombi; the densest supported configuration is 273, with a constant nine SVG paths and at most 17 CSS animations including entrance. A floating-point ceil edge case that created an extra row at the default aspect ratio is fixed. Earlier geometry-count estimates in this handoff are superseded by these measured counts.

Preserved color/style controls, independent durations, rotation, random lengths/delays, still/reduced-motion behavior, placement, export and clipboard fallback. The existing RhombusFractal story URL is retained and labeled Rhombus lattice; Dense Lattice replaces Intricate. Current documentation, README, architecture, stories and packed consumer no longer require recursion inputs. Previously copied templates must remove depth and childScale.

Validation: final `npm run verify` PASS (library/demo/story types/Storybook/packed consumer). Final background/catalog browser suite PASS, 20 tests, including default/densest geometry counts, path/animation bounds, absence of recursion controls, export omission and retained behavior. Exact new clipboard markup and styles compile against the built library in a separate consumer. Desktop/mobile layout review PASS; `git diff --check` PASS. Geometry and animation counts are verified; no frame-rate benchmark is claimed. No remaining local work; no publication/deployment performed.


## Branding lattice preset — 2026-10-29

Delivered AC-009: default aspectRatio 0.58, rotation 60°, trace range 40–165 and delay 0s. All remaining requested settings already matched. Updated component inputs/non-finite fallbacks, CSS fallbacks, lab initialization/reset/export, story args and current docs. Default design remains theme-aware; explicit lattice mode and theme-fallback lattice both inherit the new geometry. Existing uncommitted theme-aware work preserved.

Verification: npm run verify passed library/demo/story types/static Storybook and packed Angular/Sass consumer. Final background/theme browser matrix passed all 20 tests (5.3s). Reviewed desktop/mobile screenshots showing the new preset. Updated the rotation wrap check to compare 0°/360° independently of the new 60° reset default. One intermediate theme-cycle check failed at the pre-existing immediate image-equality assertion; the unchanged test passed in the final complete rerun. git diff --check passed. No deployment or publishing performed.
