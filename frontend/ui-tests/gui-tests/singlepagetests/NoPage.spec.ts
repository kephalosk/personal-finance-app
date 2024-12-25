import { test, expect } from '@playwright/test';
import openPage from '../utils/openPage';
import { DeviceWidth } from '../constants';

const BASE_PATH: string = 'http://localhost:5173/notdefined';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-11-24T12:00:00.000Z'));
});

test('NoPage-Desktop', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 159, DeviceWidth.Desktop);

  await expect(page).toHaveScreenshot();
});

test('NoPage-Tablet', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 240, DeviceWidth.Tablet);

  await expect(page).toHaveScreenshot();
});

test('NoPage-Mobile', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 294, DeviceWidth.Mobile);

  await expect(page).toHaveScreenshot();
});
