# Theme contract

Include `@use '@tmdjr/ngx-workshop-design-system/theme' as ngx; @include ngx.theme();` once in global Sass.
The default HUD palette uses electric cyan (#27f5ef), magenta (#ff52c6), violet (#aa8cff), signal red (#ff3e68) and midnight navy surfaces. Set `data-ngx-theme="neutral"` on `<html>` for the minimal palette.
Use the document root so dialogs, selects and other CDK overlays inherit tokens.

| Token                                    | Purpose                                      |
| ---------------------------------------- | -------------------------------------------- |
| --ngx-color-canvas / surface             | Page and elevated surfaces                   |
| --ngx-color-surface-low / high / highest | Recessed and elevated surface layers         |
| --ngx-color-text / muted                 | Body and supporting text                     |
| --ngx-color-primary / on-primary         | Primary actions and readable foreground      |
| --ngx-color-secondary / on-secondary     | Secondary accent and foreground              |
| --ngx-color-border                       | Surface outlines                             |
| --ngx-color-success / warning / error    | Status labels                                |
| --ngx-font-heading / body / mono / label           | Theme headings/body, coder text, small labels        |
| --ngx-space-2 / 4 / 6                    | 8px, 16px, 24px spacing                      |
| --ngx-radius                             | Shared 2px control radius                    |
| --ngx-glow                               | Restrained decorative halo; none for neutral |

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
| `nasa-dark`         | NASA / Dark       | Dark   | Near-black, light blue, red, silver                     |
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
| Canvas             | `#eee1cf` | `#0d1024` |
| Surface            | `#fffcf5` | `#191e35` |
| Primary / teal     | `#006e70` | `#24d6ce` |
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
| Canvas              | `#eee2cd`    | `#12140f`   |
| Surface             | `#f7efdf`    | `#22251d`   |
| Primary / amber     | `#8a5200`    | `#ffb547`   |
| Secondary / olive   | `#52643d`    | `#b8c49a`   |
| Text                | `#30291c`    | `#f5edda`   |
| Muted text          | `#665b45`    | `#bebba5`   |
| Danger / terracotta | `#b43920`    | `#ff794f`   |

Dawn uses Material's light scheme without glow or scanlines. The renamed Teal pair uses `teal-light` and `teal-dark`; replace the previous film-based selectors in local consumers.

## NASA pair

NASA / Light (`nasa-light`) and NASA / Dark (`nasa-dark`) follow the [NASA digital brand guidelines](https://www.nasa.gov/nasa-brand-center/brand-guidelines/). The insignia chart specifies blue `#0032a0` and red `#e4002b`, exposed as `--ngx-nasa-blue` and `--ngx-nasa-red`. Semantic accents use readable shades where needed.

| Role | Light | Dark |
| --- | --- | --- |
| Canvas | `#e8edf5` | `#000000` |
| Surface | `#f4f6fa` | `#10131a` |
| Primary | `#0032a0` | `#92b9ff` |
| Secondary | `#c90026` | `#ff8a9f` |
| Text | `#161b22` | `#f6f8fc` |
| Muted | `#505c6c` | `#b4c3d6` |

`--ngx-font-heading` selects Inter, `--ngx-font-body` Public Sans, and `--ngx-font-mono` DM Mono. Material typography and overlays inherit these semantic font families. Other themes retain their original typography. Bundled Latin WOFF2 fonts use system fallbacks for other scripts and require no asset setup or external requests. Code retains its independent Synthwave palette and font.

`--ngx-panel-grid-image` supplies the soft repeated full-color insignia on grid panels only (144 × 240px tiles, with 120px row pitch and alternating rows offset 72px). Override it with `none` to disable the artwork. `--ngx-panel-grid-size` controls tile size; `--ngx-panel-grid-color: transparent` hides grid lines in both NASA palettes. NASA Light uses `--ngx-panel-glass-opacity: 45%` to reveal its blurred backdrop; Dark retains 65%. No glow or scanlines are used. Compare both palettes and all surfaces in **Foundations → NASA**. Asset sources and licenses ship in `styles/NASA-ASSETS.md` and the adjacent OFL files.

## Reese’s pair

Reese’s / Light (`reeses-light`) and Reese’s / Dark (`reeses-dark`) use the user-provided orange `#ff5d00`, yellow `#ffc000` and chocolate `#2f1c0b` references. These exact colors are available as `--ngx-reeses-orange`, `--ngx-reeses-yellow` and `--ngx-reeses-chocolate`. Semantic interface colors are chosen for readable contrast on each surface.

| Role | Light | Dark |
| --- | --- | --- |
| Canvas | `#f5e4cb` | `#1a0f06` |
| Surface | `#fff0d9` | `#2f1c0b` |
| Primary / orange | `#a83e00` | `#ff5d00` |
| Secondary | `#2f1c0b` (chocolate) | `#ffc000` (yellow) |
| Instrument / gold | `#8a5a00` | `#ffc000` |
| Text | `#2f1c0b` | `#fff0d4` |
| Muted text | `#725543` | `#d3b494` |

Both themes keep the existing system typography and omit glow/scanlines. NASA font families do not persist when switching to Reese’s. Material controls and overlays inherit the semantic palette; code retains its independent Synthwave palette/font.

Grid panels use an embedded source wordmark from [Hersheyland’s Reese’s page](https://www.hersheyland.com/reeses), with visible grid lines hidden. Tiles measure 144 × 192px, with a 96px row pitch and alternate rows shifted 72px; wordmarks measure 108 × 45.2px. Opacity is 22% in light mode and 14% in dark mode. Source lettering/colors/proportions are preserved. The optional `--ngx-panel-grid-image`, `--ngx-panel-grid-color` and `--ngx-panel-grid-size` tokens control the decoration; set the image to `none` to disable it. Solid/glass panels omit the artwork. Light glass uses a 45% surface fill and dark glass retains 65%.

Compare both palettes and all three surfaces under **Foundations → Reese’s**. Source attribution ships in `styles/REESES-ASSETS.md`; no runtime asset downloads or consumer asset-copy configuration are required.

## Surface elevation

Canvas is the page foundation; surface is the base workspace; low, high and
highest provide recessed and raised layers. `NgxPanel` and outlined Material
cards use `--ngx-color-surface-high`. Material’s public surface-container roles
map to the corresponding semantic tokens, so menus, selects, dialogs, sheets
and nested controls keep distinguishable layers. Foreground content retains the
active light/dark theme; only modal backdrops use the independent dark scrim.

| Light theme | Canvas    | Low       | Surface   | High (panel) | Highest   |
| ----------- | --------- | --------- | --------- | ------------ | --------- |
| Daylight    | `#e0e7ef` | `#e6edf4` | `#edf2f7` | `#f7f9fc`    | `#ffffff` |
| Dawn        | `#eee2cd` | `#f2e8d6` | `#f7efdf` | `#fcf7ec`    | `#fffdf6` |
| Teal        | `#eee1cf` | `#f2e7d7` | `#f7eddf` | `#fcf6ec`    | `#fffcf5` |
| NASA        | `#e8edf5` | `#eef1f7` | `#f4f6fa` | `#fafbfe`    | `#ffffff` |
| Reese’s     | `#f5e4cb` | `#faead2` | `#fff0d9` | `#fff7e9`    | `#fffcf4` |

NASA Dark defines explicit low/high/highest steps (`#090c12`, `#1b202a`, `#272e3b`). Reese’s Dark defines chocolate low/high/highest steps (`#241507`, `#3b2614`, `#48311d`). Other dark palettes keep their canvas/base colors and derive low/high/highest by
mixing the palette’s canvas or text into its base surface. Custom themes can
override all three elevation tokens. Teal/Reese’s primary, NASA secondary and
Dawn error accents have been darkened slightly to retain AA contrast on the
deeper light canvases. See [overlay behavior](overlays.md) for scrim tokens.

## Automatic page backgrounds

`<ngx-background />` uses the current theme’s artwork without a consumer theme binding. NASA/Reese’s modules share `--ngx-brand-pattern-image` through independent `--ngx-panel-grid-image` and `--ngx-background-pattern-image` tokens. Page pattern size/display and lattice display tokens select the design; other themes reset to the lattice. See [backgrounds](backgrounds.md) for controls, placement and the `design="lattice"` override.
