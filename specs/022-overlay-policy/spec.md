# Shared overlay styling policy

Status: Implemented locally; publication and consumer adoption deferred
Created: 2026-10-31

## Problem and scope

Migrated apps duplicate detached-overlay typography and scoped glass backdrops.
Three orchestrator form components also repeat final-frame retention for Material
select closing. Centralize these visual policies in the packaged Sass theme.
Publication and MFE/shell adoption happen after this producer work.

## Functional requirements and acceptance

- FR-001 / AC-001: Public overlay-policy() supplies the shared portal class text/font
  and inherits the document color scheme. Marked dialog/select/menu/sheet/tooltip/
  snackbar content works outside component DOM in light and dark themes, without
  regenerating a dark Material adapter or replacing Material surfaces.
- FR-002 / AC-002: Shared scoped backdrop treatment uses existing semantic tokens,
  opaque reduced-transparency fallback and forced-color system colors. Transparent
  dismissal backdrops remain transparent/unfiltered even when also marked.
- FR-003 / AC-003: Selects opt in through public panelClass ngx-select-panel. Selection,
  outside click and Escape retain the transparent final fade frame until Material
  detaches the panel. Reopening is visible; form values, focus and keyboard behavior
  remain native. Unmarked selects and unrelated overlay animations are unaffected.
- FR-004 / AC-004: theme() includes the additive policy; custom themes can import
  overlay-policy() alone. Packed Sass consumer compiles these exports. Storybook and
  browser regressions exercise real animations and accessibility preferences.

## Quality and boundaries

Use only consumer-owned classes and public CDK hooks. No private Material selectors,
DOM traversal, new control wrappers, animation keyframes, timers or JS listeners.
Existing overlay-styles() remains compatible. Theme selection/tokens belong on the
document root so detached portals inherit them. No app source, package version,
publication, deployment or live data change is included.
