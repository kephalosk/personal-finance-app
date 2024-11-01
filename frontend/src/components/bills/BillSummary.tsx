import './BillSummary.scss';
import { BillSummaryProps } from '../../types/BillSummaryProps';
import PropTypes from 'prop-types';

BillSummary.propTypes = {
  bills: PropTypes.array.isRequired,
};

export function BillSummary({ bills, today }: BillSummaryProps) {
  const todayDay = today.getDate();
  const soonDay = todayDay + 5;

  let paidBillsSum = 0;
  let paidBillsIndex = 0;
  let upcomingBillsSum = 0;
  let upcomingBillsIndex = 0;
  let dueBillsSum = 0;
  let dueBillsIndex = 0;

  const raisePaidBills = (amount: number) => {
    const amountPositive = amount * -1;
    paidBillsSum = paidBillsSum + amountPositive;
    paidBillsIndex = paidBillsIndex + 1;
  };

  const raiseUpcomingBills = (amount: number) => {
    const amountPositive = amount * -1;
    upcomingBillsSum = upcomingBillsSum + amountPositive;
    upcomingBillsIndex = upcomingBillsIndex + 1;
  };

  const raiseDueBills = (amount: number) => {
    const amountPositive = amount * -1;
    dueBillsSum = dueBillsSum + amountPositive;
    dueBillsIndex = dueBillsIndex + 1;
  };

  bills.forEach((bill) => {
    const billDay = bill.dateRaw.getDate();
    if (billDay <= todayDay) {
      raisePaidBills(bill.amount);
    } else if (billDay <= soonDay) {
      raiseUpcomingBills(bill.amount);
      raiseDueBills(bill.amount);
    } else {
      raiseUpcomingBills(bill.amount);
    }
  });

  const paidBillsSumFormatted = paidBillsSum.toFixed(2);
  const upcomingBillsSumFormatted = upcomingBillsSum.toFixed(2);
  const dueBillsSumFormatted = dueBillsSum.toFixed(2);

  return (
    <>
      <div className="billSummary" data-testid="bill-summary">
        <div className="billSummaryTitle"></div>
        <div className="billSummaryRow">
          <label>Paid Bills</label>
          <label className="billSummaryRowPaid">
            {paidBillsIndex} (${paidBillsSumFormatted})
          </label>
        </div>
        <hr />
        <div className="billSummaryRow">
          <label>Total Upcoming</label>
          <label className="billSummaryRowUpcoming">
            {upcomingBillsIndex} (${upcomingBillsSumFormatted})
          </label>
        </div>
        <hr />
        <div className="billSummaryRow red">
          <label>Due soon</label>
          <label className="billSummaryRowDue">
            {dueBillsIndex} (${dueBillsSumFormatted})
          </label>
        </div>
      </div>
    </>
  );
}
