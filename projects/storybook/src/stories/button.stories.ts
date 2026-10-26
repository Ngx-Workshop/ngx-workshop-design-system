import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { NgxButton } from '@tmdjr/ngx-workshop-design-system';
import { ButtonLab } from '../button-lab';
const meta: Meta<ButtonLab> = {
  title: 'Components/Button/Interaction lab',
  component: ButtonLab,
  args: {
    shape: 'notched',
    surface: 'filled',
    tone: 'primary',
    motion: 'scan',
    disabled: false,
    busy: false,
  },
  argTypes: {
    shape: {
      control: 'select',
      options: ['notched', 'chamfered', 'beveled', 'stepped', 'banner', 'chevron'],
    },
    surface: { control: 'select', options: ['filled', 'outline', 'glass'] },
    tone: { control: 'select', options: ['primary', 'secondary', 'danger'] },
    motion: { control: 'select', options: ['none', 'scan', 'glitch', 'pulse'] },
    disabled: { control: 'boolean' },
    busy: { control: 'boolean' },
  },
  decorators: [moduleMetadata({ imports: [NgxButton, MatButtonModule] })],
  parameters: {
    docs: {
      description: {
        component:
          'NgxButton is a standalone visual directive used alongside Material on a native button or anchor. Shape, surface, tone and motion are independent. Material owns disabled, ripple, click, keyboard, link and submit behavior. Only decorative layers are clipped.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<ButtonLab>;
export const ScanCommand: Story = {};
export const GlitchCommand: Story = {
  args: { motion: 'glitch', shape: 'stepped', tone: 'secondary' },
};
export const PulseCommand: Story = {
  args: { motion: 'pulse', shape: 'chamfered', surface: 'outline' },
};
export const GlassCommand: Story = { args: { surface: 'glass', shape: 'beveled' } };
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { busy: true } };
export const NoMotion: Story = { args: { motion: 'none' } };
export const Shapes: Story = {
  render: () => ({
    template: `<main style="max-width:1100px;margin:24px auto"><h1 style="font:600 30px var(--ngx-font-mono)">Command geometry / 06</h1><p style="color:var(--ngx-color-muted);line-height:1.8">Six independent silhouettes. Hover, focus and activate any command.</p><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:24px;margin-top:32px">${['notched', 'chamfered', 'beveled', 'stepped', 'banner', 'chevron'].map((shape, i) => `<div style="padding:28px 18px;border:1px solid var(--ngx-color-border);display:grid;justify-items:center;gap:24px"><span style="color:var(--ngx-color-muted);font:10px var(--ngx-font-mono)">0${i + 1} / ${shape.toUpperCase()}</span><button mat-flat-button ngxButton shape="${shape}">${shape.charAt(0).toUpperCase() + shape.slice(1)} command</button><button mat-flat-button ngxButton shape="${shape}" surface="outline" tone="secondary">Outlined command</button></div>`).join('')}</div></main>`,
  }),
};
export const Surfaces: Story = {
  render: () => ({
    template: `<main style="max-width:1100px;margin:24px auto"><h1 style="font:600 30px var(--ngx-font-mono)">Surface / tone matrix</h1><p style="color:var(--ngx-color-muted)">Filled, outlined and frosted surfaces across every signal tone.</p><div style="padding:36px 20px;background:repeating-linear-gradient(125deg,#060714 0 70px,#145763 70px 100px,#060714 100px 170px,#5c2456 170px 200px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:30px">${['primary', 'secondary', 'danger'].map((tone) => `<div style="display:grid;justify-items:center;gap:24px">${['filled', 'outline', 'glass'].map((surface) => `<button mat-flat-button ngxButton tone="${tone}" surface="${surface}" shape="chamfered">${tone} / ${surface}</button>`).join('')}</div>`).join('')}</div></main>`,
  }),
};
