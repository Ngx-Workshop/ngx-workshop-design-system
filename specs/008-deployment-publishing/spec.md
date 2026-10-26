# Feature: Deployment and npm publishing

Status: Implemented; integration pending
Created: 2026-10-26
Request: Deploy the catalog at design-system.ngx-workshop.io and publish on main.

## Requirements and acceptance

- FR-001 / AC-001: A push to main builds and verifies the library, demo and static Storybook, then publishes the library and copies Storybook to `/opt/ngx-workshop-design-system` using the existing frontend SSH secret contract.
- FR-002 / AC-002: The first release after published 21.0.0 is 21.0.1. Subsequent releases increment the highest published patch for the installed Angular major, with minor zero. A new Angular major starts at MAJOR.0.0. Registry/network failures stop release selection.
- FR-003 / AC-003: Retrying a commit already published reuses its version and retries deployment without another publish. Release runs are serialized.
- FR-004 / AC-004: Publishing uses GitHub-hosted OIDC, with exact trusted publisher setup documented. Only main can publish or deploy.
- FR-005 / AC-005: Nginx serves the catalog and its own assets over HTTPS without inheriting application API or shared asset routing.

## Boundaries and assumptions

Storybook is the public design-system catalog; the standalone showcase remains a build check. The registry is the release ledger; version increments are applied in the runner without commits back to main. Local package version is the minimum next release. DNS, certificate coverage, GitHub secrets and npm trust configuration are operator setup. Live publishing and deployment cannot be verified until those are configured and the changes reach GitHub. No component behavior or consumer API changes.
