import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NgxStatus } from '@tmdjr/ngx-workshop-design-system';
const meta: Meta<NgxStatus> = {
  title: 'Components/Status',
  component: NgxStatus,
  tags: ['autodocs'],
  args: { label: 'Online', tone: 'success' },
  argTypes: { tone: { control: 'select', options: ['success', 'info', 'warning', 'error'] } },
  decorators: [moduleMetadata({ imports: [NgxStatus] })],
};
export default meta;
type Story = StoryObj<NgxStatus>;
export const Online: Story = {};
export const Warning: Story = { args: { label: 'Needs review', tone: 'warning' } };
export const Error: Story = { args: { label: 'Build failed', tone: 'error' } };
export const AllStates: Story = {
  render: () => ({
    template: `<div style="display:flex;gap:16px;flex-wrap:wrap"><ngx-status label="Online" tone="success"/><ngx-status label="In progress" tone="info"/><ngx-status label="Needs review" tone="warning"/><ngx-status label="Build failed" tone="error"/></div>`,
  }),
};
