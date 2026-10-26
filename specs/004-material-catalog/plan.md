# Plan

Inventory node_modules/@angular/material public UI entry points as the source for version 21.1.0.
Group standalone development-only examples into actions/indicators, forms, date/time, navigation, layout, overlays and data families.
Generate a CSF story file per component with explicit arg controls and meaningful state variants. Maintain a data-driven searchable catalog and coverage table from the same inventory.
Use public native-date providers, modern tree childrenAccessor, signals/OnPush and reactive forms where validation matters. Register a small original inline SVG icon set at Storybook bootstrap.
Map any missing overlay/container theme roles through the shared Material adapter, not private selectors.
Validate strict story types before static build; browser smoke every state; test actual selection, validation, overlays, table transformations and keyboard handling; inspect desktop/mobile and both palettes.
Constitution check: public APIs, no new dependencies, no wrapper library expansion, versions preserved. No deviations.
References: installed @angular/material/types and implementation; https://github.com/angular/components/tree/21.1.0/src/material .
