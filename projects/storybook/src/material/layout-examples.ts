import { ChangeDetectionStrategy, Component, input, signal, effect } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialDemo } from './demo-shell';
@Component({
  selector: 'ngx-layout-examples',
  imports: [
    MaterialDemo,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ngx-material-demo [heading]="heading()">
    @switch (view()) {
      @case ('card') {
        <div class="demo-grid">
          <mat-card appearance="outlined"
            ><mat-card-header
              ><mat-card-subtitle>WORKSHOP / 021</mat-card-subtitle
              ><mat-card-title>Signals in motion</mat-card-title></mat-card-header
            ><mat-card-content
              ><p>Build a reactive Angular experience with shared components.</p>
              @if (loading()) {
                <mat-progress-bar mode="indeterminate" aria-label="Loading workshop details" />
              } @else {
                <p>24 seats available · Intermediate</p>
              }</mat-card-content
            ><mat-card-actions
              ><button
                mat-flat-button
                [disabled]="disabled() || loading()"
                (click)="result.set('Workshop registration selected')"
              >
                Register</button
              ><button mat-button [disabled]="disabled()" (click)="result.set('Workshop saved')">
                Save
              </button></mat-card-actions
            ><mat-card-footer
              ><p class="demo-help">
                Outlined card / projected content and actions
              </p></mat-card-footer
            ></mat-card
          ><mat-card appearance="raised"
            ><mat-card-header
              ><mat-card-title>Component architecture</mat-card-title
              ><mat-card-subtitle>DESIGN NOTES</mat-card-subtitle></mat-card-header
            ><mat-card-content
              ><p>
                Elevation, title hierarchy and content share the same semantic palette.
              </p></mat-card-content
            ><mat-card-actions
              ><button mat-stroked-button (click)="result.set('Design notes opened')">
                Read notes
              </button></mat-card-actions
            ></mat-card
          >
        </div>
        <p class="demo-result" role="status">{{ result() }}</p>
      }
      @case ('divider') {
        <mat-list
          ><mat-list-item>Core foundations</mat-list-item><mat-divider /><mat-list-item
            >Component library</mat-list-item
          ><mat-divider inset /><mat-list-item>Workshop resources</mat-list-item></mat-list
        >
        <div class="demo-row vertical-divider-demo">
          <span>Angular</span><mat-divider vertical /><span>Material</span
          ><mat-divider vertical /><span>CDK</span>
        </div>
      }
      @case ('expansion') {
        <div class="demo-row">
          <button mat-button (click)="accordion.openAll()">Expand all</button
          ><button mat-button (click)="accordion.closeAll()">Collapse all</button>
        </div>
        <mat-accordion #accordion="matAccordion" multi
          ><mat-expansion-panel [expanded]="expanded()"
            ><mat-expansion-panel-header
              ><mat-panel-title>Workshop details</mat-panel-title
              ><mat-panel-description
                >Agenda and format</mat-panel-description
              ></mat-expansion-panel-header
            >
            <p>Build, explore and test an Angular Material design system.</p>
            <mat-action-row
              ><button mat-button (click)="result.set('Agenda saved')">
                Save agenda
              </button></mat-action-row
            ></mat-expansion-panel
          ><mat-expansion-panel
            ><mat-expansion-panel-header
              ><mat-panel-title>Required resources</mat-panel-title></mat-expansion-panel-header
            >
            <p>Node, a modern browser and a local workspace.</p></mat-expansion-panel
          ><mat-expansion-panel [disabled]="disabled()"
            ><mat-expansion-panel-header
              ><mat-panel-title>Advanced session</mat-panel-title
              ><mat-panel-description>{{
                disabled() ? 'Unavailable' : 'Optional'
              }}</mat-panel-description></mat-expansion-panel-header
            >
            <p>Advanced performance and accessibility exercises.</p></mat-expansion-panel
          ></mat-accordion
        >
        <p role="status">{{ result() }}</p>
      }
      @case ('grid-list') {
        <mat-grid-list [cols]="compact() ? 2 : 3" rowHeight="110px" gutterSize="12px"
          ><mat-grid-tile [colspan]="2"><span>01 / Foundations</span></mat-grid-tile
          ><mat-grid-tile><span>02 / Tokens</span></mat-grid-tile
          ><mat-grid-tile><span>03 / Components</span></mat-grid-tile
          ><mat-grid-tile [colspan]="compact() ? 1 : 2"
            ><span>04 / Workshop</span></mat-grid-tile
          ></mat-grid-list
        >
        <p class="demo-help">
          Change the compact control to compare two- and three-column layouts.
        </p>
      }
      @case ('list') {
        @if (empty()) {
          <p class="demo-empty">No resources in this workspace.</p>
        } @else {
          <mat-selection-list
            aria-label="Workshop resources"
            [(ngModel)]="resources"
            [disabled]="disabled()"
            ><mat-list-option value="Source code"
              ><mat-icon matListItemIcon svgIcon="ngx:code" /><span matListItemTitle
                >Source code</span
              ><span matListItemLine>Angular examples and theme tokens</span></mat-list-option
            ><mat-list-option value="Exercises"
              ><mat-icon matListItemIcon svgIcon="ngx:folder" /><span matListItemTitle
                >Exercises</span
              ><span matListItemLine>Hands-on challenges</span></mat-list-option
            ><mat-list-option value="Recordings" disabled
              >Recordings (not available)</mat-list-option
            ></mat-selection-list
          >
          <p class="demo-result" aria-live="polite">
            Selected: {{ resources().join(', ') || 'none' }}
          </p>
        }
      }
      @case ('stepper') {
        <mat-stepper
          #stepper
          [linear]="true"
          [orientation]="compact() ? 'vertical' : 'horizontal'"
          [selectedIndex]="expanded() ? 1 : 0"
          ><mat-step [stepControl]="title"
            ><ng-template matStepLabel>Configure</ng-template>
            <div class="demo-stack">
              <mat-form-field subscriptSizing="dynamic" appearance="outline"
                ><mat-label>Workshop title</mat-label
                ><input matInput [formControl]="title" required /><mat-error
                  >A workshop title is required.</mat-error
                ></mat-form-field
              ><button mat-flat-button matStepperNext (click)="title.markAsTouched()">
                Continue to resources
              </button>
            </div></mat-step
          ><mat-step
            ><ng-template matStepLabel>Resources</ng-template>
            <p>Shared components, token reference and exercises are ready.</p>
            <div class="demo-row">
              <button mat-button matStepperPrevious>Back to configuration</button
              ><button mat-flat-button matStepperNext>Continue to review</button>
            </div></mat-step
          ><mat-step
            ><ng-template matStepLabel>Review</ng-template>
            <p>Ready to create: {{ title.value }}</p>
            <div class="demo-row">
              <button mat-flat-button (click)="result.set('Workshop created locally')">
                Create workshop</button
              ><button mat-button (click)="stepper.reset(); result.set('')">Reset wizard</button>
            </div></mat-step
          ></mat-stepper
        >
        <p class="demo-result" role="status">{{ result() }}</p>
      }
    }
  </ngx-material-demo>`,
})
export class LayoutExamples {
  readonly view = input('card');
  readonly heading = input('Cards');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly expanded = input(false);
  readonly empty = input(false);
  readonly compact = input(false);
  readonly result = signal('');
  readonly resources = signal(['Source code']);
  readonly title = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  constructor() {
    effect(() => {
      if (this.expanded()) this.title.setValue('Angular signals');
    });
  }
}
