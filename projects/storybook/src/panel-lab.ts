import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  inject,
  ElementRef,
  DestroyRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  NgxPanel,
  NgxPanelShape,
  NgxPanelBackground,
  NgxPanelMotion,
  NgxPanelTone,
  NgxStatus,
} from '@tmdjr/ngx-workshop-design-system';
@Component({
  selector: 'ngx-panel-lab',
  imports: [NgxPanel, NgxStatus, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<section class="lab">
    <header>
      <span>NGX / PANEL ENGINE</span>
      <h1>Geometry. Surface. Signal.</h1>
      <p>Compose a panel, then power it on and off. Shape, surface and motion are independent.</p>
    </header>
    <div class="controls">
      <button mat-flat-button class="ngx-action" (click)="show()" [disabled]="cycling()">
        Show panel</button
      ><button mat-stroked-button (click)="hide()" [disabled]="cycling()">Hide panel</button
      ><button
        mat-stroked-button
        (click)="cycle()"
        [attr.aria-disabled]="cycling()"
        [attr.aria-busy]="cycling()"
      >
        Replay transition</button
      ><span role="status">{{ visible() ? 'Panel online' : 'Panel offline' }}</span>
    </div>
    <div class="stage">
      <div class="scene" aria-hidden="true">
        <span>TRANSMISSION / 021</span><i></i><b>NGX</b
        ><span>GLASS REVEALS THE SCENE BEHIND IT</span>
      </div>
      <div class="panel-slot">
        @if (visible()) {
          <ngx-panel
            heading="Workshop uplink"
            eyebrow="LIVE / NATIVE LIFECYCLE"
            [shape]="shape()"
            [background]="background()"
            [motion]="motion()"
            [tone]="tone()"
            ><p>
              Your next Angular experience starts with a shared foundation. Every surface responds
              to the same system.
            </p>
            <ngx-status label="Uplink established" />
            <div ngxPanelActions><button mat-stroked-button>Inspect uplink</button></div></ngx-panel
          >
        }
      </div>
    </div>
    <div class="readout">
      <span>SHAPE / {{ shape() }}</span
      ><span>SURFACE / {{ background() }}</span
      ><span>MOTION / {{ motion() }}</span>
    </div>
    <p class="note">
      Use the Storybook controls to change the configuration. The glass background blurs the colored
      scene behind it. Reduced-motion preferences skip the visual sequence.
    </p>
  </section>`,
  styles: [
    `
      :host {
        display: block;
      }
      .lab {
        max-width: 1000px;
        margin: 16px auto;
        color: var(--ngx-color-text);
      }
      header > span,
      .readout,
      .controls > span {
        font: var(--ngx-font-label);
        color: var(--ngx-color-primary);
      }
      h1 {
        font: 600 clamp(24px, 4vw, 38px) var(--ngx-font-mono);
        letter-spacing: -1px;
      }
      p {
        color: var(--ngx-color-muted);
        line-height: 1.8;
        font-size: 14px;
      }
      .controls {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 12px;
        margin: 26px 0;
      }
      .controls > span {
        margin-left: auto;
      }
      .stage {
        position: relative;
        isolation: isolate;
        display: grid;
        place-items: center;
        min-height: 440px;
        padding: 44px 24px;
        border: 1px solid var(--ngx-color-border);
        background: var(--ngx-color-canvas);
      }
      .scene {
        position: absolute;
        inset: 0;
        z-index: -1;
        overflow: hidden;
        background:
          repeating-linear-gradient(90deg, transparent 0 49px, #27f5ef0c 50px),
          repeating-linear-gradient(0deg, transparent 0 49px, #27f5ef0c 50px);
      }
      .scene > i {
        position: absolute;
        width: 70%;
        height: 100%;
        top: 0;
        left: 20%;
        background: linear-gradient(
          120deg,
          transparent 12%,
          #27f5ef70 12% 24%,
          transparent 24% 58%,
          #ff52c670 58% 72%,
          transparent 72%
        );
        transform: skewX(-12deg);
      }
      .scene > b {
        position: absolute;
        left: 15%;
        top: 22%;
        color: #aa8cff70;
        font: bold clamp(60px, 15vw, 150px) var(--ngx-font-mono);
      }
      .scene > span {
        position: absolute;
        top: 18px;
        left: 20px;
        color: var(--ngx-color-muted);
        font: 10px var(--ngx-font-mono);
      }
      .scene > span:last-child {
        top: auto;
        bottom: 18px;
        left: auto;
        right: 20px;
        font-size: 8px;
      }
      .panel-slot {
        width: min(100%, 560px);
        min-width: 0;
      }
      .readout {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        padding: 18px 0;
        border-bottom: 1px solid var(--ngx-color-border);
        font-size: 10px;
        text-transform: uppercase;
      }
      .note {
        font-size: 12px;
      }
      @media (max-width: 500px) {
        .stage {
          padding: 32px 12px;
        }
        .controls > span {
          width: 100%;
          margin: 4px 0;
        }
        .readout {
          gap: 12px;
        }
      }
    `,
  ],
})
export class PanelLab {
  readonly shape = input<NgxPanelShape>('notched');
  readonly background = input<NgxPanelBackground>('glass');
  readonly motion = input<NgxPanelMotion>('boot');
  readonly tone = input<NgxPanelTone>('primary');
  readonly visible = signal(true);
  readonly cycling = signal(false);
  show(): void {
    this.visible.set(true);
  }
  hide(): void {
    this.visible.set(false);
  }
  async cycle(): Promise<void> {
    if (this.cycling()) return;
    this.cycling.set(true);
    this.visible.set(false);
    // Demo orchestration waits for real DOM removal rather than guessing a duration.
    await new Promise<void>((resolve) => {
      const observer = new MutationObserver(() => {
        if (!this.host.nativeElement.querySelector('ngx-panel')) {
          observer.disconnect();
          resolve();
        }
      });
      this.replayObserver = observer;
      observer.observe(this.host.nativeElement, { childList: true, subtree: true });
      if (!this.host.nativeElement.querySelector('ngx-panel')) {
        observer.disconnect();
        resolve();
      }
    });
    if (!this.destroyed) {
      this.visible.set(true);
      this.cycling.set(false);
    }
  }
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private destroyed = false;
  private replayObserver?: MutationObserver;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.replayObserver?.disconnect();
    });
  }
}
