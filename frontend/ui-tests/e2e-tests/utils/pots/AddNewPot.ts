import { Locator, Page } from 'playwright';

export class AddNewPot {
  private static getForm(page: Page): Locator {
    return page.getByTestId('overlay-content-add-new-pot');
  }

  public static selectNameInputField(page: Page): Locator {
    return AddNewPot.getForm(page).locator('.inputCustomNameInput');
  }

  public static selectMoneyInputField(page: Page): Locator {
    return AddNewPot.getForm(page).locator('.inputMoneyInput');
  }

  public static selectColorDropdown(page: Page): Locator {
    return AddNewPot.getForm(page).locator('.dropdownColorWrapper');
  }

  public static selectColorDropdownListItem(page: Page, index: number): Locator {
    return AddNewPot.getForm(page).getByTestId('overlay-dropdown-color-list-item').nth(index);
  }

  public static selectSubmitButton(page: Page): Locator {
    return page.getByRole('button', { name: 'Add Pot' });
  }
}
