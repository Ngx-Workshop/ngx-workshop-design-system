# Handoff: Theme-aware shared background

Status: Complete
Updated: 2026-10-29

One existing `<ngx-background />` follows the selected document theme automatically. NASA Light/Dark show staggered insignias, Reese’s Light/Dark show staggered wordmarks, and all remaining palettes retain the lattice with inherited colors. `design="lattice"` optionally pins the original geometric design. Container/viewport placement, height/intensity, still/reduced motion, hidden decorative semantics, forced colors and pointer passthrough remain supported.

The component retains its nodes and geometry on theme changes. A CSS-selected pattern layer displays embedded artwork while the lattice is hidden and its traces stop animating. No theme service, observers, timers or browser globals were introduced. Brand modules now expose one shared --ngx-brand-pattern-image per mode; independent panel/page image tokens reference it. Panels preserve their existing tile sizes/opacity; pages use 216 × 360px NASA or 216 × 288px Reese’s repeats and the existing upward fade. Branded page opacity defaults to 1 because the source tile already has soft opacity; local intensity overrides still apply.

The existing showcase automatically inherits the new behavior. Foundations → Backgrounds → Theme aware → Automatic offers live toolbar switching; named theme snapshots and multiple-scene/lattice comparisons are also available. The lattice geometry lab and exported markup now explicitly use design=lattice. Consumer setup and custom theme tokens are documented in docs/backgrounds.md. No publication/deployment or sibling changes performed; existing uncommitted work preserved.

Verification:
- Final npm run verify: PASS — library, demo, story typecheck, static Storybook, packed Angular/Sass consumer including new design input and artwork tokens.
- Final background/theme/Reese’s/panel/overlay/catalog browser matrix: 70 passed in 31.0s.
- New tests verify all eleven palettes, same background/content nodes across switches, artwork identity, page/panel independence, still/reduced motion, multiple contained instances, explicit lattice, actual animations, forced colors, pointer passthrough, accessibility and desktop/mobile sizing.
- Reviewed NASA Light desktop, NASA Dark mobile, Reese’s Dark desktop and Reese’s Light desktop/mobile screenshots. All branded previews render without mobile horizontal overflow.
- Early new tests were corrected to use dedicated named previews (fixed story globals take precedence over URL globals) and poll for Storybook transition/viewport layout settlement. No product behavior was weakened; the final full matrix passes.
- git diff --check: PASS.

Nonblocking upstream Sass/Storybook warnings remain. Local preview is served at http://127.0.0.1:6007/?path=/story/foundations-backgrounds-theme-aware--automatic. Package consumers receive this implementation after a subsequent release/install.
