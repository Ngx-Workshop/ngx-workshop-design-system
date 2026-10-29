# Theme-aware backgrounds

Import `NgxBackground` from `@tmdjr/ngx-workshop-design-system` and add it to your standalone component imports. Include the shared theme as usual.

```html
<section class="scene">
  <ngx-background />
  <h1>Your next workshop</h1>
</section>
```

```scss
.scene {
  position: relative;
  isolation: isolate;
  min-height: 600px;
}
```

The transparent field is absolutely positioned behind the section content. `isolation: isolate` keeps its negative stacking order above the parent's background. For a screen background, put the component inside the application's isolated root and set `placement="viewport"`. Avoid transformed ancestors for fixed placement. Opaque content surfaces cover the field naturally.

The default `design="theme"` follows `data-ngx-theme` automatically. No theme input, service, browser observer or consumer switch statement is needed:

| Selected theme | Background design |
| --- | --- |
| NASA Light / Dark | Staggered NASA insignias |
| Reese’s Light / Dark | Staggered Reese’s wordmarks |
| Neon, Neutral, Daylight, Amber Dawn/Dusk, Teal Light/Dark | Existing animated rhombus lattice using that palette |

Change the theme attribute on `<html>` using your existing picker. The same background instance and page content remain in place. Brand artwork is bundled with the shared theme and has no runtime network dependency. Pattern designs use a larger repeat than the panel patterns and keep the bottom fade; they do not display the lattice or run its trace animations. The standalone showcase already uses this component and inherits the automatic behavior.

To keep the geometric design in every palette, use `<ngx-background design="lattice" />`. Its colors still inherit the selected theme. The existing lattice study/copy controls explicitly select this mode; automatic examples live under **Foundations → Backgrounds → Theme aware**.

In lattice mode, a single lattice of rhombi fades upward from the bottom. Quiet base outlines support traveling traces cycling through `--ngx-color-primary`, `--ngx-color-violet`, `--ngx-color-secondary` and `--ngx-color-danger`. Colors inherit live, including Neutral mode. Lattice geometry needs no assets, timers or global SVG IDs; branded SVG IDs are scoped inside embedded image resources. Multiple instances are independent.

| Input       | Default       | Behavior                                   |
| ----------- | ------------- | ------------------------------------------ |
| `design` | `'theme'` | Automatically select artwork, or use `'lattice'` in every theme |
| `animated`  | `true`        | Set `[animated]="false"` for a still field |
| `placement` | `'container'` | `'container'` or fixed `'viewport'`        |

## Geometry controls

The geometry inputs apply to the lattice design and update reactively. Omit them to keep the original composition. Use `design="lattice"` when exporting or tuning geometry that must remain visible in branded themes.

```html
<ngx-background design="lattice" [size]="420" [aspectRatio]="0.65" [spacing]="1.15" />
```

| Input         | Default     | Range and meaning                                               |
| ------------- | ----------- | --------------------------------------------------------------- |
| `size`        | `360`       | 180–720; root rhombus width in the 1440-unit SVG canvas         |
| `aspectRatio` | `104 / 180` | 0.3–1; height divided by width, with 1 giving square diamonds   |
| `spacing`     | `1`         | 0.75–1.75; root spacing multiplier, smaller values overlap more |

Values clamp to these bounds and non-finite values use defaults. Patterns remain bottom anchored; SVG scales/crops to its field, so size is a design-space measure rather than a fixed screen-pixel width. Geometry recomputes only when these inputs change. Opacity, speed and motion changes retain geometry.

The fullscreen Storybook study includes keyboard-accessible live sliders and Reset, which restores the selected story’s geometry and the default intensity, timings, widths and theme colors. Storybook Controls also set these inputs. Explore Open Lattice, Dense Lattice and Square Diamonds as starting points.

| CSS custom property         | Default            | Purpose                                                             |
| --------------------------- | ------------------ | ------------------------------------------------------------------- |
| `--ngx-background-height`   | `min(85vh, 900px)` | Height of the field from the bottom; use `100%` in compact sections |
| `--ngx-background-opacity`  | `0.48`             | Overall decorative intensity, from 0 to 1; branded themes default to 1 because artwork already includes soft opacity                           |
| `--ngx-background-duration` | `28s`              | Backward-compatible fallback duration for both cycles               |

`--ngx-background-line-width` (default `0.6px`) and `--ngx-background-trace-width` (default `1px`) adjust the quiet outlines and animated traces independently. Widths remain constant while SVG scales.

The initial field eases upward over 2.4 seconds in both designs. Branded patterns remain still after the entrance. Reduced motion removes all animations immediately, including on a live preference change; a static trace in the second palette color remains. The component is hidden from assistive technology, contains no focus targets, ignores pointer input and is suppressed in forced-colors mode. Consumers offering continuous motion should expose a pause control or use the still input. Storybook's fullscreen study includes a pause control.

## Outline colors, timing and thickness

Override these properties on `ngx-background` or its containing scene. Overrides do not alter the application’s theme.

```scss
.scene {
  --ngx-background-color-1: #27f5ef;
  --ngx-background-color-2: #aa8cff;
  --ngx-background-color-3: #ff52c6;
  --ngx-background-color-4: #ff3e68;
  --ngx-background-flow-duration: 12s;
  --ngx-background-color-duration: 45s;
  --ngx-background-line-width: 0.8px;
  --ngx-background-trace-width: 1.6px;
}
```

The four colors default to the primary, violet, secondary and danger theme tokens respectively. Any CSS color value is supported. The base outline uses color 1; still and reduced-motion traces use color 2. The palette cycles through all four colors; choosing the same color for every stop gives a single-color treatment. The ambient background glow continues to follow the theme primary.

`--ngx-background-flow-duration` controls travel along the outline. `--ngx-background-color-duration` controls one complete four-color cycle. Each defaults independently to `--ngx-background-duration`, then `28s`; set positive durations. Larger durations mean slower animation. Line and trace widths accept CSS lengths and remain visually constant as the SVG scales.

The live lab has four color pickers, separate Pattern cycle and Color cycle sliders, Outline thickness and Trace thickness sliders, and Rotation. Editing a picker activates the displayed custom palette. **Use theme colors** restores inherited theme colors; Reset restores all settings for the selected story. Custom colors continue to apply when paused or reduced motion is enabled.

## Rotation

`[rotation]="30"` rotates each rhombus clockwise by 30 degrees around its root center while keeping the lattice positions and bottom fade anchored. Default: `0`. Negative and multiple-turn angles normalize modulo 360; non-finite values fall back to zero. This is an orientation setting, not another animation. The Rotated story provides an example.

## Trace length and randomized starts

`--ngx-background-trace-length` sets a fixed visible dash length (unitless), overriding the default 40–160 random range when explicit range endpoints are omitted. The length is clamped to 1–719 inside a fixed 720-unit dash cycle, so changing length preserves travel speed and seamless looping. The lab min/max sliders cover 5–360. Use a smaller value for short sparks or a larger value for long moving edges.

`--ngx-background-trace-delay` sets the maximum randomized start delay (default `8s`; use a non-negative duration). The lattice splits its outlines into eight trace groups. One group starts immediately and the others wait a seeded fraction of this maximum, remaining hidden until they start. After starting, traces loop continuously. Set `0s` for synchronized starts. Palette transitions retain their independent timing.

```html
<ngx-background [traceSeed]="42" />
```

```scss
.scene {
  --ngx-background-trace-length: 120;
  --ngx-background-trace-delay: 12s;
}
```

`traceSeed` (default `1`) provides reproducible variation. Change it to reshuffle delay assignments without rebuilding the geometry; non-finite values fall back to 1 and seeds use 32-bit integer hashing. The live **Reshuffle traces** button changes the seed for lengths and delays. Length range and delay sliders are included in Reset. One structure path and eight trace groups bound animation work regardless of lattice density. Still/reduced-motion traces appear immediately, regardless of delay.

## Random length ranges and copying configuration

Set `--ngx-background-trace-min-length` and `--ngx-background-trace-max-length` to give each trace group a reproducible random length. Both accept unitless numbers; values normalize to 1–719, reversed endpoints are sorted, and equal endpoints produce a fixed length. Each endpoint falls back to an explicitly set `--ngx-background-trace-length` when omitted, preserving fixed-length consumers. Otherwise minimum defaults to `40` and maximum to `160`.

```scss
.scene {
  --ngx-background-trace-min-length: 40;
  --ngx-background-trace-max-length: 160;
}
```

The lab starts with this 40–160 range. Minimum and maximum sliders move the other endpoint when needed to keep the range valid. **Reshuffle traces** changes both lengths and delays using the shared `traceSeed`, without rebuilding geometry. Length variation remains independent of travel speed and palette timing.

**Copy background configuration** copies the current Angular markup and scoped CSS, with import and theme setup guidance. Paste the labeled sections into your component template and stylesheet and add `NgxBackground` to its standalone imports. Install the design-system package and matching Angular/Material dependencies first. Export includes full-precision geometry, placement, seed, paused state, trace range, delay spread, widths, intensity, both durations and any custom palette. Theme mode exports inherited colors so it adapts to the destination app’s theme. The copied geometry and seed reproduce the configuration; the animation restarts in the destination rather than transferring its current elapsed time.

A successful copy is announced beside the button; editing the configuration clears that success state. **View configuration** always exposes selectable source, including when clipboard access fails.

## Performance and migration

The background renders a single lattice with no recursive children. The default geometry contains 24 rhombi and eight moving trace paths, with all child geometry removed. At most 17 CSS animations run including the initial entrance (16 after it completes). These are rendering-work counts, not a measured frame-rate guarantee.

The `depth` and `childScale` inputs have been removed. Remove them from previously copied templates; new exports omit both. The lab no longer offers recursion or child-scale controls. All other styling, randomized traces, rotation, copy/export and reduced-motion behavior remain available. The existing RhombusFractal story URL is retained for saved links and now displays **Rhombus lattice**.

## Theme artwork tokens

Theme artwork uses separate semantic tokens from panels:

| Token | Default / behavior |
| --- | --- |
| `--ngx-brand-pattern-image` | Shared embedded source image; `none` in unbranded themes |
| `--ngx-background-pattern-image` | Page image; branded themes reference the shared image |
| `--ngx-background-pattern-size` | NASA `216px 360px`, Reese’s `216px 288px` |
| `--ngx-background-pattern-display` | `block` in branded themes, `none` otherwise |
| `--ngx-background-lattice-display` | `none` in branded themes, `block` otherwise |

Custom themes can provide another embedded image and set the two display tokens to select it. Page image/size and panel image/size are independent; overriding `--ngx-panel-grid-image` never removes the page artwork. A local `--ngx-background-opacity` or `--ngx-background-height` still takes precedence over theme defaults. Font, color and image selection are scoped by the current root theme. Pattern/still/reduced-motion modes do not run hidden trace animations; forced colors suppress all decorative backgrounds.
