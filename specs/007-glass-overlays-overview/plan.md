# Plan

Add a packaged overlay-styles() mixin to the shared theme. Style CDK's public backdrop/showing/transparent classes; transparent connected-overlay backdrops must have visible opacity while active for blur to render.
Use translucent canvas tint plus backdrop-filter, defaulting to opaque canvas when filtering is unsupported or transparency is reduced. Forced colors use system Canvas.
Update the overview to consume NgxButton, shape/surface panel inputs and TypeScript highlighting. Add a scene-backed glass panel with actual dialog/sheet launchers and result feedback.
Preserve existing heading/story and baseline interactions; replace the obsolete gradient-background assertion with an actual shared-button decoration assertion.
Validate all builds, packed Sass consumer and browser suite; check dialog/sheet/select backdrops, dismissal/focus, reduced transparency, mobile layout and both palettes. Capture updated page and open-dialog screenshots.
Constitution: public CDK CSS and Material APIs only, no dependencies/framework changes. No deviations.
