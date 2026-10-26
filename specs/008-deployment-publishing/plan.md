# Implementation plan

Status: Implemented; integration pending
Spec: [spec.md](spec.md)

- Add `.github/workflows/deploy.yml`: serialize main pushes/manual retries; use Node 24, npm 11.6.0, existing pinned checkout/setup-node/scp actions, validate SSH settings, select version, run `npm run verify`, publish with OIDC, upload `dist/storybook/*` with two path components stripped.
- Add `scripts/prepare-release.mjs` and unit tests: read public npm metadata, validate Angular alignment, select next MAJOR.0.PATCH or reuse matching gitHead, write library manifest and workflow outputs. Keep source floor at 21.0.1. No repository write permission or release commit needed.
- Add public repository/homepage/publish metadata to the library manifest for provenance and discoverability.
- In `nginx-ngx-workshop.io/docker/nginx.conf`, add an exact HTTPS virtual host with a local static root, index revalidation and missing asset 404s. Existing wildcard HTTP redirect handles the subdomain. Inspection found individual bind mounts in the Nginx workflow; add the catalog mount there as well.
- Document trusted publisher fields, SSH secrets, DNS/TLS, rollout and retry behavior; remove stale statements that deployment is absent.

Constitution: dependency pins and standalone package boundaries preserved. No Material, tokens, accessibility or component behavior changes. Specification and validation recorded here.

Verification: release-selection tests cover patch progression, Angular upgrade, replay, invalid metadata and alignment errors; full library/demo/Storybook/package-consumer verification; YAML inspection and Nginx syntax test using temporary local certificate paths. Live acceptance remains pending operator setup.
