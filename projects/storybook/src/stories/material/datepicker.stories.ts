import { type Meta, type StoryObj } from '@storybook/angular';
import { DateExamples } from '../../material/date-examples';
const meta: Meta<DateExamples> = {
  title: 'Material/Date and time/Datepicker',
  component: DateExamples,
  tags: ['autodocs'],
  args: { view: 'datepicker', heading: 'Datepicker', state: 'default', range: false },
  argTypes: {
    state: { control: 'select', options: ['default', 'disabled', 'error', 'empty'] },
    range: { control: 'boolean' },
    view: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Native-date calendar, date range, constrained month, empty/invalid/disabled states. Fixed October 2026 demo dates. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<DateExamples>;
export const Default: Story = { args: {} };
export const DateRange: Story = { args: { range: true } };
export const Disabled: Story = { args: { state: 'disabled' } };
export const Invalid: Story = { args: { state: 'error' } };
export const Empty: Story = { args: { state: 'empty' } };
