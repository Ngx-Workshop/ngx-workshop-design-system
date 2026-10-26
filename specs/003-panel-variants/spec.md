# Panel variants and transitions

Status: Complete
Created: 2026-10-25

## Outcome and scope

The user wants the shared panel to support the angular silhouettes in the attached cyan HUD reference, grid/solid/frosted backgrounds and sci-fi intro/outro transitions.
Use original CSS geometry; the attachment is visual reference only.

## Requirements and acceptance

- FR-001 / AC-001: Five selectable shape variants (notched, chamfered, beveled, stepped, banner) visibly differ while preserving projected body/actions, title, tone and unclipped keyboard focus.
- FR-002 / AC-002: Grid (existing default), solid and glass backgrounds. Glass is translucent with real backdrop blur; supply an opaque fallback when blur is unsupported and a reduced-transparency option.
- FR-003 / AC-003: Opt-in boot, glitch and hologram entrance/exit transitions plus none. Angular insertion/removal owns lifetime; removal waits for exit completion, including when a panel is controlled by a parent @if.
- FR-004 / AC-004: Storybook controls, shape/background comparison galleries and replayable lifecycle demo expose all options. Existing consumers remain compatible.
- FR-005 / AC-005: Reduced-motion users receive effectively immediate transitions. Exiting content cannot receive focus; trigger retains focus in the demo. Build library, demo, stories, static catalog and packed consumer.

## Assumptions and boundaries

Default shape remains the existing notched frame; background remains grid; motion defaults to none to avoid changing existing application behavior.
Animate only on insertion/removal, not on ordinary input edits. No flashing/strobing loops or sound. No extra animation dependency or deprecated Angular animation DSL.
Purely decorative geometry does not constrain projected content. Frosted panels need content behind them to demonstrate blur.
