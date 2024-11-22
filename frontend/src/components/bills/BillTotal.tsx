import './BillTotal.scss';
import PropTypes from 'prop-types';
import { BillTotalProps } from '../../model/props/BillTotalProps';
import LoadingSpinner from '../LoadingSpinner';

BillTotal.propTypes = {
  sum: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export function BillTotal({ sum, isLoading }: BillTotalProps) {
  const sumFormatted = sum.toFixed(2);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="billTotal" data-testid="bill-total">
          <div className="billTotalImageWrapper">
            <img
              className="billTotalImage"
              src="/images/icon-recurring-bills.svg"
              alt="icon of recurring bills"
            />
          </div>
          <div className="billTotalLabelWrapper">
            <label className="billTotalTitle">Total Bills</label>
            <label className="billTotalAmount">${sumFormatted}</label>
          </div>
        </div>
      )}
    </>
  );
}
