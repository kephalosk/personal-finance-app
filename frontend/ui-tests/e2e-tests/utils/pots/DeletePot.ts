import { Locator, Page } from 'playwright';

export class DeletePot {
  public static selectCardHeaderDeleteIcon(page: Page, potName: string): Locator {
    return page.locator('.cardHeader').filter({ hasText: potName }).locator('.cardHeaderEditIcon');
  }

  public static selectCardHeaderIconDropdownItemDelete(page: Page, potName: string): Locator {
    return page
      .locator('.cardHeader')
      .filter({ hasText: potName })
      .locator('.cardHeaderDropdownItem.delete');
  }

  public static selectSubmitButton(page: Page): Locator {
    return page.getByRole('button', { name: 'Yes, Confirm Deletion' });
  }
}
