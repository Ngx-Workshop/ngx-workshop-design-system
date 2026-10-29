# Plan

1. Exclude the public transparent CDK backdrop hook from all visual backdrop
   rules. Remove the override that forced its opacity to one (FR-001).
2. Decouple scrim color from canvas with a semantic dark backdrop color (FR-002).
3. Add low/high/highest semantic surface tokens and five light hierarchies; map
   public Material roles/card/dialog overrides and panel surfaces to them (FR-003).
4. Add palette-matrix regression checks and revise superseded overlay tests/docs.
   Build library/demo/Storybook and run relevant browser and package checks (FR-004).
5. Update shell singleton requirement to its installed picker version; verify
   theme selection and shell build. New design-system styling needs a subsequent
   package release/install in the shell; do not claim that deployment occurred.

Constitution: Angular/CDK own behavior, tokens own styling; no deviations.
