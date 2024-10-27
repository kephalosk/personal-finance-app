import { TransactionRowProps } from './TransactionRowProps';

export interface BudgetCardProps {
  transactions: TransactionRowProps[];
  link: string;
  maximum: number;
  category: string;
  color: string;
}
