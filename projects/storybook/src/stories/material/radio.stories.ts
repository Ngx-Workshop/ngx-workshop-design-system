import { type Meta, type StoryObj } from '@storybook/angular';
import { FormExamples } from '../../material/form-examples';
const meta: Meta<FormExamples> = {
  title: 'Material/Forms/Radio button',
  component: FormExamples,
  tags: ['autodocs'],
  args: { view: 'radio', heading: 'Radio button', state: 'default', indeterminate: false },
  argTypes: {
    state: { control: 'select', options: ['default', 'disabled', 'empty'] },
    view: { control: false, table: { disable: true } },
    indeterminate: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Single selection, an unavailable option, unselected state and group disabled state. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<FormExamples>;
export const Default: Story = { args: {} };
export const Disabled: Story = { args: { state: 'disabled' } };
export const Unselected: Story = { args: { state: 'empty' } };
