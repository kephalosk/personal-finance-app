import { Locator, Page } from 'playwright';

export class DeleteBudget {
  public static selectCardHeaderIconDropdownItemDelete(page: Page, category: string): Locator {
    return page
      .locator('.cardHeader')
      .filter({ hasText: category })
      .locator('.cardHeaderDropdownItem.delete');
  }

  public static selectSubmitButton(page: Page, category: string): Locator {
    return page.locator(`.overlayContentDeleteBudget.${category}`);
  }
}
