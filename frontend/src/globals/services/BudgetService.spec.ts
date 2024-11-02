import { EPBudget } from '../../model/entrypoints/EPBudget';
import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import { getBudgets } from './BudgetService';

describe('BudgetService', () => {
  const firstEPBudget: EPBudget = {
    category: 'Entertainment',
    categoryKey: 'entertainment',
    maximum: 50.0,
    color: ColorNameEnum.DARKGREEN,
  };

  it('maps array APIBudgetDTO to array EPBudget correctly', () => {
    const budgets = getBudgets();
    expect(budgets.at(0)).toEqual(firstEPBudget);
  });
});
