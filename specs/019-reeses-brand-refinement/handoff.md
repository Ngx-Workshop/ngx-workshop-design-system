# Handoff: Reese’s brand refinement

Status: Complete
Updated: 2026-10-29

Both themes use the user-provided orange #ff5d00, yellow #ffc000 and chocolate #2f1c0b reference tokens. Dark uses exact orange/yellow semantic accents with a chocolate base and explicit raised/recessed surface steps. Light uses cream surfaces, darkened orange for readable primary text/actions, and chocolate secondary/text. Typography remains the existing system families; selecting Reese’s after NASA restores them. Code keeps its independent theme/font.

Grid panels replace visible lines with an embedded official-source Reese’s wordmark repeat: 144 × 192px tiles, 96px row pitch, 72px alternate-row offset, 108 × 45.2px wordmarks, 22%/14% light/dark opacity. Source proportions, lettering and colors are preserved. Solid/glass omit the logo. Light glass uses 45% surface contribution; Dark retains 65%. Both omit scanlines/glow. Existing NASA and overlay changes preserved.

Implementation: packaged `_reeses.scss` supplies the identity and artwork via the existing panel image/color/size tokens. `_index.scss` owns semantic palette selectors. Source attribution ships in `REESES-ASSETS.md`. No dependency or runtime download is required.

Preview: Foundations → Reese’s → Light / Dark. The three-panel story compares patterned, solid and glass surfaces over a contrasting orange/yellow scene. README, token/panel/architecture/development docs and package checks updated.

Validation:
- npm run verify passed library, standalone demo, story typecheck, static Storybook and packed Angular/Sass consumer.
- npm run verify:package passed additional source-artwork/reference/attribution checks.
- npx playwright test tests/reeses.spec.ts tests/themes.spec.ts tests/panel.spec.ts tests/overlays.spec.ts tests/catalog.spec.ts --workers=3: all 51 passed in 29.0s.
- New tests cover source tile geometry/opacity, hidden grid lines, actual screenshot difference when blur is disabled, native typography/reset from NASA, offline assets, mobile containment, and story axe accessibility.
- Existing matrix covers semantic contrast at 4.5:1, Material roles/overlays, eleven-palette accessibility, all-story runtime smoke and keyboard/motion behavior.
- Visually reviewed both desktop previews and light mobile preview.
- git diff --check passed.

No publishing, deployment or sibling-repository changes performed. Nonblocking upstream Sass/Storybook notices remain unchanged. Package consumers receive these updates on a subsequent release/install.
