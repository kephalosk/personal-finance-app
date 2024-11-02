import { EPBudget } from '../entrypoints/EPBudget';
import { EPTransaction } from '../entrypoints/EPTransaction';

export interface OverviewBudgetsProps {
  budgets: EPBudget[];
  transactions: EPTransaction[];
}
