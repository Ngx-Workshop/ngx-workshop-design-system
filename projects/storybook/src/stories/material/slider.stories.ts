import { type Meta, type StoryObj } from '@storybook/angular';
import { FormExamples } from '../../material/form-examples';
const meta: Meta<FormExamples> = {
  title: 'Material/Forms/Slider',
  component: FormExamples,
  tags: ['autodocs'],
  args: { view: 'slider', heading: 'Slider', state: 'default', indeterminate: false },
  argTypes: {
    state: { control: 'select', options: ['default', 'disabled'] },
    view: { control: false, table: { disable: true } },
    indeterminate: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Discrete seat capacity with ticks and two-thumb duration range, both keyboard operable. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<FormExamples>;
export const Default: Story = { args: {} };
export const Disabled: Story = { args: { state: 'disabled' } };
