# Material catalog handoff

Status: Complete
Updated: 2026-10-25
Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md) · Tasks: [tasks.md](tasks.md)

## Delivered

36 public Material UI families (including core ripple) with 92 new component state stories and one searchable index. Together with the existing catalog there are 115 stories.
Family demos live in projects/storybook/src/material; per-component CSF files are in src/stories/material. No development demo component is exported from the shared UI library.
The coverage matrix at docs/material-coverage.md links every family and states the actual scope of its examples.
Controls expose relevant states only. Form state changes reset sample values to make invalid, empty, disabled and default specimens repeatable.
Local SVG icons are registered at Storybook bootstrap; no external icon/font dependency or network data is used.
Shared theme maps surface-variant, secondary/tertiary/inverse roles and public overlay shape/color overrides. Existing Angular/Material/CDK versions remain 21.1.0.

## Acceptance evidence

| Check                      | Result | Evidence                                                                                                                                                                                                                                                       |
| -------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-001 / inventory         | PASS   | Browser test compares installed Material public UI directories plus core ripple against component CSF files; catalog search filters 36 entries                                                                                                                 |
| AC-002 / state catalog     | PASS   | 92 new state stories; all 115 total story entries render, including browser and console error checks                                                                                                                                                           |
| AC-003 / real interactions | PASS   | Autocomplete filtering, multi select, chip addition/removal, keyboard slider; calendar/date range/time selection; nested menu and overlay results/focus; numeric table sort/filter/pagination/empty results; tree expansion, tabs and validation-gated stepper |
| AC-004 / theme             | PASS   | Public role/override Sass compiles; neutral overlay inherits tokens; accessibility checks on representative inputs/chips/buttons/table/vertical wizard/dialog in both palettes                                                                                 |
| AC-005 / builds            | PASS   | npm run verify: library, standalone showcase, story types, static Storybook, actual packed consumer; final config change rechecked with story typecheck and static build                                                                                       |
| Browser suite              | PASS   | npm test: 21 tests; all-story scan has a bounded 120-second timeout                                                                                                                                                                                            |
| Mobile                     | PASS   | Representative forms/navigation/date/table/paginator/wizard/toggle examples fit 390px; catalog desktop/mobile screenshots reviewed                                                                                                                             |
| Formatting                 | PASS   | npm run format:check                                                                                                                                                                                                                                           |

## Findings

Filled fields exposed a surface-variant role contrast problem; mapped that public role to the semantic surface and verified contrast in both palettes.
Dynamic form-field subscript sizing prevents hints/errors crowding neighboring controls. Chip input is outside its ARIA grid, matching the required row hierarchy.
Background accessibility addon scans initially raced explicit axe runs. The addon now starts in manual mode and remains available through Run accessibility scan; automated browser checks still execute axe with all rules enabled.
Actual table queries are scoped to the demo table to avoid hidden Storybook docs scaffolding.

## Limits and next action

None for the requested catalog scope. This is not every possible combination of Material inputs or a complete accessibility audit. The coverage matrix records what is demonstrated.
Examples use local data; date/time examples intentionally use October 2026. Native controls and their keyboard behavior remain owned by Material.
Known upstream Sass notices and Storybook bundle-size advisories are non-blocking. No dependencies were upgraded, no backend or deployment was added and no sibling repository was edited.
Storybook remains available on port 6006. Start with Material → Catalog → Overview.
