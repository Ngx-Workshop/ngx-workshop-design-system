# Foundation handoff

Status: Complete
Updated: 2026-10-25
Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md) · Tasks: [tasks.md](tasks.md)

## Delivered

Local Git repository on main; Angular/Material/CDK 21.1.0, TypeScript 5.9.3 and Storybook 10.6.3.
Distributable `@ngx-workshop/ui` package with panel, status and CDK clipboard code block.
Public packaged Sass theme, semantic tokens, neon and neutral palettes, Material override adapter.
Standalone showcase and 15 Storybook stories covering foundations, shared components and Material primitives.
Spec Kit-like constitution, templates, requirements, plan, task tracking, architecture, development and token docs.
No sibling repository was modified. No remote, publishing or deployment configured.

## Acceptance evidence

All checks ran locally on Node 24.9.0 / npm 11.6.0 after `npm ci --no-audit --no-fund`.

| Acceptance    | Check                                                                                                                                                                              | Result |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| AC-001        | Clean npm ci; npm run build; npm run build:demo; npm run build-storybook                                                                                                           | PASS   |
| AC-002        | Story typecheck; Chromium iterates all 15 story entries without runtime errors                                                                                                     | PASS   |
| AC-003        | Storybook toolbar changes root palette; dialog focus trap, Escape/restore and keyboard select; neutral select overlay inherits tokens                                              | PASS   |
| AC-004        | Actual clipboard read matches displayed command; copy success label; projected content in overview and panel story                                                                 | PASS   |
| AC-005        | npm pack tarball extracted into isolated local consumer; ngc resolves public component exports and compiles their templates; Sass NodePackageImporter resolves public theme export | PASS   |
| Responsive    | 390px showcase has no horizontal overflow; desktop/mobile screenshots visually inspected                                                                                           | PASS   |
| Accessibility | axe-core on showcase in both palettes: zero serious/critical violations                                                                                                            | PASS   |
| Formatting    | npm run format:check                                                                                                                                                               | PASS   |
| Browser suite | npm test: six tests                                                                                                                                                                | PASS   |

The consumer check uses the actual packed library and installed Angular peer packages; no component or clipboard mocks.
The local dev Storybook command was also started successfully on port 6006.

## Findings and limitations

Angular builder and Storybook initially resolved two Webpack copies, causing a Compilation identity error.
The root Webpack 5.105.2 override matches the Shell and fixes this; verified again after clean npm ci.
Upstream Material Sass internals emit deprecation notices. Storybook catalog bundles exceed Webpack's advisory size threshold.
Both builds succeed. The accessibility check covers the initial showcase, not a full accessibility audit or every possible state.
Both included palettes are dark. Glitch styling is static and decorative; no flashing or external fonts/assets.
The demo save confirmation is ephemeral preview state; there is no backend or persistent session storage.
The package is local only: consume the built folder or a packed tarball as documented in README.md.

## Remaining work

None for the requested local foundation. Future components, branding refinements and application adoption can be specified as separate features.
No Shell integration is part of this feature. Context docs and feature index reflect the delivered workspace.
