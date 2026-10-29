# Rhombus fractal background

Status: Complete
Created: 2026-10-28
Request: A quadrilateral rhombus fractal rising softly from the screen bottom, with palette color animating through outlines.

## Outcome and scope

A reusable decorative background for Angular consumers, shown in the standalone showcase and dedicated Storybook stories. No external assets, services or deployment changes.

- FR-001: Recursively repeated rhombus outlines concentrate at the bottom and fade into transparent space above.
- FR-002: Slow continuous traces travel along outlines through semantic primary, secondary, violet and danger colors; palette changes apply live.
- FR-003: Decoration cannot intercept interaction, enter keyboard navigation, cause horizontal overflow or add screen-reader content.
- FR-004: Reduced motion and an explicit animated=false input produce a static readable composition.
- FR-005: Consumers can use the background in a positioned section or opt into viewport placement, with CSS controls for opacity, height and duration.

## Acceptance

- AC-001: Fullscreen preview and showcase display a responsive bottom-anchored fractal behind usable content (FR-001, FR-003, FR-005).
- AC-002: Traces animate along edges and inherit palette changes without recreating geometry (FR-002).
- AC-003: Reduced-motion, still stories and runtime preference changes stop all decorative animations (FR-004).

Assumption: Start with one carefully composed rhombus pattern rather than a general shape API. Host applications adopt the published component independently; local catalog delivery is the acceptance scope.

Success: library, demo, story types, static Storybook and package consumer build; browser checks cover the acceptance scenarios and visual inspection includes desktop/mobile.

## Configuration extension — 2026-10-28

- FR-006: Public reactive inputs configure root width, height/width ratio, recursion levels, root spacing and child scale. Defaults retain the original composition. Bound computation for invalid, fractional, non-finite and extreme values.
- FR-007: Storybook exposes live geometry controls, opacity and animation duration, with reset and distinct example presets. Existing placement, still mode and reduced motion remain effective.
- AC-004: Changing controls updates the existing SVG without recreating the background or content. Reset restores defaults; extreme/invalid configuration remains finite and bounded. Both shallow and deep patterns render on mobile.

## Outline styling extension — 2026-10-28

- FR-008: Four configurable outline palette stops inherit theme defaults. Base outlines use the first color; still/reduced-motion traces use the second. Changes remain local to the background.
- FR-009: Outline travel and palette transitions have independent durations; existing duration token remains a shared fallback.
- FR-010: Configure base/trace thickness and motif rotation, with live preview controls and reset. Rotation preserves recursive structure and lattice positions.
- AC-005: Color pickers update real strokes, both duration controls affect only their respective animation, and width/rotation update live. Reset restores theme inheritance, timings, widths and original rotation. Reduced motion uses the chosen still color and disables all motion.

## Trace staggering extension — 2026-10-28

- FR-011: Independently stagger outline trace groups with reproducible randomized start delays, adjustable maximum delay and a reshuffle seed. At least one group starts immediately; delayed traces remain hidden until starting. Color cycle timing remains independent.
- FR-012: Configure the visible moving trace length separately from its travel speed. Maintain seamless looping and bounded rendering complexity.
- AC-006: Live controls change delay spread and trace length; reshuffle changes delays without changing geometry. Zero spread synchronizes starts. Reset restores defaults. Still/reduced-motion modes show traces immediately without animation.

## Random lengths and configuration export — 2026-10-28

- FR-013: Reproducible random trace lengths between configurable minimum/maximum values; handle reversed/equal bounds and preserve legacy fixed-length styling. Seed/length changes do not rebuild geometry.
- FR-014: Copy the complete current configuration as reusable Angular markup, import/setup guidance and scoped CSS. Preserve geometry, seed, placement, pause state, palette mode and styling. Show success/failure and selectable source fallback.
- AC-007: Random lengths stay in range, reshuffle reproducibly and reset; fixed/equal/reversed bounds remain valid. Copy reflects edited values, including seed, both speeds, colors and range. Clipboard content can reproduce the preview in a consumer; copying failure leaves selectable source available.

## Remove recursion — 2026-10-28

User supersedes the fractal requirement due to performance. FR-001/FR-006 recursive behavior and depth/childScale configuration are retired.

- FR-015: Render only a single rhombus lattice, with no child geometry or recursive controls/API. Preserve other styling, rotation, random traces and configuration copy.
- AC-008: Default renders 24 rhombi in one structure path plus eight trace groups, bounded to 17 active CSS animations including entrance. Export and stories contain no depth/childScale inputs. Dense/mobile layouts and all retained controls still work.

## Branding lattice defaults — 2026-10-29

- FR-016 / AC-009: Default lattice uses size 360, aspect ratio 0.58, spacing 1, rotation 60°, seed 1, animated container placement, 40–165 trace lengths and zero start delay. Preserve height min(85vh, 900px), opacity 0.48, both 28s cycles, 0.6px outlines, 1px traces and inherited theme colors. Component fallbacks, lab initialization/reset, stories and exported configuration agree. Automatic theme artwork selection remains unchanged.
