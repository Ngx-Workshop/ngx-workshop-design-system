import { type Meta, type StoryObj } from '@storybook/angular';
import { LayoutExamples } from '../../material/layout-examples';
const meta: Meta<LayoutExamples> = {
  title: 'Material/Layout/Divider',
  component: LayoutExamples,
  tags: ['autodocs'],
  args: {
    view: 'divider',
    heading: 'Divider',
    disabled: false,
    loading: false,
    expanded: false,
    empty: false,
    compact: false,
  },
  argTypes: {
    view: { control: false, table: { disable: true } },
    disabled: { control: false, table: { disable: true } },
    loading: { control: false, table: { disable: true } },
    expanded: { control: false, table: { disable: true } },
    empty: { control: false, table: { disable: true } },
    compact: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Full-width and inset dividers in a list, plus vertical separators. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<LayoutExamples>;
export const Default: Story = { args: {} };
