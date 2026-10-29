# Overlay backdrops and light-theme depth

Status: Implemented; package release integration pending
Created: 2026-10-28

## Outcome

Correct connected overlay blur and pale modal scrims. Give all five light
palettes distinguishable canvas, surface and elevated panel/content layers.
This supersedes feature 007’s intentional frosting of transparent backdrops.

## Requirements and acceptance

- FR-001 / AC-001: Selects and menus retain transparent, unfiltered CDK dismissal
  backdrops in every palette, including accessibility media modes. Selection,
  outside click, Escape and focus restoration continue to work.
- FR-002 / AC-002: Dialog and sheet backdrops use a dark tinted blur in light and
  dark themes; reduced transparency and unsupported blur use a dark fallback.
  Existing explicit custom backdrop tokens remain supported.
- FR-003 / AC-003: Daylight, Dawn, Teal Light, NASA Light and Reese’s Light have
  distinct canvas, base and raised surfaces. Panels and Material surface-container
  roles use that hierarchy, with readable foregrounds. Dark palettes retain their
  existing canvas/base colors and gain matching elevated roles.
- FR-004 / AC-004: Library, demo and Storybook build; focused browser regressions
  verify overlays, contrast and panels. Shell picker singleton matches installed
  21.0.5 and the installed picker selects root themes.

Public Sass overrides and CDK backdrop hooks only; preserve native Material
behavior. No new dependencies, private Material selectors or publishing changes.
