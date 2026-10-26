# Synthwave code handoff

Status: Complete
Updated: 2026-10-25
Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md) · Tasks: [tasks.md](tasks.md)

## Delivered

NgxCodeBlock and native pre > code share the Synthwave ’84 6.0.4 palette, matching the Shell-installed theme version. Global code-styles() is also independently exported; inline prose code is unaffected.
Optional TypeScript/JavaScript/HTML/CSS/JSON highlighting uses lazy standalone Lezer grammars and safe text spans. Default language remains text. Wrap, contrast and language inputs are typed public exports. CodeMirror is not a library dependency or production runtime import.
Clipboard uses the exact original source. Source edits clear feedback. Async revision checks reject stale output; sources over 50,000 UTF-16 units use untruncated plain text. Import failures retain plain text.
Readable is the default contrast variant: brighter comments/meta/gutter and diagnostic red. Original restores upstream comment/red colors. Neon/Neutral surrounding themes do not alter the code palette.
A live snippet lab, actual upstream CodeMirror comparison, native markup and language/state stories bring the catalog to 138 stories. CodeMirror/theme modules are dev-only and load when the comparison is rendered.
MIT source attribution is packaged in styles/SYNTHWAVE-LICENSE.txt. API, tokens, exact/readable distinction and screenshots are in docs/code.md.

## Acceptance evidence

| Acceptance/check            | Result | Evidence                                                                                                                                                                                               |
| --------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC-001 / color parity       | PASS   | Browser compares actual CodeMirror and lightweight keyword/string/literal/comment/property colors, canvas and font size for readable/original variants                                                 |
| AC-002 / source/copy/safety | PASS   | Each supported language renders token classes and copies exact concatenated source; malicious HTML stays text; source edit resets feedback                                                             |
| AC-003 / lightweight path   | PASS   | Native plain example has no editor; packaged dependency manifest and all FESM runtime imports exclude CodeMirror/theme; large source skips tokenization; rapid language changes keep final JSON source |
| AC-004 / native CSS         | PASS   | Bare pre/code is Synthwave themed under neutral app palette; code styles and attribution verified in actual packed tarball                                                                             |
| AC-005 / builds             | PASS   | npm run verify: Angular library, standalone demo, story types, static Storybook and packed Angular/Sass consumer using new code inputs                                                                 |
| Browser regression          | PASS   | npm test: 34 tests, including all 138 story entries and existing Material/panel/button checks                                                                                                          |
| Focused code suite          | PASS   | Six code tests rechecked after tightening the runtime-import guard and native region selector                                                                                                          |
| Readable accessibility      | PASS   | No serious/critical axe violations on representative language snippets and actual editor comparison in both app palettes                                                                               |
| Responsive                  | PASS   | 390px highlighted/wrapped/comparison views have no page overflow; desktop/mobile screenshots reviewed                                                                                                  |
| Formatting                  | PASS   | npm run format:check                                                                                                                                                                                   |

## Findings and limits

Upstream comment/gutter blue has about 2.17:1 contrast on the code canvas; diagnostic red is slightly below 4.5:1. Readable mode deliberately adjusts these; original mode preserves them and is not claimed accessible.
The CodeMirror gutter has separate source color rules; the demo adapts them via public EditorView.theme APIs alongside semantic syntax classes.
Storybook was restarted after adding dependencies/stories. Final verification used the static catalog server on 6007, with the live dev catalog on 6006.
The syntax map is a pinned semantic projection of the upstream rules, not an import of the editor extension into the lightweight renderer. Future upstream upgrades must review rules, CSS tokens and parity tests together.
The existing Shell/editor integrations were not changed. No public editor wrapper, external font/CDN, backend or deployment was added. Known upstream Sass/bundle-size notices remain non-blocking.

## Next action

None for this scope. Open Components → Code block → Snippet lab or CodeMirror parity. Native pre/code requires only the global theme.
