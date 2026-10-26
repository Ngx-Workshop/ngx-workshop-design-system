import { type Meta, type StoryObj } from '@storybook/angular';
import { NavigationExamples } from '../../material/navigation-examples';
const meta: Meta<NavigationExamples> = {
  title: 'Material/Navigation/Toolbar',
  component: NavigationExamples,
  tags: ['autodocs'],
  args: { view: 'toolbar', heading: 'Toolbar', disabled: false, expanded: false },
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
          'Top-level title, navigation toggle and notification action, with local feedback. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<NavigationExamples>;
export const Default: Story = { args: {} };
export const DisabledAction: Story = { args: { disabled: true } };
