import { Locator, Page } from 'playwright';

export class EditPot {
  private static getForm(page: Page): Locator {
    return page.getByTestId('overlay-content-edit-pot');
  }

  public static selectCardHeaderEditIcon(page: Page, potName: string): Locator {
    return page.locator('.cardHeader').filter({ hasText: potName }).locator('.cardHeaderEditIcon');
  }

  public static selectCardHeaderIconDropdownItemEdit(page: Page, potName: string): Locator {
    return page
      .locator('.cardHeader')
      .filter({ hasText: potName })
      .locator('.cardHeaderDropdownItem.edit');
  }

  public static selectMoneyInputField(page: Page, category: string): Locator {
    return EditPot.getForm(page).locator(`.inputMoneyInput.${category}`);
  }

  public static selectSubmitButton(page: Page): Locator {
    return page.getByRole('button', { name: 'Save Changes' });
  }
}
