# Handoff: shared overlay styling policy

Status: Implemented locally; publication and consumer adoption deferred.
Updated: 2026-10-31
Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md) · Tasks: [tasks.md](tasks.md)

## Delivered

Public Sass overlay-policy() is forwarded by the theme entry and included once in
theme(). It supplies consumer-owned ngx-design-system-overlay text/font/inherited
scheme, ngx-design-system-backdrop glass/fallback rules, and opt-in ngx-select-panel
final-frame retention. Existing overlay-styles() remains compatible and shares its
backdrop implementation. Transparent CDK backdrops are excluded in every mode,
even when the scoped backdrop class is also present.

Selects receive only animation-fill-mode:forwards!important through panelClass;
Material's inline animation shorthand otherwise resets fill. Material still owns
animations, detachment, values, keyboard/focus and dismissal. No JS API, wrapper,
private Material DOM selectors or animation names are shipped by this policy.

Storybook Foundations/Overlay policy has Native overlays and Container overlays,
using the public CDK usePopover:false setting for the latter. They demonstrate
single/multiple/unmarked selects, dialog, sheet, menu, tooltip and snackbar. Updated
README, architecture, development and docs/overlays.md describe global loading,
root theme inheritance, class hooks and migration order.

## Verification

- npm run verify: PASS (library, demo, story types, static Storybook, packed
  Angular consumer and Sass). New packed Sass coverage confirms the public policy
  can compile independently without regenerating a Material palette/dark scheme.
- After adding the container variant, build-storybook and typecheck:stories PASS.
  Updated verify:package PASS, including standalone overlay-policy() compilation.
- Browser run: 29/29 PASS (nine new policy checks and 20 existing backdrop checks).
  Real closing frames are transparent before detachment for selection, outside click
  and Escape. Reopening, selected values and restored focus pass. An unmarked native
  select reproduces opacity 1 at the same terminal frame, proving regression sensitivity.
  Multi-select retains selections/open state. Neon/Light container overlays inherit
  document roles/scheme; transparent dismissal, modal glass, tooltip/snackbar behavior,
  reduced motion/transparency and forced colors pass. No serious/critical axe findings
  in the stable composed specimen in either palette; no axe rules disabled.
- Desktop Neon/Light modal screenshots and 320px mobile output visually inspected at
  /tmp/ngx-overlay-policy-{neon,light,mobile}.png. Mobile has no horizontal overflow.
- Initial test assumptions were corrected for Material 21.1's inline-popover default,
  forced-color transparent RGB channels, and tooltip accessible-description semantics.
  Accessibility checks wait for actual ripple/overlay animations to settle.
- Targeted formatting and git diff --check: PASS.
- Existing Material Sass deprecation and Storybook bundle-size warnings remain.
  The full unrelated browser suite and hosted MFE acceptance were not run.

## Consumer handoff

X001 is deferred as requested by the producer-first workflow:

1. User publishes the producer using its existing workflow and installs the observed
   package release in the shell and MFEs; no version is guessed here.
2. Shell emits theme() globally, which now includes the policy. A custom theme can
   instead include overlay-policy() once after supplying its existing token/Material
   foundation. A remote stylesheet alone is not guaranteed to load through federation.
3. Adopt panelClass="ngx-design-system-overlay ngx-select-panel" on affected selects.
   Preserve extra app-owned panel classes. Remove app-local fill-mode rules only when
   the shared policy is loaded. Remove repeated portal typography, dark color-scheme
   declarations and duplicated backdrop rules; keep app-specific layout/configuration.
4. Verify hosted selection/outside click/Escape, reopening, focus, light/dark overlays
   and actual form behavior in both MFEs. Existing consumer regression tests should be
   adapted to load this policy before removing their local styles.

No consumer source edits, dependency/version changes, publication or deployment.
