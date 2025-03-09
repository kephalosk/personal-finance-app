import { Locator, Page } from 'playwright';

export class AddMoneyToPot {
  private static getForm(page: Page, potName: string): Locator {
    return page.locator(`.overlayForm.${potName}`);
  }

  public static selectPotCardButtonAddition(page: Page, potName: string): Locator {
    return page.locator(`.potCardContent.${potName}`).locator('.potCardButton.add');
  }

  public static selectMoneyInputField(page: Page, potName: string): Locator {
    return AddMoneyToPot.getForm(page, potName).locator('.inputMoneyInput.add');
  }

  public static selectSubmitButton(page: Page, potName: string): Locator {
    return page.locator(`.overlayFormSubmit.${potName}`).filter({ hasText: 'Confirm Addition' });
  }
}
