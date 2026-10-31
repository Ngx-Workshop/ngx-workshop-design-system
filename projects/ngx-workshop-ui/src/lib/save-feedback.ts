import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NgxButton } from './button';

export type NgxSaveState = 'idle' | 'saving' | 'saved' | 'error';

/** Presentation only: callers own persistence, retry execution and state lifetime. */
@Component({
  selector: 'ngx-save-feedback',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, NgxButton],
  host: { '[attr.data-state]': 'state()' },
  template: `
    <span class="ngx-save-feedback__message" role="status" aria-live="polite" aria-atomic="true">{{
      text()
    }}</span>
    @if (state() === 'error' && retryable()) {
      <button
        mat-flat-button
        ngxButton
        surface="outline"
        tone="danger"
        type="button"
        (click)="retry.emit()"
      >
        {{ retryLabel() }}
      </button>
    }
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--ngx-space-2);
        min-width: 0;
        max-width: 100%;
        color: var(--ngx-color-muted);
        font: 0.8rem/1.5 var(--ngx-font-body);
        overflow-wrap: anywhere;
      }
      :host([data-state='saved']) {
        color: var(--ngx-color-success);
      }
      :host([data-state='error']) {
        color: var(--ngx-color-error);
      }
      .ngx-save-feedback__message {
        min-width: 0;
      }
    `,
  ],
})
export class NgxSaveFeedback {
  readonly state = input<NgxSaveState>('idle');
  readonly name = input('');
  /** Optional complete localized message. Idle always clears the live region. */
  readonly message = input('');
  readonly retryable = input(false);
  readonly retryLabel = input('Retry save');
  readonly retry = output<void>();
  protected readonly text = computed(() => {
    if (this.state() === 'idle') return '';
    if (this.message()) return this.message();
    const name = this.name();
    switch (this.state()) {
      case 'saving':
        return name ? `Saving ${name}…` : 'Saving…';
      case 'saved':
        return name ? `Changes saved · ${name}` : 'Changes saved';
      case 'error':
        return name ? `Could not save ${name}.` : 'Could not save changes.';
      default:
        return '';
    }
  });
}
