import './BillsPage.scss';
import { BillCard } from '../components/bills/BillCard';
import { BillTotal } from '../components/bills/BillTotal';
import { BillSummary } from '../components/bills/BillSummary';
import { BillsHelper } from '../globals/helper/BillsHelper';
import React, { useEffect, useState } from 'react';
import { EPTransaction } from '../model/entrypoints/EPTransaction';
import getTotalAmount from '../globals/utils/getTotalAmount';

const BillsPage: () => React.ReactNode = () => {
  const [bills, setBills] = useState<EPTransaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect((): void => {
    const fetchBills = async (): Promise<void> => {
      const fetchedBills: EPTransaction[] = await BillsHelper.getRecurringBillsFromTransactions();
      setBills(fetchedBills);
      setIsLoading(false);
    };
    fetchBills().then();
  }, []);

  const billsTotal: number = getTotalAmount(bills);

  const today: Date = new Date();
  return (
    <>
      <div className="billsPage" data-testid="bills-page">
        <h1>Recurring Bills</h1>
        <div className="billsPageDetails">
          <div className="billsPageDetailsOverview">
            <BillTotal sum={billsTotal} isLoading={isLoading} />
            <BillSummary bills={bills} today={today} isLoading={isLoading} />
          </div>
          <BillCard bills={bills} today={today} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};

export default BillsPage;
