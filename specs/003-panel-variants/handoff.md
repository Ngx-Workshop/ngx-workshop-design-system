# Panel variants handoff

Status: Complete
Updated: 2026-10-25
Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md) · Tasks: [tasks.md](tasks.md)

## Delivered

- Five typed shapes: notched, chamfered, beveled, stepped, banner.
- Three typed backgrounds: grid, solid, glass. Glass uses real backdrop blur over a hollow polygon outline; unsupported blur/reduced-transparency preferences use an opaque fill.
- Four motion options: none, boot, glitch, hologram. Native Angular animate.enter/animate.leave host bindings retain the host until the outro finishes. Leaving hosts become inert; reduced-motion CSS shortens both phases to 1ms and removes the scanning line.
- Default notched/grid/none preserves existing consumers; heading, eyebrow, tone and body/action projection remain compatible. Duration, blur and opacity are CSS token overrides.
- Storybook shape and surface comparisons plus four transition-lab stories with live controls and show/hide/replay. Replay observes actual removal, not a guessed timeout; replay observers disconnect on destruction.
- Consumer guide at docs/panels.md, screenshots in docs/images/ and updated token/architecture docs.

## Verification evidence

| Acceptance       | Check                                                                                                                        | Result |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------ |
| AC-001           | Browser verifies all five distinct polygons; screenshots visually reviewed                                                   | PASS   |
| AC-002           | Browser verifies grid vs opaque solid, actual backdrop blur, alpha fill and even-odd outline; background screenshot reviewed | PASS   |
| AC-003           | Each of three motions is entered, removed with a 700ms test override and retained until completion, then shown and replayed  | PASS   |
| AC-004           | npm run verify: library, standalone demo, story types, static Storybook and packed consumer with new typed inputs            | PASS   |
| AC-005           | Focus stays on external hide/replay controls; exiting panel is inert; no-motion and reduced-motion removal verified          | PASS   |
| Responsive/a11y  | 390px panel lab has no horizontal overflow or serious/critical axe violations; desktop/mobile screenshots reviewed           | PASS   |
| Regression suite | npm test: 13 tests passed, including existing catalog and all story rendering                                                | PASS   |
| Formatting       | npm run format:check                                                                                                         | PASS   |

Native lifecycle behavior was validated against installed Angular 21.1.0, with no animation mocks or deprecated animation DSL.
Glass in the lab was visually checked after intro completion so transient compositing during entry did not masquerade as a backdrop failure.

## Limits and remaining work

None for the requested scope. Glass readability depends on consumer backdrops; the tests do not certify arbitrary content behind glass.
CSS blur-unsupported/reduced-transparency fallbacks are implemented; unsupported-browser behavior was not run in a separate legacy browser.
Removing an entire ancestor outside the panel's own structural boundary can bypass child outros; consumer guidance explains this.
Consumers removing focused content must choose an appropriate focus destination; demo controls live outside the removed panel.
Arbitrary replacement of --ngx-frame-shape does not regenerate the built-in glass outline; custom polygon consumers must validate the outline as documented.
Known upstream Sass notices/Storybook size advisories remain non-blocking. No deployment, dependency migration or sibling edits.
