import './BillsPage.scss';
import { BillCard } from '../components/bills/BillCard';
import { BillTotal } from '../components/bills/BillTotal';
import { BillSummary } from '../components/bills/BillSummary';
import { BillsHelper } from '../globals/helper/BillsHelper';

export function BillsPage() {
  const bills = BillsHelper.getRecurringBillsFromTransactions();
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
            <BillTotal sum={billsTotal} />
            <BillSummary bills={bills} today={today} />
          </div>
          <BillCard bills={bills} today={today} />
        </div>
      </div>
    </>
  );
}
