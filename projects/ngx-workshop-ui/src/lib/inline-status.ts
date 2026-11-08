import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type NgxInlineStatusTone = 'neutral' | 'info' | 'success' | 'warning' | 'error';

/** Compact status text; callers own counts, wording and when to announce updates. */
@Component({
  selector: 'ngx-inline-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-tone]': 'tone()',
    '[attr.role]': "announce() ? 'status' : null",
    '[attr.aria-live]': "announce() ? 'polite' : null",
    '[attr.aria-atomic]': "announce() ? 'true' : null",
  },
  template: `<span class="ngx-inline-status__light" aria-hidden="true"></span
    ><span>{{ label() }}</span>`,
  styles: [
    `
      :host {
        --_status-color: var(--ngx-color-muted);
        display: inline-flex;
        align-items: center;
        gap: var(--ngx-inline-status-gap, var(--ngx-space-2));
        min-width: 0;
        max-width: 100%;
        color: var(--_status-color);
        font: var(--ngx-inline-status-font-size, 0.75rem) / 1.5 var(--ngx-font-mono);
        overflow-wrap: anywhere;
      }
      :host([data-tone='info']) {
        --_status-color: var(--ngx-color-primary);
      }
      :host([data-tone='success']) {
        --_status-color: var(--ngx-color-success);
      }
      :host([data-tone='warning']) {
        --_status-color: var(--ngx-color-warning);
      }
      :host([data-tone='error']) {
        --_status-color: var(--ngx-color-error);
      }
      span {
        min-width: 0;
      }
      .ngx-inline-status__light {
        flex: 0 0 var(--ngx-inline-status-dot-size, 0.5rem);
        width: var(--ngx-inline-status-dot-size, 0.5rem);
        height: var(--ngx-inline-status-dot-size, 0.5rem);
        border-radius: 50%;
        background: currentColor;
        box-shadow: 0 0 0.5rem color-mix(in srgb, currentColor 40%, transparent);
      }
      :host([data-tone='neutral']) .ngx-inline-status__light {
        background: var(--ngx-color-border);
        box-shadow: none;
      }
      @media (forced-colors: active) {
        .ngx-inline-status__light {
          background: CanvasText;
          box-shadow: none;
        }
      }
    `,
  ],
})
export class NgxInlineStatus {
  readonly label = input.required<string>();
  readonly tone = input<NgxInlineStatusTone>('neutral');
  readonly announce = input(false);
}
