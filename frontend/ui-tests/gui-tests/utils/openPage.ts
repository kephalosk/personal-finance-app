import { Page } from 'playwright';

const openPage = async (page: Page, path: string, height: number, width: number): Promise<void> => {
  await page.setViewportSize({ height, width });
  await page.goto(path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
};

export default openPage;
