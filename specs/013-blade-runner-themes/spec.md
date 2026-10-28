# Feature: Blade Runner 2049 light and dark palettes

Status: Complete
Created: 2026-10-28
Request/source: User-provided Blade Runner 2049 poster, used only as color inspiration.

## Scope and requirements

- FR-001: Add `blade-runner-light` with pale ivory surfaces, deep teal primary, burnt orange secondary and gold instrument accents.
- FR-002: Add `blade-runner-dark` with indigo shadows, luminous teal primary, orange secondary and golden instrument accents.
- FR-003: Expose both in the Storybook toolbar, dedicated overview stories and standalone palette cycle, preserving the existing four palettes.
- FR-004: Map Material scheme and overlays through existing semantic tokens; preserve independent code styling, native control behavior, focus and reduced motion.

## Acceptance

- AC-001: Both palettes meet 4.5:1 text/action/status contrast, inherit into dialog/select overlays and fit a 390px viewport (FR-001/002/004).
- AC-002: Both can be selected in the real Storybook manager and the six-theme cycle returns to Neon (FR-003).
- AC-003: Overview axe scans have no serious/critical violations in all six palettes; library/demo/Storybook builds and packed consumer pass (all requirements).

No poster imagery, typography or characters are reproduced. No publication or sibling repository changes. Names and contrast-adjusted colors are implementation choices within the requested color-palette work. Missing/unknown theme selectors retain default Neon behavior.
