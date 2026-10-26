import { type Meta, type StoryObj } from '@storybook/angular';
import { NavigationExamples } from '../../material/navigation-examples';
const meta: Meta<NavigationExamples> = {
  title: 'Material/Navigation/Tabs',
  component: NavigationExamples,
  tags: ['autodocs'],
  args: { view: 'tabs', heading: 'Tabs', disabled: false, expanded: false },
  argTypes: {
    disabled: { control: 'boolean' },
    view: { control: false, table: { disable: true } },
    expanded: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Keyboard-operable tab group, selected-tab readout and optional disabled analytics tab. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<NavigationExamples>;
export const Default: Story = { args: {} };
export const DisabledTab: Story = { args: { disabled: true } };
