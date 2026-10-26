import { type Meta, type StoryObj } from '@storybook/angular';
import { LayoutExamples } from '../../material/layout-examples';
const meta: Meta<LayoutExamples> = {
  title: 'Material/Layout/Expansion panel',
  component: LayoutExamples,
  tags: ['autodocs'],
  args: {
    view: 'expansion',
    heading: 'Expansion panel',
    disabled: false,
    loading: false,
    expanded: false,
    empty: false,
    compact: false,
  },
  argTypes: {
    expanded: { control: 'boolean' },
    disabled: { control: 'boolean' },
    view: { control: false, table: { disable: true } },
    loading: { control: false, table: { disable: true } },
    empty: { control: false, table: { disable: true } },
    compact: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Multi accordion with expand/collapse-all, action row and an unavailable panel. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<LayoutExamples>;
export const Collapsed: Story = { args: {} };
export const Expanded: Story = { args: { expanded: true } };
export const DisabledPanel: Story = { args: { disabled: true } };
