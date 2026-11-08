# Compact tablet workspace components

Status: Complete locally; physical-device validation and publication deferred

User intent: preserve the working two-column catalog at the measured 951 × 585 CSS
viewport while reducing the space used by shared workspace chrome.

- FR-001 / AC-001: At 600–1366 CSS px inclusive, action bars have tighter gaps,
  padding, heading, indicator and feedback typography. Keep feedback/live regions
  and retry behavior. Keep the user's solid background and removed minimum height.
- FR-002 / AC-002: NgxButton hosts use 40px height (previous minimum 52px), 20px
  horizontal padding (previous 30px), and 12px labels in this range. Material owns
  behavior and retains its existing touch target. Other viewport widths keep sizing.
- FR-003 / AC-003: Panels reduce frame/header/body/action spacing and title/body
  typography in this range, including nested panels. Empty action slots and empty
  projected action wrappers take no layout space; conditional actions appear again.
- FR-004 / AC-004: Stories demonstrate composition, long feedback and changing
  action content. Verify boundary widths, 951 × 585, tablet and narrow layouts,
  keyboard actions and live-region continuity. Build library, demo and Storybook.

The range is viewport-based (including similarly sized desktop windows), not device
identification. Existing layout breakpoints, APIs, theme colors and phone density
outside this range remain unchanged. No publishing or consumer migration.
