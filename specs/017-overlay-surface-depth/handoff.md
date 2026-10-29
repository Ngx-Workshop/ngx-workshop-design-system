# Handoff

Status: Implemented; package release integration pending

## Changes

- Transparent CDK dismissal backdrops are excluded from all visual styling.
  Selects/menus no longer blur or dim the page, including reduced transparency
  and forced colors. Modal dialog/sheet glass is preserved.
- New `--ngx-overlay-backdrop-color` defaults to dark navy independently of the
  canvas. Existing tint/filter/fallback customization remains supported.
- New low/high/highest surface tokens map to public Material container roles.
  Outlined cards, panels and dialog/snackbar surfaces use the high level.
- All five light palettes have explicit canvas/low/base/high/highest colors.
  Teal/Reese’s primary, NASA secondary and Dawn error accents are slightly
  darker to retain readable contrast. Existing dark canvas/base colors stay.
- Story descriptions, current contracts and regression checks document the
  changed connected-overlay policy, superseding feature 007’s behavior.
- Sibling `mfe-shell-admin` shares the installed theme picker 21.0.5. Its README
  is current and a new installed-package integration spec covers all eleven
  theme variants, inherited overlay colors and initialization restoration.

## Verification

PASS: `npm run verify` (library, demo, story typecheck, static Storybook and
packed tarball compiled by an independent Angular/Sass consumer).
PASS: 20 overlay browser checks across all eleven palettes, dark light-theme
modal scrims, actual raised panel colors, native selection, nested menus,
Escape/outside-click dismissal and focus, reduced transparency and forced colors.
PASS: 11 theme browser checks (schemes, Material roles, contrast, mobile,
toolbar selection and runtime palette cycling).
PASS: 9 panel browser checks (geometry, surfaces, motion, accessibility,
responsive header and heading behavior).
PASS: shell production build; 2 shell tests against installed picker 21.0.5
and actual shell global CSS. No mocked remote/backend integration is claimed.
PASS: live Storybook select docs reproduced the original 12px blur and verified
transparent/unfiltered backdrops after the fix in Neon and Daylight.
PASS: changed-file formatting and whitespace checks.

Known nonblocking upstream Sass deprecation, Storybook bundle-size and shell
CommonJS/unused-source warnings remain. No dependencies or release behavior changed.
Tests synchronize Material menu keyboard opening/focus before Escape rather
than reopening during the previous nested menu’s focus restoration.

## Release and consumer handoff

Publish this design-system source through the normal workflow. Install the actual
new version in `mfe-shell-admin` and relevant remotes, update strict design-system
singleton requirements together, and rebuild the shell so its global Sass includes
the new rules. The shell currently uses design-system 21.0.6, so it does not yet
contain these styling fixes. The updated picker is already installed and verified;
no further picker release is needed for this work. Publishing/installing the new
design-system version was not performed in this task.
