import { EPBudget } from '../model/entrypoints/EPBudget';
import { ColorNameEnum } from '../model/enum/ColorNameEnum';

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
