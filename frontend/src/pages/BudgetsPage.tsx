import './BudgetsPage.scss';
import { HeaderBar } from '../components/HeaderBar';
import { BudgetsDiagramCard } from '../components/budgets/BudgetDiagrammCard/BudgetsDiagramCard';
import { BudgetCard } from '../components/budgets/BudgetCard/BudgetCard';
import { getBudgets } from '../globals/services/BudgetService';
import { EPBudget } from '../model/entrypoints/EPBudget';
import { EPTransaction } from '../model/entrypoints/EPTransaction';
import { getTransactions } from '../globals/services/TransactionService';
import React, { useEffect, useState } from 'react';

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

  //New Component
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const closeForm = () => {
    setIsHidden(true);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (event.key === 'Enter') {
      closeForm();
    }
  };

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
        <div className={`backgroundOverlay ${isHidden ? 'isHidden' : ''}`}></div>
        <div className={`formOverlay ${isHidden ? 'isHidden' : ''}`}>
          <header className="formOverlayHeader">
            <div className="formOverlayHeaderBar">
              <h2 className="formOverlayHeaderBarTitle">Add New Budget</h2>
              <img
                className="formOverlayHeaderBarIcon"
                alt="closing icon"
                aria-hidden="false"
                src="/images/icon-close-modal.svg"
                tabIndex={0}
                onClick={closeForm}
                onKeyDown={handleKeyDown}
              />
            </div>
            <p className="formOverlayHeaderText">
              Choose a category to set a spending budget. These categories can help you monitor
              spending.
            </p>
          </header>
          <section className="formOverlayContent">
            <label className="fieldTitle">Budget Category</label>
            <div className="dropdownCategory" tabIndex={0}>
              Entertainment
              <img
                className="dropdownCategoryIcon"
                alt="caret icon"
                aria-hidden="true"
                src="/images/icon-caret-down.svg"
              />
              <div className="dropdownCategoryList" tabIndex={0}>
                Entertainment
              </div>
            </div>
            <label className="fieldTitle">Maximum Spend</label>
            <input className="inputMoney" />
            <label className="fieldTitle">Theme</label>
            <div className="dropdownColor" tabIndex={0}>
              <div className="dropdownColorCircle"></div>
              Green
              <img
                className="dropdownCategoryIcon"
                alt="caret icon"
                aria-hidden="true"
                src="/images/icon-caret-down.svg"
              />
            </div>
          </section>
          <button className="formOverlaySubmit" onClick={closeForm}>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default BudgetsPage;
