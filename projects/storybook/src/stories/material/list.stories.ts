import { type Meta, type StoryObj } from '@storybook/angular';
import { LayoutExamples } from '../../material/layout-examples';
const meta: Meta<LayoutExamples> = {
  title: 'Material/Layout/List',
  component: LayoutExamples,
  tags: ['autodocs'],
  args: {
    view: 'list',
    heading: 'List',
    disabled: false,
    loading: false,
    expanded: false,
    empty: false,
    compact: false,
  },
  argTypes: {
    empty: { control: 'boolean' },
    disabled: { control: 'boolean' },
    view: { control: false, table: { disable: true } },
    loading: { control: false, table: { disable: true } },
    expanded: { control: false, table: { disable: true } },
    compact: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Selection list with icons, title/supporting lines, unavailable resource and empty state. Navigation lists appear under Sidenav. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<LayoutExamples>;
export const Default: Story = { args: {} };
export const Disabled: Story = { args: { disabled: true } };
export const Empty: Story = { args: { empty: true } };
