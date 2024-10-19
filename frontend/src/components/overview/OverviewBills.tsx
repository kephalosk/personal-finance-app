import './OverviewBills.scss';
import { OverviewHeader } from './OverviewHeader';
import { BillRow } from './BillRow';

export function OverviewBills() {
  return (
    <>
      <div className="overviewBills">
        <OverviewHeader title="Recurring Bills" linkText="See Details" linkTarget="//" />
        <BillRow title="Paid Bills" value="$190.00<" />
        <BillRow title="Total Upcoming" value="$194.98" />
        <BillRow title="Due Soon" value="$59.98" />
      </div>
    </>
  );
}
