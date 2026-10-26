import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  afterNextRender,
  viewChild,
  ElementRef,
  DestroyRef,
  inject,
} from '@angular/core';
import type { EditorView } from '@codemirror/view';
import { NgxCodeBlock, NgxCodeContrast } from '@ngx-workshop/ui';
import { TYPESCRIPT_SAMPLE } from './code-samples';
@Component({
  selector: 'ngx-code-comparison',
  imports: [NgxCodeBlock],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<main class="comparison"><header><span>NGX / TWO RENDERERS · ONE PALETTE</span><h1>Synthwave ’84 / parity lab</h1><p>The left specimen is an actual CodeMirror editor using @fsegurai/codemirror-theme-synthwave-84 6.0.4. The right is semantic pre/code with standalone syntax parsing.</p></header><div class="comparison-grid"><section><h2>CodeMirror / full view</h2><p class="description">Read-only editor, native theme extension</p><div #editor class="editor-shell ngx-code-surface" [attr.data-code-contrast]="contrast()" aria-label="CodeMirror Synthwave example"></div>@if(error()){<p role="status">{{error()}}</p>}</section><section><h2>pre + code / lightweight</h2><p class="description">No editor view, keyboard-selectable source</p><ngx-code-block [code]="source" label="workshop.ts" language="typescript" [contrast]="contrast()"/></section></div><p class="note">{{contrast()==='original'?'Original preserves the upstream colors exactly, including its subdued low-contrast comments.':'Readable uses brighter comment and diagnostic colors for both renderers; the rest of the upstream palette is unchanged.'}}</p></main>`,
  styles: [
    `
      :host {
        display: block;
      }
      .comparison {
        max-width: 1320px;
        margin: 16px auto;
        min-width: 0;
      }
      header > span {
        font: 10px var(--ngx-font-mono);
        letter-spacing: 0.1em;
        color: var(--ngx-color-secondary);
      }
      h1 {
        font: 600 clamp(26px, 4vw, 40px) var(--ngx-font-mono);
        letter-spacing: -1px;
      }
      header p,
      .note {
        max-width: 1050px;
        color: var(--ngx-color-muted);
        font-size: 14px;
        line-height: 1.8;
      }
      .comparison-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 28px;
        margin-top: 32px;
      }
      .comparison-grid > section {
        min-width: 0;
      }
      h2 {
        font: 500 18px var(--ngx-font-mono);
      }
      .description {
        font-size: 12px;
        color: var(--ngx-color-muted);
      }
      .editor-shell {
        min-width: 0;
        min-height: 400px;
        border: 1px solid var(--ngx-code-border);
        border-left: 2px solid var(--ngx-code-accent);
      }
      .note {
        font-size: 12px;
        margin-top: 28px;
      }
      @media (max-width: 850px) {
        .comparison-grid {
          grid-template-columns: minmax(0, 1fr);
        }
      }
    `,
  ],
})
export class CodeComparison {
  readonly contrast = input<NgxCodeContrast>('readable');
  readonly source = TYPESCRIPT_SAMPLE;
  readonly error = signal('');
  private readonly parent = viewChild.required<ElementRef<HTMLElement>>('editor');
  private editor?: EditorView;
  private destroyed = false;
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.editor?.destroy();
    });
    afterNextRender(() => {
      void this.initialize();
    });
  }
  private async initialize(): Promise<void> {
    try {
      const [
        { EditorView, basicSetup },
        { EditorState },
        { javascript },
        { synthwave84 },
        { HighlightStyle, syntaxHighlighting },
        { SYNTHWAVE_RULES },
      ] = await Promise.all([
        import('codemirror'),
        import('@codemirror/state'),
        import('@codemirror/lang-javascript'),
        import('@fsegurai/codemirror-theme-synthwave-84'),
        import('@codemirror/language'),
        import('../../ngx-workshop-ui/src/lib/synthwave-tags'),
      ]);
      if (this.destroyed) return;
      this.editor = new EditorView({
        parent: this.parent().nativeElement,
        state: EditorState.create({
          doc: this.source,
          extensions: [
            basicSetup,
            javascript({ typescript: true }),
            synthwave84,
            syntaxHighlighting(HighlightStyle.define(SYNTHWAVE_RULES)),
            EditorState.readOnly.of(true),
            EditorView.editable.of(false),
            EditorView.contentAttributes.of({ 'aria-label': 'Read-only Synthwave code' }),
            EditorView.theme({
              '&': {
                fontFamily: 'var(--ngx-code-font)',
                fontSize: '14px',
                backgroundColor: 'var(--ngx-code-background)',
                color: 'var(--ngx-code-foreground)',
              },
              '.cm-scroller': {
                overflow: 'auto',
                fontFamily: 'var(--ngx-code-font)',
                lineHeight: '1.6',
              },
              '.cm-gutters .cm-gutter .cm-gutterElement:not(.cm-activeLineGutter)': {
                color: 'var(--ngx-code-comment)',
              },
              '.cm-gutters .cm-foldGutter .cm-gutterElement': { color: 'var(--ngx-code-comment)' },
            }),
          ],
        }),
      });
    } catch {
      this.error.set(
        'The editor comparison could not load. The lightweight snippet remains available.',
      );
    }
  }
}
