import type { Meta, StoryObj } from '@storybook/angular';
import { NgxSaveFeedback } from '@tmdjr/ngx-workshop-design-system';
const meta: Meta<NgxSaveFeedback> = {
  title: 'Components/Save feedback',
  component: NgxSaveFeedback,
  args: { name: 'Reports', state: 'idle' },
  argTypes: { state: { control: 'select', options: ['idle', 'saving', 'saved', 'error'] } },
};
export default meta;
type Story = StoryObj<NgxSaveFeedback>;
export const Idle: Story = {};
export const Saving: Story = { args: { state: 'saving' } };
export const Saved: Story = { args: { state: 'saved' } };
export const Error: Story = { args: { state: 'error' } };
export const Retry: Story = { args: { state: 'error', retryable: true } };
export const Localized: Story = {
  args: {
    state: 'error',
    message: 'Impossible de sauvegarder les modifications.',
    retryable: true,
    retryLabel: 'Réessayer',
  },
};
