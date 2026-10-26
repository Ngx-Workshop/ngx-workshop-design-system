# Plan

Source colors and tag rules from the Shell-installed @fsegurai/codemirror-theme-synthwave-84 6.0.4; retain MIT attribution.
Add packaged code CSS tokens and a shared semantic tag/class map using @lezer/highlight. Dynamically import standalone JS/TS, JSON, HTML and CSS parsers when language is supplied. Do not import CodeMirror from library code.
Render token text through Angular interpolation, preserving exact concatenated source and raw clipboard text. Default language is text for compatibility; document a 50k-character highlighting limit.
Use independent code palette tokens so app theme swapping leaves Synthwave presentation stable. Export code-styles() for native pre/code consumers; theme() includes it.
Build a live snippet lab and an actual upstream CodeMirror comparison. The comparison applies the package theme plus the same semantic classes for a precise readable/original contrast choice; only the demo loads editor modules.
Validate exact token/source safety, clipboard/reset, asynchronous language changes, parser fallback, native CSS, parity with the upstream palette, no editor runtime in the production package, mobile containment and readable-mode contrast.
Constitution: versions remain Angular 21.1.0; readable contrast is the default. Added standalone parsers are justified by real syntax highlighting; all editor dependencies stay dev-only.
