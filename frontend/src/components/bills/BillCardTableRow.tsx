import './BillCardTableRow.scss';
import { BillCardTableRowProps } from '../../types/BillCardTableRowProps';
import PropTypes from 'prop-types';
import { toOrdinal } from '../../globals/utils/ToOrdinal';

BillCardTableRow.propTypes = {
  transaction: PropTypes.object.isRequired,
  today: PropTypes.object.isRequired,
};

export function BillCardTableRow({ transaction, today }: BillCardTableRowProps) {
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
      <div className="billCardTableRowWrapper" data-testid="bill-card-table-row">
        <hr />
        <div className="billCardTableRow">
          <div className="billCardTableRowName">
            <img className="billCardTableRowNamePicture" src={transaction.avatar} />
            <label className="billCardTableRowNameLabel">{transaction.name}</label>
          </div>
          <label className={`billCardTableRowDate ${isPaid ? `green` : ``}`}>
            Monthly - {transactionDaySuffix}
            {isDue && (
              <img
                src="./src/assets/images/icon-bill-due.svg"
                alt="exclamation mark icon"
                className="billCardTableRowDateIcon"
              />
            )}
            {isPaid && (
              <img
                src="./src/assets/images/icon-bill-paid.svg"
                alt="check mark icon"
                className="billCardTableRowDateIcon"
              />
            )}
          </label>
          <label className={`billCardTableRowAmount ${isDue ? `red` : ``}`}>
            ${amountFormatted}
          </label>
        </div>
      </div>
    </>
  );
}
