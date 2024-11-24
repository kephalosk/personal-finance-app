import { test, expect } from '@playwright/test';

const BASE_PATH: string = 'http://localhost:5173/notdefined';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-11-24T12:00:00.000Z'));
});

test('NoPage-Desktop', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 1440, height: 159 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});

test('NoPage-Tablet', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 768, height: 240 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});

test('NoPage-Mobile', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 375, height: 294 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});
