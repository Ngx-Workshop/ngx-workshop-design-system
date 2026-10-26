import { type Meta, type StoryObj } from '@storybook/angular';
import { DataExamples } from '../../material/data-examples';
const meta: Meta<DataExamples> = {
  title: 'Material/Data/Table',
  component: DataExamples,
  tags: ['autodocs'],
  args: { view: 'table', heading: 'Table', disabled: false, empty: false, loading: false },
  argTypes: {
    empty: { control: 'boolean' },
    loading: { control: 'boolean' },
    view: { control: false, table: { disable: true } },
    disabled: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Local workshop rows with real filtering, sorting and pagination, plus empty/loading states. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<DataExamples>;
export const Default: Story = { args: {} };
export const Empty: Story = { args: { empty: true } };
export const Loading: Story = { args: { loading: true } };
