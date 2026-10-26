import { type Meta, type StoryObj } from '@storybook/angular';
import { DateExamples } from '../../material/date-examples';
const meta: Meta<DateExamples> = {
  title: 'Material/Date and time/Timepicker',
  component: DateExamples,
  tags: ['autodocs'],
  args: { view: 'timepicker', heading: 'Timepicker', state: 'default', range: false },
  argTypes: {
    state: { control: 'select', options: ['default', 'disabled', 'error', 'empty'] },
    view: { control: false, table: { disable: true } },
    range: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Native-date time dropdown in 30-minute intervals, constrained to 09:00\u201317:00. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<DateExamples>;
export const Default: Story = { args: {} };
export const Disabled: Story = { args: { state: 'disabled' } };
export const Invalid: Story = { args: { state: 'error' } };
export const Empty: Story = { args: { state: 'empty' } };
