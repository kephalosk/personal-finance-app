import './BillCardTableRow.scss';
import { BillCardTableRowProps } from '../../types/BillCardTableRowProps';
import PropTypes from 'prop-types';

BillCardTableRow.propTypes = {
  transaction: PropTypes.object.isRequired,
};

export function BillCardTableRow({ transaction }: BillCardTableRowProps) {
  const isPaid = true;
  const isDue = true;
  return (
    <>
      <div className="billCardTableRowWrapper" data-testid="bill-card-table-row">
        <hr />
        <div className="billCardTableRow">
          <div className="billCardTableRowName">
            <img className="billCardTableRowNamePicture" src={transaction.avatar} />
            <label className="billCardTableRowNameLabel">{transaction.name}</label>
          </div>
          <label className="billCardTableRowDate">
            {transaction.date}
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
          <label className="billCardTableRowAmount">{transaction.amount}</label>
        </div>
      </div>
    </>
  );
}
