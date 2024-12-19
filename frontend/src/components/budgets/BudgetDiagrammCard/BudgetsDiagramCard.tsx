import './BudgetsDiagramCard.scss';
import BudgetsDiagram from '../BudgetsDiagram';
import BudgetsDiagramCardRow from './BudgetsDiagramCardRow';
import { EPBudget } from '../../../model/entrypoints/EPBudget';
import LoadingSpinner from '../../LoadingSpinner';
import { EPTransaction } from '../../../model/entrypoints/EPTransaction';
import { ReactNode } from 'react';

interface Props {
  budgets: EPBudget[];
  transactions: EPTransaction[];
  isLoading: boolean;
}

const BudgetsDiagramCard: ({ budgets, transactions, isLoading }: Props) => ReactNode = ({
  budgets,
  transactions,
  isLoading,
}: Props): ReactNode => {
  const getCurrentAmount: (categoryKey: string) => number = (categoryKey: string): number => {
    let spent: number = 0;
    transactions.forEach((transaction) => {
      if (transaction.categoryKey === categoryKey) {
        const amountToAdd: number = transaction.amount < 0 ? transaction.amount : 0;
        spent = spent + amountToAdd;
      }
    });
    spent = spent * -1;
    return spent;
  };
  budgets.sort((a: EPBudget, b: EPBudget) => b.maximum - a.maximum);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
      )}
    </>
  );
};

export default BudgetsDiagramCard;
