import './BudgetsDiagramCard.scss';
import { BudgetsDiagram } from '../../overview/budgets/BudgetsDiagram';
import { BudgetsDiagramCardRow } from './BudgetsDiagramCardRow';

export function BudgetsDiagramCard() {
  return (
    <>
      <div className="budgetsDiagramCard" data-testid="budgets-diagram-card">
        <BudgetsDiagram />
        <div className="budgetsDiagramCardDetails">
          <label className="budgetsDiagramCardDetailsLabel">Spending Summary</label>
          <BudgetsDiagramCardRow
            title="Entertainment"
            currentAmount="$15.00"
            maxAmount="$50.00"
            color="dark-green"
          />
          <hr />
          <BudgetsDiagramCardRow
            title="Bills"
            currentAmount="$150.00"
            maxAmount="$750.00"
            color="light-blue"
          />
          <hr />
          <BudgetsDiagramCardRow
            title="Dining Out"
            currentAmount="$133.00"
            maxAmount="$75.00"
            color="beige"
          />
          <hr />
          <BudgetsDiagramCardRow
            title="Personal Care"
            currentAmount="$40.00"
            maxAmount="$100.00"
            color="dark-grey"
          />
        </div>
      </div>
    </>
  );
}
