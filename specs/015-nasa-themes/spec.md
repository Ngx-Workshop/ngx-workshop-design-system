# Feature: NASA light and dark palettes

Status: Complete
Created: 2026-10-28
Source: User request for a NASA light/dark pair.

- FR-001: Add NASA / Light (`nasa-light`): cool white surfaces, deep blue primary, red secondary and slate instruments.
- FR-002: Add NASA / Dark (`nasa-dark`): deep-space navy surfaces, readable blue/red accents and silver instruments.
- FR-003: Expose both in the real Storybook toolbar, dedicated overview stories and standalone nine-palette cycle.
- FR-004: Inherit semantic Material roles and overlays with correct native color schemes, preserving code colors, focus, reduced motion and existing palettes.

AC-001: Both palettes pass 14 semantic text/action/status pairs at 4.5:1, correct Material role/scheme and dialog/select inheritance, and 390px width checks (FR-001/002/004).
AC-002: Real manager selection and complete cycle work; overview axe has no serious/critical violations in all nine palettes (FR-003/004).
AC-003: Library/demo/Storybook builds, story types and packed Angular/Sass consumer pass (all requirements).

NASA's published legacy web palette is color inspiration: https://nasa.github.io/nasawds-site/components/colors/ (read 2026-10-28, explicitly an archived reference). Adapt colors for interface contrast, especially in dark mode. No insignia, assets, dependency changes, publishing or sibling repository work. Preserve existing uncommitted work.
