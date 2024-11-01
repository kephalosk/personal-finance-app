import './OverviewBudgets.scss';
import { OverviewHeader } from '../OverviewHeader';
import { ValueBox } from '../ValueBox';
import { BudgetsDiagram } from '../../budgets/BudgetsDiagram';
import { getBudgets } from '../../../globals/services/BudgetService';
import { getTransactions } from '../../../globals/services/TransactionService';
import { EPBudget } from '../../../types/EPBudget';
import { EPTransaction } from '../../../types/EPTransaction';

export function OverviewBudgets() {
  const budgets: EPBudget[] = getBudgets();
  const transactions: EPTransaction[] = getTransactions();
  return (
    <>
      <div className="overviewBudgets" data-testid="overview-budgets">
        <OverviewHeader title="Budgets" linkText="See Details" linkTarget="/budgets" />
        <div className="overviewBudgetsContent">
          <BudgetsDiagram budgets={budgets} transactions={transactions} />
          <div className="overviewBudgetsValues">
            <ValueBox title="Entertainment" value={50.0} color="dark-green" />
            <ValueBox title="Bills" value={750.0} color="light-blue" />
            <ValueBox title="Dining Out" value={75.0} color="beige" />
            <ValueBox title="Personal Care" value={100.0} color="dark-grey" />
          </div>
        </div>
      </div>
    </>
  );
}
