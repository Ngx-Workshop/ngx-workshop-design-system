# Workspace actions and feedback

Import `NgxActionBar`, `NgxSaveFeedback` and `NgxInlineStatus` from
`@tmdjr/ngx-workshop-design-system` and add them to the standalone component imports.
Import Material's `MatButton` and `NgxButton` for projected actions. The host supplies
the shared theme, including detached Material overlays as usual.

```html
<section [style.--workspace-bar-height.px]="barHeight()">
  <ngx-action-bar heading="Navigation catalog" (heightChange)="barHeight.set($event)">
    <ngx-inline-status
      ngxActionBarIndicators
      [label]="unplacedLabel()"
      [tone]="hasUnplaced() ? 'warning' : 'neutral'"
      [announce]="true"
    />
    <ngx-save-feedback
      ngxActionBarFeedback
      [state]="saveState()"
      [name]="savedItemName()"
      [retryable]="canRetry()"
      (retry)="retrySave()"
    />
    <button mat-flat-button ngxButton shape="chevron" type="button" (click)="create()">
      New destination
    </button>
  </ngx-action-bar>
  <!-- Workspace content can consume --workspace-bar-height. -->
</section>
```

`barHeight` is a consumer-owned `signal(0)`. The other signals/handlers above belong
to the application. Do not conditionally create save feedback on each notification:
its existing live region must remain mounted to announce subsequent text changes.

## Action bar

| Contract                   | Default  | Meaning                                                          |
| -------------------------- | -------- | ---------------------------------------------------------------- |
| `heading: string`          | Required | Page-level h1; use one action bar heading per page               |
| `sticky: boolean`          | `true`   | Sticky positioning; false restores normal relative layout        |
| `heightChange: number`     | Output   | Initial and changed border-box heights, rounded up in CSS pixels |
| `--ngx-action-bar-top`     | `0px`    | Inherited sticky offset supplied by the shell/consumer           |
| `--ngx-action-bar-z-index` | `10`     | Local stacking order                                             |

Project indicators with `ngxActionBarIndicators`, feedback with `ngxActionBarFeedback`,
and actions as default content. Projection attributes are slot markers; they require
no separate directive imports. Use one wrapper per slot for multiple children if useful.
Content wraps; feedback takes a full row below 720px. The action bar owns no routing,
shell-header measurements, scrolling region or domain-specific buttons. Height is
reported after browser rendering and on resize/content changes; observation stops on
destruction. Without ResizeObserver only the initial height is reported. No browser
measurement runs during server rendering.

Supply `--ngx-action-bar-top` from the actual host, including responsive header sizes;
do not copy another app's fixed offsets. Bind `heightChange` at the owning workspace
when sticky sections need the bar's current height. Avoid using that value to change
the action bar's own size, which could create a resize feedback loop.

## Save feedback

| Input/output          | Default      | Meaning                                                             |
| --------------------- | ------------ | ------------------------------------------------------------------- |
| `state: NgxSaveState` | `idle`       | `idle`, `saving`, `saved`, `error`                                  |
| `name: string`        | Empty        | Optional item name for default messages                             |
| `message: string`     | Empty        | Complete message override, including localization; idle stays empty |
| `retryable: boolean`  | `false`      | Show retry only in error state                                      |
| `retryLabel: string`  | `Retry save` | Localizable button label                                            |
| `retry`               | Output       | User intent; the caller executes/restricts retry                    |

Default messages are Saving…, Changes saved, and Could not save changes, with item
context when `name` is provided. A persistent polite atomic live region contains
only the message; retry is a separate native Material button with `type="button"`.
There is no timeout, request, debounce, retry queue or automatic state transition.
Set saved only after persistence succeeds. Clear it when the application decides;
retain errors until resolved. Render other recovery instructions through `message`
when retry is unavailable. Keep `retryable` false while retry cannot be accepted.

## Inline status

`label` is required and contains the complete localized text, including counts,
pluralization and unknown/zero states. `tone` is `neutral` (default), `info`, `success`,
`warning` or `error`. The dot is decorative and static; text communicates meaning
without relying on color. `announce` defaults to false. Set it true for independently
updated live counts; leave it false inside an existing live region. Existing
`NgxStatus` remains the chip-shaped component and is unchanged.

## Examples and adoption

Storybook: Components → Action bar → Workspace, Save feedback, and Inline status.
The workspace story includes long labels, manual save states, retry intent, optional
stickiness, unknown counts and measured height. Separate stories expose individual
states and localization.

These are additive exports. Publish the producer through the existing workflow;
install the actual published version in both MFEs and ensure the shell provides a
compatible shared singleton before consumer migration. Replace each app's action-bar
presentation while retaining its store/view-model notification semantics, retry rules
and labels. Host/service acceptance remains a consumer adoption check.

## Tablet density

At viewport widths from 600px through 1366px inclusive, action bars use 4px vertical
padding, 8px gaps, 14px headings, 11px inline indicators and 12px save feedback.
The background is solid and content determines the height. Existing feedback
wrapping below 720px and `heightChange` measurement remain active. The range also
applies to desktop windows of the same width; it does not identify a device model.

The bar supplies inherited `--ngx-inline-status-font-size`, `--ngx-inline-status-gap`,
`--ngx-inline-status-dot-size`, `--ngx-save-feedback-font-size` and
`--ngx-save-feedback-gap` properties. A projected status/feedback host can override
these locally. Standalone statuses and feedback retain their original sizing.

Explore **Components → Responsive density → Workspace** at 951 × 585, tablet
portrait/landscape and desktop widths. Toggle panel actions and save to compare
compact buttons, nested panels and persistent feedback.
