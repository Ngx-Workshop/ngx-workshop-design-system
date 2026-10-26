import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  NgxButton,
  NgxButtonShape,
  NgxButtonSurface,
  NgxButtonTone,
  NgxButtonMotion,
} from '@tmdjr/ngx-workshop-design-system';
@Component({
  selector: 'ngx-button-lab',
  imports: [NgxButton, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<main class="button-lab">
    <header>
      <span class="eyebrow">NGX / COMMAND INTERFACE</span>
      <h1>Shape the next action.</h1>
      <p>
        Angular geometry. Tactile signals. Material behavior.<br />Hover, tab into a button, or
        activate it to test the sequence.
      </p>
    </header>
    <div class="lab-status">
      <span>SHAPE / {{ shape() }}</span
      ><span>SURFACE / {{ surface() }}</span
      ><span>MOTION / {{ motion() }}</span>
    </div>
    <section class="button-stage" aria-label="Interactive button specimen">
      <div class="stage-scene" aria-hidden="true">
        <i></i><span>INPUT SYSTEM / ONLINE</span><b>ACTIVATE_</b>
      </div>
      <button
        mat-flat-button
        ngxButton
        [shape]="shape()"
        [surface]="surface()"
        [tone]="tone()"
        [motion]="motion()"
        [disabled]="disabled() || busy()"
        [attr.aria-busy]="busy()"
        (click)="activate('Primary command')"
      >
        <mat-icon svgIcon="ngx:arrow" />{{ busy() ? 'Connecting…' : 'Launch workshop' }}
      </button>
      <p>POINTER / ENTER / SPACE</p>
    </section>
    <div class="event-console" aria-live="polite">
      <span>{{ count().toString().padStart(3, '0') }} ACTIVATIONS</span
      ><strong>{{ lastAction() || 'Awaiting input…' }}</strong
      ><button mat-button (click)="reset()">Reset events</button>
    </div>
    <section class="reference-states" aria-labelledby="states-title">
      <h2 id="states-title">States / native semantics</h2>
      <div class="state-grid">
        <div>
          <span>READY</span
          ><button
            mat-flat-button
            ngxButton
            [shape]="shape()"
            surface="filled"
            [tone]="tone()"
            [motion]="motion()"
            (click)="activate('Ready command')"
          >
            Execute command
          </button>
        </div>
        <div>
          <span>DISABLED</span
          ><button
            mat-flat-button
            ngxButton
            [shape]="shape()"
            [surface]="surface()"
            [tone]="tone()"
            disabled
            (click)="activate('Disabled command')"
          >
            Unavailable
          </button>
        </div>
        <div>
          <span>LOADING</span
          ><button
            mat-flat-button
            ngxButton
            [shape]="shape()"
            surface="outline"
            disabled
            aria-busy="true"
          >
            Connecting…
          </button>
        </div>
        <div>
          <span>NAVIGATION</span
          ><a
            mat-flat-button
            ngxButton
            [shape]="shape()"
            surface="outline"
            [tone]="tone()"
            [motion]="motion()"
            [disabled]="disabled()"
            href="#button-destination"
            (click)="!disabled() && activate('Navigation link')"
            >Open resources ↗</a
          >
        </div>
      </div>
    </section>
    <section class="form-specimen">
      <form (submit)="submit($event)">
        <h2>Form / real submit</h2>
        <p>The directive decorates the control. The browser still owns its action.</p>
        <button
          mat-flat-button
          ngxButton
          type="submit"
          [shape]="shape()"
          surface="outline"
          [tone]="tone()"
          [motion]="motion()"
        >
          Submit configuration
        </button>
      </form>
      <p class="form-result" role="status">{{ submission() }}</p>
    </section>
    <p id="button-destination" class="destination">RESOURCE DESTINATION / LOCAL PREVIEW</p>
  </main>`,
  styles: [
    `
      :host {
        display: block;
      }
      .button-lab {
        max-width: 1100px;
        margin: 16px auto;
      }
      .eyebrow,
      .lab-status,
      .stage-scene > span,
      .button-stage > p,
      .event-console > span,
      .state-grid > div > span,
      .destination {
        font: 10px var(--ngx-font-mono);
        letter-spacing: 0.1em;
        color: var(--ngx-color-primary);
      }
      h1 {
        font: 600 clamp(28px, 4vw, 44px) var(--ngx-font-mono);
        letter-spacing: -1.5px;
        margin: 18px 0;
      }
      header p,
      .form-specimen p {
        font-size: 14px;
        line-height: 1.8;
        color: var(--ngx-color-muted);
      }
      .lab-status {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        text-transform: uppercase;
        padding: 20px 0;
        margin-top: 24px;
        border-top: 1px solid var(--ngx-color-border);
      }
      .button-stage {
        position: relative;
        isolation: isolate;
        display: grid;
        align-content: center;
        justify-items: center;
        gap: 18px;
        min-height: 290px;
        padding: 32px;
        border: 1px solid var(--ngx-color-border);
        background: var(--ngx-color-canvas);
      }
      .stage-scene {
        position: absolute;
        inset: 0;
        z-index: -1;
        overflow: hidden;
        background:
          repeating-linear-gradient(0deg, transparent 0 25px, var(--ngx-grid-color) 26px),
          repeating-linear-gradient(90deg, transparent 0 25px, var(--ngx-grid-color) 26px);
      }
      .stage-scene > i {
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          125deg,
          transparent 22%,
          #27f5ef30 22% 36%,
          transparent 36% 65%,
          #ff52c630 65% 79%,
          transparent 79%
        );
      }
      .stage-scene > span {
        position: absolute;
        top: 16px;
        left: 18px;
        font-size: 8px;
        color: var(--ngx-color-muted);
      }
      .stage-scene > b {
        position: absolute;
        bottom: 15%;
        right: 8%;
        font: 700 clamp(30px, 8vw, 80px) var(--ngx-font-mono);
        color: #aa8cff14;
      }
      .button-stage > p {
        font-size: 8px;
        color: var(--ngx-color-muted);
      }
      .event-console {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 24px;
        padding: 18px 0;
        border-bottom: 1px solid var(--ngx-color-border);
      }
      .event-console strong {
        font: 12px var(--ngx-font-mono);
        color: var(--ngx-color-muted);
        font-weight: 400;
      }
      .event-console > button {
        margin-left: auto;
      }
      h2 {
        font: 500 20px var(--ngx-font-mono);
        letter-spacing: -0.5px;
        margin: 34px 0 22px;
      }
      .state-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
        gap: 22px;
      }
      .state-grid > div {
        display: grid;
        justify-items: start;
        align-content: start;
        gap: 16px;
        padding: 20px;
        border: 1px solid var(--ngx-color-border);
        min-width: 0;
      }
      .state-grid > div > span {
        font-size: 9px;
        color: var(--ngx-color-muted);
      }
      .form-specimen {
        border-top: 1px solid var(--ngx-color-border);
        margin-top: 32px;
      }
      .form-result {
        color: var(--ngx-color-primary) !important;
        font: 12px var(--ngx-font-mono);
      }
      .destination {
        padding: 24px 0;
        margin-top: 32px;
        border-top: 1px solid var(--ngx-color-border);
        color: var(--ngx-color-muted);
      }
      @media (max-width: 500px) {
        .button-stage {
          padding: 24px 12px;
        }
        .lab-status {
          gap: 14px;
          font-size: 9px;
        }
        .event-console {
          gap: 12px;
        }
        .event-console > button {
          margin-left: 0;
        }
        .state-grid {
          grid-template-columns: minmax(0, 1fr);
        }
      }
    `,
  ],
})
export class ButtonLab {
  readonly shape = input<NgxButtonShape>('notched');
  readonly surface = input<NgxButtonSurface>('filled');
  readonly tone = input<NgxButtonTone>('primary');
  readonly motion = input<NgxButtonMotion>('scan');
  readonly disabled = input(false);
  readonly busy = input(false);
  readonly count = signal(0);
  readonly lastAction = signal('');
  readonly submission = signal('');
  activate(action: string): void {
    this.count.update((n) => n + 1);
    this.lastAction.set(action + ' activated');
  }
  reset(): void {
    this.count.set(0);
    this.lastAction.set('');
  }
  submit(event: Event): void {
    event.preventDefault();
    this.submission.set('Configuration submitted locally');
  }
}
