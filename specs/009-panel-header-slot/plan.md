# Plan

Add an attribute-selected header projection inside MatCardHeader with owned flex wrappers. Keep heading required and all inputs unchanged. Add a Storybook example and browser checks for slot location, keyboard interaction and mobile overflow. Build library, demo, Storybook and packed consumer. Constitution Check: public Material composition; no private selectors or runtime dependency changes.

Add headingMotion (none/stagger) and headingMotionKey inputs. Computed grapheme entries use keys containing selection, text and index. Owned character spans animate opacity/glow/blur/translation with bounded delays; CSS reduced-motion disables animations. Keep title accessible as one level-two heading, characters aria-hidden. Verify replay, stable metadata refreshes, emoji, reduced motion and mobile widths in Storybook.
