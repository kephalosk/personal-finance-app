import './OverviewBudgets.scss';
import { OverviewHeader } from '../OverviewHeader';
import { ValueBox } from '../ValueBox';
import { BudgetsDiagram } from '../../budgets/BudgetsDiagram';
import { EPBudget } from '../../../model/entrypoints/EPBudget';
import { OverviewBudgetsProps } from '../../../model/props/OverviewBudgetsProps';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../LoadingSpinner';

OverviewBudgets.propTypes = {
  budgets: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export function OverviewBudgets({ budgets, transactions, isLoading }: OverviewBudgetsProps) {
  budgets.sort((a, b) => b.maximum - a.maximum);
  const budgetsHighestFour = budgets.slice(0, 4);

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
}
