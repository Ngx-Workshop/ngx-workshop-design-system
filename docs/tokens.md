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
This is an initial dark-theme foundation; the neutral option is also dark. A future light theme must set its own Material color scheme and complete role mapping.

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
