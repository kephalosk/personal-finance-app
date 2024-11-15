import { EPBudget } from '../model/entrypoints/EPBudget';
import { APIBudgetDTO } from '../model/api/APIBudgetDTO';
import { ColorNameEnum } from '../model/enum/ColorNameEnum';

export const mockedBudgets: EPBudget[] = [
  {
    category: 'Dining Out',
    categoryKey: 'diningout',
    maximum: 300,
    color: 'testColor',
  },
  {
    category: 'Entertainment',
    categoryKey: 'entertainment',
    maximum: 100,
    color: 'testColor',
  },
];

export const mockedBudget: EPBudget = {
  category: 'Entertainment',
  categoryKey: 'entertainment',
  maximum: 100,
  color: 'testColor',
};

export const mockedBudgets6: EPBudget[] = [
  {
    category: 'Entertainment',
    categoryKey: 'entertainment',
    maximum: 100,
    color: 'testColor',
  },
  {
    category: 'Dining Out',
    categoryKey: 'diningout',
    maximum: 300,
    color: 'testColor',
  },
  {
    category: 'Entertainment',
    categoryKey: 'entertainment',
    maximum: 100,
    color: 'testColor',
  },
  {
    category: 'Dining Out',
    categoryKey: 'diningout',
    maximum: 300,
    color: 'testColor',
  },
  {
    category: 'Entertainment',
    categoryKey: 'entertainment',
    maximum: 100,
    color: 'testColor',
  },
  {
    category: 'Dining Out',
    categoryKey: 'diningout',
    maximum: 300,
    color: 'testColor',
  },
];

export const mockedBudgets2: EPBudget[] = [
  {
    category: 'Entertainment',
    categoryKey: 'entertainment',
    maximum: 50.0,
    color: ColorNameEnum.DARKGREEN,
  },
  {
    category: 'Bills',
    categoryKey: 'bills',
    maximum: 750.0,
    color: ColorNameEnum.LIGHTBLUE,
  },
];
