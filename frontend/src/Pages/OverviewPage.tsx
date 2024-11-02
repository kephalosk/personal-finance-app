import './OverviewPage.scss';
import { OverviewSummary } from '../components/overview/summary/OverviewSummary';
import { OverviewPots } from '../components/overview/pots/OverviewPots';
import { OverviewTransactions } from '../components/overview/transactions/OverviewTransactions';
import { OverviewBudgets } from '../components/overview/budgets/OverviewBudgets';
import { OverviewBills } from '../components/overview/bills/OverviewBills';
import React from 'react';
import { getTransactions } from '../globals/services/TransactionService';
import { EPTransaction } from '../model/entrypoints/EPTransaction';

export function OverviewPage() {
  const transactions: EPTransaction[] = getTransactions();
  return (
    <div className="overviewPage" data-testid="overview-page">
      <h1>Overview</h1>
      <OverviewSummary />
      <div className="overviewPageDetails">
        <div className="overviewPageDetailsLeft">
          <OverviewPots />
          <OverviewTransactions transactions={transactions} />
        </div>
        <div className="overviewPageDetailsRight">
          <OverviewBudgets />
          <OverviewBills />
        </div>
      </div>
    </div>
  );
}
