import { type Meta, type StoryObj } from '@storybook/angular';
import { OverlayExamples } from '../../material/overlay-examples';
const meta: Meta<OverlayExamples> = {
  title: 'Material/Overlays/Bottom sheet',
  component: OverlayExamples,
  tags: ['autodocs'],
  args: {
    view: 'bottom-sheet',
    heading: 'Bottom sheet',
    disabled: false,
    destructive: false,
    position: 'above',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    view: { control: false, table: { disable: true } },
    destructive: { control: false, table: { disable: true } },
    position: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Action sheet with Markdown/JSON results and dismissal behavior. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<OverlayExamples>;
export const Default: Story = { args: {} };
export const DisabledTrigger: Story = { args: { disabled: true } };
