import { type Meta, type StoryObj } from '@storybook/angular';
import { DataExamples } from '../../material/data-examples';
const meta: Meta<DataExamples> = {
  title: 'Material/Data/Paginator',
  component: DataExamples,
  tags: ['autodocs'],
  args: { view: 'paginator', heading: 'Paginator', disabled: false, empty: false, loading: false },
  argTypes: {
    disabled: { control: 'boolean' },
    empty: { control: 'boolean' },
    view: { control: false, table: { disable: true } },
    loading: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'First/last, previous/next, page-size selection and empty/disabled states. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<DataExamples>;
export const Default: Story = { args: {} };
export const Disabled: Story = { args: { disabled: true } };
export const Empty: Story = { args: { empty: true } };
