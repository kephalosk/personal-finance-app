import { BudgetCategory } from '../model/BudgetCategory';
import { CategoryEnum } from '../model/StammdatenC/CategoryEnum';
import { CategoryKeyEnum } from '../model/StammdatenC/CategoryKeyEnum';

export const mockedBudgetCategories: BudgetCategory[] = [
  { name: CategoryEnum.GENERAL, key: CategoryKeyEnum.GENERAL, disabled: false },
  { name: CategoryEnum.DINING_OUT, key: CategoryKeyEnum.DINING_OUT, disabled: false },
  { name: CategoryEnum.GROCERIES, key: CategoryKeyEnum.GROCERIES, disabled: false },
  { name: CategoryEnum.ENTERTAINMENT, key: CategoryKeyEnum.ENTERTAINMENT, disabled: false },
  { name: CategoryEnum.TRANSPORTATION, key: CategoryKeyEnum.TRANSPORTATION, disabled: false },
  { name: CategoryEnum.LIFESTYLE, key: CategoryKeyEnum.LIFESTYLE, disabled: false },
  { name: CategoryEnum.PERSONAL_CARE, key: CategoryKeyEnum.PERSONAL_CARE, disabled: true },
  { name: CategoryEnum.EDUCATION, key: CategoryKeyEnum.EDUCATION, disabled: true },
  { name: CategoryEnum.BILLS, key: CategoryKeyEnum.BILLS, disabled: true },
  { name: CategoryEnum.SHOPPING, key: CategoryKeyEnum.SHOPPING, disabled: true },
];

export const mockedBudgetCategoriesAllEnabled: BudgetCategory[] = [
  { name: CategoryEnum.GENERAL, key: CategoryKeyEnum.GENERAL, disabled: false },
  { name: CategoryEnum.DINING_OUT, key: CategoryKeyEnum.DINING_OUT, disabled: false },
  { name: CategoryEnum.GROCERIES, key: CategoryKeyEnum.GROCERIES, disabled: false },
  { name: CategoryEnum.ENTERTAINMENT, key: CategoryKeyEnum.ENTERTAINMENT, disabled: false },
  { name: CategoryEnum.TRANSPORTATION, key: CategoryKeyEnum.TRANSPORTATION, disabled: false },
  { name: CategoryEnum.LIFESTYLE, key: CategoryKeyEnum.LIFESTYLE, disabled: false },
  { name: CategoryEnum.PERSONAL_CARE, key: CategoryKeyEnum.PERSONAL_CARE, disabled: false },
  { name: CategoryEnum.EDUCATION, key: CategoryKeyEnum.EDUCATION, disabled: false },
  { name: CategoryEnum.BILLS, key: CategoryKeyEnum.BILLS, disabled: false },
  { name: CategoryEnum.SHOPPING, key: CategoryKeyEnum.SHOPPING, disabled: false },
];

export const mockedBudgetCategory: BudgetCategory = {
  name: 'General',
  key: 'general',
  disabled: false,
};
