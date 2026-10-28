# Entrance motion and Material policy

`NgxEntrance` is an exported standalone directive for one-shot entrance motion on
an existing block element or component. Import it in the consuming component.
It does not recreate content or replay when input data changes.

```html
<ngx-panel heading="Catalog" ngxEntrance="fade">...</ngx-panel>
<section ngxEntrance="grow" [entranceDelay]="280" [entranceDuration]="420">
  <div ngxEntrance="fade" [entranceDelay]="820" [entranceDuration]="220">
    <!-- Existing form controls -->
  </div>
</section>
```

| Input | Default | Meaning |
| --- | --- | --- |
| `ngxEntrance` | `fade` | Opacity fade or measured intrinsic-height `grow` |
| `entranceDelay` | `0` | Delay in milliseconds |
| `entranceDuration` | `240` | Duration in milliseconds |
| `entranceFromHeight` | `150` | Starting height in pixels for growth |

Use a block host for growth. Content must have its initial layout when rendered;
use this for short introductions, not ongoing async height transitions. Consumers
choose timing, row stagger and delay caps. Avoid applying another height/opacity
animation (including NgxPanel lifecycle motion) to the same host.

Growth temporarily clips overflow, then restores the prior inline overflow and
natural sizing. Resize, focus entering the host, reduced-motion preference changes
and destruction cancel animations and remove listeners. An initially focused host
or reduced-motion preference skips animation. Missing Web Animations support leaves
content visible. No form nodes or domain state are recreated.

Explore **Components → Entrance → Staged** in Storybook.

## Public Material Sass policy

```scss
@use '@tmdjr/ngx-workshop-design-system/theme' as ngx;
:host { @include ngx.expansion-theme(); }
.warning-toggle { @include ngx.warning-slide-toggle(); }
```

These opt-in mixins emit only public Material overrides. `expansion-theme()` owns
accordion surfaces, typography, shape, elevation, header heights and hover/focus
colors. `warning-slide-toggle()` gives selected toggle track/icon/state layers the
semantic warning color and selected handles the canvas color. Disabled/unchecked
behavior remains Material's. Layout, borders on consumer-owned containers, labels,
form state and event handling remain with the consumer.

Include at a component scope when overlays or mixed migrated/legacy remotes need
local policy. Semantic Ngx tokens must be supplied by the host theme. This avoids
requiring a global shell stylesheet change merely to adopt these mixins.
