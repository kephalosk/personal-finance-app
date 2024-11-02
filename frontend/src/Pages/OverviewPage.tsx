import './OverviewPage.scss';
import { OverviewSummary } from '../components/overview/summary/OverviewSummary';
import { OverviewPots } from '../components/overview/pots/OverviewPots';
import { OverviewTransactions } from '../components/overview/transactions/OverviewTransactions';
import { OverviewBudgets } from '../components/overview/budgets/OverviewBudgets';
import { OverviewBills } from '../components/overview/bills/OverviewBills';
import React from 'react';
import { getTransactions } from '../globals/services/TransactionService';
import { EPTransaction } from '../model/entrypoints/EPTransaction';
import { BillsHelper } from '../globals/helper/BillsHelper';
import { EPPot } from '../model/entrypoints/EPPot';
import { getPots } from '../globals/services/PotService';
import { EPBudget } from '../model/entrypoints/EPBudget';
import { getBudgets } from '../globals/services/BudgetService';

export function OverviewPage() {
  const pots: EPPot[] = getPots();
  const transactions: EPTransaction[] = getTransactions();
  const budgets: EPBudget[] = getBudgets();
  const bills: EPTransaction[] = BillsHelper.getRecurringBillsFromTransactions();
  const today = new Date();
  return (
    <div className="overviewPage" data-testid="overview-page">
      <h1>Overview</h1>
      <OverviewSummary />
      <div className="overviewPageDetails">
        <div className="overviewPageDetailsLeft">
          <OverviewPots pots={pots} />
          <OverviewTransactions transactions={transactions} />
        </div>
        <div className="overviewPageDetailsRight">
          <OverviewBudgets budgets={budgets} transactions={transactions} />
          <OverviewBills bills={bills} today={today} />
        </div>
      </div>
    </div>
  );
}
