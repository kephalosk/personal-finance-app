import './BillTotal.scss';
import PropTypes from 'prop-types';
import { BillTotalProps } from '../../types/BillTotalProps';

BillTotal.propTypes = {
  sum: PropTypes.number.isRequired,
};

export function BillTotal({ sum }: BillTotalProps) {
  const sumFormatted = sum.toFixed(2);
  return (
    <>
      <div className="billTotal" data-testid="bill-total">
        <div className="billTotalImageWrapper">
          <img
            className="billTotalImage"
            src="./src/assets/images/icon-recurring-bills.svg"
            alt="icon of recurring bills"
          />
        </div>
        <label className="billTotalTitle">Total Bills</label>
        <label className="billTotalAmount">${sumFormatted}</label>
      </div>
    </>
  );
}
