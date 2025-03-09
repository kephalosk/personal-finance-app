import { Locator, Page } from 'playwright';

export class AddNewBudget {
  private static getForm(page: Page): Locator {
    return page.getByTestId('overlay-content-add-new-budget');
  }

  public static selectCategoryDropdown(page: Page, category: string): Locator {
    return AddNewBudget.getForm(page).locator('.dropdownCategoryBar').filter({ hasText: category });
  }

  public static selectCategoryDropdownListItem(page: Page, category: string): Locator {
    return AddNewBudget.getForm(page)
      .locator('.dropdownCategoryListItem')
      .filter({ hasText: category });
  }

  public static selectMoneyInputField(page: Page): Locator {
    return AddNewBudget.getForm(page).locator('.inputMoneyInput');
  }

  public static selectColorDropdown(page: Page, color: string): Locator {
    return AddNewBudget.getForm(page).locator('.dropdownColorWrapper').filter({ hasText: color });
  }

  public static selectColorDropdownListItem(page: Page, color: string): Locator {
    return AddNewBudget.getForm(page).locator('.dropDownColorListItem').filter({ hasText: color });
  }

  public static selectSubmitButton(page: Page): Locator {
    return page.getByRole('button', { name: 'Add Budget' });
  }
}
