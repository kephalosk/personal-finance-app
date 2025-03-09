import { test } from '@playwright/test';
import { Locator } from 'playwright';
import { selectHeaderButton } from './utils/selectorMethods';
import { AddNewBudget } from './utils/budgets/AddNewBudget';
import { EditBudget } from './utils/budgets/EditBudget';
import { DeleteBudget } from './utils/budgets/DeleteBudget';

test('add new budget', async ({ page }): Promise<void> => {
  await page.goto('http://localhost:5173/budgets', { waitUntil: 'networkidle' });

  const headerButton: Locator = selectHeaderButton(page);
  await headerButton.click();

  const dropdownGeneral: Locator = AddNewBudget.selectCategoryDropdown(page, 'General');
  await dropdownGeneral.click();

  const dropdownListItemGeneral: Locator = AddNewBudget.selectCategoryDropdownListItem(
    page,
    'General'
  );
  await dropdownListItemGeneral.click();

  const moneyInputField: Locator = AddNewBudget.selectMoneyInputField(page);
  await moneyInputField.fill('2000');

  const dropdownColor: Locator = AddNewBudget.selectColorDropdown(page, 'Red');
  await dropdownColor.click();

  const dropdownColorListItem: Locator = AddNewBudget.selectColorDropdownListItem(page, 'Red');
  await dropdownColorListItem.click();

  const submitButton: Locator = AddNewBudget.selectSubmitButton(page);
  await submitButton.click();
});

test('edit budget', async ({ page }): Promise<void> => {
  await page.goto('http://localhost:5173/budgets', { waitUntil: 'networkidle' });

  const cardHeaderIconGeneral: Locator = EditBudget.selectCardHeaderEditIcon(page, 'General');
  await cardHeaderIconGeneral.click();

  const dropdownItem: Locator = EditBudget.selectCardHeaderIconDropdownItemEdit(page, 'General');
  await dropdownItem.waitFor({ state: 'visible' });
  await dropdownItem.click();

  const moneyInputField: Locator = EditBudget.selectMoneyInputField(page, 'general');
  await moneyInputField.waitFor({ state: 'visible' });
  await moneyInputField.fill('1000');

  const submitButton: Locator = EditBudget.selectSubmitButton(page);
  await submitButton.click();
});

test('delete budget', async ({ page }): Promise<void> => {
  await page.goto('http://localhost:5173/budgets', { waitUntil: 'networkidle' });

  const cardHeaderIconGeneral: Locator = EditBudget.selectCardHeaderEditIcon(page, 'General');
  await cardHeaderIconGeneral.click();

  const dropdownItem: Locator = DeleteBudget.selectCardHeaderIconDropdownItemDelete(
    page,
    'General'
  );
  await dropdownItem.waitFor({ state: 'visible' });
  await dropdownItem.click();

  const submitButton: Locator = DeleteBudget.selectSubmitButton(page, 'general');
  await submitButton.click();
});
