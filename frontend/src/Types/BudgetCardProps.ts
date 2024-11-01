import { EPTransaction } from './EPTransaction';
import { EPBudget } from './EPBudget';

export interface BudgetCardProps {
  budget: EPBudget;
  transactions: EPTransaction[];
}
