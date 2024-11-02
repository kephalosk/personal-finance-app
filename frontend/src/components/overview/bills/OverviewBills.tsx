import './OverviewBills.scss';
import { OverviewHeader } from '../OverviewHeader';
import { BillRow } from './BillRow';
import { OverviewBillsProps } from '../../../model/props/OverviewBillsProps';
import PropTypes from 'prop-types';
import { BillsHelper } from '../../../globals/helper/BillsHelper';

OverviewBills.propTypes = {
  bills: PropTypes.array.isRequired,
  today: PropTypes.object.isRequired,
};

export function OverviewBills({ bills, today }: OverviewBillsProps) {
  const { paidBillsSum, upcomingBillsSum, dueBillsSum } =
    BillsHelper.getPaidUpcomingAndDueBillsSumAndIndex(bills, today);
  return (
    <>
      <div className="overviewBills" data-testid="overview-bills">
        <OverviewHeader title="Recurring Bills" linkText="See Details" linkTarget="/bills" />
        <div className="overviewBillsContent">
          <BillRow title="Paid Bills" value={paidBillsSum} color="dark-green" />
          <BillRow title="Total Upcoming" value={upcomingBillsSum} color="beige" />
          <BillRow title="Due Soon" value={dueBillsSum} color="light-blue" />
        </div>
      </div>
    </>
  );
}
