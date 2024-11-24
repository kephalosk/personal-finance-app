import { test, expect } from '@playwright/test';
import getBalance from '../mocks/balanceMock';
import getTransactions from '../mocks/transactionMock';
import getBudgets from '../mocks/budgetMock';
import getPots from '../mocks/potMock';

const BASE_PATH: string = 'http://localhost:5173/';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-11-24T12:00:00.000Z'));
  await page.route('**/api/balance', getBalance);
  await page.route('**/api/transactions', getTransactions);
  await page.route('**/api/budgets', getBudgets);
  await page.route('**/api/pots', getPots);
});

test('OverviewPage-Desktop', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 1440, height: 1015 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});

test('OverviewPage-Tablet', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 768, height: 1970 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});

test('OverviewPage-Mobile', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 375, height: 2241 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});
