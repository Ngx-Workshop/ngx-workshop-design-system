# Feature: Teal naming and Amber Dawn

Status: Complete
Created: 2026-10-28
Source: Rename the film-named theme to a color and add a light counterpart to Amber / Dusk.

- FR-001: Rename the pair to Teal / Light and Teal / Dark, with selectors `teal-light` and `teal-dark`, story names, toolbar choices and current documentation aligned. Preserve their palettes.
- FR-002: Add Amber / Dawn (`amber-light`) with warm ivory surfaces, amber primary, olive secondary and terracotta alerts, using the public light Material adapter. Preserve existing Amber / Dusk (`amber`).
- FR-003: Expose all seven palettes through toolbar and showcase cycling; keep overlay inheritance, focus and code behavior.

AC-001: Both renamed palettes and Dawn select correctly, with correct Material scheme and inherited dialog/select colors (FR-001/002/003).
AC-002: Dawn text/action/status pairs meet 4.5:1, overview axe has no serious/critical violations and mobile fits at 390px (FR-002).
AC-003: Library/demo/Storybook and packed consumer build; full seven-theme cycle and manager choices work (all requirements).

No release/deployment or sibling changes. Old names are replaced in this unpublished local feature; earlier spec folders retain historical evidence with a superseding note. Preserve existing uncommitted work.
