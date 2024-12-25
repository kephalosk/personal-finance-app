import { test, expect } from '@playwright/test';
import getTransactions from '../mocks/transactionMock';
import getBudgets from '../mocks/budgetMock';
import openPage from '../utils/openPage';
import { DeviceWidthEnum } from '../constants';

const BASE_PATH: string = 'http://localhost:5173/budgets';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-11-24T12:00:00'));
  await page.route('**/api/transactions', getTransactions);
  await page.route('**/api/budgets', getBudgets);
});

test('BudgetsPage-Desktop', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 2241, DeviceWidthEnum.DESKTOP);

  await expect(page).toHaveScreenshot();
});

test('BudgetsPage-Tablet', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 2668, DeviceWidthEnum.DESKTOP);

  await expect(page).toHaveScreenshot();
});

test('BudgetsPage-Mobile', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 2660, DeviceWidthEnum.DESKTOP);

  await expect(page).toHaveScreenshot();
});
