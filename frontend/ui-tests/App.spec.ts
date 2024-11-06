import { test, expect } from '@playwright/test';
import { ProjectName } from '../src/constantsRename/ProjectName';

test('page title', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const title = await page.title();
  expect(title).toBe(ProjectName);
});
