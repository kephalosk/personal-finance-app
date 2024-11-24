import { test, expect } from '@playwright/test';
import getTransactions from '../mocks/transactionMock';

const BASE_PATH: string = 'http://localhost:5173/transactions';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-11-24T12:00:00'));
  await page.route('**/api/transactions', getTransactions);
});

test('TransactionsPage-Desktop', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 1440, height: 1016 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});

test('TransactionsPage-Tablet', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 768, height: 1168 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});

test('TransactionsPage-Mobile', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 375, height: 993 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});
