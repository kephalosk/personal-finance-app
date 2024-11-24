import { test, expect } from '@playwright/test';
import getBalance from './mocks/balanceMock';
import getTransactions from './mocks/transactionMock';
import getBudgets from './mocks/budgetMock';
import getPots from './mocks/potMock';

test.beforeEach(async ({ page }) => {
  await page.route('**/balance', getBalance);
  await page.route('**/transactions', getTransactions);
  await page.route('**/budgets', getBudgets);
  await page.route('**/pots', getPots);
});

test('OverviewPage-Desktop', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 1140, height: 1889 });

  await page.goto('http://localhost:5173/');

  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});
