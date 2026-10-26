# Glass overlay/overview handoff

Status: Complete
Updated: 2026-10-25
Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md) · Tasks: [tasks.md](tasks.md)

## Delivered

Shared CDK overlay backdrops now use a 55% theme canvas tint, 12px blur and 120% saturation. Active transparent light-dismiss backdrops are visibly frosted as well. No new backdrop or interaction layer is introduced.
Packaged overlay-styles() is exported and included in theme(); configurable tint/blur/saturation/fallback tokens follow the document palette. Unsupported blur/reduced transparency uses an opaque fallback; forced colors uses system Canvas.
Workshop Frequency now uses NgxButton variants in hero/actions, varied panel shapes/backgrounds, highlighted Synthwave TypeScript and a glass/solid/grid surface selector. Its glass scene opens actual dialog/share-sheet previews with feedback and native focus restoration. Inert placeholder actions were replaced with working share/navigation actions.
Overview story URL and established hero remain stable. Updated screenshots replace the README preview and are saved in docs/images/.

## Verification

| Acceptance/check      | Result | Evidence                                                                                                                                              |
| --------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-001 / backdrops    | PASS   | Browser verifies actual blur/saturation, visible opacity and tint for dialog, bottom sheet and select backdrops                                       |
| AC-001 / interactions | PASS   | Escape, backdrop click, sheet result, select choice and native focus restoration                                                                      |
| AC-002 / fallback     | PASS   | Chromium reduced-transparency emulation produces opaque canvas and no blur                                                                            |
| AC-003 / overview     | PASS   | Surface switch, varied shapes, shared hero button and syntax classes verified; desktop/mobile screenshots inspected                                   |
| AC-004 / builds       | PASS   | npm run verify: library, standalone app, story types, static Storybook and actual packed Angular/Sass consumer; packed glass style rules are asserted |
| Accessibility/theme   | PASS   | Existing overview and representative Material/readable-code checks pass in Neon and Neutral; connected glass backdrops checked in both                |
| Browser regression    | PASS   | npm test: 38 tests passed, including all 138 stories                                                                                                  |
| Formatting            | PASS   | npm run format:check                                                                                                                                  |

A snippet-edit regression test exposed a pre-existing ngModel write timing race in its automation: it now waits for the selected sample to be visible in the textarea before replacing it. No snippet implementation change was needed.

## Limits and next action

None for this scope. Material drawer/sidenav backdrops are not CDK Overlay elements and are not selected through private Material classes. Tooltips/snackbars without backdrops do not gain one.
Unsupported-browser and forced-colors fallbacks are implemented; reduced transparency was exercised in Chromium, not a separate legacy browser.
Foreground overlay surfaces remain opaque/readable; glass applies to the backdrop behind them. Existing CDK stacking, focus and pointer handling remain intact.
No dependencies/versions, deployment or sibling repositories changed. Known upstream Sass and Storybook bundle-size advisories remain non-blocking.
Next: explore the refreshed Workshop Frequency overview or tune root overlay tokens in docs/overlays.md.
