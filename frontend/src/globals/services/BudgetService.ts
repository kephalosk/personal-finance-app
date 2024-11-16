import data from '../data.json';
import { APIBudgetDTO } from '../../model/api/APIBudgetDTO';
import { EPBudget } from '../../model/entrypoints/EPBudget';
import { toLowerCaseWithoutWhitespace } from '../utils/ToLowerCaseWithoutWhitespace';
import { fromColorCodeToName } from '../utils/FromColorCodeToName';
import axios, { AxiosResponse } from 'axios';
import { AppConfig } from '../../config';

export async function getBudgets(): Promise<EPBudget[]> {
  const apiUrl = `${AppConfig.API_BASE_PATH}/budget`;

  try {
    const response: AxiosResponse<APIBudgetDTO[]> = await axios.get<APIBudgetDTO[]>(apiUrl);

    const fetchedBudgets: APIBudgetDTO[] = response.data;

    return fromAPIBudgetDTOMapper(fetchedBudgets);
  } catch (error) {
    console.error(`Unable to fetch Budgets: ${error}`);
    const { budgets } = data;
    return fromAPIBudgetDTOMapper(budgets);
  }
}

function fromAPIBudgetDTOMapper(budgets: APIBudgetDTO[]): EPBudget[] {
  const epBudgets: EPBudget[] = [];
  budgets.forEach((budget) => {
    const newBudget: EPBudget = {
      category: budget.category,
      categoryKey: toLowerCaseWithoutWhitespace(budget.category),
      maximum: budget.maximum,
      color: fromColorCodeToName(budget.theme),
    };
    epBudgets.push(newBudget);
  });
  return epBudgets;
}
