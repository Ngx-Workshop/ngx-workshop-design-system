import type { Meta, StoryObj } from '@storybook/angular';
import { NgxPanel } from '@tmdjr/ngx-workshop-design-system';

const meta: Meta = {
  id: 'foundations-reeses',
  title: 'Foundations/Reese’s',
  parameters: {
    docs: {
      description: {
        component:
          'Orange, yellow and chocolate with the existing system typography. Grid panels use a staggered Reese’s wordmark repeat without grid lines. Solid panels stay opaque; glass blurs the orange/yellow bands behind it. Source artwork is embedded for offline use; see packaged styles/REESES-ASSETS.md.',
      },
    },
  },
  render: () => ({
    moduleMetadata: { imports: [NgxPanel] },
    template: `<main style="max-width:1100px;margin:auto;padding:24px">
      <p style="font:var(--ngx-font-label);color:var(--ngx-color-primary)">REESE’S / DESIGN SYSTEM</p>
      <h1 style="font-size:clamp(30px,5vw,52px);letter-spacing:-.04em">A perfect combination.</h1>
      <p style="line-height:1.7;color:var(--ngx-color-muted)">Vibrant orange. Bright yellow. Rich chocolate. Familiar typography keeps the interface clear.</p>
      <div style="display:flex;gap:24px;margin:24px 0;flex-wrap:wrap;font:var(--ngx-font-label)">
        <span style="border-left:20px solid var(--ngx-reeses-orange);padding-left:8px">ORANGE / #FF5D00</span>
        <span style="border-left:20px solid var(--ngx-reeses-yellow);padding-left:8px">YELLOW / #FFC000</span>
        <span style="border-left:20px solid var(--ngx-reeses-chocolate);padding-left:8px">CHOCOLATE / #2F1C0B</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:24px">
        <ngx-panel heading="The perfect pairing" eyebrow="01 / GRID" background="grid"><p>A soft staggered wordmark adds a little sweetness behind the content.</p><p style="font:var(--ngx-font-label)">CHOCOLATE + PEANUT BUTTER</p></ngx-panel>
        <ngx-panel heading="Simply satisfying" eyebrow="02 / SOLID" background="solid"><p>A clean raised surface keeps dense content easy to read.</p></ngx-panel>
        <div style="position:relative;isolation:isolate;padding:12px"><div aria-hidden="true" style="position:absolute;inset:0;z-index:-1;background:repeating-linear-gradient(125deg,transparent 0 28px,color-mix(in srgb,var(--ngx-reeses-orange) 28%,transparent) 28px 42px,transparent 42px 74px,color-mix(in srgb,var(--ngx-reeses-yellow) 28%,transparent) 74px 88px)"></div><ngx-panel heading="A softer layer" eyebrow="03 / GLASS" background="glass"><p>A frosted surface softens the orange and yellow bands behind this panel.</p></ngx-panel></div>
      </div>
    </main>`,
  }),
};
export default meta;
export const Light: StoryObj = { globals: { theme: 'reeses-light' } };
export const Dark: StoryObj = { globals: { theme: 'reeses-dark' } };
