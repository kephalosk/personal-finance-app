import { test, expect } from '@playwright/test';
import openPage from '../utils/openPage';
import { DeviceHeight, DeviceWidth } from '../constants';
import removeFocus from '../utils/removeFocus';

const BASE_PATH: string = 'http://localhost:5173/showcase/DeleteBudgetForm';

test('DeleteBudgetForm-Desktop', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, DeviceHeight.Default, DeviceWidth.Desktop);

  await removeFocus(page);

  await expect(page).toHaveScreenshot();
});

test('DeleteBudgetForm-Tablet', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, DeviceHeight.Default, DeviceWidth.Tablet);

  await removeFocus(page);

  await expect(page).toHaveScreenshot();
});

test('DeleteBudgetForm-Mobile', async ({ page }): Promise<void> => {
  await openPage(page, BASE_PATH, DeviceHeight.Default, DeviceWidth.Mobile);

  await removeFocus(page);

  await expect(page).toHaveScreenshot();
});
