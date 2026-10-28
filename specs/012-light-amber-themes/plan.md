# Implementation plan: Light and Amber themes

Status: Complete
Spec: [spec.md](spec.md)
Updated: 2026-10-28

## Source baseline

HEAD e2f2c7c; existing uncommitted background feature. Angular/Material 21.1.0. `_index.scss` owns semantic tokens and Material roles; Storybook preview and Showcase currently expose two dark palettes.

## Design and requirements

- FR-001/002/004: Add root selectors in `projects/ngx-workshop-ui/src/styles/_index.scss`. Parameterize the public Material adapter color scheme (default dark), supply the light adapter under the light selector and complete semantic role overrides. Preserve code tokens.
- FR-003: Extend `projects/storybook/.storybook/preview.ts`, showcase cycling, theme-aware decoration and foundation stories.
- AC-001/002/003: Add `tests/themes.spec.ts`, extend catalog accessibility coverage and verify exported packaged Sass. Document selectors in README and docs/tokens.md.

## Constitution check

All seven principles satisfied: pinned stack, native Material behavior, semantic tokens, existing standalone/OnPush controls, contrast/focus/reduced motion, specified outcomes and actual checks, independent package. No deviations.

## Verification and risks

Run library/demo/Storybook builds, story typecheck and packed consumer verification. Browser checks exercise overlays, switching, native color scheme, contrast, accessibility and mobile width. Visually inspect overview screenshots for both palettes. Light mode must regenerate Material scheme-dependent defaults rather than merely repaint surfaces; decorative hardcoded Neon hues must become semantic. Existing independent Synthwave styling is intentional. No external owner or migration required.
