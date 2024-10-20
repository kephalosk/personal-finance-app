import './OverviewBudgets.scss';
import { OverviewHeader } from '../OverviewHeader';
import { ValueBox } from '../ValueBox';
import { BudgetsDiagram } from './BudgetsDiagram';

export function OverviewBudgets() {
  return (
    <>
      <div className="overviewBudgets" data-testid="overview-budgets">
        <OverviewHeader title="Budgets" linkText="See Details" linkTarget="/budgets" />
        <div className="overviewBudgetsContent">
          <BudgetsDiagram />
          <div className="overviewBudgetsValues">
            <ValueBox title="Entertainment" value="50.00" color="dark-green" />
            <ValueBox title="Bills" value="750.00" color="light-blue" />
            <ValueBox title="Dining Out" value="75.00" color="beige" />
            <ValueBox title="Personal Care" value="100.00" color="dark-grey" />
          </div>
        </div>
      </div>
    </>
  );
}
