# Angular buttons and interaction motion

Status: Complete
Created: 2026-10-25

## Outcome

Give buttons the panel family's angular visual treatment, with configurable geometry and futuristic hover, keyboard-focus and activation animations, demonstrated interactively in Storybook.

## Requirements and acceptance

- FR-001 / AC-001: An additive shared treatment for native Material button/anchor hosts with six shapes: notched, chamfered, beveled, stepped, banner and chevron. Decorative shapes must not clip labels, focus or hit areas.
- FR-002 / AC-002: Primary/secondary/danger tones and filled/outline/glass surfaces. Preserve real Material click, keyboard, disabled, form submit and link semantics; no duplicate click output or wrapper control.
- FR-003 / AC-003: Selectable scan/glitch/pulse/none motion, distinct hover/focus feedback and replayable click/keyboard activation effects. Disabled controls stay inert; reduced motion skips visual sequences but retains a clear focus ring.
- FR-004 / AC-004: Storybook has controls, shape/surface/motion comparisons, loading/disabled specimens and an interactive event readout; new treatment appears in the Material button catalog.
- FR-005 / AC-005: Strict builds, actual packed consumer, browser interactions, contrast and mobile review pass; document API and styling tokens.

## Boundaries

Angular/Material/CDK stay at 21.1.0. Use a standalone styling directive on a normal Material button/anchor, not a recreated control. Existing ngx-action CSS stays compatible.
No flashing loops or sound. Motion defaults to scan for opted-in buttons; none disables decorative sequences. Loading is consumer-owned using native disabled and aria-busy.
