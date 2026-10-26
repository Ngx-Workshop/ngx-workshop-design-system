import { type Meta, type StoryObj } from '@storybook/angular';
import { ActionExamples } from '../../material/action-examples';
const meta: Meta<ActionExamples> = {
  title: 'Material/Feedback/Badge',
  component: ActionExamples,
  tags: ['autodocs'],
  args: { view: 'badge', heading: 'Badge', disabled: false, loading: false, indeterminate: false },
  argTypes: {
    view: { control: false, table: { disable: true } },
    disabled: { control: false, table: { disable: true } },
    loading: { control: false, table: { disable: true } },
    indeterminate: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Unread count, hidden zero state, small indicator and disabled badge; clear or increment the count. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<ActionExamples>;
export const Default: Story = { args: {} };
