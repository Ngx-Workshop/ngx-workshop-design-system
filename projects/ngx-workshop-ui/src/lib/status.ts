import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
export type NgxStatusTone = 'success' | 'warning' | 'error' | 'info';
/** A labeled, non-interactive status. Use live regions in the consuming view for updates. */
@Component({
  selector: 'ngx-status',
  imports: [MatChipsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<mat-chip-set [attr.aria-label]="'Status: ' + label()"
    ><mat-chip [attr.data-tone]="tone()"
      ><span aria-hidden="true">● </span>{{ label() }}</mat-chip
    ></mat-chip-set
  >`,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
})
export class NgxStatus {
  readonly label = input('Online');
  readonly tone = input<NgxStatusTone>('success');
}
