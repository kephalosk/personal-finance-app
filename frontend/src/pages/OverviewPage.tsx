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

const OverviewPage: () => React.ReactNode = () => {
  const [transactions, setTransactions] = useState<EPTransaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState<boolean>(true);
  useEffect((): void => {
    const fetchTransactions = async (): Promise<void> => {
      const fetchedTransactions: EPTransaction[] = await getTransactions();
      setTransactions(fetchedTransactions);
      setIsLoadingTransactions(false);
    };
    fetchTransactions().then();
  }, []);

  const [bills, setBills] = useState<EPTransaction[]>([]);
  const [isLoadingBills, setIsLoadingBills] = useState<boolean>(true);
  useEffect((): void => {
    const fetchBills = async (): Promise<void> => {
      const fetchedBills: EPTransaction[] = await BillsHelper.getRecurringBillsFromTransactions();
      setBills(fetchedBills);
      setIsLoadingBills(false);
    };
    fetchBills().then();
  }, []);

  const [pots, setPots] = useState<EPPot[]>([]);
  const [isLoadingPots, setIsLoadingPots] = useState<boolean>(true);
  useEffect((): void => {
    const fetchPots = async (): Promise<void> => {
      const fetchedPots: EPPot[] = await getPots();
      setPots(fetchedPots);
      setIsLoadingPots(false);
    };
    fetchPots().then();
  }, []);

  const [budgets, setBudgets] = useState<EPBudget[]>([]);
  const [isLoadingBudgets, setIsLoadingBudgets] = useState<boolean>(true);
  useEffect((): void => {
    const fetchBudgets = async () => {
      const fetchedBudgets: EPBudget[] = await getBudgets();
      setBudgets(fetchedBudgets);
      setIsLoadingBudgets(false);
    };
    fetchBudgets().then();
  }, []);

  const today: Date = new Date();

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
};

export default OverviewPage;
