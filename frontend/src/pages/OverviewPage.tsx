import './OverviewPage.scss';
import { OverviewSummary } from '../components/overview/summary/OverviewSummary';
import { OverviewPots } from '../components/overview/pots/OverviewPots';
import { OverviewTransactions } from '../components/overview/transactions/OverviewTransactions';
import { OverviewBudgets } from '../components/overview/budgets/OverviewBudgets';
import { OverviewBills } from '../components/overview/bills/OverviewBills';
import React, { useEffect, useState } from 'react';
import { getTransactions } from '../globals/services/TransactionService';
import { EPTransaction } from '../model/entrypoints/EPTransaction';
import { BillsHelper } from '../globals/helper/BillsHelper';
import { EPPot } from '../model/entrypoints/EPPot';
import { getPots } from '../globals/services/PotService';
import { EPBudget } from '../model/entrypoints/EPBudget';
import { getBudgets } from '../globals/services/BudgetService';

export function OverviewPage() {
  const [bills, setBills] = useState<EPTransaction[]>([]);
  const [transactions, setTransactions] = useState<EPTransaction[]>([]);
  const [pots, setPots] = useState<EPPot[]>([]);
  const [budgets, setBudgets] = useState<EPBudget[]>([]);
  const today: Date = new Date();

  const [isLoadingTransactions, setIsLoadingTransactions] = useState<boolean>(true);
  const [isLoadingBills, setIsLoadingBills] = useState<boolean>(true);
  const [isLoadingPots, setIsLoadingPots] = useState<boolean>(true);
  const [isLoadingBudgets, setIsLoadingBudgets] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async (): Promise<void> => {
      const fetchedTransactions: EPTransaction[] = await getTransactions();
      setTransactions(fetchedTransactions);
      setIsLoadingTransactions(false);
    };
    fetchTransactions().then();

    const fetchBills = async (): Promise<void> => {
      const fetchedBills: EPTransaction[] = await BillsHelper.getRecurringBillsFromTransactions();
      setBills(fetchedBills);
      setIsLoadingBills(false);
    };
    fetchBills().then();

    const fetchPots = async (): Promise<void> => {
      const fetchedPots: EPPot[] = await getPots();
      setPots(fetchedPots);
      setIsLoadingPots(false);
    };
    fetchPots().then();

    const fetchBudgets = async () => {
      const fetchedBudgets: EPBudget[] = await getBudgets();
      setBudgets(fetchedBudgets);
      setIsLoadingBudgets(false);
    };
    fetchBudgets().then();
  }, []);

  return (
    <div className="overviewPage" data-testid="overview-page">
      <h1>Overview</h1>
      <OverviewSummary />
      <div className="overviewPageDetails">
        <div className="overviewPageDetailsLeft">
          <OverviewPots pots={pots} isLoading={isLoadingPots} />
          <OverviewTransactions
            transactions={transactions}
            isLoading={isLoadingTransactions || isLoadingBudgets}
          />
        </div>
        <div className="overviewPageDetailsRight">
          <OverviewBudgets
            budgets={budgets}
            transactions={transactions}
            isLoading={isLoadingTransactions}
          />
          <OverviewBills bills={bills} today={today} isLoading={isLoadingBills} />
        </div>
      </div>
    </div>
  );
}
