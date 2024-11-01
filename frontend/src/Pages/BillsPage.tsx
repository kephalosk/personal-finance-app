import './BillsPage.scss';
import { BillCard } from '../components/bills/BillCard';
import { BillTotal } from '../components/bills/BillTotal';
import { BillSummary } from '../components/bills/BillSummary';
import { getTransactions } from '../globals/services/TransactionService';
import { EPTransaction } from '../model/entrypoints/EPTransaction';

export function BillsPage() {
  const bills: EPTransaction[] = getTransactions().filter((transaction) => {
    return transaction.recurring;
  });
  const billsFiltered: EPTransaction[] = bills.filter(
    (transaction, index, self) =>
      index ===
      self.findIndex((t) => {
        return t.name === transaction.name;
      })
  );
  let billsTotal = 0;
  billsFiltered.forEach((bill) => {
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
            <BillSummary bills={billsFiltered} today={today} />
          </div>
          <BillCard bills={billsFiltered} today={today} />
        </div>
      </div>
    </>
  );
}
