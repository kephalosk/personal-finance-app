import { Categories } from './Categories';
import { BudgetCategory } from '../model/BudgetCategory';

export const BudgetCategories: BudgetCategory[] = Categories.map((category) => {
  const mappedBudgetCategory: BudgetCategory = {
    key: category.key,
    name: category.name,
    disabled: false,
  };
  return mappedBudgetCategory;
});
