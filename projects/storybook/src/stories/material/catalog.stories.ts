import { type Meta, type StoryObj } from '@storybook/angular';
import { MaterialCatalog } from '../../material/catalog';
const meta: Meta<MaterialCatalog> = {
  title: 'Material/Catalog',
  component: MaterialCatalog,
  parameters: { layout: 'padded' },
};
export default meta;
export const Overview: StoryObj<MaterialCatalog> = {};
