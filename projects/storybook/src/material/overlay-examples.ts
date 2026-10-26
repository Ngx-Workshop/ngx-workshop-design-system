import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  inject,
  TemplateRef,
  DestroyRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialDemo } from './demo-shell';
@Component({
  selector: 'ngx-overlay-examples',
  imports: [
    MaterialDemo,
    MatButtonModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ngx-material-demo [heading]="heading()">
    @switch (view()) {
      @case ('dialog') {
        <button
          mat-flat-button
          class="ngx-action"
          [disabled]="disabled()"
          (click)="openDialog(dialog)"
        >
          Open confirmation dialog</button
        ><ng-template #dialog
          ><h2 mat-dialog-title>
            {{ destructive() ? 'Archive this workshop?' : 'Join this workshop?' }}
          </h2>
          <mat-dialog-content
            ><p>
              {{
                destructive()
                  ? 'The workshop will leave the active list. This local demo can be reset.'
                  : 'Reserve a seat for Signals in motion.'
              }}
            </p></mat-dialog-content
          ><mat-dialog-actions align="end"
            ><button mat-button [mat-dialog-close]="'Cancelled'">Cancel</button
            ><button
              mat-flat-button
              [mat-dialog-close]="destructive() ? 'Workshop archived' : 'Seat reserved'"
            >
              {{ destructive() ? 'Archive workshop' : 'Confirm registration' }}
            </button></mat-dialog-actions
          ></ng-template
        >
      }
      @case ('bottom-sheet') {
        <button mat-flat-button [disabled]="disabled()" (click)="openSheet(sheet)">
          Open share sheet</button
        ><ng-template #sheet
          ><section class="demo-sheet">
            <h2>Share workshop</h2>
            <p>Choose an export format.</p>
            <div class="demo-stack">
              <button mat-stroked-button (click)="chooseSheet('Markdown export selected')">
                Export Markdown</button
              ><button mat-stroked-button (click)="chooseSheet('JSON export selected')">
                Export JSON</button
              ><button mat-button (click)="chooseSheet('Share dismissed')">Cancel sharing</button>
            </div>
          </section></ng-template
        >
      }
      @case ('snack-bar') {
        <div class="demo-row">
          <button mat-flat-button [disabled]="disabled()" (click)="notify()">
            Show notification</button
          ><button mat-stroked-button (click)="snacks.dismiss()">Dismiss notification</button>
        </div>
        <p class="demo-help">
          Notification stays until you dismiss it or choose its action. No short timeout.
        </p>
      }
      @case ('tooltip') {
        <div class="demo-row">
          <button
            mat-stroked-button
            matTooltip="Download the workshop source code"
            [matTooltipDisabled]="disabled()"
            [matTooltipPosition]="position()"
          >
            Workshop source</button
          ><button
            mat-stroked-button
            matTooltip="Visible on keyboard focus as well as hover"
            matTooltipPosition="below"
          >
            Keyboard hint
          </button>
        </div>
        <p class="demo-help">Hover or focus the buttons; Escape dismisses the tooltip.</p>
      }
    }
    <p class="demo-result" role="status">
      {{ result() || 'Ready for interaction' }}
    </p></ngx-material-demo
  >`,
})
export class OverlayExamples {
  readonly view = input('dialog');
  readonly heading = input('Dialog');
  readonly disabled = input(false);
  readonly destructive = input(false);
  readonly position = input<'above' | 'below' | 'left' | 'right'>('above');
  readonly result = signal('');
  private readonly dialogs = inject(MatDialog);
  private readonly sheets = inject(MatBottomSheet);
  readonly snacks = inject(MatSnackBar);
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.dialogs.closeAll();
      this.sheets.dismiss();
      this.snacks.dismiss();
    });
  }
  openDialog(template: TemplateRef<unknown>): void {
    this.dialogs
      .open(template, {
        width: '460px',
        maxWidth: 'calc(100vw - 32px)',
        ariaLabel: this.destructive()
          ? 'Archive workshop confirmation'
          : 'Workshop registration confirmation',
      })
      .afterClosed()
      .subscribe((result) => this.result.set(result || 'Dialog dismissed'));
  }
  openSheet(template: TemplateRef<unknown>): void {
    this.sheets
      .open(template, { ariaLabel: 'Share workshop' })
      .afterDismissed()
      .subscribe((result) => this.result.set(result || 'Share dismissed'));
  }
  chooseSheet(value: string): void {
    this.sheets.dismiss(value);
  }
  notify(): void {
    const bar = this.snacks.open(
      this.destructive() ? 'Connection interrupted' : 'Workshop saved',
      this.destructive() ? 'Retry' : 'Undo',
      { duration: 0 },
    );
    bar
      .onAction()
      .subscribe(() => this.result.set(this.destructive() ? 'Retry requested' : 'Save undone'));
  }
}
