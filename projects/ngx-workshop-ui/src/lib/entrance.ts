import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';

export type NgxEntranceMotion = 'fade' | 'grow';

/** One-shot entrance on an existing element. Sequencing belongs to the consumer. */
@Directive({ selector: '[ngxEntrance]' })
export class NgxEntrance {
  readonly ngxEntrance = input<NgxEntranceMotion>('fade');
  readonly entranceDelay = input(0);
  readonly entranceDuration = input(240);
  readonly entranceFromHeight = input(150);

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const viewport = host.ownerDocument.defaultView;
      if (!viewport || typeof host.animate !== 'function') return;
      const preference = viewport.matchMedia('(prefers-reduced-motion: reduce)');
      // A focused control must never be hidden by its ancestor's introduction.
      if (preference.matches || host.contains(host.ownerDocument.activeElement)) return;
      const growing = this.ngxEntrance() === 'grow';
      const overflow = host.style.overflow;
      const height = host.getBoundingClientRect().height;
      if (growing) host.style.overflow = 'clip';
      const animation = host.animate(
        growing
          ? [{ height: `${this.entranceFromHeight()}px` }, { height: `${height}px` }]
          : [{ opacity: 0 }, { opacity: 1 }],
        {
          delay: Math.max(0, this.entranceDelay()),
          duration: Math.max(0, this.entranceDuration()),
          easing: growing ? 'cubic-bezier(.2,.7,.2,1)' : 'ease-out',
          fill: 'backwards',
        },
      );
      const restore = () => {
        animation.cancel();
        if (growing) host.style.overflow = overflow;
        viewport.removeEventListener('resize', restore);
        preference.removeEventListener('change', restore);
        host.removeEventListener('focusin', restore);
      };
      viewport.addEventListener('resize', restore);
      preference.addEventListener('change', restore);
      host.addEventListener('focusin', restore);
      void animation.finished.then(restore, restore);
      destroyRef.onDestroy(restore);
    });
  }
}
