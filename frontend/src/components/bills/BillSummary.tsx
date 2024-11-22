import './BillSummary.scss';
import { BillSummaryProps } from '../../model/props/BillSummaryProps';
import PropTypes from 'prop-types';
import { BillsHelper } from '../../globals/helper/BillsHelper';
import LoadingSpinner from '../LoadingSpinner';

BillSummary.propTypes = {
  bills: PropTypes.array.isRequired,
  today: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export function BillSummary({ bills, today, isLoading }: BillSummaryProps) {
  const {
    paidBillsSum,
    paidBillsIndex,
    upcomingBillsSum,
    upcomingBillsIndex,
    dueBillsSum,
    dueBillsIndex,
  } = BillsHelper.getPaidUpcomingAndDueBillsSumAndIndex(bills, today);

  const paidBillsSumFormatted = paidBillsSum.toFixed(2);
  const upcomingBillsSumFormatted = upcomingBillsSum.toFixed(2);
  const dueBillsSumFormatted = dueBillsSum.toFixed(2);

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
}
