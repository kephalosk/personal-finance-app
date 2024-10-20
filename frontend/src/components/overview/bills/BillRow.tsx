import './BillRow.scss';
import PropTypes from 'prop-types';
import { BillRowProps } from '../../../types/BillRowProps';

BillRow.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export function BillRow({ title, value, color }: BillRowProps) {
  return (
    <>
      <div className={`overviewBillsRow ${color}`} data-testid="bill-row">
        <label className="overviewBillsRowTitle">{title}</label>
        <label className="overviewBillsRowValue">{value}</label>
      </div>
    </>
  );
}
