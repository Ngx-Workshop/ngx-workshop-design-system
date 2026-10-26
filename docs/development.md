# Development

Use Node 22.12+ (22.x) or Node 24.x and npm. Versions are pinned in package-lock.json.

Release preparation checks: `node --test scripts/prepare-release.test.mjs`.
Main-branch publishing, version policy and server setup: [deployment](deployment.md).

```sh
npm ci
npm run storybook          # http://localhost:6006
npm start                  # standalone showcase, http://localhost:4200
npm run build              # package in dist/ngx-workshop-ui
npm run build:demo
npm run typecheck:stories
npm run build-storybook    # static catalog in dist/storybook
npm run verify:package     # install tarball, compile Angular consumer and Sass
npm run verify             # builds, story types and packed consumer
npx playwright install chromium
npm test                   # catalog behavior + keyboard + theme + package consumer
```

Browser tests start a local static server on 6007 and need an existing static Storybook build.
Storybook's accessibility addon is available for manual per-story inspection; it is not a substitute for an accessibility audit.
The copy story requires localhost/HTTPS and clipboard permission. No external fonts or images are loaded.
To add a component, first specify its observable behavior, prefer a Material primitive, export it through public-api.ts and add a story.

The root Webpack override matches the Shell (5.105.2) and keeps Angular and Storybook on one compilation instance. Material 21.1 Sass internals currently emit upstream deprecation notices; Storybook emits catalog bundle size warnings. Neither blocks builds.

The Material catalog covers all 36 installed public UI families (including core ripple). To add a state, update its CSF file under `projects/storybook/src/stories/material/`, its catalog entry and `docs/material-coverage.md`. `tests/material.spec.ts` checks the installed inventory against story files and exercises filtering, sorting, pagination, date/time, menus, overlays, trees, validation, accessibility and mobile layouts. The all-story smoke test loads both original and catalog stories, catches browser/console errors and has a bounded 120-second timeout.

The accessibility addon starts in manual mode (`globals.a11y.manual`) so its background scan cannot race the explicit Playwright axe runs. Use **Run accessibility scan** in the addon for ad hoc inspection. Automated tests still run axe without disabling rules.

The code comparison pins the Shell’s Synthwave theme to 6.0.4. Production code uses standalone Lezer packages; CodeMirror is dev-only. If upgrading the upstream theme, review `synthwave-tags.ts`, `_code.scss`, attribution and the parity tests together. `tests/code.spec.ts` checks real editor/snippet colors, source safety/clipboard, native CSS, parser fallback, runtime dependency boundaries, mobile layouts and readable-mode accessibility.
