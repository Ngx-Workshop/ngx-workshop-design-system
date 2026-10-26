import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: {
    baseURL: 'http://127.0.0.1:6007',
    browserName: 'chromium',
    permissions: ['clipboard-read', 'clipboard-write'],
  },
  webServer: {
    command: 'node scripts/serve-storybook.mjs',
    url: 'http://127.0.0.1:6007',
    reuseExistingServer: !process.env['CI'],
  },
  reporter: 'list',
});
