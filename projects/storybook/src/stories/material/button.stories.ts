import { type Meta, type StoryObj } from '@storybook/angular';
import { ActionExamples } from '../../material/action-examples';
const meta: Meta<ActionExamples> = {
  title: 'Material/Actions/Buttons',
  component: ActionExamples,
  tags: ['autodocs'],
  args: {
    view: 'button',
    heading: 'Buttons',
    disabled: false,
    loading: false,
    indeterminate: false,
  },
  argTypes: {
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    view: { control: false, table: { disable: true } },
    indeterminate: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Text, filled, raised, outlined, HUD, icon, floating and extended actions with live feedback. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<ActionExamples>;
export const Default: Story = { args: {} };
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };
