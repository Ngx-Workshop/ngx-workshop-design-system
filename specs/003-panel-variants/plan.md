# Plan

Extend NgxPanel with typed shape, background and motion signal inputs. Preserve tone, heading, eyebrow and projections.
Use component-scoped semantic polygon variables to clip only pseudo-element frame/surface layers; keep the default --ngx-frame-shape override contract.
Separate outer stroke from inner surface so transparent glass does not reveal a solid frame fill. Use an evenodd CSS polygon ring with a translated inner polygon.
Use Angular 21.1 native animate.enter/animate.leave host bindings and component-local CSS keyframes; no timer-based structural removal.
CSS reduced-motion overrides shorten transitions regardless of the global theme. Exiting host uses inert and pointer suppression for the exit duration.
Storybook gets comparison galleries and a standalone lifecycle demo with shape, background and motion controls plus show/hide/replay actions.
Validate real removal delay, keyboard and reduced-motion behavior in Chromium, screenshots, glass blur support/fallback and actual packed-consumer compilation.
Reference: https://angular.dev/guide/animations documents native host bindings and removal timing. Inspect local Angular compiler and validate actual 21.1 behavior.
Constitution check: public Material card overrides, independent package, no framework changes; no deviations.
