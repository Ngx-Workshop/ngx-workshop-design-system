# Button variants handoff

Status: Complete
Updated: 2026-10-25
Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md) · Tasks: [tasks.md](tasks.md)

## Delivered

Standalone exported NgxButton directive on native Material MatButton hosts; typed shape, surface, tone and motion inputs.
Six angular silhouettes: notched, chamfered, beveled, stepped, banner and chevron. Filled/outline/glass surfaces and primary/secondary/danger tones.
CSS hover/focus scan, stepped glitch or pulse/lift; native click-driven bounded Web Animations replay for pointer/Enter/Space. None and reduced-motion paths preserve static feedback and activation.
An owned aria-hidden decoration is inserted without selecting or replacing private Material elements. Shapes/strokes share one Sass vertex map. Focus/hit area/labels remain unclipped.
Nine new Storybook stories include an interactive lab, shape and surface matrices, disabled/loading/no-motion and motion variants. The direct Material button catalog adopts the directive for its HUD specimen. Catalog now totals 124 stories.
Existing ngx-action styles remain compatible. No versions/dependencies changed.

## Acceptance evidence

| Check              | Result | Evidence                                                                                                                                                            |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-001 / geometry  | PASS   | Six distinct decorative polygon paths; host remains unclipped; visible keyboard outline; desktop/mobile screenshots inspected                                       |
| AC-002 / semantics | PASS   | Pointer/Enter/Space each activate once; links navigate on Enter; native form submits; disabled button/link specimens do not act; busy button is disabled            |
| AC-003 / motion    | PASS   | Hover/focus scan and glitch CSS animations run; pulse hover lifts; repeated activation cancels and replaces one press animation; none/reduced-motion skip sequences |
| AC-004 / Storybook | PASS   | Interactive lab and galleries; all 124 stories load with browser and console error checks                                                                           |
| AC-005 / builds    | PASS   | npm run verify: library, standalone demo, story types, static Storybook and actual packed Angular/Sass consumer including new directive                             |
| Contrast           | PASS   | Axe serious/critical checks on surface/tone matrix in both palettes and existing Material buttons; no rules disabled                                                |
| Responsive         | PASS   | 390px lab and galleries have no horizontal overflow                                                                                                                 |
| Browser suite      | PASS   | npm test: 28 tests                                                                                                                                                  |
| Formatting         | PASS   | npm run format:check                                                                                                                                                |

## Findings and limits

Filled backgrounds use a real decorative element so contrast tooling sees the actual surface behind labels. Glass clips its own surface/outline, not a backdrop-filter ancestor; scan clipping is separate. Disabled Material container colors are transparent to preserve the silhouette.
Material 21.1 prevents disabled anchor navigation, but a same-host Angular consumer handler can execute first. The lab guards disabled-link side effects, and docs/buttons.md explains consumer ownership. NgxButton never intercepts application events or synthesizes clicks.
Glass contrast depends on the consuming scene; automated contrast checks cover the supplied specimens, not arbitrary backdrops or every animation frame.
Unsupported blur/reduced-transparency get opaque surfaces; press effects gracefully skip if Web Animations is unavailable. The directive targets normal Material buttons/anchors, not MatIconButton/FAB/button-toggle controls.
No deployment or sibling repository changes. Upstream Sass notices/Storybook bundle advisories remain non-blocking.

## Next action

None for this scope. Explore Components → Button → Interaction lab. API, tokens, semantics and screenshots are recorded in docs/buttons.md.
