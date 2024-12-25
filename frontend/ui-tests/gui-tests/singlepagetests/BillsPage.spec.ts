import { test, expect } from '@playwright/test';
import getTransactions from '../mocks/transactionMock';
import openPage from '../utils/openPage';
import { DeviceWidth } from '../constants';

const BASE_PATH: string = 'http://localhost:5173/bills';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-11-24T12:00:00'));
  await page.route('**/api/transactions', getTransactions);
});

test('BillsPage-Desktop', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 880, DeviceWidth.Desktop);

  await expect(page).toHaveScreenshot();
});

test('BillsPage-Tablet', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 1191, DeviceWidth.Tablet);

  await expect(page).toHaveScreenshot();
});

test('BillsPage-Mobile', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 1387, DeviceWidth.Mobile);

  await expect(page).toHaveScreenshot();
});
