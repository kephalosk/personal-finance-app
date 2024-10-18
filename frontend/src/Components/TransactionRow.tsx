import './TransactionRow.scss';
import PropTypes from 'prop-types';
import { TransactionRowProps } from '../Types/TransactionRowProps';

TransactionRow.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export function TransactionRow({ name, value, date, imgSrc }: TransactionRowProps) {
  return (
    <>
      <div className="overviewTransactionRow">
        <img
          className="overviewTransactionRowImage"
          alt="image of payment partner"
          aria-hidden="true"
          src={imgSrc}
        />
        <label className="overviewTransactionRowName">{name}</label>
        <div className="overviewTransactionRowInfo">
          <label className="overviewTransactionRowInfoValue">{value}</label>
          <label className="overviewTransactionRowInfoDate">{date}</label>
        </div>
      </div>
    </>
  );
}
