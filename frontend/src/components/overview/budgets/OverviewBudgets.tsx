import './OverviewBudgets.scss';
import OverviewHeader from '../OverviewHeader';
import ValueBox from '../ValueBox';
import BudgetsDiagram from '../../budgets/BudgetsDiagram';
import { EPBudget } from '../../../model/entrypoints/EPBudget';
import LoadingSpinner from '../../LoadingSpinner';
import { EPTransaction } from '../../../model/entrypoints/EPTransaction';
import { ReactNode } from 'react';

interface Props {
  budgets: EPBudget[];
  transactions: EPTransaction[];
  isLoading: boolean;
}

const OverviewBudgets: ({ budgets, transactions, isLoading }: Props) => ReactNode = ({
  budgets,
  transactions,
  isLoading,
}: Props): ReactNode => {
  budgets.sort((a: EPBudget, b: EPBudget) => b.maximum - a.maximum);
  const budgetsHighestFour: EPBudget[] = budgets.slice(0, 4);

  return (
    <>
      <div className="overviewBudgets" data-testid="overview-budgets">
        <OverviewHeader title="Budgets" linkText="See Details" linkTarget="/budgets" />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="overviewBudgetsContent">
            <BudgetsDiagram budgets={budgets} transactions={transactions} />
            <div className="overviewBudgetsValues">
              {budgetsHighestFour.map((budget: EPBudget, index: number) => (
                <ValueBox
                  key={index}
                  title={budget.category}
                  value={budget.maximum}
                  color={budget.color}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OverviewBudgets;
