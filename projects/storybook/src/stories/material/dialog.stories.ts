import { type Meta, type StoryObj } from '@storybook/angular';
import { OverlayExamples } from '../../material/overlay-examples';
const meta: Meta<OverlayExamples> = {
  title: 'Material/Overlays/Dialog',
  component: OverlayExamples,
  tags: ['autodocs'],
  args: {
    view: 'dialog',
    heading: 'Dialog',
    disabled: false,
    destructive: false,
    position: 'above',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    destructive: { control: 'boolean' },
    view: { control: false, table: { disable: true } },
    position: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Confirm/cancel dialog returns results, with a separate destructive specimen and keyboard focus management. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare all light and dark themes. Modal backdrops use a dark glass scrim in every theme; content uses a raised theme surface.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<OverlayExamples>;
export const Default: Story = { args: {} };
export const Destructive: Story = { args: { destructive: true } };
export const DisabledTrigger: Story = { args: { disabled: true } };
