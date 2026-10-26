# Design system foundation

Status: Complete
Created: 2026-10-25

## Problem and audience

Ngx Workshop applications need a shared visual language and developers need an interactive component catalog.

## Scope and requirements

- FR-001: Local Angular monorepo with a distributable shared library and Storybook application; match Shell Angular/Material/CDK 21.1.0.
- FR-002: Cyberpunk/synthwave theme with neon accents, minimal surfaces, coder typography and restrained glitch decoration, implemented with CSS tokens and public Material overrides.
- FR-003: Showcase Material buttons, cards, form fields, selection controls and overlays alongside shared status, panel and copyable code components.
- FR-004: Provide a neutral alternative theme without changing component markup; document consumer installation and theme replacement.
- FR-005: Provide a standalone Spec Kit-like workflow with constitution, templates, spec, plan, tasks and handoff.

## Acceptance

- AC-001: A clean npm ci, library build, demo build and static Storybook build succeed (FR-001).
- AC-002: Storybook renders a complete foundation showcase and individual interactive component stories (FR-002, FR-003).
- AC-003: Theme toolbar switches neon/neutral across the document including overlays; inputs and dialogs work by keyboard (FR-004).
- AC-004: Copy code emits success and updates its label; panel content projects and status labels remain readable (FR-003).
- AC-005: A consumer installs the built package and imports its public API and packaged Sass entry (FR-001, FR-004).

## Quality and boundaries

Use strict Angular templates, native semantic controls, Material keyboard behavior, visible focus and reduced-motion support. No remote fonts/assets required.
No Shell changes, GitHub repository, deployment, backend, or full production component inventory.
The initial palette and component selection are implementation assumptions. Glitch remains decorative and static.
