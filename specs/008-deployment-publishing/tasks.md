# Tasks

Spec: [spec.md](spec.md) · Plan: [plan.md](plan.md)

- [x] T001: Implement registry-based release preparation and meaningful tests (AC-002/003).
- [x] T002: Implement main-only OIDC publishing and SSH catalog deployment (AC-001/004).
- [x] T003: Configure the exact Nginx static virtual host (AC-005).
- [x] T004: Run builds, release tests, configuration checks and document setup/evidence.
- [ ] X001: Operator configures npm trusted publisher, GitHub secrets, DNS/TLS; pushes changes and verifies a live run and HTTPS catalog.

Evidence: six release tests passed; full `npm run verify` passed; both workflow YAML files parsed;
Nginx syntax check and seven temporary local HTTP/TLS routing assertions passed. See [handoff](handoff.md).
