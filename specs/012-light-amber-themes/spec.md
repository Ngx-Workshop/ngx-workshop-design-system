# Feature: Light and Amber themes

Status: Complete
Feature ID: 012-light-amber-themes
Created: 2026-10-28
Updated: 2026-10-28
Request/source: Add a light theme and a palette inspired by the attached amber city screenshot.

## Problem and scope

Consumers currently have Neon and Neutral dark themes. Add Daylight with pale surfaces and readable deep cyan/magenta accents, and Dusk with charcoal/olive surfaces, amber primary and sage secondary. Preserve the default Neon theme and existing Neutral selector. The image is color inspiration only; no image asset is shipped. Publishing and changes to sibling consumers are out of scope.

## Functional requirements

- FR-001: `data-ngx-theme="light"` selects a light document and Material color scheme with readable text, actions, statuses and overlays.
- FR-002: `data-ngx-theme="amber"` selects a dark amber/olive/charcoal palette with paired action foregrounds.
- FR-003: Both themes are selectable in Storybook and the standalone showcase; returning to existing palettes restores their colors.
- FR-004: Semantic Material roles inherit the palette, including errors, disabled controls, fixed roles and overlay content. The independent Synthwave code palette stays dark.

## Acceptance scenarios

- AC-001 (FR-001/002/004): Select each new theme; page, native controls, Material controls, dialog and select overlay inherit the intended colors and scheme.
- AC-002 (FR-003): Select all four palettes in the toolbar and cycle through all four in the showcase, returning to Neon.
- AC-003 (FR-001/002): Text/action/status token pairs meet WCAG AA 4.5:1; overview has no serious/critical axe violations in either new palette, and mobile content fits.

## Quality and boundaries

Keep Angular/Material 21.1.0 and public Sass overrides. No private DOM styling or component API changes. Theme scope is the document root. Unknown/missing selectors retain Neon. Local builds, packed consumer and browser tests define completion; deployment is separate. No data migration or external dependency is needed.

## Assumptions

Names are Light / Daylight and Amber / Dusk. Colors interpret the screenshot rather than reproduce its low-contrast photographic shadows. Existing uncommitted background work must be preserved.
