import { type Meta, type StoryObj } from '@storybook/angular';
import { DataExamples } from '../../material/data-examples';
const meta: Meta<DataExamples> = {
  title: 'Material/Data/Tree',
  component: DataExamples,
  tags: ['autodocs'],
  args: { view: 'tree', heading: 'Tree', disabled: false, empty: false, loading: false },
  argTypes: {
    empty: { control: 'boolean' },
    view: { control: false, table: { disable: true } },
    disabled: { control: false, table: { disable: true } },
    loading: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Modern childrenAccessor resource tree, nested expansion, expand/collapse-all and leaf selection. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<DataExamples>;
export const Default: Story = { args: {} };
export const Empty: Story = { args: { empty: true } };
