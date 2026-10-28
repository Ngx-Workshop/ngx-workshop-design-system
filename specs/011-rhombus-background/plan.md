# Implementation plan: Rhombus background

Spec: [spec.md](spec.md)
Status: Complete

Baseline: Angular 21.1 standalone/OnPush, semantic theme tokens in projects/ngx-workshop-ui/src/styles/\_index.scss. No reusable page background exists.

- FR-001/002: NgxBackground renders deterministic recursive vector geometry grouped by scale. CSS draws a quiet base and moving dashed traces with staggered palette cycles. No browser-only APIs, random values, SVG IDs, asset requests or animation timers.
- FR-003/005: Absolute contained host by default, fixed viewport opt-in; pointer-events:none, aria-hidden and clipping. Consumer owns a stacking context. Public local CSS variables control appearance.
- FR-004: Component CSS removes animation for both reduced-motion and explicit still mode, independent of global theme rules.
- Add public export, dedicated stories, overview integration and docs/backgrounds.md.
- tests/background.spec.ts checks real animation, live theme changes, interaction, still/reduced motion, mobile overflow. Run repository-required builds/package validation and visual review.

Constitution: Uses Angular signals/OnPush and public tokens; custom decoration needs no Material primitive. No changes to Material internals. No external dependencies, migration or consumer repository edits.

Configuration extension: compute grouped paths from bounded signal inputs (size 180–720, aspectRatio .3–1, depth 1–4 rounded, spacing .75–1.75, childScale .2–.48); retain bottom anchoring and constant covered region. Add local line/trace width CSS tokens. Provide a development-only live lab and Storybook presets, verify reactive updates, reset, invalid values and mobile. No dependencies or changes to Material controls.

Outline styling extension: add four local color CSS tokens and independent flow/color duration tokens falling back to the existing duration. Reuse existing width tokens. Add finite degree-normalized rotation input, rotating every recursive motif about its root center during geometry generation. Extend BackgroundLab with color pickers, theme restore, separate timing/width sliders and rotation. Keep semantic theme defaults and reduced-motion behavior. Verify rendered stroke colors, animation durations, reset, rotation bounds, mobile layout and required builds.

Trace staggering extension: split each scale into eight bounded trace groups while retaining one shared structure path. Seeded integer hashing supplies stable per-group delay fractions; seed changes only inline delay factors. CSS maximum delay token scales positive flow delays, with hidden traces before their start and one immediate group per scale. Keep palette delays independent. A numeric trace-length CSS token controls the dash length inside a constant 720-unit cycle. Add live delay/length sliders and reshuffle, docs and meaningful browser checks.

Random lengths/export: add seeded per-group length factors separate from delays, interpolate normalized min/max CSS tokens (fallback to legacy fixed-length token). Lab replaces length with coupled min/max sliders, and reshuffles both trace properties through the shared seed. Use CDK Clipboard for a computed current-configuration snippet and status tied to the copied source; always offer selectable markup/CSS. Verify clipboard contents, bounds, seed stability, reset and error path in the real browser, plus repository builds.

Performance revision: remove recursive draw calls, child geometry and depth/childScale inputs entirely. Compute a single lattice object; retain one static path and eight trace paths, with eight delay/length factors. Remove recursion from lab, export, stories and current documentation. Keep existing RhombusFractal story URL for the open preview, label it Rhombus lattice, replace Intricate with Dense Lattice. Verify default geometry/animation counts, current export, dense bounds, retained behavior and required builds.
