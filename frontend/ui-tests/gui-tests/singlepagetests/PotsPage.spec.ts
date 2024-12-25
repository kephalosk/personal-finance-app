import { test, expect } from '@playwright/test';
import getPots from '../mocks/potMock';
import openPage from '../utils/openPage';
import { DeviceWidthEnum } from '../constants';

const BASE_PATH: string = 'http://localhost:5173/pots';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-11-24T12:00:00'));
  await page.route('**/api/pots', getPots);
});

test('PotsPage-Desktop', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 1019, DeviceWidthEnum.DESKTOP);

  await expect(page).toHaveScreenshot();
});

test('PotsPage-Tablet', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 1696, DeviceWidthEnum.DESKTOP);

  await expect(page).toHaveScreenshot();
});

test('PotsPage-Mobile', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, 1530, DeviceWidthEnum.DESKTOP);

  await expect(page).toHaveScreenshot();
});
