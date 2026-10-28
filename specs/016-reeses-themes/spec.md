# Feature: Reese’s light and dark themes

Status: Complete
Created: 2026-10-28
Source: User request for a Reese’s peanut butter cups light/dark pair.

- FR-001: Reese’s / Light (`reeses-light`) uses cream surfaces, orange primary, chocolate secondary and peanut-butter/gold instrument accents.
- FR-002: Reese’s / Dark (`reeses-dark`) uses chocolate surfaces, vivid orange, peanut-butter gold and cream text.
- FR-003: Register both in Storybook’s toolbar, dedicated overview stories and the eleven-palette showcase cycle; preserve all existing themes.
- FR-004: Preserve semantic Material roles, correct schemes, overlay inheritance, focus/reduced motion and independent code colors.

AC-001: Both palettes pass 14 text/action/status contrast pairs at 4.5:1, Material schemes/roles and dialog/select inheritance; mobile fits 390px (FR-001/002/004).
AC-002: Real toolbar selection and complete cycle work; no serious/critical overview axe violations across all eleven palettes (FR-003/004).
AC-003: Library/demo/Storybook, story types and packed Angular/Sass consumer build successfully (all requirements).

Color inspiration: https://www.hersheyland.com/reeses (official product page, found 2026-10-28). Colors are an interface interpretation adjusted for contrast, not claimed exact brand specifications. No logos, wrapper assets, publication or sibling repository changes. Preserve uncommitted work.
