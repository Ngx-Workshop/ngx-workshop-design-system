import type { Meta, StoryObj } from '@storybook/angular';
import { NgxPanel } from '@tmdjr/ngx-workshop-design-system';

const meta: Meta = {
  title: 'Foundations/NASA',
  parameters: {
    docs: {
      description: {
        component:
          'NASA digital typography: Inter headings, Public Sans body text and DM Mono labels. Official insignia blue/red anchor contrast-adjusted interface colors. Grid panels add a faint repeating insignia; solid and glass retain their existing surfaces. Fonts and artwork are embedded for offline use. Sources and usage guidance: packaged styles/NASA-ASSETS.md.',
      },
    },
  },
  render: () => ({
    moduleMetadata: { imports: [NgxPanel] },
    template: `<main style="max-width:1100px;margin:auto;padding:24px">
      <p style="font:var(--ngx-font-label);color:var(--ngx-color-primary)">NASA / DESIGN SYSTEM</p>
      <h1 style="font-size:clamp(32px,5vw,56px);letter-spacing:-.04em">Explore the extraordinary.</h1>
      <p style="line-height:1.7;color:var(--ngx-color-muted)">Inter gives headings their voice. Public Sans keeps body text clear. DM Mono brings precision to labels and numbers.</p>
      <div style="display:flex;gap:24px;margin:24px 0;flex-wrap:wrap;font:var(--ngx-font-label)">
        <span style="border-left:20px solid var(--ngx-nasa-blue);padding-left:8px">NASA BLUE / #0032A0</span>
        <span style="border-left:20px solid var(--ngx-nasa-red);padding-left:8px">NASA RED / #E4002B</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:24px">
        <ngx-panel heading="Mission overview" eyebrow="01 / GRID" background="grid"><p>A soft repeating insignia adds texture behind content. Readability stays the priority.</p><p style="font:var(--ngx-font-label)">ALTITUDE / 408 KM</p></ngx-panel>
        <ngx-panel heading="Flight operations" eyebrow="02 / SOLID" background="solid"><p>A clean raised surface for dense content and focused work.</p></ngx-panel>
        <div style="position:relative;isolation:isolate;padding:12px"><div aria-hidden="true" style="position:absolute;inset:0;z-index:-1;background:repeating-linear-gradient(125deg,transparent 0 28px,color-mix(in srgb,var(--ngx-color-primary) 24%,transparent) 28px 42px,transparent 42px 74px,color-mix(in srgb,var(--ngx-color-secondary) 24%,transparent) 74px 88px)"></div><ngx-panel heading="Observation deck" eyebrow="03 / GLASS" background="glass"><p>A frosted surface blurs the blue and red bands behind this panel.</p></ngx-panel></div>
      </div>
    </main>`,
  }),
};
export default meta;
export const Light: StoryObj = { globals: { theme: 'nasa-light' } };
export const Dark: StoryObj = { globals: { theme: 'nasa-dark' } };
