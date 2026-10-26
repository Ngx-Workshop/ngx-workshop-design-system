import { type Meta, type StoryObj } from '@storybook/angular';
import { OverlayExamples } from '../../material/overlay-examples';
const meta: Meta<OverlayExamples> = {
  title: 'Material/Overlays/Snackbar',
  component: OverlayExamples,
  tags: ['autodocs'],
  args: {
    view: 'snack-bar',
    heading: 'Snackbar',
    disabled: false,
    destructive: false,
    position: 'above',
  },
  argTypes: {
    destructive: { control: 'boolean' },
    view: { control: false, table: { disable: true } },
    disabled: { control: false, table: { disable: true } },
    position: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Persistent actionable notifications with Undo/Retry and manual dismissal; no short auto-dismiss timeout. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<OverlayExamples>;
export const Success: Story = { args: {} };
export const Retry: Story = { args: { destructive: true } };
