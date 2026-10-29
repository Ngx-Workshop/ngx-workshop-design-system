import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

function traceRandom(seed: number, index: number): number {
  let value = (seed ^ Math.imul(index + 1, 0x9e3779b9)) >>> 0;
  value = Math.imul(value ^ (value >>> 16), 0x85ebca6b);
  value = Math.imul(value ^ (value >>> 13), 0xc2b2ae35);
  return ((value ^ (value >>> 16)) >>> 0) / 0x100000000;
}

/** Bound geometry density to keep the decorative SVG small. */
function bounded(value: number, minimum: number, maximum: number, fallback: number): number {
  return Number.isFinite(value) ? Math.min(maximum, Math.max(minimum, value)) : fallback;
}

function rhombusLattice(
  size: number,
  aspectRatio: number,
  spacing: number,
  rotation: number,
): { outline: string; traces: string[] } {
  const lattice = { outline: '', traces: Array<string>(8).fill('') };
  let count = 0;
  const angle = (rotation * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const draw = (
    x: number,
    y: number,
    width: number,
    height: number,
    originX: number,
    originY: number,
  ): void => {
    const n = (value: number) => Math.round(value * 100) / 100;
    const vertices = [
      [x, y - height],
      [x + width, y],
      [x, y + height],
      [x - width, y],
    ];
    const path =
      vertices
        .map(([vx, vy], index) => {
          const dx = vx - originX;
          const dy = vy - originY;
          return `${index ? 'L' : 'M'}${n(originX + dx * cos - dy * sin)},${n(originY + dx * sin + dy * cos)}`;
        })
        .join('') + 'Z';
    lattice.outline += path;
    lattice.traces[count++ % 8] += path;
  };
  const halfWidth = size / 2;
  const halfHeight = halfWidth * aspectRatio;
  const stepX = size * spacing;
  const stepY = halfHeight * spacing;
  // Avoid an extra row when floating-point math lands just above a whole number.
  const rows = Math.ceil(416 / stepY - 1e-9);
  const columns = Math.ceil(1440 / stepX) + 1;
  for (let row = 0; row < rows; row++) {
    for (let column = -1; column < columns; column++) {
      const x = column * stepX + ((row % 2) * stepX) / 2;
      const y = 846 - halfHeight - (rows - 1 - row) * stepY;
      draw(x, y, halfWidth, halfHeight, x, y);
    }
  }
  return lattice;
}

/** Theme-aware decoration. Place inside an isolated, positioned container. */
@Component({
  selector: 'ngx-background',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    '[attr.data-placement]': 'placement()',
    '[attr.data-animated]': 'animated()',
    '[attr.data-design]': 'design()',
  },
  template: `
    <div class="field">
      <div class="pattern"></div>
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" focusable="false">
        <g>
          <path class="structure" [attr.d]="lattice().outline" />
          @for (trace of lattice().traces; track $index) {
            <path
              class="trace"
              [attr.d]="trace"
              [style.--trace-delay]="delays()[$index]"
              [style.--trace-length-factor]="lengths()[$index]"
            />
          }
        </g>
      </svg>
    </div>
  `,
  styleUrl: './background.scss',
})
export class NgxBackground {
  /** Follow the active theme, or retain the geometric lattice in every palette. */
  readonly design = input<'theme' | 'lattice'>('theme');
  readonly animated = input(true);
  readonly placement = input<'container' | 'viewport'>('container');
  /** Root rhombus width in SVG units (180–720). */
  readonly size = input(360);
  /** Height / width (0.3–1). A value of 1 produces square diamonds. */
  readonly aspectRatio = input(104 / 180);
  /** Distance between root rhombi as a size multiplier (0.75–1.75). */
  readonly spacing = input(1);
  /** Clockwise rotation of each rhombus in degrees. */
  readonly rotation = input(0);
  /** Reproducible randomized trace starts; changing seed leaves geometry intact. */
  readonly traceSeed = input(1);
  protected readonly delays = computed(() => {
    const seed = Number.isFinite(this.traceSeed()) ? Math.trunc(this.traceSeed()) : 1;
    return Array.from({ length: 8 }, (_, index) => {
      if (index % 8 === 0) return 0;
      return traceRandom(seed, index);
    });
  });
  protected readonly lengths = computed(() => {
    const seed = Number.isFinite(this.traceSeed()) ? Math.trunc(this.traceSeed()) : 1;
    return Array.from({ length: 8 }, (_, index) => traceRandom(seed ^ 0x51ed270b, index));
  });
  protected readonly lattice = computed(() =>
    rhombusLattice(
      bounded(this.size(), 180, 720, 360),
      bounded(this.aspectRatio(), 0.3, 1, 104 / 180),
      bounded(this.spacing(), 0.75, 1.75, 1),
      Number.isFinite(this.rotation()) ? this.rotation() % 360 : 0,
    ),
  );
}
