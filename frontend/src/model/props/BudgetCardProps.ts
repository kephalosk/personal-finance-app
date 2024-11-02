import { EPTransaction } from '../entrypoints/EPTransaction';
import { EPBudget } from '../entrypoints/EPBudget';

export interface BudgetCardProps {
  budget: EPBudget;
  transactions: EPTransaction[];
}
