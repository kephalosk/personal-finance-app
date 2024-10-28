import './BudgetsPage.scss';
import { HeaderBar } from '../components/budgets/HeaderBar';
import { BudgetsDiagramCard } from '../components/budgets/BudgetDiagrammCard/BudgetsDiagramCard';
import { BudgetCard } from '../components/budgets/BudgetCard/BudgetCard';
import { getBudgets } from '../globals/services/BudgetService';
import { EPBudget } from '../types/EPBudget';
import { EPTransaction } from '../types/EPTransaction';
import { getTransactions } from '../globals/services/TransactionService';

export function BudgetsPage() {
  const budgets: EPBudget[] = getBudgets();
  const transactions: EPTransaction[] = getTransactions();

  return (
    <>
      <div className="budgetsPage" data-testid="budgets-page">
        <HeaderBar h1Headline="Budgets" buttonText="+ Add New Budget" />
        <div className="budgetsDetails">
          <div className="budgetsDetailsLeft">
            <BudgetsDiagramCard />
          </div>
          <div className="budgetsDetailsRight">
            {budgets.map((budget: EPBudget, index: number) => (
              <BudgetCard key={index} budget={budget} transactions={transactions} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
