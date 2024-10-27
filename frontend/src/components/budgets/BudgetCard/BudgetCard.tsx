import './BudgetCard.scss';
import { BudgetCardHeader } from './BudgetCardHeader';
import { ValueBox } from '../../overview/ValueBox';
import { BudgetCardList } from './BudgetCardList';
import { BudgetCardProps } from '../../../types/BudgetCardProps';

export function BudgetCard({ transactions, link, maximum, category, color }: BudgetCardProps) {
  let spent: number = 0;
  transactions.forEach((transaction) => {
    spent = spent + transaction.value;
  });
  spent = spent * -1;

  const remaining: number = maximum - spent;
  return (
    <>
      <div className="budgetCard" data-testid="budget-card">
        <BudgetCardHeader title={category} />
        <label className="budgetCardBarLabel">Maximum of ${maximum}</label>
        <div className="budgetCardBarMax">
          <div className="budgetCardBarCurrent"></div>
        </div>
        <div className="budgetCardBarValues">
          <ValueBox title="Spent" value={spent} color={color} />
          <ValueBox title="Remaining" value={remaining} color="beige" />
        </div>
        <BudgetCardList transactions={transactions} link={link} />
      </div>
    </>
  );
}
