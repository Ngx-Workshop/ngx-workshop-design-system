import { type Meta, type StoryObj } from '@storybook/angular';
import { DataExamples } from '../../material/data-examples';
const meta: Meta<DataExamples> = {
  title: 'Material/Data/Sort header',
  component: DataExamples,
  tags: ['autodocs'],
  args: { view: 'sort', heading: 'Sort header', disabled: false, empty: false, loading: false },
  argTypes: {
    disabled: { control: 'boolean' },
    view: { control: false, table: { disable: true } },
    loading: { control: false, table: { disable: true } },
    empty: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Sortable title/level/seat headers with live direction feedback and sorting disabled state. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<DataExamples>;
export const Default: Story = { args: {} };
export const Disabled: Story = { args: { disabled: true } };
