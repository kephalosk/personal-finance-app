import { Route } from 'react-router-dom';
import OverviewPage from './pages/OverviewPage';
import TransactionsPage from './pages/TransactionsPage';
import BudgetsPage from './pages/BudgetsPage';
import PotsPage from './pages/PotsPage';
import BillsPage from './pages/BillsPage';
import NoPage from './pages/NoPage';
import React, { ReactNode } from 'react';
import ShowcaseAddNewBudgetForm from './showcase/ShowcaseAddNewBudgetForm';
import ShowcaseEditBudgetForm from './showcase/ShowcaseEditBudgetForm';

export const getAppRoutes = () => {
  return (
    <>
      <Route path="/" element={<OverviewPage />} />
      <Route path="transactions" element={<TransactionsPage />} />
      <Route path="budgets" element={<BudgetsPage />} />
      <Route path="pots" element={<PotsPage />} />
      <Route path="bills" element={<BillsPage />} />
      <Route path="*" element={<NoPage />} />
    </>
  );
};

export const getShowcaseRoutes = (): ReactNode => {
  return (
    <>
      <Route path="showcase/AddNewBudgetForm" element={<ShowcaseAddNewBudgetForm />} />
      <Route path="showcase/EditBudgetForm" element={<ShowcaseEditBudgetForm />} />
    </>
  );
};