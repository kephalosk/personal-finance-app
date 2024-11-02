import './BillRow.scss';
import PropTypes from 'prop-types';
import { BillRowProps } from '../../../model/props/BillRowProps';

BillRow.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export function BillRow({ title, value, color }: BillRowProps) {
  const valueFormatted = value.toFixed(2);
  return (
    <>
      <div className={`overviewBillsRow ${color}`} data-testid="bill-row">
        <label className="overviewBillsRowTitle">{title}</label>
        <label className="overviewBillsRowValue">${valueFormatted}</label>
      </div>
    </>
  );
}
