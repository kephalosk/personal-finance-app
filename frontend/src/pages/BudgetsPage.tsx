import './BudgetsPage.scss';
import { HeaderBar } from '../components/HeaderBar';
import { BudgetsDiagramCard } from '../components/budgets/BudgetDiagrammCard/BudgetsDiagramCard';
import { BudgetCard } from '../components/budgets/BudgetCard/BudgetCard';
import { getBudgets } from '../globals/services/BudgetService';
import { EPBudget } from '../model/entrypoints/EPBudget';
import { EPTransaction } from '../model/entrypoints/EPTransaction';
import { getTransactions } from '../globals/services/TransactionService';
import { useEffect, useState } from 'react';

const BudgetsPage = () => {
  const [transactions, setTransactions] = useState<EPTransaction[]>([]);
  const [budgets, setBudgets] = useState<EPBudget[]>([]);

  const [isLoadingTransactions, setIsLoadingTransactions] = useState<boolean>(true);
  const [isLoadingBudgets, setIsLoadingBudgets] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async (): Promise<void> => {
      const fetchedTransactions: EPTransaction[] = await getTransactions();
      setTransactions(fetchedTransactions);
      setIsLoadingTransactions(false);
    };
    fetchTransactions().then();

    const fetchBudgets = async (): Promise<void> => {
      const fetchedBudgets: EPBudget[] = await getBudgets();
      setBudgets(fetchedBudgets);
      setIsLoadingBudgets(false);
    };
    fetchBudgets().then();
  }, []);

  return (
    <>
      <div className="budgetsPage" data-testid="budgets-page">
        <HeaderBar h1Headline="Budgets" buttonText="+ Add New Budget" />
        <div className="budgetsDetails">
          <div className="budgetsDetailsLeft">
            <BudgetsDiagramCard
              budgets={budgets}
              transactions={transactions}
              isLoading={isLoadingTransactions || isLoadingBudgets}
            />
          </div>
          <div className="budgetsDetailsRight">
            {budgets.map((budget: EPBudget, index: number) => (
              <BudgetCard
                key={index}
                budget={budget}
                transactions={transactions}
                isLoading={isLoadingTransactions || isLoadingBudgets}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetsPage;
