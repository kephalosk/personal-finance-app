import './BillsPage.scss';
import { BillCard } from '../components/bills/BillCard';
import { BillTotal } from '../components/bills/BillTotal';
import { BillSummary } from '../components/bills/BillSummary';
import { BillsHelper } from '../globals/helper/BillsHelper';
import { useEffect, useState } from 'react';
import { EPTransaction } from '../model/entrypoints/EPTransaction';

export function BillsPage() {
  const [bills, setBills] = useState<EPTransaction[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBills = async () => {
      const fetchedBills = await BillsHelper.getRecurringBillsFromTransactions();
      setBills(fetchedBills);
      setIsLoading(false);
    };
    fetchBills().then();
  }, []);

  let billsTotal = 0;
  bills.forEach((bill) => {
    billsTotal = billsTotal + bill.amount;
  });
  billsTotal = billsTotal * -1;

  const today = new Date();
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
}
