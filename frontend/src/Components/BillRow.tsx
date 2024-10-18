import './BillRow.scss';
import PropTypes from 'prop-types';
import { BillRowProps } from '../Types/BillRowProps';

BillRow.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export function BillRow({ title, value }: BillRowProps) {
  return (
    <>
      <div className="overviewBillsRow">
        <label className="overviewBillsRowTitle">{title}</label>
        <label className="overviewBillsRowValue">{value}</label>
      </div>
    </>
  );
}
