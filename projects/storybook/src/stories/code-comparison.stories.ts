import { type Meta, type StoryObj } from '@storybook/angular';
import { CodeComparison } from '../code-comparison';
const meta: Meta<CodeComparison> = {
  title: 'Components/Code block/CodeMirror parity',
  component: CodeComparison,
  args: { contrast: 'readable' },
  argTypes: { contrast: { control: 'select', options: ['readable', 'original'] } },
};
export default meta;
export const Readable: StoryObj<CodeComparison> = {};
export const Original: StoryObj<CodeComparison> = { args: { contrast: 'original' } };
