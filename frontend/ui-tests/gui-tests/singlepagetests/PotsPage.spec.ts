import { test, expect } from '@playwright/test';
import getPots from '../mocks/potMock';

const BASE_PATH: string = 'http://localhost:5173/pots';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-11-24T12:00:00'));
  await page.route('**/api/pots', getPots);
});
test('PotsPage-Desktop', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 1440, height: 1019 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});

test('PotsPage-Tablet', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 768, height: 1696 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});

test('PotsPage-Mobile', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 375, height: 1530 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});
