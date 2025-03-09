import { Locator, Page } from 'playwright';

export class WithdrawMoneyFromPot {
  private static getForm(page: Page, potName: string): Locator {
    return page.locator(`.overlayForm.${potName}`);
  }

  public static selectPotCardButtonWithdraw(page: Page, potName: string): Locator {
    return page.locator(`.potCardContent.${potName}`).locator('.potCardButton.withdraw');
  }

  public static selectMoneyInputField(page: Page, potName: string): Locator {
    return WithdrawMoneyFromPot.getForm(page, potName).locator('.inputMoneyInput.withdraw');
  }

  public static selectSubmitButton(page: Page, potName: string): Locator {
    return page.locator(`.overlayFormSubmit.${potName}`).filter({ hasText: 'Confirm Withdrawal' });
  }
}
