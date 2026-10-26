import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  inject,
  ElementRef,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
export type NgxPanelTone = 'primary' | 'secondary' | 'danger';
export type NgxPanelShape = 'notched' | 'chamfered' | 'beveled' | 'stepped' | 'banner';
export type NgxPanelBackground = 'grid' | 'solid' | 'glass';
export type NgxPanelMotion = 'none' | 'boot' | 'glitch' | 'hologram';
/** Material card composition with interchangeable HUD geometry, surfaces and native lifecycle motion. */
@Component({
  selector: 'ngx-panel',
  imports: [MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-shape]': 'shape()',
    '[attr.data-background]': 'background()',
    '[attr.data-motion]': 'motion()',
    '[animate.enter]': 'enterClass()',
    '[animate.leave]': 'leaveClass()',
    '(animationstart)': 'onAnimationStart($event)',
  },
  template: `<div class="frame" [attr.data-tone]="tone()">
    <span class="frame-detail" aria-hidden="true"></span
    ><span class="scan-line" aria-hidden="true"></span
    ><mat-card appearance="outlined"
      ><mat-card-header
        ><mat-card-subtitle>{{ eyebrow() }}</mat-card-subtitle
        ><mat-card-title>{{ heading() }}</mat-card-title></mat-card-header
      ><mat-card-content><ng-content /></mat-card-content
      ><mat-card-actions><ng-content select="[ngxPanelActions]" /></mat-card-actions
    ></mat-card>
  </div>`,
  styleUrl: './panel.scss',
})
export class NgxPanel {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  protected onAnimationStart(event: AnimationEvent): void {
    const host = this.element.nativeElement;
    if (event.target === host && host.className.includes('ngx-panel-leave-')) host.inert = true;
  }

  readonly heading = input.required<string>();
  readonly eyebrow = input('Workshop module');
  readonly tone = input<NgxPanelTone>('primary');
  readonly shape = input<NgxPanelShape>('notched');
  readonly background = input<NgxPanelBackground>('grid');
  readonly motion = input<NgxPanelMotion>('none');
  protected readonly enterClass = computed(() =>
    this.motion() === 'none' ? '' : `ngx-panel-enter-${this.motion()}`,
  );
  protected readonly leaveClass = computed(() =>
    this.motion() === 'none' ? '' : `ngx-panel-leave-${this.motion()}`,
  );
}
