import { test, expect } from '@playwright/test';

test('matches screenshot', async ({ page }): Promise<void> => {
  await page.goto('http://localhost:5173/');

  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});
