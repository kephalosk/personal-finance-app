import { test, expect } from '@playwright/test';
import getBalance from '../mocks/balanceMock';
import getTransactions from '../mocks/transactionMock';
import getBudgets from '../mocks/budgetMock';
import getPots from '../mocks/potMock';
import openPage from '../utils/openPage';
import { DeviceWidth } from '../constants';

const BASE_PATH: string = 'http://localhost:5173/';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-11-24T12:00:00.000Z'));
  await page.route('**/api/balance', getBalance);
  await page.route('**/api/transactions', getTransactions);
  await page.route('**/api/budgets', getBudgets);
  await page.route('**/api/pots', getPots);
});

test('OverviewPage-Desktop', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 1015, DeviceWidth.Desktop);

  await expect(page).toHaveScreenshot();
});

test('OverviewPage-Tablet', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 1970, DeviceWidth.Tablet);

  await expect(page).toHaveScreenshot();
});

test('OverviewPage-Mobile', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 2241, DeviceWidth.Mobile);

  await expect(page).toHaveScreenshot();
});
