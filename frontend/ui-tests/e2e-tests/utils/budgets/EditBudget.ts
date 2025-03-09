import { Locator, Page } from 'playwright';

export class EditBudget {
  private static getForm(page: Page): Locator {
    return page.getByTestId('overlay-content-edit-budget');
  }

  public static selectCardHeaderEditIcon(page: Page, category: string): Locator {
    return page.locator('.cardHeader').filter({ hasText: category }).locator('.cardHeaderEditIcon');
  }

  public static selectCardHeaderIconDropdownItemEdit(page: Page, category: string): Locator {
    return page
      .locator('.cardHeader')
      .filter({ hasText: category })
      .locator('.cardHeaderDropdownItem.edit');
  }

  public static selectMoneyInputField(page: Page, category: string): Locator {
    return EditBudget.getForm(page).locator(`.inputMoneyInput.${category}`);
  }

  public static selectSubmitButton(page: Page): Locator {
    return page.getByRole('button', { name: 'Save Changes' });
  }
}
