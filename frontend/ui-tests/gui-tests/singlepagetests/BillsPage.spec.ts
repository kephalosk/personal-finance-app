import { test, expect } from '@playwright/test';
import getTransactions from '../mocks/transactionMock';

const BASE_PATH: string = 'http://localhost:5173/bills';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-11-24T12:00:00'));
  await page.route('**/api/transactions', getTransactions);
});

test('BillsPage-Desktop', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 1440, height: 880 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});

test('BillsPage-Tablet', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 768, height: 1191 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});

test('BillsPage-Mobile', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 375, height: 1387 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});
