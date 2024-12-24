import data from '../data.json';
import { APIBudgetDTO } from '../../model/api/APIBudgetDTO';
import { EPBudget } from '../../model/entrypoints/EPBudget';
import { toLowerCaseWithoutWhitespace } from '../utils/ToLowerCaseWithoutWhitespace';
import { fromColorCodeToName } from '../utils/FromColorCodeToName';
import axios, { AxiosResponse } from 'axios';
import { AppConfig } from '../../config';
import { fromColorNameToCode } from '../utils/FromColorNameToCode';

export async function getBudgets(): Promise<EPBudget[]> {
  const apiUrl: string = `${AppConfig.API_BACKEND_HOST}/budget`;

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
      maximum: Number(budget.maximum),
      color: fromColorCodeToName(budget.theme),
    };
    epBudgets.push(newBudget);
  });
  return epBudgets;
}

export async function addNewBudget(newBudget: EPBudget): Promise<void> {
  const apiUrl: string = `${AppConfig.API_BACKEND_HOST}/budget/addNewBudget`;

  try {
    const newBudgetDTO: APIBudgetDTO = fromEPBudgetMapper(newBudget);

    await axios.post<APIBudgetDTO>(apiUrl, newBudgetDTO, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(`Unable to add new Budget: ${error}`);
  }
}

export async function editBudget(editedBudget: EPBudget): Promise<void> {
  const apiUrl: string = `${AppConfig.API_BACKEND_HOST}/budget/editBudget`;

  try {
    const newBudgetDTO: APIBudgetDTO = fromEPBudgetMapper(editedBudget);

    const response: AxiosResponse<APIBudgetDTO, unknown> = await axios.put<APIBudgetDTO>(
      apiUrl,
      newBudgetDTO,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 200) {
      console.log('Budget successfully edited');
    }
  } catch (error) {
    console.error(`Unable to edit Budget: ${error}`);
  }
}

function fromEPBudgetMapper(budget: EPBudget): APIBudgetDTO {
  return {
    category: budget.category,
    maximum: budget.maximum,
    theme: fromColorNameToCode(budget.color),
  };
}
