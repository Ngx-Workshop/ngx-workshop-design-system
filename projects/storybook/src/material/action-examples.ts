import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MaterialDemo } from './demo-shell';
import { NgxButton } from '@tmdjr/ngx-workshop-design-system';
@Component({
  selector: 'ngx-action-examples',
  imports: [
    MaterialDemo,
    NgxButton,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ngx-material-demo [heading]="heading()">
    @switch (view()) {
      @case ('button') {
        <div class="demo-row">
          <button mat-button [disabled]="disabled()" (click)="activate('Text')">Text</button
          ><button mat-flat-button [disabled]="disabled()" (click)="activate('Filled')">
            Filled</button
          ><button mat-raised-button [disabled]="disabled()" (click)="activate('Elevated')">
            Elevated</button
          ><button mat-stroked-button [disabled]="disabled()" (click)="activate('Outlined')">
            Outlined</button
          ><button
            mat-flat-button
            ngxButton
            shape="chamfered"
            [disabled]="disabled() || loading()"
            (click)="activate('HUD')"
          >
            {{ loading() ? 'Connecting…' : 'HUD action' }}</button
          ><button
            mat-icon-button
            aria-label="Favorite workshop"
            [disabled]="disabled()"
            (click)="activate('Icon')"
          >
            <mat-icon svgIcon="ngx:star" /></button
          ><button
            mat-fab
            aria-label="Add workshop"
            [disabled]="disabled()"
            (click)="activate('FAB')"
          >
            <mat-icon svgIcon="ngx:add" /></button
          ><button mat-fab extended [disabled]="disabled()" (click)="activate('Extended FAB')">
            <mat-icon svgIcon="ngx:add" />New workshop
          </button>
        </div>
        <p class="demo-result" role="status">
          {{ lastAction() || 'Activate any button to see its event.' }}
        </p>
      }
      @case ('button-toggle') {
        <div class="demo-stack">
          <mat-button-toggle-group
            aria-label="Editor layout"
            [(ngModel)]="layout"
            [disabled]="disabled()"
            ><mat-button-toggle value="code">Code</mat-button-toggle
            ><mat-button-toggle value="split">Split</mat-button-toggle
            ><mat-button-toggle value="preview">Preview</mat-button-toggle></mat-button-toggle-group
          ><mat-button-toggle-group
            aria-label="Enabled layers"
            multiple
            [(ngModel)]="layers"
            [disabled]="disabled()"
            ><mat-button-toggle value="grid">Grid</mat-button-toggle
            ><mat-button-toggle value="guides">Guides</mat-button-toggle
            ><mat-button-toggle value="nodes">Nodes</mat-button-toggle></mat-button-toggle-group
          >
          <p class="demo-result" aria-live="polite">
            Layout: {{ layout() }} / Layers: {{ layers().join(', ') || 'none' }}
          </p>
        </div>
      }
      @case ('badge') {
        <div class="demo-row">
          <button
            mat-stroked-button
            [matBadge]="count()"
            [matBadgeHidden]="count() === 0"
            matBadgeDescription="Unread workshop notifications"
            (click)="count.set(0)"
          >
            Notifications</button
          ><span matBadge="!" matBadgeDescription="Attention required" matBadgeSize="small"
            >System alert</span
          ><span matBadge="12" [matBadgeDisabled]="true" matBadgeDescription="Archived notices"
            >Archived</span
          ><button mat-button (click)="count.update(increment)">Add notification</button>
        </div>
        <p class="demo-result" role="status">
          {{ count() }} unread notifications. Activate Notifications to clear.
        </p>
      }
      @case ('icon') {
        <div class="demo-grid">
          @for (name of icons; track name) {
            <div class="icon-tile">
              <mat-icon [svgIcon]="'ngx:' + name" /><span>{{ name }}</span>
            </div>
          }
        </div>
        <p class="demo-help">
          Original inline SVGs inherit the theme. Decorative icons are hidden; icon-only actions
          have accessible names.
        </p>
        <button
          mat-icon-button
          aria-label="Download component source"
          (click)="activate('Download')"
        >
          <mat-icon svgIcon="ngx:download" />
        </button>
        <p role="status">{{ lastAction() }}</p>
      }
      @case ('progress-bar') {
        <div class="demo-stack">
          <label>Foundation compile / {{ progress() }}%</label
          ><mat-progress-bar
            [mode]="indeterminate() ? 'indeterminate' : 'determinate'"
            [value]="progress()"
            aria-label="Foundation compile"
          /><label>Asset transfer / buffered</label
          ><mat-progress-bar
            mode="buffer"
            [value]="progress()"
            [bufferValue]="Math.min(progress() + 20, 100)"
            aria-label="Buffered asset transfer"
          /><mat-progress-bar mode="query" aria-label="Checking build queue" />
          <div class="demo-row">
            <button mat-stroked-button (click)="advance()">Advance progress</button
            ><button mat-button (click)="progress.set(0)">Reset progress</button>
          </div>
          <p role="status">{{ progress() === 100 ? 'Build complete' : 'Build running' }}</p>
        </div>
      }
      @case ('progress-spinner') {
        <div class="demo-row">
          <mat-progress-spinner
            [mode]="indeterminate() ? 'indeterminate' : 'determinate'"
            [value]="progress()"
            [diameter]="72"
            aria-label="Workshop loading progress"
          /><mat-spinner [diameter]="32" aria-label="Sync in progress" /><span class="demo-result"
            >{{ progress() }}%</span
          ><button mat-stroked-button (click)="advance()">Advance progress</button>
        </div>
      }
      @case ('ripple') {
        <button
          class="ripple-target"
          matRipple
          [matRippleDisabled]="disabled()"
          (click)="activate('Ripple')"
        >
          <mat-icon svgIcon="ngx:code" /> Activate ripple surface
        </button>
        <p class="demo-result" role="status">
          {{
            lastAction() ||
              'Click or press Enter. Reduced-motion preference is respected by the theme.'
          }}
        </p>
      }
    }
  </ngx-material-demo>`,
})
export class ActionExamples {
  readonly view = input('button');
  readonly heading = input('Buttons');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly indeterminate = input(false);
  readonly lastAction = signal('');
  readonly layout = signal('split');
  readonly layers = signal(['grid']);
  readonly count = signal(4);
  readonly progress = signal(36);
  readonly Math = Math;
  readonly icons = [
    'code',
    'star',
    'folder',
    'settings',
    'notifications',
    'download',
    'add',
    'check',
    'close',
    'info',
  ];
  readonly increment = (n: number) => n + 1;
  activate(name: string): void {
    this.lastAction.set(name + ' action activated');
  }
  advance(): void {
    this.progress.update((n) => Math.min(100, n + 16));
  }
}
