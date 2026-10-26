import {
  AfterViewInit,
  Directive,
  ElementRef,
  Renderer2,
  DestroyRef,
  inject,
  input,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
export type NgxButtonShape = 'notched' | 'chamfered' | 'beveled' | 'stepped' | 'banner' | 'chevron';
export type NgxButtonTone = 'primary' | 'secondary' | 'danger';
export type NgxButtonSurface = 'filled' | 'outline' | 'glass';
export type NgxButtonMotion = 'none' | 'scan' | 'glitch' | 'pulse';
/** Visual treatment for a native button/anchor already enhanced by Material MatButton. */
@Directive({
  selector: 'button[ngxButton],a[ngxButton]',
  host: {
    class: 'ngx-button',
    '[attr.data-ngx-shape]': 'shape()',
    '[attr.data-ngx-tone]': 'tone()',
    '[attr.data-ngx-surface]': 'surface()',
    '[attr.data-ngx-motion]': 'motion()',
    '(click)': 'onActivate()',
  },
})
export class NgxButton implements AfterViewInit {
  readonly shape = input<NgxButtonShape>('notched');
  readonly tone = input<NgxButtonTone>('primary');
  readonly surface = input<NgxButtonSurface>('filled');
  readonly motion = input<NgxButtonMotion>('scan');
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly material = inject(MatButton, { self: true });
  private decoration?: HTMLElement;
  private press?: Animation;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.press?.cancel();
      if (this.decoration?.parentNode)
        this.renderer.removeChild(this.element.nativeElement, this.decoration);
    });
  }
  ngAfterViewInit(): void {
    const layer = this.renderer.createElement('span') as HTMLElement;
    this.renderer.addClass(layer, 'ngx-button-decoration');
    this.renderer.setAttribute(layer, 'aria-hidden', 'true');
    const scan = this.renderer.createElement('span');
    this.renderer.addClass(scan, 'ngx-button-scan');
    const mask = this.renderer.createElement('span');
    this.renderer.addClass(mask, 'ngx-button-scan-mask');
    this.renderer.appendChild(mask, scan);
    this.renderer.appendChild(layer, mask);
    const host = this.element.nativeElement;
    this.renderer.insertBefore(host, layer, host.firstChild);
    this.decoration = layer;
  }
  protected onActivate(): void {
    const host = this.element.nativeElement;
    const view = host.ownerDocument.defaultView;
    if (
      this.material.disabled ||
      host.matches(':disabled,[aria-disabled="true"]') ||
      this.motion() === 'none' ||
      view?.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof host.animate !== 'function'
    )
      return;
    this.press?.cancel();
    const frames: Record<Exclude<NgxButtonMotion, 'none'>, Keyframe[]> = {
      scan: [
        { transform: 'scale(1)' },
        { transform: 'scale(.96)', offset: 0.25 },
        { transform: 'scale(1)' },
      ],
      glitch: [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-3px) skewX(-1deg)', offset: 0.2 },
        { transform: 'translateX(3px)', offset: 0.4 },
        { transform: 'translateX(-1px)', offset: 0.65 },
        { transform: 'none' },
      ],
      pulse: [
        { transform: 'scale(1)' },
        { transform: 'scale(.96)', offset: 0.2 },
        { transform: 'scale(1.035)', offset: 0.6 },
        { transform: 'scale(1)' },
      ],
    };
    const raw =
      view?.getComputedStyle(host).getPropertyValue('--ngx-button-press-duration').trim() ||
      '300ms';
    const parsed = Number.parseFloat(raw) * (raw.endsWith('ms') ? 1 : raw.endsWith('s') ? 1000 : 1);
    const duration = Number.isFinite(parsed) ? Math.max(0, Math.min(parsed, 1200)) : 300;
    const animation = host.animate(frames[this.motion() as Exclude<NgxButtonMotion, 'none'>], {
      duration,
      easing: this.motion() === 'glitch' ? 'steps(1,end)' : 'cubic-bezier(.16,1,.3,1)',
    });
    animation.id = 'ngx-button-press';
    this.press = animation;
    animation.finished
      .catch(() => undefined)
      .then(() => {
        if (this.press === animation) this.press = undefined;
      });
  }
}
