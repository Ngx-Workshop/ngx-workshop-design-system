# Deployment and npm publishing

The workflow is `.github/workflows/deploy.yml`. Every push to `main` runs it; **Run workflow** on
`main` can retry it. It builds the library, standalone demo and static Storybook, checks story types,
and verifies a packed Angular/Sass consumer. It then publishes
`@tmdjr/ngx-workshop-design-system` and copies Storybook to `/opt/ngx-workshop-design-system/`.

## npm trusted publisher

In the package settings on npmjs.com, create this trusted publisher:

| Field                | Value                        |
| -------------------- | ---------------------------- |
| Publisher            | GitHub Actions               |
| Label (optional)     | Ngx Workshop design system   |
| Organization or user | `Ngx-Workshop`               |
| Repository           | `ngx-workshop-design-system` |
| Workflow filename    | `deploy.yml`                 |
| Environment name     | Leave blank                  |

If **Allowed actions** is shown, enable direct publishing with `npm publish`.
The workflow does not declare a GitHub environment, so the npm environment field must be blank.
Enter just the filename, without `.github/workflows/`. The workflow must exist in GitHub before
the first publish. No `NPM_TOKEN` or `NODE_AUTH_TOKEN` secret is needed. Publishing runs on a
GitHub-hosted runner with `id-token: write`, Node 24 and npm 11.6.0.
The library includes the matching public GitHub repository URL and publishes with provenance.
See [npm's trusted publishing documentation](https://docs.npmjs.com/trusted-publishers/).

## GitHub deployment secrets

Grant this repository the same frontend secrets used by `mfe-shell-admin`:

- `MFE_DROPLET_IP`: frontend/Nginx server address.
- `MFE_SSH_PRIVATE_KEY`: SSH key for that server's root account.
- `MFE_SSH_HOST_FINGERPRINT`: verified SHA256 host fingerprint, in `SHA256:...` format.

These may be repository secrets or organization secrets with this repository selected for access.
They are checked before building or publishing. Keep the server directory writable by root and
its static files readable by Nginx. The workflow matches the existing SCP deployment pattern:
overwrite current files, retain older assets. Files copy directly into the mounted directory,
so catalog deployment does not require an Nginx restart. Upload is not atomic; retry a failed
upload to finish it. Restrict pushes to main to trusted maintainers.

## Version policy and retries

- The checked-in library manifest starts at `21.0.1`; the workspace's private `0.0.0` is unrelated.
- Before each build, query public npm metadata. With `21.0.0` already published, select `21.0.1`,
  then `21.0.2`, etc. The highest published stable patch in the current major determines the next
  version; the checked-in manifest supplies a minimum. Registry errors abort the workflow.
- Major must match the exact installed `@angular/core` major; minor must be zero. When upgrading
  Angular to 22, intentionally change the library version floor to `22.0.0` and its peer versions
  alongside Angular. Subsequent releases increment that line's patch. The script rejects nonzero
  published minors rather than publishing a lower release line by accident.
- The version is written into the runner's source manifest before packaging. It is not committed
  back to main, avoiding automation commits and branch write credentials. npm records the released
  version and source `gitHead`.
- If that commit was already published, reuse its version and skip publishing; the build and SCP
  deployment still run. This supports retrying after a successful publish and failed upload.
- Runs share a concurrency group and running releases are not cancelled. GitHub may replace an
  older pending run with a newer push during a burst. Avoid publishing this package manually while
  CI is releasing. Retrying an old successful run also redeploys its old catalog: use the latest
  main run unless an older catalog is intentionally desired.

## Nginx, DNS and first rollout

1. Add an A record for `design-system.ngx-workshop.io` pointing at the frontend server, or confirm
   an existing wildcard record resolves there. If publishing AAAA, it must reach the same server.
2. Confirm the certificate under `/etc/letsencrypt/live/ngx-workshop.io/` covers
   `design-system.ngx-workshop.io` (for example, a `*.ngx-workshop.io` wildcard certificate).
3. The server directory `/opt/ngx-workshop-design-system` already exists. The Nginx repository
   changes add an exact HTTPS virtual host and the directory's read-only Docker volume mount.
   The existing wildcard HTTP listener redirects to HTTPS. The catalog serves its own `/assets/`
   and returns 404 for missing files rather than inheriting the application proxies.
4. Commit/push the Nginx repository changes. Its workflow validates on push but deploys only on
   **workflow_dispatch**; run **Deploy nginx-ngx-workshop.io** on `main` to rebuild/recreate the
   container with the new config and mount. Its deployment includes `nginx -t` before replacement.
5. Configure npm trust and GitHub secrets, then commit/push the design-system changes to `main`.
   Its workflow publishes first, then uploads the catalog. Before the first upload the new host
   may return 403/404 because the static directory is empty.
6. Verify `https://design-system.ngx-workshop.io/`, `iframe.html`, and a story with its JS/CSS loaded.
   Confirm npm shows `21.0.1` with provenance and that an Angular 21.1.0 app can install it.

Nginx configuration and catalog deployment are separate workflows in separate repositories.
Local build and syntax checks do not confirm DNS, production certificate coverage, server access,
OIDC authentication or successful deployment; those require the first live run.
