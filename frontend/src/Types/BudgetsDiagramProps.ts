import { EPBudget } from './EPBudget';
import { EPTransaction } from './EPTransaction';

export interface BudgetsDiagramProps {
  budgets: EPBudget[];
  transactions: EPTransaction[];
}
