import { test, expect } from '@playwright/test';
import openPage from '../utils/openPage';
import { DeviceHeightEnum, DeviceWidthEnum } from '../constants';

const BASE_PATH: string = 'http://localhost:5173/showcase/AddNewBudgetForm';

test('AddNewBudgetForm-Desktop', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, DeviceHeightEnum.DEFAULT, DeviceWidthEnum.DESKTOP);

  await page.evaluate(() => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) activeElement.blur();
  });

  await expect(page).toHaveScreenshot();
});

test('AddNewBudgetForm-Tablet', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, DeviceHeightEnum.DEFAULT, DeviceWidthEnum.TABLET);

  await page.evaluate(() => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) activeElement.blur();
  });

  await expect(page).toHaveScreenshot();
});

test('AddNewBudgetForm-Mobile', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, DeviceHeightEnum.DEFAULT, DeviceWidthEnum.MOBILE);

  await page.evaluate(() => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) activeElement.blur();
  });

  await expect(page).toHaveScreenshot();
});
