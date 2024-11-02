import { EPBudget } from '../entrypoints/EPBudget';
import { EPTransaction } from '../entrypoints/EPTransaction';

export interface BudgetsDiagramProps {
  budgets: EPBudget[];
  transactions: EPTransaction[];
}
