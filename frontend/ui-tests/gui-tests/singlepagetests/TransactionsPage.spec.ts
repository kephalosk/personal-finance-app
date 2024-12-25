import { test, expect } from '@playwright/test';
import getTransactions from '../mocks/transactionMock';
import openPage from '../utils/openPage';
import { DeviceWidthEnum } from '../constants';

const BASE_PATH: string = 'http://localhost:5173/transactions';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-11-24T12:00:00'));
  await page.route('**/api/transactions', getTransactions);
});

test('TransactionsPage-Desktop', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 1016, DeviceWidthEnum.DESKTOP);

  await expect(page).toHaveScreenshot();
});

test('TransactionsPage-Tablet', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 1168, DeviceWidthEnum.DESKTOP);

  await expect(page).toHaveScreenshot();
});

test('TransactionsPage-Mobile', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 993, DeviceWidthEnum.DESKTOP);

  await expect(page).toHaveScreenshot();
});
