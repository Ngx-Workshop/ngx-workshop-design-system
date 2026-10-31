# Plan: overlay policy

Baseline: 9a5f742. Material/CDK 21.1.0. Existing \_overlays.scss owns nontransparent
CDK glass backdrops; \_index.scss exports overlay-styles() and includes it in theme().
Orchestrator fixes retain select exit frames with animation-fill-mode:forwards
!important on custom panelClass selectors. App portal scopes repeat font/text and
hardcode dark color-scheme, which should instead inherit the document scheme.

Implement overlay-policy() in \_overlays.scss. Share private backdrop declarations
with the existing overlay-styles() export; preserve all transparent exclusions.
Policy emits ngx-design-system-overlay typography, ngx-design-system-backdrop scoped
treatment and opt-in ngx-select-panel final-frame retention. Forward it from the
public theme entry and include once in theme(). Do not synthesize Material palettes
inside portals or alter overlay surfaces/positioning/animation timing.

Constitution check: public tokens/CDK hooks and owned panelClass only; Material owns
control/focus behavior. No dependency/API break or deviation. Tests may identify
installed Material animations to inspect terminal opacity, but production CSS has
no dependency on private DOM or animation names.

Add a live policy story with native select/single+multiple, unmarked comparison,
menu, dialog, sheet, tooltip and snackbar. Test real terminal closing frames for
three dismissal paths and visible reopen; theme inheritance, focus, values,
transparent backdrops and accessibility modes. Run library/demo/story types/static
Storybook/packed consumer plus new and existing overlay browser checks. Pair the marked checks with an unmarked native comparison that reproduces the
terminal opacity reversion, proving regression sensitivity.

Consumers later publish/install the observed release, load theme()/overlay-policy()
globally in the shell, apply panelClass markers and remove local duplicate fixes.
Do not change the consumer repositories during this producer task.
