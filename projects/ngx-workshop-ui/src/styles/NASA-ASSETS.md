# NASA theme sources

Reference: [NASA Brand Guidelines](https://www.nasa.gov/nasa-brand-center/brand-guidelines/), retrieved 2026-10-28.

The insignia color chart specifies NASA Blue RGB 0/50/160 (#0032a0) and NASA Red RGB 228/0/43 (#e4002b). `--ngx-nasa-blue` and `--ngx-nasa-red` retain those references. Semantic interface colors use darker red in light mode and lighter blue/red in dark mode to preserve text contrast. White, near-black and cool neutral surfaces support these accents.

The digital/web section specifies Inter for headings, Public Sans for body text, and DM Mono for small labels and numbers. Latin WOFF2 subsets from Google Fonts are embedded in `_nasa.scss`, using font-display: swap and system fallbacks for unsupported scripts. Inter and Public Sans cover weights 100–900; DM Mono covers 400/500. The SIL Open Font License texts are packaged beside this file. No runtime third-party requests or consumer asset-copy steps are needed.

The full-color SVG comes from https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg. Its paths, colors and proportions are preserved within a generously spaced decorative tile; tile opacity is 14% in light mode and 18% in dark mode. The seamless tile is 144 × 240px, with 120px row pitch and alternating rows offset 72px. NASA panels suppress grid lines. `--ngx-panel-grid-image` can be set to `none` to disable the artwork. Solid/glass panel surfaces never use this image.

NASA identifiers remain subject to NASA's usage guidelines; their inclusion does not convey endorsement. See the reference for permitted uses and permissions.
