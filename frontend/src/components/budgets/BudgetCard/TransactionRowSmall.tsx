import './TransactionRowSmall.scss';
import PropTypes from 'prop-types';
import { TransactionRowSmallProps } from '../../../model/props/TransactionRowSmallProps';

TransactionRowSmall.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

export function TransactionRowSmall({ name, value, date }: TransactionRowSmallProps) {
  const isPositive: boolean = value > 0;
  const color = isPositive ? 'green' : 'dark';
  const sign = isPositive ? '+' : '-';

  const valueNeutral = isPositive ? value : value * -1;
  const valueNeutralFormatted = valueNeutral.toFixed(2);

  return (
    <>
      <div className="overviewTransactionRowSmall" data-testid="transaction-row-small">
        <label className="overviewTransactionRowSmallName">{name}</label>
        <div className="overviewTransactionRowSmallInfo">
          <label className={`overviewTransactionRowSmallInfoValue ${color}`}>
            {sign}${valueNeutralFormatted}
          </label>
          <label className="overviewTransactionRowSmallInfoDate">{date}</label>
        </div>
      </div>
    </>
  );
}
