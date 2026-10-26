import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxCodeBlock, NgxCodeLanguage, NgxCodeContrast } from '@tmdjr/ngx-workshop-design-system';
import { TYPESCRIPT_SAMPLE, HTML_SAMPLE, JSON_SAMPLE, CSS_SAMPLE } from './code-samples';
@Component({
  selector: 'ngx-code-lab',
  imports: [FormsModule, NgxCodeBlock, MatFormFieldModule, MatInputModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<main class="code-lab">
    <header>
      <span>NGX / SYNTHWAVE ’84</span>
      <h1>A shared code frequency.</h1>
      <p>
        CodeMirror's purple canvas and neon syntax palette, in a lightweight pre/code block. Change
        the source or select a language, then copy the original text.
      </p>
    </header>
    <div class="sample-actions">
      <button mat-stroked-button (click)="load('typescript')">TypeScript sample</button
      ><button mat-stroked-button (click)="load('html')">HTML sample</button
      ><button mat-stroked-button (click)="load('css')">CSS sample</button
      ><button mat-stroked-button (click)="load('json')">JSON sample</button
      ><button mat-button (click)="source.set('')">Clear source</button>
    </div>
    <ngx-code-block
      [code]="source()"
      label="Live snippet"
      [language]="activeLanguage() ?? language()"
      [contrast]="contrast()"
      [wrap]="wrap()"
    />
    <details>
      <summary>Edit source</summary>
      <mat-form-field appearance="outline" subscriptSizing="dynamic"
        ><mat-label>Snippet source</mat-label
        ><textarea
          matInput
          rows="9"
          [ngModel]="source()"
          (ngModelChange)="source.set($event)"
        ></textarea
        ><mat-hint
          >Source is always text. Changing it clears copied feedback.</mat-hint
        ></mat-form-field
      >
    </details>
    <p class="footnote">
      READABLE: brighter comments and diagnostics · ORIGINAL: exact upstream syntax palette
    </p>
  </main>`,
  styles: [
    `
      :host {
        display: block;
      }
      .code-lab {
        max-width: 1100px;
        margin: 16px auto;
        min-width: 0;
      }
      header > span,
      .footnote {
        font: 10px var(--ngx-font-mono);
        letter-spacing: 0.1em;
        color: var(--ngx-color-secondary);
      }
      h1 {
        font: 600 clamp(26px, 4vw, 42px) var(--ngx-font-mono);
        letter-spacing: -1px;
      }
      header p {
        max-width: 800px;
        color: var(--ngx-color-muted);
        font-size: 14px;
        line-height: 1.8;
      }
      .sample-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin: 28px 0;
      }
      details {
        margin: 26px 0;
        padding: 18px;
        border: 1px solid var(--ngx-color-border);
      }
      summary {
        cursor: pointer;
        color: var(--ngx-color-primary);
        font: 12px var(--ngx-font-mono);
      }
      mat-form-field {
        width: 100%;
        margin-top: 24px;
      }
      textarea {
        font-family: var(--ngx-font-mono);
        font-size: 12px;
      }
      .footnote {
        font-size: 9px;
        line-height: 1.8;
        color: var(--ngx-color-muted);
      }
    `,
  ],
})
export class CodeLab {
  readonly language = input<NgxCodeLanguage>('typescript');
  readonly contrast = input<NgxCodeContrast>('readable');
  readonly wrap = input(false);
  readonly source = signal(TYPESCRIPT_SAMPLE);
  readonly activeLanguage = signal<NgxCodeLanguage | null>(null);
  load(language: NgxCodeLanguage): void {
    this.activeLanguage.set(language);
    this.source.set(
      {
        typescript: TYPESCRIPT_SAMPLE,
        html: HTML_SAMPLE,
        css: CSS_SAMPLE,
        json: JSON_SAMPLE,
        javascript: TYPESCRIPT_SAMPLE,
        text: TYPESCRIPT_SAMPLE,
      }[language],
    );
  }
}
