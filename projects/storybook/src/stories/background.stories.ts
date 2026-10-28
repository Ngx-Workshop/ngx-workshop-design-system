import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NgxBackground, NgxButton } from '@tmdjr/ngx-workshop-design-system';
import { MatButtonModule } from '@angular/material/button';
import { BackgroundLab } from '../background-lab';

const meta: Meta<BackgroundLab> = {
  title: 'Foundations/Backgrounds',
  component: BackgroundLab,
  decorators: [moduleMetadata({ imports: [NgxBackground, NgxButton, MatButtonModule] })],
  parameters: { layout: 'fullscreen' },
  args: {
    animated: true,
    placement: 'container',
    size: 360,
    aspectRatio: 104 / 180,
    spacing: 1,
    rotation: 0,
    traceSeed: 1,
  },
  argTypes: {
    traceSeed: { control: 'number' },
    rotation: { control: { type: 'range', min: 0, max: 360, step: 1 } },
    placement: { control: 'select', options: ['container', 'viewport'] },
    size: { control: { type: 'range', min: 180, max: 720, step: 10 } },
    aspectRatio: { control: { type: 'range', min: 0.3, max: 1, step: 0.01 } },
    spacing: { control: { type: 'range', min: 0.75, max: 1.75, step: 0.05 } },
  },
};
export default meta;
type Story = StoryObj<BackgroundLab>;
export const RhombusFractal: Story = { name: 'Rhombus lattice' };
export const DenseLattice: Story = { args: { size: 180, spacing: 0.75 } };
export const OpenLattice: Story = { args: { size: 480, spacing: 1.3 } };
export const SquareDiamonds: Story = { args: { aspectRatio: 1, spacing: 1.15 } };
export const Rotated: Story = { args: { rotation: 30 } };
export const Still: Story = { args: { animated: false } };
export const Viewport: Story = { args: { placement: 'viewport' } };
export const Contained: Story = {
  render: (args) => ({
    props: { ...args, paused: false },
    template: `<div style="padding:24px"><section style="position:relative;isolation:isolate;height:440px;border:1px solid var(--ngx-color-border);padding:32px;--ngx-background-height:100%;--ngx-background-opacity:.7"><ngx-background [animated]="animated" [size]="size" [aspectRatio]="aspectRatio" [spacing]="spacing" [rotation]="rotation" [traceSeed]="traceSeed"/><h1>A contained signal.</h1><p>The field belongs to this section.</p></section><p>Content outside the background.</p></div>`,
  }),
};
