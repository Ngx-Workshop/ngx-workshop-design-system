# Plan

Use matching 600–1366px media queries in NgxActionBar, panel.scss and packaged
_buttons.scss. Button styling belongs to Sass; button.ts documents the contract.
Use public mat.button-overrides for Material height/type tokens and existing owned
host sizing. Action-bar inherited semantic properties reach NgxInlineStatus and
NgxSaveFeedback without targeting their internal DOM; retain mounted live regions.
Keep the user's existing 900–1024px sticky offset rule.

Use CSS :empty (Angular anchors are comments) to collapse missing actions and :has
to collapse empty marked wrappers. Keep projection mounted for conditional updates.
Do not query Material internals, fork controls or add runtime device detection.

Add a composed Storybook specimen and browser regressions against actual computed
sizes, resize boundaries, conditional projection, feedback lifetime and keyboard
activation. Run required builds, story typecheck and focused existing browser suites.
Update usage docs and record actual evidence in handoff.
