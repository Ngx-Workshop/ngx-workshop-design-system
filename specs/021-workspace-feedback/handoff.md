# Handoff: workspace actions and feedback

Status: Implemented locally; publication and MFE adoption deferred to the user.
Updated: 2026-10-31
Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md) · Tasks: [tasks.md](tasks.md)

## Delivered

Public additive exports: NgxActionBar, NgxSaveFeedback, NgxInlineStatus,
NgxSaveState and NgxInlineStatusTone. Existing NgxStatus is unchanged.

The action bar projects indicator and feedback slots plus default actions. It owns
responsive wrapping, optional stickiness and changed-height reporting. Offsets and
workspace sizing remain consumer-owned. Observer cleanup is covered on removal.
Save feedback keeps its polite atomic message region mounted across states, offers
an optional native Material retry output and supports localized messages/labels.
There is no automatic save, timeout or retry execution. Inline status supports five
semantic tones and optional announcements; label/count wording remains consumer-owned.

Storybook includes interactive composition, standalone save states/localization,
and unknown/zero/warning/success/info/error indicators. Usage and migration guidance:
[workspace-actions.md](../../docs/workspace-actions.md). README, architecture,
development and feature index are updated.

## Verification

- npm run verify: PASS (library, demo, story typecheck, static Storybook, packed
  Angular consumer and public Sass). Packed consumer compiles all three components,
  signal inputs, exported state/tone types and typed height/retry outputs.
- New workspace browser checks: 6/6 PASS. Covers stable live-region nodes and drafts,
  consumer-owned success lifetime, keyboard retry, unknown-to-warning counts,
  configurable sticky placement/disable, 320px wrapping/height updates, observer
  disconnection, localization, optional announcements, theme colors and axe scans
  with no serious/critical violations in Neon and Light.
- Existing panel/button browser regressions: 17/17 PASS.
- After example-control styling adjustment, rebuilt Storybook and reran all six
  workspace tests: PASS. Desktop Neon/Light and 320px mobile screenshots inspected
  at /tmp/ngx-workspace-{neon,light,mobile}.png.
- Initial browser run exposed an asynchronous assertion race and poor contrast
  detection for filled example controls on the light canvas. The assertion now waits
  for the rendered error state; example controls use outlined surfaces. No axe rules
  disabled. Shared component checks pass with the actual theme.
- Existing Material Sass deprecation and Storybook bundle-size warnings remain.
- git diff --check and targeted Prettier checks: PASS.

## Producer/consumer handoff

X001 is intentionally deferred, outside local implementation acceptance:

1. User publishes the design-system package through its existing workflow.
2. Install the observed published version in mfe-user-journey-admin-navigational-list
   and mfe-user-journey-admin-mfe-orchestrator; ensure mfe-shell-admin supplies a
   compatible singleton before the apps import new exports.
3. In a subsequent task, adopt these components while preserving store/view-model
   notification timing, persistence, retry rules, counts/pluralization and routes.
   Supply the real shell offset via --ngx-action-bar-top and bind heightChange at
   the owning workspace if downstream sticky content needs it.
4. Verify host-mounted responsive layouts, announcements, retries and actual saves.

No package version bump, publication, deployment or MFE source changes were made.
The full unrelated browser suite and authenticated host/service integration were not
run. Local verification establishes component/package behavior, not deployed adoption.
