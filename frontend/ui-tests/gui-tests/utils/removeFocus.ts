import { Page } from 'playwright';

const removeFocus: (page: Page) => Promise<void> = async (page: Page): Promise<void> => {
  await page.evaluate((): void => {
    const activeElement: HTMLElement = document.activeElement as HTMLElement;
    if (activeElement) activeElement.blur();
  });
};

export default removeFocus;
