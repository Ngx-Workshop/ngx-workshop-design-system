# Theme contract

Include `@use '@tmdjr/ngx-workshop-design-system/theme' as ngx; @include ngx.theme();` once in global Sass.
The default HUD palette uses electric cyan (#27f5ef), magenta (#ff52c6), violet (#aa8cff), signal red (#ff3e68) and midnight navy surfaces. Set `data-ngx-theme="neutral"` on `<html>` for the minimal palette.
Use the document root so dialogs, selects and other CDK overlays inherit tokens.

| Token                                 | Purpose                                      |
| ------------------------------------- | -------------------------------------------- |
| --ngx-color-canvas / surface          | Page and elevated surfaces                   |
| --ngx-color-text / muted              | Body and supporting text                     |
| --ngx-color-primary / on-primary      | Primary actions and readable foreground      |
| --ngx-color-secondary / on-secondary  | Secondary accent and foreground              |
| --ngx-color-border                    | Surface outlines                             |
| --ngx-color-success / warning / error | Status labels                                |
| --ngx-font-body / mono / label        | System sans, coder text, small labels        |
| --ngx-space-2 / 4 / 6                 | 8px, 16px, 24px spacing                      |
| --ngx-radius                          | Shared 2px control radius                    |
| --ngx-glow                            | Restrained decorative halo; none for neutral |

To add a brand, override these variables in a root selector after the mixin. Override paired foreground/background tokens together and verify contrast.
`tokens()`, `material-adapter()` and `theme()` are exported Sass mixins. `theme()` includes the first two, global focus and reduced-motion rules.
Material also exposes `--mat-sys-*` for Material-specific roles. Keep that dependency in the adapter rather than spreading it into shared component styles.

## Included palettes

| Root selector value | Display name      | Scheme | Palette                                                 |
| ------------------- | ----------------- | ------ | ------------------------------------------------------- |
| `neon` (or omitted) | Neon / Workshop   | Dark   | Midnight, cyan, magenta                                 |
| `neutral`           | Neutral / Minimal | Dark   | Graphite, steel, minimal decoration                     |
| `light`             | Light / Daylight  | Light  | Pale gray/white, deep cyan, magenta                     |
| `amber-light`       | Amber / Dawn      | Light  | Ivory, amber, olive, terracotta                         |
| `amber`             | Amber / Dusk      | Dark   | Olive-charcoal, amber, sage, ember                      |
| `teal-light`        | Teal / Light      | Light  | Ivory, deep teal, burnt orange, gold                    |
| `teal-dark`         | Teal / Dark       | Dark   | Indigo shadows, luminous teal, orange, gold             |
| `nasa-light`        | NASA / Light      | Light  | Cool white, deep blue, red, slate                       |
| `nasa-dark`         | NASA / Dark       | Dark   | Space navy, light blue, red, silver                     |
| `reeses-light`      | Reese’s / Light   | Light  | Cream, burnt orange, chocolate, peanut-butter gold      |
| `reeses-dark`       | Reese’s / Dark    | Dark   | Dark chocolate, vivid orange, peanut-butter gold, cream |

For example, set `<html data-ngx-theme="light">` or change the root attribute at runtime. Storybook's theme toolbar supports all eleven; the standalone showcase's **Switch palette** button cycles Neon → Neutral → Light → Amber Dawn → Amber Dusk → Teal Light → Teal Dark → NASA Light → NASA Dark → Reese’s Light → Reese’s Dark → Neon. Dedicated Daylight, Dawn, Dusk, Teal, NASA and Reese’s overview stories provide direct previews.

Light sets `color-scheme: light` and regenerates Material's scheme-dependent defaults through the public adapter. `material-adapter($theme-type: dark)` accepts `light` for a custom light palette. The adapter maps surface, container, inverse, fixed and error roles to semantic tokens, including `--ngx-color-on-error`. Pair error foregrounds with error backgrounds when customizing.

Dusk interprets the reference screenshot's amber haze, olive-gray metal, charcoal shadows and red-orange lights. It includes no screenshot or photographic asset. Accent/text pairs are adjusted for interface contrast.

Both palettes preserve HUD geometry, focus and reduced-motion behavior. Light removes scanlines and glow; Amber uses restrained warm decoration. Code blocks retain their independent dark Synthwave palette.

## HUD geometry and decoration

| Token                          | Purpose                                              |
| ------------------------------ | ---------------------------------------------------- |
| --ngx-color-danger / on-danger | High-energy alert accent and readable foreground     |
| --ngx-color-violet             | Additional instrument/palette accent                 |
| --ngx-grid-color               | Subtle grid lines in shared panel surfaces           |
| --ngx-scanline-opacity         | Static console scanline intensity; neutral uses zero |
| --ngx-cut                      | Corner cut depth, 16px by default                    |
| --ngx-frame-shape              | Replaceable polygon for decorative panel layers      |

`NgxPanel` accepts optional `tone="primary"`, `"secondary"` or `"danger"`.
Tone changes frame accents, not the meaning or ARIA role of projected content.
Notches clip only decorative layers; content, focus rings and interaction hit areas stay intact.
`ngx-action` is an opt-in class on a Material flat button for notched cyan backgrounds.
Add `ngx-action--secondary` for magenta. These classes use CSS backgrounds and public Material token overrides; no private control DOM is targeted.
Use signal red for attention; readable error text uses the softer `--ngx-color-error` token.
The showcase wireframe globe is original inline SVG and hidden from assistive technology.
No reference image, watermark or stock artwork is included in the package.

## Panel variants

See [panel API and lifecycle guide](panels.md) for five frame shapes, grid/solid/glass surfaces, opt-in boot/glitch/hologram transitions and duration/blur/opacity tokens. Existing panels keep the original notched/grid appearance and motion defaults to none.

## Full Material coverage

The shared adapter maps secondary/tertiary/inverse and surface-variant roles to the semantic palette so filled fields and selected/overlay content inherit the theme consistently. Menu, autocomplete, bottom-sheet, snackbar and tooltip shapes use public overrides. Tooltip text uses the paired primary/on-primary colors. See [Material coverage](material-coverage.md) for per-component state stories.

## Button variants

See [button guide](buttons.md) for six shapes, three surfaces/tones and scan/glitch/pulse interaction motion. The button styles use semantic paired colors and public Material overrides; duration, cut and blur tokens can be overridden independently. Existing ngx-action classes remain supported.

## Code palette

[Code tokens and contrast variants](code.md) define the Synthwave ’84 palette independently of the surrounding app theme. `theme()` includes native pre/code styles; `code-styles()` is separately exported. Readable mode brightens upstream comment/diagnostic colors; original mode restores them.

## Overlay depth

[Glass overlay backdrop tokens](overlays.md) configure tint, blur, saturation and fallback for existing CDK backdrops. `theme()` includes them; `overlay-styles()` is independently exported. Both modal and connected-overlay backdrops are covered without adding new backdrops.

## Teal pair

The supplied poster inspires a warm/cool split: teal illumination, orange neon, gold highlights and deep indigo shadows. Light mode uses ivory surfaces; dark mode uses indigo surfaces. Colors are adjusted for interface readability rather than sampled as exact film grading. No poster artwork is shipped.

| Role               | Light     | Dark      |
| ------------------ | --------- | --------- |
| Canvas             | `#fff6e9` | `#0d1024` |
| Surface            | `#fffcf5` | `#191e35` |
| Primary / teal     | `#007577` | `#24d6ce` |
| Secondary / orange | `#b43b18` | `#ff8748` |
| Instrument / gold  | `#805700` | `#ffd166` |
| Text               | `#182039` | `#fff1d5` |
| Muted text         | `#51566b` | `#b6bed1` |
| Danger             | `#b32935` | `#ff6e62` |

Select `data-ngx-theme="teal-light"` or `data-ngx-theme="teal-dark"` on the document root. Both appear in the toolbar and dedicated overview stories. The existing `--ngx-color-violet` instrument token carries gold in this pair to preserve the public token contract. Light uses no glow/scanlines; dark uses a restrained teal glow. Both retain the independent Synthwave code palette.

## Amber Dawn / Dusk pair

Dawn is the light counterpart to Dusk, using the same amber/olive/ember family with contrast-adjusted colors. Select `data-ngx-theme="amber-light"` for Dawn; the existing `"amber"` selector continues to select Dusk.

| Role                | Dawn (light) | Dusk (dark) |
| ------------------- | ------------ | ----------- |
| Canvas              | `#fff8ed`    | `#12140f`   |
| Surface             | `#fffdf6`    | `#22251d`   |
| Primary / amber     | `#8a5200`    | `#ffb547`   |
| Secondary / olive   | `#52643d`    | `#b8c49a`   |
| Text                | `#30291c`    | `#f5edda`   |
| Muted text          | `#665b45`    | `#bebba5`   |
| Danger / terracotta | `#b73b22`    | `#ff794f`   |

Dawn uses Material's light scheme without glow or scanlines. The renamed Teal pair uses `teal-light` and `teal-dark`; replace the previous film-based selectors in local consumers.

## NASA pair

NASA / Light (`nasa-light`) and NASA / Dark (`nasa-dark`) draw on the blue/red/white family in [NASA's published legacy web palette](https://nasa.github.io/nasawds-site/components/colors/). That archived reference is inspiration; these are application themes adapted for readable contrast. Dark mode uses brighter blue and red so small text and outlined controls remain readable. The existing instrument token `--ngx-color-violet` carries slate/silver here.

| Role                      | Light     | Dark      |
| ------------------------- | --------- | --------- |
| Canvas                    | `#f2f5f9` | `#070e1b` |
| Surface                   | `#ffffff` | `#111e32` |
| Primary / blue            | `#0b3d91` | `#8bbcff` |
| Secondary / red           | `#c62d1f` | `#ff735c` |
| Instrument / slate-silver | `#52657c` | `#bdcce0` |
| Text                      | `#142238` | `#f4f7fb` |
| Muted text                | `#526174` | `#b4c3d6` |

Both themes omit glow and scanlines for a restrained mission-control appearance. NASA Light uses the public light Material adapter; NASA Dark uses a dark color scheme. Dialogs and selects inherit the root palette. Code blocks retain their independent Synthwave palette. Both appear in the toolbar, eleven-theme showcase cycle and dedicated overview stories.

## Reese’s pair

Reese’s / Light (`reeses-light`) and Reese’s / Dark (`reeses-dark`) interpret the orange, gold and chocolate family associated with [Reese’s peanut butter cups](https://www.hersheyland.com/reeses). Hex values below are application colors adjusted for readable contrast, rather than official brand specifications. No logo or product photography is included.

| Role              | Light                 | Dark                           |
| ----------------- | --------------------- | ------------------------------ |
| Canvas            | `#fff5e5`             | `#1b100b`                      |
| Surface           | `#fffcf5`             | `#2c1b13`                      |
| Primary / orange  | `#b94700`             | `#ff8618`                      |
| Secondary         | `#6b371b` (chocolate) | `#efb85d` (peanut-butter gold) |
| Instrument / gold | `#8a5a00`             | `#ffd543`                      |
| Text              | `#352015`             | `#fff0d4`                      |
| Muted text        | `#725543`             | `#d3b494`                      |

The existing instrument token `--ngx-color-violet` carries gold. Light uses the public light Material adapter without glow; Dark adds a restrained orange halo. Both omit scanlines, inherit into overlays and preserve the independent Synthwave code palette. Select the root theme attribute or use the toolbar, dedicated overview stories or eleven-palette showcase cycle.
