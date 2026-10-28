import type { Meta, StoryObj } from '@storybook/angular';
import { Showcase } from '../showcase';
const meta: Meta<Showcase> = {
  title: 'Start here/Workshop frequency',
  component: Showcase,
  parameters: { layout: 'fullscreen' },
};
export default meta;
export const Overview: StoryObj<Showcase> = {};

/** Dedicated previews also work without opening the global toolbar. */
export const Daylight: StoryObj<Showcase> = { globals: { theme: 'light' } };
export const Dawn: StoryObj<Showcase> = { globals: { theme: 'amber-light' } };
export const Dusk: StoryObj<Showcase> = { globals: { theme: 'amber' } };

export const TealLight: StoryObj<Showcase> = { globals: { theme: 'teal-light' } };
export const TealDark: StoryObj<Showcase> = { globals: { theme: 'teal-dark' } };

export const NasaLight: StoryObj<Showcase> = { globals: { theme: 'nasa-light' } };
export const NasaDark: StoryObj<Showcase> = { globals: { theme: 'nasa-dark' } };

export const ReesesLight: StoryObj<Showcase> = { globals: { theme: 'reeses-light' } };
export const ReesesDark: StoryObj<Showcase> = { globals: { theme: 'reeses-dark' } };
