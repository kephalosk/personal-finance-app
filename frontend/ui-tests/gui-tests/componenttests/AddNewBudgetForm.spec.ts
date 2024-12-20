import { test, expect } from '@playwright/test';

const BASE_PATH: string = 'http://localhost:5173/showcase';

test('AddNewBudgetForm-Desktop', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 1440, height: 600 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await page.evaluate(() => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) activeElement.blur();
  });

  await expect(page).toHaveScreenshot();
});

test('AddNewBudgetForm-Tablet', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 768, height: 600 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await page.evaluate(() => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) activeElement.blur();
  });

  await expect(page).toHaveScreenshot();
});

test('AddNewBudgetForm-Mobile', async ({ page }): Promise<void> => {
  await page.setViewportSize({ width: 375, height: 600 });
  await page.goto(BASE_PATH);
  await page.evaluate(() => document.fonts.ready);

  await page.evaluate(() => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) activeElement.blur();
  });

  await expect(page).toHaveScreenshot();
});
