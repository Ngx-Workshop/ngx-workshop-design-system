# Handoff: panel header slot

Implemented the optional `[ngxPanelHeader]` slot beside the heading, retaining
unmarked body and `[ngxPanelActions]` footer projection. Owned flex wrappers allow
header content and long headings to wrap. No inputs, defaults or dependencies change.
Added Components / Panel / Header content story and documented usage.

Verification: library, demo, story typecheck, static Storybook and packed Angular/Sass
consumer all pass. All seven panel browser tests pass, including heading-row
placement, focus, footer retention and 320px overflow checks. Desktop (1280px) and
mobile (320px) screenshots inspected at `/tmp/ngx-panel-header-desktop.png` and
`/tmp/ngx-panel-header-mobile.png`. Existing Sass deprecation and bundle-size
warnings remain. Whitespace checks pass.

Consumer: `mfe-user-journey-admin-mfe-orchestrator` projects selected ID and
MfeRemoteCardHeader into this slot. Its 21 tests and production build pass against
this locally built package. For local verification only, copied built `fesm2022/`
and `types/` into that remote's installed package; retained its 21.0.2 manifest and
registry lockfile. Original code is backed up under
`/var/folders/82/rylsmb_n1p591809975j19t80000gn/T/ngx-panel-header-original-d2jryuw7`.
A clean npm install will restore published 21.0.2, which does not include the slot.

Release integration remains: publish the additive library through its existing
release workflow, then pin the actual published version in both `mfe-shell-admin`
and the orchestrator's package/lockfiles and strict federation share requirements.
Build the host first, then remote, and verify the hosted selected heading/ID/actions
and bounded rail. Existing consumers are compatible with the additive slot, but
the new remote requires it and cannot rely on an older host singleton. No package
was published, no shell version changed, and no commit/push/deployment was performed.
