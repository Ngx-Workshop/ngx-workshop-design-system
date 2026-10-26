# Glass overlay backdrops and overview refresh

Status: Complete
Created: 2026-10-25

## Outcome

Use a shared frosted-glass background behind backdrop-backed overlays and refresh Workshop Frequency to demonstrate the current component system.

## Requirements and acceptance

- FR-001 / AC-001: Active CDK overlay backdrops (dialogs, bottom sheets and connected overlays that already have a backdrop) use a translucent theme tint and real blur. Keep existing backdrop click, Escape, focus and overlay stacking behavior.
- FR-002 / AC-002: Configurable tint, blur and saturation tokens; opaque fallback for unsupported blur/reduced transparency and a forced-colors fallback. Do not create backdrops for overlays that do not have one.
- FR-003 / AC-003: Workshop Frequency uses shared button variants, varied panel shapes/surfaces, highlighted Synthwave code and a clear glass-overlay preview with dialog and bottom-sheet actions.
- FR-004 / AC-004: Preserve useful overview interactions and responsive layout. Verify backdrops, dismissal/focus, theme inheritance, readable contrast, package exports and existing regression suite.

## Boundaries

Use public CDK backdrop classes and theme tokens. Do not select private Material DOM or alter overlay service defaults/focus traps. Material drawer backdrops are separate from CDK Overlay and are not restyled through private selectors.
Keep the established hero/overview story URL. No deployment or sibling changes.
