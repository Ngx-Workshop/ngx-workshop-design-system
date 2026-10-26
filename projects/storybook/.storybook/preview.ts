import { applicationConfig, type Preview } from '@storybook/angular';
import { provideZonelessChangeDetection, provideAppInitializer, inject } from '@angular/core';
import { DemoIcons } from '../src/material/demo-icons';
const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideZonelessChangeDetection(),
        provideAppInitializer(() => {
          inject(DemoIcons).register();
        }),
      ],
    }),
    (story, context) => {
      document.documentElement.setAttribute('data-ngx-theme', context.globals['theme'] ?? 'neon');
      return story();
    },
  ],
  globalTypes: {
    theme: {
      description: 'Semantic token palette',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'neon', title: 'Neon / Workshop' },
          { value: 'neutral', title: 'Neutral / Minimal' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'neon', a11y: { manual: true } },
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    a11y: { test: 'todo' },
    options: { storySort: { order: ['Start here', 'Foundations', 'Components', 'Material'] } },
  },
};
export default preview;
