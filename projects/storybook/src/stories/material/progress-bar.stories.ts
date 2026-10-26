import { type Meta, type StoryObj } from '@storybook/angular';
import { ActionExamples } from '../../material/action-examples';
const meta: Meta<ActionExamples> = {
  title: 'Material/Feedback/Progress bar',
  component: ActionExamples,
  tags: ['autodocs'],
  args: {
    view: 'progress-bar',
    heading: 'Progress bar',
    disabled: false,
    loading: false,
    indeterminate: false,
  },
  argTypes: {
    indeterminate: { control: 'boolean' },
    view: { control: false, table: { disable: true } },
    disabled: { control: false, table: { disable: true } },
    loading: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Determinate, indeterminate, buffer and query progress. Advance to completion or reset. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<ActionExamples>;
export const Determinate: Story = { args: {} };
export const Indeterminate: Story = { args: { indeterminate: true } };
