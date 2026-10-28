# Plan

Status: Complete
Spec: [spec.md](spec.md)

Extend packaged styles/\_index.scss with complete NASA semantic palettes; use the existing public light Material adapter for nasa-light. Register both choices in preview.ts, showcase cycling and dedicated stories. Extend tests/themes.spec.ts, catalog axe coverage and scripts/verify-package.mjs selector assertions. Update README, docs/tokens.md and architecture.

All constitution principles satisfied: pinned Angular/Material, public adapters, semantic tokens, existing standalone APIs, readable contrast and native focus/overlays. No private DOM styling, migrations or external integration. Run npm verify and theme/catalog browser tests; visually review both desktop/mobile previews. Historical Material button axe limitation remains outside this feature; do not weaken rules.
