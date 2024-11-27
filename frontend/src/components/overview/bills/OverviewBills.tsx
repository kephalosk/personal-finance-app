import './OverviewBills.scss';
import { OverviewHeader } from '../OverviewHeader';
import { BillRow } from './BillRow';
import { OverviewBillsProps } from '../../../model/props/OverviewBillsProps';
import PropTypes from 'prop-types';
import { BillsHelper } from '../../../globals/helper/BillsHelper';
import LoadingSpinner from '../../LoadingSpinner';

OverviewBills.propTypes = {
  bills: PropTypes.array.isRequired,
  today: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export function OverviewBills({ bills, today, isLoading }: OverviewBillsProps) {
  const { paidBillsSum, upcomingBillsSum, dueBillsSum } =
    BillsHelper.getPaidUpcomingAndDueBillsSumAndIndex(bills, today);
  return (
    <>
      <div className="overviewBills" data-testid="overview-bills">
        <OverviewHeader title="Recurring Bills" linkText="See Details" linkTarget="/bills" />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="overviewBillsContent">
            <BillRow title="Paid Bills" value={paidBillsSum} color="green" />
            <BillRow title="Total Upcoming" value={upcomingBillsSum} color="yellow" />
            <BillRow title="Due Soon" value={dueBillsSum} color="cyan" />
          </div>
        )}
      </div>
    </>
  );
}
