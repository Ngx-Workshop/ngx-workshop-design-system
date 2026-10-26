import type { Meta, StoryObj } from '@storybook/angular';
import { Showcase } from '../showcase';
const meta: Meta<Showcase> = {
  title: 'Start here/Workshop frequency',
  component: Showcase,
  parameters: { layout: 'fullscreen' },
};
export default meta;
export const Overview: StoryObj<Showcase> = {};
