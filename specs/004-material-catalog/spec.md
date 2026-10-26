# Complete Material catalog

Status: Complete
Created: 2026-10-25

## Outcome

Expand Storybook from a few Material primitives to the public UI component families installed in Angular Material 21.1.0, styled by the shared theme, with meaningful states and working interactions.

## Requirements and acceptance

- FR-001 / AC-001: Inventory all installed public Material UI entry points (including timepicker and core ripple) and link their stories from a searchable catalog and a durable coverage matrix.
- FR-002 / AC-002: Each family has a default interactive example and applicable state stories: disabled, invalid, empty, selected, expanded or loading. Do not fabricate states irrelevant to a component.
- FR-003 / AC-003: Demonstrate actual filtering/autocomplete, editable chips, sliders, date/time overlays, menu navigation, tabs/sidenav, stepper validation, dialog/sheet/snackbar results, expandable tree, sorted/paginated/filterable table.
- FR-004 / AC-004: All examples use public Material APIs and shared theme tokens; neon/neutral work for controls and CDK overlays. Icons are local SVG, no remote font dependency. Keep Angular/Material/CDK 21.1.0 and existing library/panel behavior.
- FR-005 / AC-005: Build library, standalone showcase, story types, static Storybook and packed consumer. Load every story in a browser without errors. Exercise key interactions, both palettes and responsive layouts; check representative accessibility states.

## Boundaries

Storybook examples use local data and ephemeral state, without deployment/backends or new public wrapper controls.
`core` is represented by ripples; package helpers, date adapters, schematics and prebuilt themes are not independent UI components.
The coverage matrix states what each example verifies rather than claiming every conceivable Material configuration or a full accessibility audit.
