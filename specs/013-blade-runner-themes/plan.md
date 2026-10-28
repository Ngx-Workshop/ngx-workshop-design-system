# Implementation plan

Status: Complete
Spec: [spec.md](spec.md)
Updated: 2026-10-28

Extend `projects/ngx-workshop-ui/src/styles/_index.scss` with two document selectors and the existing public light Material adapter where needed (FR-001/002/004). Register choices in `projects/storybook/.storybook/preview.ts`, `src/showcase.ts` and `src/stories/showcase.stories.ts` (FR-003). Extend `tests/themes.spec.ts`, `tests/catalog.spec.ts` and `scripts/verify-package.mjs`; update README and docs/tokens.md with the paired palette reference (AC-001/002/003).

All constitution principles remain satisfied: pinned Angular/Material 21.1.0, public overrides, semantic styling, native behavior, existing standalone components and accessible defaults. Preserve all existing uncommitted work. No API migration or external dependencies. Run npm verify, targeted browser tests and visually inspect desktop/mobile previews. Existing Material button axe limitation from feature 012 remains recorded separately.
