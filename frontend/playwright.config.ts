import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 1,
  testDir: './ui-tests',
  timeout: 30000,
  retries: 1,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
  reporter: [['list'], ['html', { outputFolder: 'ui-tests/test-results/html' }]],
  outputDir: 'ui-tests/test-results/artifacts',
});
