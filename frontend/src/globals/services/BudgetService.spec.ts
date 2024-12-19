import { EPBudget } from '../../model/entrypoints/EPBudget';
import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import { addNewBudget, getBudgets } from './BudgetService';
import axios from 'axios';
import { mockedBudgets2 } from '../../fixtures/MockedBudgets';
import { mockedBudgetsDTO } from '../../fixtures/MockedBudgetsDTO';
import { APIBudgetDTO } from '../../model/api/APIBudgetDTO';
import { ColorCodeEnum } from '../../model/enum/ColorCodeEnum';

jest.mock('axios');

describe('BudgetService', () => {
  const firstEPBudget: EPBudget = {
    category: 'Entertainment',
    categoryKey: 'entertainment',
    maximum: 50.0,
    color: ColorNameEnum.GREEN,
  };
  const mappedFirstEPBudget: APIBudgetDTO = {
    category: 'Entertainment',
    maximum: 50.0,
    theme: ColorCodeEnum.GREEN,
  };

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockedBudgetsDTO });
    (axios.post as jest.Mock).mockResolvedValue({ status: 201 });
  });

  it('maps array ApibudgetDto to array EPBudget correctly', async () => {
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

  it('sends a POST request and resolves successfully', async () => {
    await addNewBudget(firstEPBudget);

    expect(axios.post).toHaveBeenCalledWith(
      'https://backend.philippkraatz.com/api/budget/addNewBudget',
      mappedFirstEPBudget,
      expect.objectContaining({
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  });

  it('returns fallback values if posting new budget fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (axios.post as jest.Mock).mockRejectedValue(new Error('Network Error'));

    await addNewBudget(firstEPBudget);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unable to add new Budget: Error: Network Error')
    );
  });
});
