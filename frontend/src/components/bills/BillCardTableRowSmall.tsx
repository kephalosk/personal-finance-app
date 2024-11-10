import './BillCardTableRowSmall.scss';
import { BillCardTableRowProps } from '../../model/props/BillCardTableRowProps';
import PropTypes from 'prop-types';
import { toOrdinal } from '../../globals/utils/ToOrdinal';

BillCardTableRowSmall.propTypes = {
  transaction: PropTypes.object.isRequired,
  today: PropTypes.object.isRequired,
};

export function BillCardTableRowSmall({ transaction, today }: BillCardTableRowProps) {
  const amountNeutral = transaction.amount * -1;
  const amountFormatted = amountNeutral.toFixed(2);

  const transactionDay: number = transaction.dateRaw.getDate();
  const transactionDaySuffix: string = toOrdinal(transactionDay);
  const todayDay = today.getDate();
  const soonDay = todayDay + 5;

  let isPaid = false;
  let isDue = false;
  if (transactionDay <= todayDay) {
    isPaid = true;
  } else if (transactionDay <= soonDay) {
    isDue = true;
  }

  return (
    <>
      <div className="billCardTableRowSmallWrapper" data-testid="bill-card-table-row-small">
        <div className="billCardTableRowSmall">
          <div className="billCardTableRowSmallName">
            <img className="billCardTableRowSmallNamePicture" src={transaction.avatar} />
            <label className="billCardTableRowSmallNameLabel">{transaction.name}</label>
          </div>
          <div className="billCardTableRowSmallDateAmount">
            <label className={`billCardTableRowSmallDate ${isPaid ? `green` : ``}`}>
              Monthly - {transactionDaySuffix}
              {isDue && (
                <img
                  src="/images/icon-bill-due.svg"
                  alt="exclamation mark icon"
                  className="billCardTableRowSmallDateIcon"
                />
              )}
              {isPaid && (
                <img
                  src="/images/icon-bill-paid.svg"
                  alt="check mark icon"
                  className="billCardTableRowSmallDateIcon"
                />
              )}
            </label>
            <label className={`billCardTableRowSmallAmount ${isDue ? `red` : ``}`}>
              ${amountFormatted}
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
