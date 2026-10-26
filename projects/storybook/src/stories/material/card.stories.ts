import { type Meta, type StoryObj } from '@storybook/angular';
import { LayoutExamples } from '../../material/layout-examples';
const meta: Meta<LayoutExamples> = {
  title: 'Material/Layout/Card',
  component: LayoutExamples,
  tags: ['autodocs'],
  args: {
    view: 'card',
    heading: 'Card',
    disabled: false,
    loading: false,
    expanded: false,
    empty: false,
    compact: false,
  },
  argTypes: {
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    view: { control: false, table: { disable: true } },
    expanded: { control: false, table: { disable: true } },
    empty: { control: false, table: { disable: true } },
    compact: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Outlined and raised cards with title/subtitle, content, actions, footer and loading state. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<LayoutExamples>;
export const Default: Story = { args: {} };
export const DisabledActions: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };
