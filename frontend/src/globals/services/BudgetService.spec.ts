import { EPBudget } from '../../model/entrypoints/EPBudget';
import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import { getBudgets } from './BudgetService';
import axios from 'axios';
import { mockedBudgets2 } from '../../fixtures/MockedBudgets';
import { mockedBudgetsDTO } from '../../fixtures/MockedBudgetsDTO';

jest.mock('axios');

describe('BudgetService', () => {
  const firstEPBudget: EPBudget = {
    category: 'Entertainment',
    categoryKey: 'entertainment',
    maximum: 50.0,
    color: ColorNameEnum.DARKGREEN,
  };

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockedBudgetsDTO });
  });

  it('maps array APIBudgetDTO to array EPBudget correctly', async () => {
    const budgets = await getBudgets();
    expect(budgets).toEqual(mockedBudgets2);
  });

  it('returns fallback values if fetching budgets fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

    const budgets = await getBudgets();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unable to fetch Budgets:')
    );
    expect(budgets).toHaveLength(4);
    expect(budgets.at(0)).toEqual(firstEPBudget);
  });
});
