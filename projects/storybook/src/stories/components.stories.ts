import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { NgxPanel, NgxStatus } from '@tmdjr/ngx-workshop-design-system';
const meta: Meta<NgxPanel> = {
  title: 'Components/Panel',
  component: NgxPanel,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [NgxStatus, MatButtonModule] })],
  args: {
    heading: 'Signals in motion',
    eyebrow: 'Workshop / 021',
    tone: 'primary',
    shape: 'notched',
    background: 'grid',
    motion: 'none',
  },
  argTypes: {
    tone: { control: 'select', options: ['primary', 'secondary', 'danger'] },
    shape: { control: 'select', options: ['notched', 'chamfered', 'beveled', 'stepped', 'banner'] },
    background: { control: 'select', options: ['grid', 'solid', 'glass'] },
    motion: { control: 'select', options: ['none', 'boot', 'glitch', 'hologram'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A Material card composition with projected body and optional actions. Inputs: heading (required), eyebrow, tone (primary/secondary/danger). Place actions in an element with ngxPanelActions.',
      },
    },
  },
};
export default meta;
export const Default: StoryObj<NgxPanel> = {
  render: (args) => ({
    props: args,
    template: `<ngx-panel [heading]="heading" [eyebrow]="eyebrow" [tone]="tone" [shape]="shape" [background]="background" [motion]="motion" style="max-width:520px"><p>Build a reactive Angular application with a shared foundation.</p><ngx-status label="Registration open" /><div ngxPanelActions><button mat-flat-button>Join workshop</button></div></ngx-panel>`,
  }),
};

export const SignalVariants: StoryObj<NgxPanel> = {
  render: () => ({
    template: `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px"><ngx-panel heading="Core online" eyebrow="Signal / cyan"><p>Primary system surface.</p></ngx-panel><ngx-panel heading="Channel active" eyebrow="Signal / magenta" tone="secondary"><p>Secondary channel surface.</p></ngx-panel><ngx-panel heading="Attention required" eyebrow="Signal / red" tone="danger"><p>Critical notice surface.</p></ngx-panel></div>`,
  }),
};

export const Shapes: StoryObj<NgxPanel> = {
  render: () => ({
    template: `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:28px;padding:8px">${['notched', 'chamfered', 'beveled', 'stepped', 'banner'].map((shape, i) => `<ngx-panel heading="${shape.charAt(0).toUpperCase() + shape.slice(1)} frame" eyebrow="GEOMETRY / 0${i + 1}" shape="${shape}" background="solid"><p>A distinct silhouette from the same shared foundation.</p><ngx-status label="System ready"/></ngx-panel>`).join('')}</div>`,
  }),
};
export const Backgrounds: StoryObj<NgxPanel> = {
  render: () => ({
    template: `<div style="position:relative;isolation:isolate;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:28px;padding:44px 24px;background:repeating-linear-gradient(120deg,#060714 0 80px,#126a75 80px 120px,#060714 120px 190px,#6d255c 190px 240px)">${['grid', 'solid', 'glass'].map((background, i) => `<ngx-panel heading="${background.charAt(0).toUpperCase() + background.slice(1)} surface" eyebrow="SURFACE / 0${i + 1}" shape="chamfered" background="${background}"><p>${background === 'glass' ? 'Translucent color and real backdrop blur soften the scene behind this panel.' : background === 'solid' ? 'An opaque surface removes the decorative grid and isolates the content.' : 'A subtle technical grid adds texture to the opaque surface.'}</p></ngx-panel>`).join('')}</div>`,
  }),
};
