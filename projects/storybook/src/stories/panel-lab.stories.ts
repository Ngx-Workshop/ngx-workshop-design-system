import { type Meta, type StoryObj } from '@storybook/angular';
import { PanelLab } from '../panel-lab';
const meta: Meta<PanelLab> = {
  title: 'Components/Panel/Transition lab',
  component: PanelLab,
  args: { shape: 'notched', background: 'glass', motion: 'boot', tone: 'primary' },
  argTypes: {
    shape: { control: 'select', options: ['notched', 'chamfered', 'beveled', 'stepped', 'banner'] },
    background: { control: 'select', options: ['grid', 'solid', 'glass'] },
    motion: { control: 'select', options: ['none', 'boot', 'glitch', 'hologram'] },
    tone: { control: 'select', options: ['primary', 'secondary', 'danger'] },
  },
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<PanelLab>;
export const BootSequence: Story = {};
export const GlitchTransmission: Story = {
  args: { motion: 'glitch', shape: 'stepped', background: 'solid', tone: 'secondary' },
};
export const HolographicUplink: Story = {
  args: { motion: 'hologram', shape: 'chamfered', background: 'glass' },
};
export const NoMotion: Story = { args: { motion: 'none', background: 'solid' } };
