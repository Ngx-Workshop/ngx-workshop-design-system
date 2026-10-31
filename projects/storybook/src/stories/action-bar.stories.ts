import type { Meta, StoryObj } from '@storybook/angular';
import { WorkspaceExample } from '../workspace-example';
const meta: Meta<WorkspaceExample> = {
  title: 'Components/Action bar',
  component: WorkspaceExample,
  parameters: { layout: 'padded' },
};
export default meta;
export const Workspace: StoryObj<WorkspaceExample> = {};
