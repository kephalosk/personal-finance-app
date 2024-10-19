import './TransactionRow.scss';
import PropTypes from 'prop-types';
import { TransactionRowProps } from '../../types/TransactionRowProps';

TransactionRow.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export function TransactionRow({ name, value, date, imgSrc }: TransactionRowProps) {
  const isPositive: boolean = value > 0;
  const color = isPositive ? 'green' : 'dark';
  const sign = isPositive ? '+' : '-';

  const valueNeutral = isPositive ? value : value * -1;
  const valueNeutralFormatted = valueNeutral.toFixed(2);

  return (
    <>
      <div className="overviewTransactionRow" data-testid="transaction-row">
        <img
          className="overviewTransactionRowImage"
          alt="image of payment partner"
          aria-hidden="true"
          src={imgSrc}
        />
        <label className="overviewTransactionRowName">{name}</label>
        <div className="overviewTransactionRowInfo">
          <label className={`overviewTransactionRowInfoValue ${color}`}>
            {sign}${valueNeutralFormatted}
          </label>
          <label className="overviewTransactionRowInfoDate">{date}</label>
        </div>
      </div>
    </>
  );
}
