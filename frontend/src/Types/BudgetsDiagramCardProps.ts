import { EPBudget } from './EPBudget';
import { EPTransaction } from './EPTransaction';

export interface BudgetsDiagramCardProps {
  budgets: EPBudget[];
  transactions: EPTransaction[];
}
