# Plan

Add a standalone NgxButton directive to public-api.ts, requiring the public MatButton on the same native host.
Inputs: shape, tone, surface, motion. Append one owned aria-hidden decorative layer without querying private Material DOM; never overwrite Material focus/ripple elements.
Package button Sass alongside the existing theme; use public Material override mixins and semantic CSS variables. Clip decorative layers only; use even-odd polygon rings for outline/glass, like panels.
Use CSS for hover/focus and a bounded Web Animations sequence on real native click events (including keyboard-generated events), cancelling prior sequences and cleaning up on destroy.
Read reduced-motion at activation and apply scoped CSS fallbacks. Never intercept preventDefault/stopPropagation or synthesize activation.
Add a Storybook button lab, comparison galleries and state examples; validate keyboard/pointer/reduced-motion, disabled, links and form submission, accessibility/contrast and packed Angular/Sass consumption.
Constitution: public Material APIs, no private selectors or new dependencies. Existing consumers remain compatible.
