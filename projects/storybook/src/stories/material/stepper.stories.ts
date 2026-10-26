import { type Meta, type StoryObj } from '@storybook/angular';
import { LayoutExamples } from '../../material/layout-examples';
const meta: Meta<LayoutExamples> = {
  title: 'Material/Layout/Stepper',
  component: LayoutExamples,
  tags: ['autodocs'],
  args: {
    view: 'stepper',
    heading: 'Stepper',
    disabled: false,
    loading: false,
    expanded: false,
    empty: false,
    compact: false,
  },
  argTypes: {
    expanded: { control: 'boolean' },
    compact: { control: 'boolean' },
    view: { control: false, table: { disable: true } },
    disabled: { control: false, table: { disable: true } },
    loading: { control: false, table: { disable: true } },
    empty: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Linear validation-gated wizard, back/next, local completion and reset; horizontal/vertical layouts. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<LayoutExamples>;
export const Linear: Story = { args: {} };
export const Vertical: Story = { args: { compact: true } };
export const Prefilled: Story = { args: { expanded: true } };
