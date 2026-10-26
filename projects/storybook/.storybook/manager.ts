import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'NGX/WORKSHOP — Interface Systems',
    colorPrimary: '#ff52c6',
    colorSecondary: '#27f5ef',
    appBg: '#060714',
    appContentBg: '#0d1227',
    appBorderColor: '#34496a',
    textColor: '#e8f3ff',
    barBg: '#0d1227',
    fontBase: 'system-ui, sans-serif',
    fontCode: 'monospace',
  }),
});
