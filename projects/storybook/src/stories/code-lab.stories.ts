import { type Meta, type StoryObj } from '@storybook/angular';
import { CodeLab } from '../code-lab';
const meta: Meta<CodeLab> = {
  title: 'Components/Code block/Snippet lab',
  component: CodeLab,
  args: { language: 'typescript', contrast: 'readable', wrap: false },
  argTypes: {
    language: {
      control: 'select',
      options: ['text', 'typescript', 'javascript', 'html', 'css', 'json'],
    },
    contrast: { control: 'select', options: ['readable', 'original'] },
    wrap: { control: 'boolean' },
  },
};
export default meta;
export const LiveSource: StoryObj<CodeLab> = {};
