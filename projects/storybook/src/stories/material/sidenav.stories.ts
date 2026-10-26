import { type Meta, type StoryObj } from '@storybook/angular';
import { NavigationExamples } from '../../material/navigation-examples';
const meta: Meta<NavigationExamples> = {
  title: 'Material/Navigation/Sidenav',
  component: NavigationExamples,
  tags: ['autodocs'],
  args: { view: 'sidenav', heading: 'Sidenav', disabled: false, expanded: false },
  argTypes: {
    expanded: { control: 'boolean' },
    view: { control: false, table: { disable: true } },
    disabled: { control: false, table: { disable: true } },
    heading: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Contained navigation drawer with side/overlay mode switch and working navigation state. All specimens inherit the root theme, including overlays. Use the global palette toolbar to compare Neon and Neutral.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<NavigationExamples>;
export const Closed: Story = { args: {} };
export const Open: Story = { args: { expanded: true } };
