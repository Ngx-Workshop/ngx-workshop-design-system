import { type Meta, type StoryObj } from '@storybook/angular';
import { ActionExamples } from '../../material/action-examples';
const meta: Meta<ActionExamples> = {
  title: 'Material/Actions/Button toggle',
  component: ActionExamples,
  tags: ['autodocs'],
  args: {
    view: 'button-toggle',
    heading: 'Button toggle',
    disabled: false,
    loading: false,
    indeterminate: false,
  },
  argTypes: {
    disabled: { control: 'boolean' },
    view: { control: false, table: { disable: true } },
    loading: { control: false, table: { disable: true } },
    indeterminate: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Single and multiple selection with a live layout/layer readout. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<ActionExamples>;
export const Default: Story = { args: {} };
export const Disabled: Story = { args: { disabled: true } };
