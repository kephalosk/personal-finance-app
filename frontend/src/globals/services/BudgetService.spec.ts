import { EPBudget } from '../../types/EPBudget';
import { ColorNameEnum } from '../../types/ColorNameEnum';
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
