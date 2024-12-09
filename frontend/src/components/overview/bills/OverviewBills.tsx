import './OverviewBills.scss';
import OverviewHeader from '../OverviewHeader';
import BillRow from './BillRow';
import { BillsHelper } from '../../../globals/helper/BillsHelper';
import LoadingSpinner from '../../LoadingSpinner';
import { EPTransaction } from '../../../model/entrypoints/EPTransaction';
import { ReactNode } from 'react';

interface Props {
  bills: EPTransaction[];
  today: Date;
  isLoading: boolean;
}

const OverviewBills: ({ bills, today, isLoading }: Props) => ReactNode = ({
  bills,
  today,
  isLoading,
}: Props): ReactNode => {
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
};

export default OverviewBills;
