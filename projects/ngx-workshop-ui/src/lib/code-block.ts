import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
  effect,
  computed,
  DestroyRef,
  inject,
} from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import type { CodeToken } from './code-highlight';
import type { NgxCodeLanguage, NgxCodeContrast } from './code-types';
/** Lightweight Synthwave pre/code. Optional lazy syntax parsing; source is always text, never HTML. */
@Component({
  selector: 'ngx-code-block',
  imports: [ClipboardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<section
    class="ngx-code-surface"
    [attr.data-code-contrast]="contrast()"
    [attr.aria-label]="label()"
  >
    <header>
      <span
        ><span aria-hidden="true">&gt;_ </span>{{ label() }}<small>{{ language() }}</small></span
      ><button
        mat-button
        type="button"
        [disabled]="!code()"
        [cdkCopyToClipboard]="code()"
        (cdkCopyToClipboardCopied)="onCopied($event)"
      >
        {{ copied() ? 'Copied!' : 'Copy code' }}
      </button>
    </header>
    <pre
      tabindex="0"
      role="region"
      [attr.aria-label]="label() + ' code'"
      [class.ngx-code-wrap]="wrap()"
    ><code [class]="'language-'+language()">@for(token of tokens();track $index){<span [class]="token.className">{{token.text}}</span>}</code></pre>
    @if (!code()) {
      <p class="empty">No code provided.</p>
    }
    <span class="sr-only" role="status">{{ copied() ? 'Code copied to clipboard' : '' }}</span>
  </section>`,
  styleUrl: './code-block.scss',
})
export class NgxCodeBlock {
  readonly code = input.required<string>();
  readonly label = input('Terminal');
  readonly language = input<NgxCodeLanguage>('text');
  readonly contrast = input<NgxCodeContrast>('readable');
  readonly wrap = input(false);
  readonly copyComplete = output<boolean>();
  private readonly copiedSource = signal<string | null>(null);
  readonly copied = computed(() => this.copiedSource() === this.code());
  protected readonly tokens = signal<readonly CodeToken[]>([]);
  private revision = 0;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.revision++;
    });
    effect(() => {
      this.code();
      this.copiedSource.set(null);
    });
    effect(() => {
      const source = this.code();
      const language = this.language();
      const revision = ++this.revision;
      this.tokens.set([{ text: source, className: '' }]);
      if (language === 'text' || source.length > 50_000) return;
      void import('./code-highlight')
        .then((module) => module.highlightCode(source, language))
        .then((tokens) => {
          if (revision === this.revision) this.tokens.set(tokens);
        })
        .catch(() => {
          /* Readable plain text remains if a parser chunk cannot load. */
        });
    });
  }
  onCopied(success: boolean): void {
    this.copiedSource.set(success ? this.code() : null);
    this.copyComplete.emit(success);
  }
}
