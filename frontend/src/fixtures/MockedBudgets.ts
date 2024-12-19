import { EPBudget } from '../model/entrypoints/EPBudget';
import { ColorNameEnum } from '../model/enum/ColorNameEnum';
import { CategoryEnum } from '../model/StammdatenC/CategoryEnum';
import { CategoryKeyEnum } from '../model/StammdatenC/CategoryKeyEnum';

export const mockedBudgets: EPBudget[] = [
  {
    category: 'Dining Out',
    categoryKey: 'diningout',
    maximum: 300,
    color: ColorNameEnum.WHITE,
  },
  {
    category: 'Entertainment',
    categoryKey: 'entertainment',
    maximum: 100,
    color: ColorNameEnum.WHITE,
  },
];

export const mockedBudgetsWithEveryCategory: EPBudget[] = [
  {
    category: CategoryEnum.GENERAL,
    categoryKey: CategoryKeyEnum.GENERAL,
    maximum: 300,
    color: ColorNameEnum.WHITE,
  },
  {
    category: CategoryEnum.DINING_OUT,
    categoryKey: CategoryKeyEnum.DINING_OUT,
    maximum: 100,
    color: ColorNameEnum.WHITE,
  },
  {
    category: CategoryEnum.GROCERIES,
    categoryKey: CategoryKeyEnum.GROCERIES,
    maximum: 300,
    color: ColorNameEnum.WHITE,
  },
  {
    category: CategoryEnum.ENTERTAINMENT,
    categoryKey: CategoryKeyEnum.ENTERTAINMENT,
    maximum: 100,
    color: ColorNameEnum.WHITE,
  },
  {
    category: CategoryEnum.TRANSPORTATION,
    categoryKey: CategoryKeyEnum.TRANSPORTATION,
    maximum: 300,
    color: ColorNameEnum.WHITE,
  },
  {
    category: CategoryEnum.LIFESTYLE,
    categoryKey: CategoryKeyEnum.LIFESTYLE,
    maximum: 100,
    color: ColorNameEnum.WHITE,
  },
  {
    category: CategoryEnum.PERSONAL_CARE,
    categoryKey: CategoryKeyEnum.PERSONAL_CARE,
    maximum: 300,
    color: ColorNameEnum.WHITE,
  },
  {
    category: CategoryEnum.EDUCATION,
    categoryKey: CategoryKeyEnum.EDUCATION,
    maximum: 100,
    color: ColorNameEnum.WHITE,
  },
  {
    category: CategoryEnum.BILLS,
    categoryKey: CategoryKeyEnum.BILLS,
    maximum: 300,
    color: ColorNameEnum.WHITE,
  },
  {
    category: CategoryEnum.SHOPPING,
    categoryKey: CategoryKeyEnum.SHOPPING,
    maximum: 100,
    color: ColorNameEnum.WHITE,
  },
];

export const mockedBudget: EPBudget = {
  category: 'Entertainment',
  categoryKey: 'entertainment',
  maximum: 100,
  color: ColorNameEnum.WHITE,
};

export const mockedBudgets6: EPBudget[] = [
  {
    category: 'Entertainment',
    categoryKey: 'entertainment',
    maximum: 100,
    color: ColorNameEnum.WHITE,
  },
  {
    category: 'Dining Out',
    categoryKey: 'diningout',
    maximum: 300,
    color: ColorNameEnum.WHITE,
  },
  {
    category: 'Entertainment',
    categoryKey: 'entertainment',
    maximum: 100,
    color: ColorNameEnum.WHITE,
  },
  {
    category: 'Dining Out',
    categoryKey: 'diningout',
    maximum: 300,
    color: ColorNameEnum.WHITE,
  },
  {
    category: 'Entertainment',
    categoryKey: 'entertainment',
    maximum: 100,
    color: ColorNameEnum.WHITE,
  },
  {
    category: 'Dining Out',
    categoryKey: 'diningout',
    maximum: 300,
    color: ColorNameEnum.WHITE,
  },
];

export const mockedBudgets2: EPBudget[] = [
  {
    category: 'Entertainment',
    categoryKey: 'entertainment',
    maximum: 50.0,
    color: ColorNameEnum.GREEN,
  },
  {
    category: 'Bills',
    categoryKey: 'bills',
    maximum: 750.0,
    color: ColorNameEnum.CYAN,
  },
];
