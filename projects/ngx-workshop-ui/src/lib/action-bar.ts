import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';

/** Workspace heading and projected actions. The host supplies its sticky offset. */
@Component({
  selector: 'ngx-action-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.position]': "sticky() ? 'sticky' : 'relative'",
    '[style.top]': "sticky() ? 'var(--ngx-action-bar-top, 0px)' : 'auto'",
  },
  template: `
    <h1 class="ngx-action-bar__heading">{{ heading() }}</h1>
    <div class="ngx-action-bar__indicators"><ng-content select="[ngxActionBarIndicators]" /></div>
    <div class="ngx-action-bar__feedback"><ng-content select="[ngxActionBarFeedback]" /></div>
    <div class="ngx-action-bar__actions"><ng-content /></div>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--ngx-space-4);
        box-sizing: border-box;
        z-index: var(--ngx-action-bar-z-index, 10);
        width: 100%;
        min-width: 0;
        min-height: 56px;
        padding: 0.5rem 1rem;
        border-bottom: 1px solid var(--ngx-color-border);
        background: color-mix(in srgb, var(--ngx-color-canvas) 85%, transparent);
        color: var(--ngx-color-text);
        backdrop-filter: blur(16px);
      }
      .ngx-action-bar__heading {
        margin: 0;
        min-width: 0;
        overflow-wrap: anywhere;
        font: 600 1rem/1.4 var(--ngx-font-heading);
      }
      .ngx-action-bar__indicators,
      .ngx-action-bar__feedback,
      .ngx-action-bar__actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--ngx-space-2);
        min-width: 0;
        max-width: 100%;
        overflow-wrap: anywhere;
      }
      .ngx-action-bar__feedback {
        flex: 1;
      }
      .ngx-action-bar__actions {
        margin-inline-start: auto;
      }
      .ngx-action-bar__indicators:empty,
      .ngx-action-bar__actions:empty {
        display: none;
      }
      @media (max-width: 720px) {
        .ngx-action-bar__feedback {
          order: 3;
          flex-basis: 100%;
        }
        .ngx-action-bar__feedback:empty {
          display: none;
        }
      }
      @media (prefers-reduced-transparency: reduce), (forced-colors: active) {
        :host {
          background: var(--ngx-color-canvas);
          backdrop-filter: none;
        }
      }
    `,
  ],
})
export class NgxActionBar {
  readonly heading = input.required<string>();
  readonly sticky = input(true);
  /** Border-box height in CSS pixels, rounded up. Bind in the owning workspace. */
  readonly heightChange = output<number>();

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      let previous = -1;
      const measure = () => {
        const height = Math.ceil(host.getBoundingClientRect().height);
        if (height !== previous) {
          previous = height;
          this.heightChange.emit(height);
        }
      };
      const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
      observer?.observe(host);
      measure();
      destroyRef.onDestroy(() => observer?.disconnect());
    });
  }
}
