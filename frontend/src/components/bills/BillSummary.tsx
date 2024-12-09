import './BillSummary.scss';
import { BillsHelper } from '../../globals/helper/BillsHelper';
import LoadingSpinner from '../LoadingSpinner';
import { EPTransaction } from '../../model/entrypoints/EPTransaction';
import { ReactNode } from 'react';

interface Props {
  bills: EPTransaction[];
  today: Date;
  isLoading: boolean;
}

const BillSummary: ({ bills, today, isLoading }: Props) => ReactNode = ({
  bills,
  today,
  isLoading,
}: Props): ReactNode => {
  const {
    paidBillsSum,
    paidBillsIndex,
    upcomingBillsSum,
    upcomingBillsIndex,
    dueBillsSum,
    dueBillsIndex,
  } = BillsHelper.getPaidUpcomingAndDueBillsSumAndIndex(bills, today);

  const paidBillsSumFormatted: string = paidBillsSum.toFixed(2);
  const upcomingBillsSumFormatted: string = upcomingBillsSum.toFixed(2);
  const dueBillsSumFormatted: string = dueBillsSum.toFixed(2);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="billSummary" data-testid="bill-summary">
          <div className="billSummaryTitle">Summary</div>
          <div className="billSummaryRowWrapper">
            <div className="billSummaryRow">
              <label className="billSummaryRowTitle">Paid Bills</label>
              <label className="billSummaryRowPaid">
                {paidBillsIndex} (${paidBillsSumFormatted})
              </label>
            </div>
            <hr className="billSummaryRowLine" />
            <div className="billSummaryRow">
              <label className="billSummaryRowTitle">Total Upcoming</label>
              <label className="billSummaryRowUpcoming">
                {upcomingBillsIndex} (${upcomingBillsSumFormatted})
              </label>
            </div>
            <hr className="billSummaryRowLine" />
            <div className="billSummaryRow red">
              <label className="billSummaryRowTitle">Due soon</label>
              <label className="billSummaryRowDue">
                {dueBillsIndex} (${dueBillsSumFormatted})
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BillSummary;
