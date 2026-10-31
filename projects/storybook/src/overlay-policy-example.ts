import { ChangeDetectionStrategy, Component, inject, signal, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'ngx-overlay-policy-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatSelectModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  template: `
    <h1>Shared overlay policy</h1>
    <p>
      Native Material portals inherit the document theme. Marked selects retain the closing fade
      frame.
    </p>
    <div class="overlay-policy-example__fields">
      <mat-form-field appearance="outline">
        <mat-label>Domain</mat-label>
        <mat-select
          panelClass="ngx-design-system-overlay ngx-select-panel overlay-policy-example__domain"
          [value]="domain()"
          (selectionChange)="domain.set($event.value)"
        >
          <mat-option value="admin">Admin</mat-option
          ><mat-option value="workshop">Workshop</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Membership</mat-label>
        <mat-select
          multiple
          panelClass="ngx-design-system-overlay ngx-select-panel"
          [value]="membership()"
          (selectionChange)="membership.set($event.value)"
        >
          <mat-option value="admin">Admin</mat-option
          ><mat-option value="workshop">Workshop</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Unmarked comparison</mat-label>
        <mat-select value="admin" panelClass="ngx-design-system-overlay">
          <mat-option value="admin">Admin</mat-option
          ><mat-option value="workshop">Workshop</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
    <p role="status">Selected domain: {{ domain() }} · Membership: {{ membership().join(', ') }}</p>
    <div class="overlay-policy-example__actions">
      <button mat-stroked-button type="button" (click)="openDialog(dialogContent)">
        Open policy dialog
      </button>
      <button mat-stroked-button type="button" (click)="openSheet(sheetContent)">
        Open policy sheet
      </button>
      <button mat-stroked-button type="button" [matMenuTriggerFor]="menu">Policy actions</button>
      <button
        mat-stroked-button
        type="button"
        matTooltip="Shared tooltip"
        matTooltipClass="ngx-design-system-overlay"
      >
        Policy tooltip
      </button>
      <button mat-stroked-button type="button" (click)="notify()">Policy notification</button>
    </div>
    <mat-menu #menu class="ngx-design-system-overlay">
      <button mat-menu-item (click)="action.set('Export selected')">Export</button>
    </mat-menu>
    <p>{{ action() }}</p>
    <ng-template #dialogContent>
      <h2 mat-dialog-title>Policy dialog</h2>
      <mat-dialog-content>Document tokens reach this detached dialog.</mat-dialog-content>
      <mat-dialog-actions
        ><button mat-button mat-dialog-close type="button">Close dialog</button></mat-dialog-actions
      >
    </ng-template>
    <ng-template #sheetContent>
      <section class="overlay-policy-example__sheet">
        <h2>Policy share sheet</h2>
        <button mat-button type="button" (click)="sheet.dismiss()">Close sheet</button>
      </section>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
        max-width: 960px;
      }
      .overlay-policy-example__fields {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
        gap: 1rem;
      }
      .overlay-policy-example__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
      h1,
      p {
        overflow-wrap: anywhere;
      }
      .overlay-policy-example__sheet {
        padding: 1.5rem;
      }
    `,
  ],
})
export class OverlayPolicyExample {
  readonly domain = signal('admin');
  readonly membership = signal(['admin']);
  readonly action = signal('');
  private readonly dialog = inject(MatDialog);
  readonly sheet = inject(MatBottomSheet);
  private readonly snackbar = inject(MatSnackBar);
  openDialog(content: TemplateRef<unknown>) {
    this.dialog.open(content, {
      panelClass: 'ngx-design-system-overlay',
      backdropClass: 'ngx-design-system-backdrop',
      width: '480px',
      maxWidth: 'calc(100vw - 32px)',
    });
  }
  openSheet(content: TemplateRef<unknown>) {
    this.sheet.open(content, {
      panelClass: 'ngx-design-system-overlay',
      backdropClass: 'ngx-design-system-backdrop',
    });
  }
  notify() {
    this.snackbar.open('Policy notification visible', 'Dismiss', {
      panelClass: 'ngx-design-system-overlay',
    });
  }
}
