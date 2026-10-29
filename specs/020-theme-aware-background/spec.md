# Theme-aware shared background

Status: Complete
Created: 2026-10-29

One existing `<ngx-background />` automatically changes its artwork when the document theme changes. No consumer theme switch statements or replacement components are needed.

- FR-001 / AC-001: Default design follows the selected theme live: NASA light/dark show staggered insignias; Reese’s light/dark show staggered wordmarks; Neon/Neutral/Daylight/Amber/Teal show the existing lattice in their semantic colors. Theme switches retain the component and projected page content.
- FR-002 / AC-002: Reuse bundled brand artwork independently of panel-specific overrides. Pattern backgrounds do not include lattice outlines/traces. Switching back restores lattice behavior. No runtime downloads, observers, timers or theme-service dependencies.
- FR-003 / AC-003: Preserve container/viewport placement, intensity/height customization, explicit still mode, reduced motion, forced colors, pointer passthrough and hidden decorative semantics. Add an optional design=lattice escape hatch for consumers who need the existing geometric background in every theme.
- FR-004 / AC-004: Add automatic light/dark previews and docs with minimal consumer markup; validate theme cycling, multiple instances, responsive layout, accessibility, independent panel styling, package consumption and required builds.

Assumption: “selected team” means selected theme. Branded designs currently apply to NASA/Reese’s; remaining palettes retain the established lattice. Existing uncommitted work is preserved. No deployment or sibling-repository work.
