import { test, expect } from '@playwright/test';

test('page title', async ({ page }) => {
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  const title: string = await page.title();
  expect(title).toBe("Philipp Kraatz' finance");
});
