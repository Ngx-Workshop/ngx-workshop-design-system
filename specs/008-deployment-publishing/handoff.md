# Handoff: Deployment and npm publishing

Status: Implemented; integration pending
Updated: 2026-10-26
Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md) · Tasks: [tasks.md](tasks.md)

## Delivered

Main-only workflow verifies and publishes the library using npm OIDC, then deploys static
Storybook to the existing frontend server directory. Release preparation selects the next
Angular-major-aligned patch from npm, starts at 21.0.1, and skips repeat publication of a commit.
Nginx gets an exact static virtual host plus the required Docker mount in its own workflow.
Repository metadata and public publishing settings are included in the library package.
The pre-existing root `package.json` production-build script edit was preserved.

## Verification

| Check                                          | Result             | Boundary                                                                                                      |
| ---------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------- |
| `node --test scripts/prepare-release.test.mjs` | PASS, 6 tests      | First patch, highest patch, replay, Angular upgrade, version floor, invalid inputs                            |
| Public npm registry metadata read              | PASS               | Registry latest is 21.0.0; selection is 21.0.1; no publish performed                                          |
| `npm run verify`                               | PASS               | Production library, standalone demo, story types, static Storybook, packed Angular/Sass consumer              |
| YAML parsing with installed `js-yaml`          | PASS               | Both workflows parse and contain main push triggers; no GitHub execution claimed                              |
| `git diff --check` in both repos               | PASS               | Whitespace validation                                                                                         |
| `nginx -t`                                     | PASS               | Installed local Nginx, temporary self-signed certificate paths and local mime.types include                   |
| Temporary local Nginx HTTP/TLS requests        | PASS, 7 assertions | Index, iframe and catalog CSS served; missing file, API and remote routes return 404; HTTP redirects to HTTPS |
| Live GitHub/npm/production deployment          | NOT RUN            | Requires operator trust/secrets/DNS/TLS and pushing the changes                                               |

Builds retain the documented upstream Material Sass deprecations and Storybook bundle warnings.
Local Nginx checks used the full edited config with temporary fixture content, unprivileged local
ports and a test certificate. They do not verify the deployed Docker image or production TLS.

## Rollout and remaining work

Follow [docs/deployment.md](../../docs/deployment.md). X001 remains: configure npm trust with
`Ngx-Workshop / ngx-workshop-design-system / deploy.yml`, no environment; grant this repo the
three existing MFE SSH secrets; configure DNS and verify wildcard certificate coverage.
Push Nginx changes and manually dispatch its main deployment to recreate the container with the
new mount. Push design-system changes to main and check the published package and public catalog.
Nothing was committed, pushed, published or deployed during local implementation.

README, AGENTS, architecture, development and feature index now describe the configured workflow.
