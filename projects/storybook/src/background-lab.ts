import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgxBackground, NgxButton } from '@tmdjr/ngx-workshop-design-system';

@Component({
  selector: 'ngx-background-lab',
  imports: [ClipboardModule, FormsModule, MatButtonModule, NgxBackground, NgxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="scene"
      [style.--ngx-background-opacity]="intensity()"
      [style.--ngx-background-flow-duration]="duration() + 's'"
      [style.--ngx-background-color-duration]="colorDuration() + 's'"
      [style.--ngx-background-line-width]="lineWidth() + 'px'"
      [style.--ngx-background-trace-width]="traceWidth() + 'px'"
      [style.--ngx-background-trace-min-length]="minLength()"
      [style.--ngx-background-trace-max-length]="maxLength()"
      [style.--ngx-background-trace-delay]="delaySpread() + 's'"
      [style.--ngx-background-color-1]="customColors() ? colors()[0] : null"
      [style.--ngx-background-color-2]="customColors() ? colors()[1] : null"
      [style.--ngx-background-color-3]="customColors() ? colors()[2] : null"
      [style.--ngx-background-color-4]="customColors() ? colors()[3] : null"
    >
      <ngx-background
        [animated]="animated() && !paused()"
        [placement]="placement()"
        [size]="width()"
        [aspectRatio]="proportions()"
        [spacing]="distance()"
        [rotation]="angle()"
        [traceSeed]="seed()"
      />
      <div class="intro">
        <p class="eyebrow">NGX / BACKGROUND STUDIES / 001</p>
        <h1>A quieter<br /><span>dimension.</span></h1>
        <p class="description">
          A quieter lattice. Shape the field, soften the signal, and find your own frequency.
        </p>
        <button
          mat-flat-button
          ngxButton
          shape="chamfered"
          [disabled]="!animated()"
          (click)="paused.set(!paused())"
        >
          {{ paused() ? 'Resume flow' : 'Pause flow' }}
        </button>
      </div>
      <aside aria-labelledby="pattern-controls">
        <div class="controls-heading">
          <h2 id="pattern-controls">Shape the pattern</h2>
          <button mat-button (click)="reset()">Reset</button>
        </div>
        <div class="color-controls">
          <div class="palette-heading">
            <span>{{ customColors() ? 'Custom outline colors' : 'Theme outline colors' }}</span
            ><button mat-button (click)="restoreColors()">Use theme colors</button>
          </div>
          <div class="swatches">
            @for (color of colors(); track $index) {
              <label
                >Color {{ $index + 1
                }}<input
                  type="color"
                  [attr.aria-label]="'Outline color ' + ($index + 1)"
                  [ngModel]="color"
                  (ngModelChange)="setColor($index, $event)"
              /></label>
            }
          </div>
        </div>
        <div class="sliders">
          <label
            >Rhombus size <output>{{ width() }}</output
            ><input
              aria-label="Rhombus size"
              type="range"
              min="180"
              max="720"
              step="10"
              [ngModel]="width()"
              (ngModelChange)="width.set($event)"
          /></label>
          <label
            >Height / width <output>{{ proportions().toFixed(2) }}</output
            ><input
              aria-label="Height / width"
              type="range"
              min="0.3"
              max="1"
              step="0.01"
              [ngModel]="proportions()"
              (ngModelChange)="proportions.set($event)"
          /></label>
          <label
            >Spacing <output>{{ distance().toFixed(2) }}</output
            ><input
              aria-label="Spacing"
              type="range"
              min="0.75"
              max="1.75"
              step="0.05"
              [ngModel]="distance()"
              (ngModelChange)="distance.set($event)"
          /></label>
          <label
            >Intensity <output>{{ intensity().toFixed(2) }}</output
            ><input
              aria-label="Intensity"
              type="range"
              min="0.05"
              max="1"
              step="0.01"
              [ngModel]="intensity()"
              (ngModelChange)="intensity.set($event)"
          /></label>
          <label
            >Pattern cycle <output>{{ duration() }}s</output
            ><input
              aria-label="Pattern cycle"
              type="range"
              min="5"
              max="90"
              step="1"
              [ngModel]="duration()"
              (ngModelChange)="duration.set($event)"
          /></label>
          <label
            >Color cycle <output>{{ colorDuration() }}s</output
            ><input
              aria-label="Color cycle"
              type="range"
              min="5"
              max="90"
              step="1"
              [ngModel]="colorDuration()"
              (ngModelChange)="colorDuration.set($event)"
          /></label>
          <label
            >Outline thickness <output>{{ lineWidth().toFixed(1) }}px</output
            ><input
              aria-label="Outline thickness"
              type="range"
              min="0.2"
              max="4"
              step="0.1"
              [ngModel]="lineWidth()"
              (ngModelChange)="lineWidth.set($event)"
          /></label>
          <label
            >Trace thickness <output>{{ traceWidth().toFixed(1) }}px</output
            ><input
              aria-label="Trace thickness"
              type="range"
              min="0.2"
              max="4"
              step="0.1"
              [ngModel]="traceWidth()"
              (ngModelChange)="traceWidth.set($event)"
          /></label>
          <label
            >Rotation <output>{{ angle() }}°</output
            ><input
              aria-label="Rotation"
              type="range"
              min="0"
              max="360"
              step="1"
              [ngModel]="angle()"
              (ngModelChange)="angle.set($event)"
          /></label>
          <label
            >Minimum trace length <output>{{ minLength() }}</output
            ><input
              aria-label="Minimum trace length"
              type="range"
              min="5"
              max="360"
              step="5"
              [ngModel]="minLength()"
              (ngModelChange)="setMinimum($event)"
          /></label>
          <label
            >Maximum trace length <output>{{ maxLength() }}</output
            ><input
              aria-label="Maximum trace length"
              type="range"
              min="5"
              max="360"
              step="5"
              [ngModel]="maxLength()"
              (ngModelChange)="setMaximum($event)"
          /></label>
          <label
            >Random delay <output>{{ delaySpread() }}s</output
            ><input
              aria-label="Random delay"
              type="range"
              min="0"
              max="30"
              step="1"
              [ngModel]="delaySpread()"
              (ngModelChange)="delaySpread.set($event)"
          /></label>
        </div>
        <button class="reshuffle" mat-button (click)="seed.set(seed() + 1)">
          Reshuffle traces
        </button>
        <button
          mat-stroked-button
          [cdkCopyToClipboard]="configuration()"
          (cdkCopyToClipboardCopied)="onCopy($event)"
        >
          Copy background configuration
        </button>
        <p class="copy-status" role="status">
          {{
            copiedConfiguration() === configuration()
              ? 'Configuration copied'
              : copyFailed()
                ? 'Copy failed. Open View configuration and select the text to copy.'
                : ''
          }}
        </p>
        <details>
          <summary>View configuration</summary>
          <pre tabindex="0" aria-label="Background configuration">{{ configuration() }}</pre>
        </details>
      </aside>
      <p class="caption">RHOMBUS / RHOMBUS LATTICE / PALETTE IN MOTION</p>
    </section>
  `,
  styleUrl: './background-lab.scss',
})
export class BackgroundLab {
  readonly animated = input(true);
  readonly placement = input<'container' | 'viewport'>('container');
  readonly size = input(360);
  readonly aspectRatio = input(104 / 180);
  readonly spacing = input(1);
  readonly rotation = input(0);
  readonly traceSeed = input(1);
  readonly seed = linkedSignal(() => this.traceSeed());
  readonly minLength = signal(40);
  readonly maxLength = signal(160);
  readonly delaySpread = signal(8);
  readonly angle = linkedSignal(() => this.rotation());
  readonly colorDuration = signal(28);
  readonly lineWidth = signal(0.6);
  readonly traceWidth = signal(1);
  readonly colors = signal(['#27f5ef', '#aa8cff', '#ff52c6', '#ff3e68']);
  readonly customColors = signal(false);
  readonly width = linkedSignal(() => this.size());
  readonly proportions = linkedSignal(() => this.aspectRatio());
  readonly distance = linkedSignal(() => this.spacing());
  readonly intensity = signal(0.48);
  readonly duration = signal(28);
  readonly paused = signal(false);
  setColor(index: number, color: string): void {
    this.colors.update((colors) =>
      colors.map((value, position) => (position === index ? color : value)),
    );
    this.customColors.set(true);
  }
  restoreColors(): void {
    this.customColors.set(false);
    this.colors.set(['#27f5ef', '#aa8cff', '#ff52c6', '#ff3e68']);
  }
  readonly copiedConfiguration = signal<string | null>(null);
  readonly copyFailed = signal(false);
  readonly configuration = computed(() => {
    const n = (value: number) => value;
    const colors = this.customColors()
      ? this.colors()
          .map((color, index) => `  --ngx-background-color-${index + 1}: ${color};`)
          .join('\n')
      : '  /* Outline colors inherit the app theme. */';
    return `// Install @tmdjr/ngx-workshop-design-system and matching Angular/Material peer dependencies.
// Add NgxBackground to your standalone component imports.
import { NgxBackground } from '@tmdjr/ngx-workshop-design-system';

/* Global styles.scss: include once if your app does not already use this theme.
@use '@tmdjr/ngx-workshop-design-system/theme' as ngx;
@include ngx.theme();
*/

<!-- Component template -->
<section class="background-scene">
  <ngx-background
    placement="${this.placement()}"
    [animated]="${this.animated() && !this.paused()}"
    [size]="${n(this.width())}"
    [aspectRatio]="${n(this.proportions())}"
    [spacing]="${n(this.distance())}"
    [rotation]="${this.angle()}"
    [traceSeed]="${this.seed()}"
  />
  <!-- Your content -->
</section>

/* Component styles.scss */
.background-scene {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  --ngx-background-height: min(85vh, 900px);
  --ngx-background-opacity: ${this.intensity()};
  --ngx-background-flow-duration: ${this.duration()}s;
  --ngx-background-color-duration: ${this.colorDuration()}s;
  --ngx-background-line-width: ${this.lineWidth()}px;
  --ngx-background-trace-width: ${this.traceWidth()}px;
  --ngx-background-trace-min-length: ${this.minLength()};
  --ngx-background-trace-max-length: ${this.maxLength()};
  --ngx-background-trace-delay: ${this.delaySpread()}s;
${colors}
}`;
  });
  setMinimum(value: number): void {
    this.minLength.set(value);
    if (value > this.maxLength()) this.maxLength.set(value);
  }
  setMaximum(value: number): void {
    this.maxLength.set(value);
    if (value < this.minLength()) this.minLength.set(value);
  }
  onCopy(success: boolean): void {
    this.copiedConfiguration.set(success ? this.configuration() : null);
    this.copyFailed.set(!success);
  }
  reset(): void {
    this.copiedConfiguration.set(null);
    this.copyFailed.set(false);
    this.seed.set(this.traceSeed());
    this.minLength.set(40);
    this.maxLength.set(160);
    this.delaySpread.set(8);
    this.angle.set(this.rotation());
    this.colorDuration.set(28);
    this.lineWidth.set(0.6);
    this.traceWidth.set(1);
    this.restoreColors();
    this.width.set(this.size());
    this.proportions.set(this.aspectRatio());
    this.distance.set(this.spacing());
    this.intensity.set(0.48);
    this.duration.set(28);
    this.paused.set(false);
  }
}
