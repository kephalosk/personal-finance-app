import { Locator, Page } from 'playwright';

export function selectHeaderButton(page: Page): Locator {
  return page.locator('.headerBarButton');
}
