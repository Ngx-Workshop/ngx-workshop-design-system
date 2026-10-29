import { type Meta, type StoryObj } from '@storybook/angular';
import { FormExamples } from '../../material/form-examples';
const meta: Meta<FormExamples> = {
  title: 'Material/Forms/Select',
  component: FormExamples,
  tags: ['autodocs'],
  args: { view: 'select', heading: 'Select', state: 'default', indeterminate: false },
  argTypes: {
    state: { control: 'select', options: ['default', 'disabled', 'error', 'empty'] },
    view: { control: false, table: { disable: true } },
    indeterminate: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Single/multiple selection, grouped options, disabled option and required validation. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare all light and dark themes. Dismissal backdrops stay transparent and unfiltered.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<FormExamples>;
export const Default: Story = { args: {} };
export const Disabled: Story = { args: { state: 'disabled' } };
export const Invalid: Story = { args: { state: 'error' } };
export const Empty: Story = { args: { state: 'empty' } };
