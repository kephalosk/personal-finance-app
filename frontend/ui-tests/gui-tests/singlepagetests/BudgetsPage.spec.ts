import { test, expect } from '@playwright/test';
import getTransactions from '../mocks/transactionMock';
import getBudgets from '../mocks/budgetMock';

const BASE_PATH: string = 'http://localhost:5173/budgets';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-11-24T12:00:00'));
  await page.route('**/api/transactions', getTransactions);
  await page.route('**/api/budgets', getBudgets);
});

test('BudgetsPage-Desktop', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 1440, height: 2241 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});

test('BudgetsPage-Tablet', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 768, height: 2668 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});

test('BudgetsPage-Mobile', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 375, height: 2660 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot();
});
