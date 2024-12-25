import { Page } from 'playwright';
import { DeviceWidthEnum } from '../constants';

const openPage = async (page: Page, path: string, height: number, width: DeviceWidthEnum) => {
  await page.setViewportSize({ height, width });
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
};

export default openPage;
