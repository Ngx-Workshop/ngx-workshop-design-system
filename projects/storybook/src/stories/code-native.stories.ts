import { type Meta, type StoryObj } from '@storybook/angular';
const meta: Meta = {
  title: 'Foundations/Native code',
  parameters: {
    docs: {
      description: {
        component:
          'Native pre elements containing a direct code child inherit the Synthwave palette after including the shared theme; ngx-code is an optional explicit class. No Angular code component, highlighter or editor is needed. Existing tokenized markup can use ngx-syntax-* classes.',
      },
    },
  },
};
export default meta;
export const Plain: StoryObj = {
  render: () => ({
    props: { source: 'npm run build\nnpm run storybook' },
    template:
      '<pre tabindex="0" role="region" aria-label="Native terminal source"><code>{{source}}</code></pre>',
  }),
};
export const SemanticTokens: StoryObj = {
  render: () => ({
    template: `<pre class="ngx-code" tabindex="0" role="region" aria-label="Native semantic syntax example"><code><span class="ngx-syntax-comment">// Native markup, shared Synthwave palette.</span>
<span class="ngx-syntax-keyword">const</span> <span class="ngx-syntax-definition">title</span> <span class="ngx-syntax-operator">=</span> <span class="ngx-syntax-string">'Signals in motion'</span><span class="ngx-syntax-punctuation">;</span></code></pre>`,
  }),
};
