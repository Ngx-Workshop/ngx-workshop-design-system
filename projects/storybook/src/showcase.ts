import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  computed,
  DestroyRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxCodeBlock, NgxPanel, NgxStatus, NgxButton, NgxPanelBackground } from '@tmdjr/ngx-workshop-design-system';

@Component({
  selector: 'ngx-demo-dialog',
  imports: [MatDialogModule, MatButtonModule, NgxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h2 mat-dialog-title>Ready to build something?</h2>
    <mat-dialog-content
      >The shared glass backdrop softens the interface behind this dialog. Your next workshop starts
      with the same components, tokens and keyboard behavior.</mat-dialog-content
    ><mat-dialog-actions align="end"
      ><button mat-flat-button ngxButton shape="beveled" surface="outline" mat-dialog-close>
        Keep exploring</button
      ><button mat-flat-button ngxButton shape="chamfered" [mat-dialog-close]="true">
        Let's build
      </button></mat-dialog-actions
    >`,
})
export class DemoDialog {}

@Component({
  selector: 'ngx-overview-share-sheet',
  imports: [MatButtonModule, NgxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<section class="share-sheet">
    <span>WORKSHOP / SHARE CHANNEL</span>
    <h2>Take the signal with you.</h2>
    <p>
      Choose a local export preview. The scene behind this sheet uses the same shared glass
      backdrop.
    </p>
    <div>
      <button
        mat-flat-button
        ngxButton
        shape="chamfered"
        (click)="sheet.dismiss('Markdown export selected')"
      >
        Export Markdown</button
      ><button
        mat-flat-button
        ngxButton
        shape="beveled"
        surface="outline"
        tone="secondary"
        (click)="sheet.dismiss('JSON export selected')"
      >
        Export JSON</button
      ><button mat-button (click)="sheet.dismiss()">Cancel export</button>
    </div>
  </section>`,
  styles: [
    `
      .share-sheet {
        padding: 14px 8px 24px;
        max-width: 620px;
      }
      .share-sheet > span {
        font: 10px var(--ngx-font-mono);
        letter-spacing: 0.1em;
        color: var(--ngx-color-primary);
      }
      h2 {
        font: 500 24px var(--ngx-font-mono);
        letter-spacing: -0.5px;
      }
      p {
        color: var(--ngx-color-muted);
        line-height: 1.8;
        font-size: 14px;
      }
      .share-sheet > div {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        margin-top: 24px;
      }
    `,
  ],
})
export class DemoShareSheet {
  readonly sheet = inject(MatBottomSheetRef);
}

@Component({
  selector: 'ngx-showcase',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatBottomSheetModule,
    NgxButton,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule,
    NgxCodeBlock,
    NgxPanel,
    NgxStatus,
  ],
  templateUrl: './showcase.html',
  styleUrl: './showcase.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Showcase {
  readonly dialog = inject(MatDialog);
  private readonly sheets = inject(MatBottomSheet);
  readonly previewSurface = signal<NgxPanelBackground>('glass');
  readonly surfaces: NgxPanelBackground[] = ['glass', 'solid', 'grid'];
  readonly surfaceDescription = computed(
    () =>
      ({
        glass: 'A translucent surface over a live color field. Keep the scene, soften the noise.',
        solid:
          'An opaque surface gives content a quiet foundation. Same geometry, a different material.',
        grid: 'A technical grid adds structure without competing with your content.',
      })[this.previewSurface()],
  );
  readonly overlayResult = signal('Choose a preview to explore the shared glass backdrop.');
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.dialog.closeAll();
      this.sheets.dismiss();
    });
  }
  readonly workshopName = signal('Signals from the future');
  readonly level = signal('Intermediate');
  readonly notifications = signal(true);
  readonly saved = signal(false);
  readonly installCommand = `// npm install /path/to/dist/ngx-workshop-ui
import { NgxPanel, NgxButton, NgxCodeBlock } from '@tmdjr/ngx-workshop-design-system';

// Add your shared components to a standalone view.
// Global styles.scss:
// @use '@tmdjr/ngx-workshop-design-system/theme' as ngx;
// @include ngx.theme();`;
  toggleTheme(): void {
    const value =
      document.documentElement.getAttribute('data-ngx-theme') === 'neutral' ? 'neon' : 'neutral';
    document.documentElement.setAttribute('data-ngx-theme', value);
  }
  openDialog(): void {
    this.dialog
      .open(DemoDialog, { width: '520px', maxWidth: 'calc(100vw - 32px)' })
      .afterClosed()
      .subscribe((confirmed) =>
        this.overlayResult.set(
          confirmed ? 'Workshop launch confirmed.' : 'Dialog preview dismissed.',
        ),
      );
  }
  openSheet(): void {
    this.sheets
      .open(DemoShareSheet, { ariaLabel: 'Share workshop preview' })
      .afterDismissed()
      .subscribe((result) => this.overlayResult.set(result || 'Share preview dismissed.'));
  }
  save(): void {
    this.saved.set(true);
  }
}
