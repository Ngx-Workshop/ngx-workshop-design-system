# Plan: shared workspace actions and feedback

Baseline: 9734e85. Angular/Material 21.1.0 and existing NgxButton/public semantic tokens.

Implement NgxActionBar, NgxSaveFeedback and NgxInlineStatus in separate lib files and
export through public-api.ts. Action bar uses projection and afterNextRender with
ResizeObserver and DestroyRef. It emits heightChange only when measured height changes.
The caller supplies --ngx-action-bar-top and can bind emitted height in its workspace.
Save feedback has typed state and computed default messages plus an override; retry is
an output. Indicator tone and announcement attributes are inputs. Keep all domain work
outside these components, satisfying the constitution without deviations.

Add interactive composition and individual component stories, browser checks in
tests/workspace-feedback.spec.ts, and packed-consumer template coverage. Run library,
demo, story typecheck, Storybook, packed consumer and relevant browser tests. Inspect
rendered desktop/mobile screenshots. Update README, architecture and usage docs.

Producer first: user publishes the package, installs the observed release in both
MFEs and aligns shell sharing, then consumer adoption occurs in a later task. No
release version, publication or consumer source change is part of this implementation.
