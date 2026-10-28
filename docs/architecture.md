# Architecture

- `projects/ngx-workshop-ui`: distributable `@tmdjr/ngx-workshop-design-system` Angular library, public API in `src/public-api.ts`.
- `src/styles/_index.scss`: public Ngx tokens, Material adapter, Neon, Neutral, Light, Amber Dawn/Dusk and paired Teal/NASA/Reese’s palettes and global accessibility defaults. ng-packagr copies this into the package's `styles/` directory.
- Shared components: `NgxPanel` projects optional `[ngxPanelHeader]` content beside the heading and body/actions into Material cards; `NgxStatus` labels Material chips; `NgxCodeBlock` displays escaped text and uses CDK Clipboard.
- `projects/storybook`: standalone showcase application, Storybook configuration and stories. These are development consumers; no story files are shipped in the library.
- Existing controls remain direct Material imports. A theme adapter can be replaced independently, but replacing Material itself still requires an intentional component migration.
- Theme selection is document-scoped, so overlays inherit it. Light, Amber Dawn, Teal Light, NASA Light and Reese’s Light regenerate the public Material adapter with a light scheme; the other palettes use a dark scheme. All palettes map Material color roles to semantic tokens. No persistence or backend is provided in the demo.

Shell alignment source at creation: `mfe-shell-admin/package.json`, Angular/Material/CDK 21.1.0. This repository pins its own dependencies and builds without sibling checkouts.

`.github/workflows/deploy.yml` verifies the library, demo, Storybook and packed consumer before
publishing the library through npm OIDC and copying `dist/storybook` to the frontend server.
`scripts/prepare-release.mjs` selects versions from public registry metadata; npm is the release
ledger and the runner changes the library manifest without committing back to main.
The package major matches Angular, minor stays zero and each new commit increments the published
patch. The static catalog has an exact Nginx virtual host and a read-only Docker mount at
`/opt/ngx-workshop-design-system`. See [deployment](deployment.md).

HUD frames use component-owned pseudo elements with the public --ngx-frame-shape token. Only those decorative layers are clipped. NgxPanel has an additive primary/secondary/danger tone input. The original vector console illustration belongs to the demo, not the distributed component API.

Panel shapes/backgrounds/motion are independent typed signal inputs. Native Angular host lifecycle bindings own entry and exit; decorative pseudo layers own the geometry and backdrop. See [panels](panels.md) for the public contract and ancestor-removal/focus limitations. Storybook PanelLab is a development-only consumer.

The complete Material catalog uses development-only standalone demos in `projects/storybook/src/material/` and one CSF story file per UI entry point in `src/stories/material/`. `catalog-data.ts` supplies the searchable inventory; `docs/material-coverage.md` records states and interactions. Original SVG icons are registered at Storybook bootstrap. No Material demo wrapper is exported by the shared library.

`NgxButton` is a shared standalone directive on a native Material MatButton host. It adds an owned aria-hidden decorative layer without accessing private Material DOM. Packaged button Sass generates shapes/strokes from one vertex map; CSS owns hover/focus and bounded native Web Animations own activation effects. See [buttons](buttons.md) for semantics, disabled anchors and tokens.

Code presentation has an independent Synthwave ’84 token palette in packaged `_code.scss`. NgxCodeBlock lazily loads a semantic highlighter and standalone Lezer grammar only for an explicit language; plain/native code does not instantiate CodeMirror. Editor/theme dependencies live only in the development comparison demo. Source is rendered as text spans; no innerHTML path exists. See [code guide](code.md).

Packaged `_overlays.scss` styles the public CDK backdrop hooks and leaves overlay content, stacking and interaction behavior with Material/CDK. Workshop Frequency consumes the current button, panel and code APIs and has a surface-switching glass specimen with dialog/sheet previews. See [overlays](overlays.md).

NgxPanel's opt-in headingMotion=stagger and headingMotionKey inputs animate only
title grapheme spans. Accessible full-heading semantics and reduced-motion CSS
retain readability; panel bodies and controls are not recreated on replay.

NgxEntrance owns reusable one-shot opacity/intrinsic-height entrances, preference,
focus/resize cancellation and cleanup. Consumers choose sequencing. Public
expansion-theme() and warning-slide-toggle() Sass mixins centralize opt-in Material
policy in the theme export; controls remain native Material. See [entrance guide](entrance.md).

`NgxBackground` renders a single deterministic rhombus lattice with one structure path and eight trace groups. Bounded size, aspectRatio, spacing and rotation inputs own geometry. Recursion, depth and childScale have been removed for performance. Defaults render 24 rhombi, and CSS animation count is capped at 17 including entrance. No runtime assets or timers are required.

Local CSS tokens own palette, independent flow/color durations, intensity, height, line widths, random trace-length bounds and delay spread. Seeded hash streams supply repeatable per-group length and delay factors without rebuilding geometry. Reduced motion and still mode expose all traces immediately and stop all animations. Consumers own the isolated stacking context and choose container or viewport placement. See [backgrounds](backgrounds.md).

The development-only BackgroundLab offers live controls, reset, reshuffle and current configuration export via CDK Clipboard with selectable-source fallback. Library geometry has no dependency on Forms or Clipboard. Copied markup omits the removed recursion inputs. The original RhombusFractal story URL remains available, labeled Rhombus lattice.
