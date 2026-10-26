import { type Meta, type StoryObj } from '@storybook/angular';
import { ActionExamples } from '../../material/action-examples';
const meta: Meta<ActionExamples> = {
  title: 'Material/Feedback/Progress spinner',
  component: ActionExamples,
  tags: ['autodocs'],
  args: {
    view: 'progress-spinner',
    heading: 'Progress spinner',
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
          'Determinate and indeterminate indicators at different diameters; advance local progress. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<ActionExamples>;
export const Determinate: Story = { args: {} };
export const Indeterminate: Story = { args: { indeterminate: true } };
