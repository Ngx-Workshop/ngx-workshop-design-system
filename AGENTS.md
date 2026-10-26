# Ngx Workshop Design System

Read README.md, .specify/memory/constitution.md, docs/architecture.md, docs/development.md,
and the relevant specs/ feature before implementation. Follow .specify/README.md.
Use Angular 21.1.0 standalone components, signals, strict templates and OnPush.
Keep Material behavior intact; style only through public Sass overrides and semantic CSS tokens.
Never target private Material DOM, use ::ng-deep, or fork Material controls.
Keep component APIs small. Update stories and meaningful checks when behavior changes.
Build the library, demo application and Storybook before declaring the feature complete.
Main-branch publishing and Storybook deployment are configured in .github/workflows/deploy.yml.
Read docs/deployment.md before changing release or deployment behavior.
