# Shared workspace actions and feedback

Status: Implemented locally; publication and consumer adoption deferred
Created: 2026-10-31

## Problem and scope

The orchestrator and navigation migrations repeat sticky action bars, save feedback
and inline warning indicators. Deliver three independent, additive presentation APIs
in this library. Consumer migration and package publication are deferred by the user.

## Requirements and acceptance

- FR-001 / AC-001: A heading and projected indicator, feedback and action slots wrap
  without page overflow at 320px. Sticky placement accepts a host-owned offset.
  Height changes are reported after layout, including feedback wrapping; observers
  disconnect when removed. Sticky behavior can be disabled.
- FR-002 / AC-002: Save feedback keeps a polite, atomic live region mounted through
  idle, saving, saved and error. A consumer can override the message and optionally
  expose a native Material retry action. Retry emits intent and never performs I/O.
  Success/error remain visible until the consumer changes state; no timers.
- FR-003 / AC-003: An inline indicator displays a decorative dot and text in neutral,
  info, success, warning or error tones. Optional announcements default off so static
  indicators and enclosing live regions do not duplicate announcements.
- FR-004 / AC-004: Public exports compile from a packed consumer. Storybook demonstrates
  independent states and composition; keyboard, light/dark themes and narrow layouts
  are verified. Components use signals, OnPush and semantic tokens.

## Boundaries

Consumers own labels/counts/pluralization, requests, autosave, retry execution,
notification lifetime, routes and shell offsets. Material owns button behavior.
No private Material selectors, animation, backend access or new dependencies.
Existing NgxStatus chip API is unchanged. Hosted MFE acceptance is outside this scope.
