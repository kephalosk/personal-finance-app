import data from '../data.json';
import { APIBudgetDTO } from '../../types/APIBudgetDTO';
import { EPBudget } from '../../types/EPBudget';
import { toLowerCaseWithoutWhitespace } from '../utils/ToLowerCaseWithoutWhitespace';
import { fromColorCodeToName } from '../utils/FromColorCodeToName';

export function getBudgets(): EPBudget[] {
  const { budgets } = data;
  return fromAPIBudgetDTOMapper(budgets);
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
