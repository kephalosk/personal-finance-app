import './BudgetsDiagramCard.scss';
import { BudgetsDiagram } from '../BudgetsDiagram';
import { BudgetsDiagramCardRow } from './BudgetsDiagramCardRow';
import { BudgetsDiagramCardProps } from '../../../model/props/BudgetsDiagramCardProps';
import PropTypes from 'prop-types';
import { EPBudget } from '../../../model/entrypoints/EPBudget';

BudgetsDiagramCard.propTypes = {
  budgets: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
};

export function BudgetsDiagramCard({ budgets, transactions }: BudgetsDiagramCardProps) {
  const getCurrentAmount = (categoryKey: string): number => {
    let spent = 0;
    transactions.forEach((transaction) => {
      if (transaction.categoryKey === categoryKey) {
        spent = spent + transaction.amount;
      }
    });
    spent = spent * -1;
    return spent;
  };

  return (
    <>
      <div className="budgetsDiagramCard" data-testid="budgets-diagram-card">
        <div className="budgetsDiagramWrapper">
          <BudgetsDiagram budgets={budgets} transactions={transactions} />
        </div>
        <div className="budgetsDiagramCardDetails">
          <label className="budgetsDiagramCardDetailsLabel">Spending Summary</label>
          <div className="budgetsDiagramCardRowWrapper">
            {budgets.map((budget: EPBudget, index: number) => (
              <div key={index}>
                <BudgetsDiagramCardRow
                  title={budget.category}
                  currentAmount={getCurrentAmount(budget.categoryKey)}
                  maxAmount={budget.maximum}
                  color={budget.color}
                />
                {index < budgets.length - 1 && <hr className="budgetsDiagramCardDetailsLine" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
