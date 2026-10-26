import { type Meta, type StoryObj } from '@storybook/angular';
import { OverlayExamples } from '../../material/overlay-examples';
const meta: Meta<OverlayExamples> = {
  title: 'Material/Overlays/Tooltip',
  component: OverlayExamples,
  tags: ['autodocs'],
  args: {
    view: 'tooltip',
    heading: 'Tooltip',
    disabled: false,
    destructive: false,
    position: 'above',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    position: { control: 'select', options: ['above', 'below', 'left', 'right'] },
    view: { control: false, table: { disable: true } },
    destructive: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Hover and keyboard-focus hints, placement controls, disabled hint and Escape dismissal. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<OverlayExamples>;
export const Default: Story = { args: {} };
export const Disabled: Story = { args: { disabled: true } };
export const Below: Story = { args: { position: 'below' } };
