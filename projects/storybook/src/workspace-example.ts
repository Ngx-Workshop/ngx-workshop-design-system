import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  NgxActionBar,
  NgxButton,
  NgxInlineStatus,
  NgxSaveFeedback,
  NgxSaveState,
} from '@tmdjr/ngx-workshop-design-system';

@Component({
  selector: 'ngx-workspace-example',
  imports: [NgxActionBar, NgxButton, NgxInlineStatus, NgxSaveFeedback, MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="workspace-example">
      <div class="workspace-example__controls" aria-label="Example controls">
        <button
          mat-flat-button
          ngxButton
          surface="outline"
          type="button"
          (click)="state.set('saving')"
        >
          Simulate saving
        </button>
        <button
          mat-flat-button
          ngxButton
          surface="outline"
          type="button"
          (click)="state.set('saved')"
        >
          Simulate success
        </button>
        <button
          mat-flat-button
          ngxButton
          surface="outline"
          type="button"
          (click)="state.set('error')"
        >
          Simulate failure
        </button>
        <button
          mat-flat-button
          ngxButton
          surface="outline"
          type="button"
          (click)="state.set('idle')"
        >
          Clear feedback
        </button>
        <button
          mat-flat-button
          ngxButton
          surface="outline"
          type="button"
          (click)="longName.set(!longName())"
        >
          Toggle long name
        </button>
        <button
          mat-flat-button
          ngxButton
          surface="outline"
          type="button"
          (click)="sticky.set(!sticky())"
        >
          Toggle sticky
        </button>
        <button
          mat-flat-button
          ngxButton
          surface="outline"
          type="button"
          (click)="shown.set(!shown())"
        >
          Toggle action bar
        </button>
      </div>
      @if (shown()) {
        <ngx-action-bar
          heading="Navigation catalog"
          [sticky]="sticky()"
          (heightChange)="height.set($event)"
        >
          <ngx-inline-status
            ngxActionBarIndicators
            [label]="
              count() === null
                ? 'Unplaced destinations: —'
                : count() + (count() === 1 ? ' unplaced destination' : ' unplaced destinations')
            "
            [tone]="(count() ?? 0) > 0 ? 'warning' : 'neutral'"
            [announce]="true"
          />
          <ngx-save-feedback
            ngxActionBarFeedback
            [state]="state()"
            [name]="longName() ? longResource : 'Reports'"
            [retryable]="true"
            (retry)="retryCount.set(retryCount() + 1); state.set('saving')"
          />
          <button
            mat-flat-button
            ngxButton
            shape="chevron"
            surface="outline"
            type="button"
            (click)="count.set((count() ?? 0) + 1)"
          >
            New destination
          </button>
        </ngx-action-bar>
      }
      <p data-testid="measured-height">Action bar height: {{ height() }}px</p>
      <p data-testid="retry-count">Retry requests: {{ retryCount() }}</p>
      <p>
        The application supplies the status, count and retry handler. Use the controls to explore
        wrapping and feedback.
      </p>
      <label>Retained draft <input value="Quarterly reports" /></label>
      <div class="workspace-example__content">Scroll to inspect sticky placement.</div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .workspace-example {
        --ngx-action-bar-top: 24px;
      }
      .workspace-example__controls {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-block-end: 1rem;
      }
      .workspace-example__content {
        min-height: 110vh;
        padding-block-start: 2rem;
      }
      p,
      label {
        overflow-wrap: anywhere;
      }
      input {
        box-sizing: border-box;
        max-width: 100%;
      }
    `,
  ],
})
export class WorkspaceExample {
  readonly state = signal<NgxSaveState>('idle');
  readonly count = signal<number | null>(null);
  readonly height = signal(0);
  readonly retryCount = signal(0);
  readonly longName = signal(false);
  readonly sticky = signal(true);
  readonly shown = signal(true);
  readonly longResource =
    'Quarterly reports and regulatory submissions for the international operations workspace';
}
