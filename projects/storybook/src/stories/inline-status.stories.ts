import type { Meta, StoryObj } from '@storybook/angular';
import { NgxInlineStatus } from '@tmdjr/ngx-workshop-design-system';
const meta: Meta<NgxInlineStatus> = {
  title: 'Components/Inline status',
  component: NgxInlineStatus,
  args: { label: 'Unplaced destinations: —', tone: 'neutral', announce: false },
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'error'] },
  },
};
export default meta;
type Story = StoryObj<NgxInlineStatus>;
export const Unknown: Story = {};
export const Zero: Story = { args: { label: '0 MFEs in dev mode' } };
export const Warning: Story = {
  args: { label: '2 MFEs in dev mode', tone: 'warning', announce: true },
};
export const Success: Story = { args: { label: 'All changes synchronized', tone: 'success' } };
export const Info: Story = { args: { label: 'Preview environment', tone: 'info' } };
export const Error: Story = { args: { label: 'Connection unavailable', tone: 'error' } };
