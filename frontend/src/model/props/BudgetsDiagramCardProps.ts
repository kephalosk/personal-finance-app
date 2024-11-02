import { EPBudget } from '../entrypoints/EPBudget';
import { EPTransaction } from '../entrypoints/EPTransaction';

export interface BudgetsDiagramCardProps {
  budgets: EPBudget[];
  transactions: EPTransaction[];
}
