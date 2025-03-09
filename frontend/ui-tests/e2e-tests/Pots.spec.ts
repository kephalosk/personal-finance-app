import { test } from '@playwright/test';
import { Locator } from 'playwright';
import { selectHeaderButton } from './utils/selectorMethods';
import { AddNewPot } from './utils/pots/AddNewPot';
import { EditBudget } from './utils/budgets/EditBudget';
import { EditPot } from './utils/pots/EditPot';
import { getTestNameWithDate } from './utils/helper';
import { AddMoneyToPot } from './utils/pots/AddMoneyToPot';
import { WithdrawMoneyFromPot } from './utils/pots/WithdrawMoneyFromPot';
import { DeletePot } from './utils/pots/DeletePot';

const potName: string = getTestNameWithDate();

test('add new pot', async ({ page }): Promise<void> => {
  await page.goto('http://localhost:5173/pots', { waitUntil: 'networkidle' });

  const headerButton: Locator = selectHeaderButton(page);
  await headerButton.click();

  const nameInputField: Locator = AddNewPot.selectNameInputField(page);
  await nameInputField.fill(potName);

  const moneyInputField: Locator = AddNewPot.selectMoneyInputField(page);
  await moneyInputField.fill('2000');

  const dropdownColor: Locator = AddNewPot.selectColorDropdown(page);
  await dropdownColor.click();

  const dropdownColorListItem: Locator = AddNewPot.selectColorDropdownListItem(page, 0);
  await dropdownColorListItem.click();

  const submitButton: Locator = AddNewPot.selectSubmitButton(page);
  await submitButton.click();
});

test('edit pot', async ({ page }): Promise<void> => {
  await page.goto('http://localhost:5173/pots', { waitUntil: 'networkidle' });

  const cardHeaderIcon: Locator = EditPot.selectCardHeaderEditIcon(page, potName);
  await cardHeaderIcon.click();

  const dropdownItem: Locator = EditPot.selectCardHeaderIconDropdownItemEdit(page, potName);
  await dropdownItem.waitFor({ state: 'visible' });
  await dropdownItem.click();

  const moneyInputField: Locator = EditPot.selectMoneyInputField(page, potName);
  await moneyInputField.waitFor({ state: 'visible' });
  await moneyInputField.fill('1000');

  const submitButton: Locator = EditBudget.selectSubmitButton(page);
  await submitButton.click();
});

test('add money to pot', async ({ page }): Promise<void> => {
  await page.goto('http://localhost:5173/pots', { waitUntil: 'networkidle' });

  const potCardButtonAddition: Locator = AddMoneyToPot.selectPotCardButtonAddition(page, potName);
  await potCardButtonAddition.click();

  const moneyInputField: Locator = AddMoneyToPot.selectMoneyInputField(page, potName);
  await moneyInputField.waitFor({ state: 'visible' });
  await moneyInputField.fill('1000');

  const submitButton: Locator = AddMoneyToPot.selectSubmitButton(page, potName);
  await submitButton.click();
});

test('withdraw money from pot', async ({ page }): Promise<void> => {
  await page.goto('http://localhost:5173/pots', { waitUntil: 'networkidle' });

  const potCardButtonWithdraw: Locator = WithdrawMoneyFromPot.selectPotCardButtonWithdraw(
    page,
    potName
  );
  await potCardButtonWithdraw.click();

  const moneyInputField: Locator = WithdrawMoneyFromPot.selectMoneyInputField(page, potName);
  await moneyInputField.waitFor({ state: 'visible' });
  await moneyInputField.fill('500');

  const submitButton: Locator = WithdrawMoneyFromPot.selectSubmitButton(page, potName);
  await submitButton.click();
});

test('delete pot', async ({ page }): Promise<void> => {
  await page.goto('http://localhost:5173/pots', { waitUntil: 'networkidle' });

  const cardHeaderIcon: Locator = DeletePot.selectCardHeaderDeleteIcon(page, potName);
  await cardHeaderIcon.click();

  const dropdownItem: Locator = DeletePot.selectCardHeaderIconDropdownItemDelete(page, potName);
  await dropdownItem.waitFor({ state: 'visible' });
  await dropdownItem.click();

  const submitButton: Locator = DeletePot.selectSubmitButton(page);
  await submitButton.click();
});
