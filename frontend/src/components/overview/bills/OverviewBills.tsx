import './OverviewBills.scss';
import { OverviewHeader } from '../OverviewHeader';
import { BillRow } from './BillRow';

export function OverviewBills() {
  return (
    <>
      <div className="overviewBills" data-testid="overview-bills">
        <OverviewHeader title="Recurring Bills" linkText="See Details" linkTarget="/bills" />
        <div className="overviewBillsContent">
          <BillRow title="Paid Bills" value="$190.00" color="dark-green" />
          <BillRow title="Total Upcoming" value="$194.98" color="beige" />
          <BillRow title="Due Soon" value="$59.98" color="light-blue" />
        </div>
      </div>
    </>
  );
}
