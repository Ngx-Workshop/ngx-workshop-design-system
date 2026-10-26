# Synthwave code presentation

Status: Complete
Created: 2026-10-25

## Outcome

Align lightweight pre/code blocks with the @fsegurai/codemirror-theme-synthwave-84 theme already used by the Shell. Demonstrate actual CodeMirror and lightweight output with the same palette and syntax rules.

## Requirements and acceptance

- FR-001 / AC-001: Match the installed upstream 6.0.4 background, foreground, selection, typography and syntax palette. Offer exact-original contrast and a readable default using the brighter existing palette color for comments/meta and a small diagnostic-red contrast adjustment.
- FR-002 / AC-002: Keep NgxCodeBlock as semantic pre/code, with optional TypeScript/JavaScript/HTML/CSS/JSON highlighting, plain-text fallback, wrapping and raw-text clipboard behavior. Never interpret input as HTML.
- FR-003 / AC-003: Plain snippets do not load a CodeMirror editor. Language parsers load only when requested; stale async work cannot replace newer content. Very large snippets use a documented plain fallback.
- FR-004 / AC-004: Package native pre/code CSS and syntax tokens so lightweight non-component markup shares the theme. Neon/neutral surrounding UI does not silently change the code palette.
- FR-005 / AC-005: Storybook demonstrates supported languages, plain/empty/escaped/long content, source edits and an actual upstream CodeMirror comparison. Build and packed-consumer checks plus clipboard, safety, parity, accessibility and mobile browser checks pass.

## Boundaries

No editor is added to the shared component. CodeMirror and the upstream theme are development-only dependencies for comparison. The production renderer uses standalone Lezer parsers and semantic highlight classes, not the CodeMirror view runtime.
Original upstream comments/fold markers are low contrast; readable mode raises those from #495495 to #848bbd (another upstream palette color), and diagnostics from #fe4450 to #ff5360. This is an explicit documented adaptation; original mode remains available.
