import './TableRow.scss';
import PropTypes from 'prop-types';
import { TransactionsPageTableRowProps } from '../../../types/TransactionsPageTableRowProps';

TableRow.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export function TableRow({ name, imgSrc, category, date, value }: TransactionsPageTableRowProps) {
  return (
    <>
      <hr className="transactionsTableLine" />
      <div className="transactionsTableRow">
        <div className="tableRowPartner">
          <img
            className="tableRowPartnerImage"
            alt="icon of payment partner"
            aria-hidden="true"
            src={imgSrc}
          />
          <label className="tableRowPartnerName">{name}</label>
        </div>
        <label className="tableRowCategory">{category}</label>
        <label className="tableRowDate">{date}</label>
        <label className="tableRowValue">{value}</label>
      </div>
    </>
  );
}
