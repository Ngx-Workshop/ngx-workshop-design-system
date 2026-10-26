# HUD visual language

Status: Complete
Created: 2026-10-25

## Problem and audience

The initial rounded mint theme is too restrained compared with the seven user-supplied references.
Developers need reusable sci-fi HUD geometry, stronger neon contrast and a denser technical catalog.

## Requirements

- FR-001: Replace the default palette with midnight navy, electric cyan, magenta/violet and signal red; preserve readable body text.
- FR-002: Apply angular frames, notched corners, thin luminous edges, grid/scanline textures and technical typography to the shared theme and components.
- FR-003: Recompose the showcase as an original system console with vector wireframe telemetry and component specimens, using references as visual direction only.
- FR-004: Keep Angular/Material/CDK versions, public component APIs, overlays, neutral theme, keyboard focus and reduced-motion behavior intact. Additive panel tone input is allowed.

## Acceptance

- AC-001: Shared panels and all existing story primitives visibly use the new tokens and geometry; local packed consumer builds.
- AC-002: Desktop and mobile screenshots show the HUD direction without horizontal overflow.
- AC-003: Clipboard, form, dialog focus and palette overlay tests pass; both palettes have no serious/critical automated axe violations on the showcase.
- AC-004: Library, standalone app, Storybook and story typecheck succeed; token docs describe the new public decoration tokens.

## Boundaries and assumptions

Blend the references rather than reproducing stock layouts or embedded text. No stock imagery, watermarks, screenshots or text from attachments are shipped.
Decorations use original CSS/SVG, stay non-interactive and hidden from assistive technology; no flashing animation.
No deployment, framework migration or Shell edits.
