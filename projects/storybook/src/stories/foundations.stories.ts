import type { Meta, StoryObj } from '@storybook/angular';
const meta: Meta = {
  title: 'Foundations/Tokens',
  parameters: {
    docs: {
      description: {
        component:
          'The Ngx semantic CSS token contract. The global theme toolbar swaps the palette at the document root, including overlays. Full token reference: docs/tokens.md.',
      },
    },
  },
};
export default meta;
export const Colors: StoryObj = {
  render: () => ({
    template: `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">${['primary', 'secondary', 'canvas', 'surface', 'text', 'muted', 'border', 'success', 'warning', 'error'].map((name) => `<div style="border:1px solid var(--ngx-color-border);border-radius:12px;overflow:hidden"><div style="height:100px;background:var(--ngx-color-${name})"></div><p style="padding:12px;font:var(--ngx-font-label)">--ngx-color-${name}</p></div>`).join('')}</div>`,
  }),
};
export const Typography: StoryObj = {
  render: () => ({
    template: `<div style="display:grid;gap:16px"><h1 style="font-size:64px;letter-spacing:-3px;margin:0">Build at your frequency.</h1><h2>Minimal structure. Maximum signal.</h2><p style="color:var(--ngx-color-muted);line-height:1.8">System-first typography keeps the interface clear, fast and available offline.</p><code style="font-family:var(--ngx-font-mono);color:var(--ngx-color-primary)">const future = signal('shared');</code><p style="font:var(--ngx-font-label);letter-spacing:.12em">LABEL / SYSTEM ONLINE</p></div>`,
  }),
};
