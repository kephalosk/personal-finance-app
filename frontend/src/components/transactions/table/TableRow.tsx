import './TableRow.scss';
import PropTypes from 'prop-types';
import { TableRowProps } from '../../../model/props/TableRowProps';

TableRow.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export function TableRow({ name, imgSrc, category, date, value }: TableRowProps) {
  const isPositive: boolean = value > 0;
  const color = isPositive ? 'green' : 'dark';
  const sign = isPositive ? '+' : '-';

  const valueNeutral = isPositive ? value : value * -1;
  const valueNeutralFormatted = valueNeutral.toFixed(2);

  return (
    <>
      <hr className="transactionsTableLine" />
      <div className="transactionsTableRow" data-testid="table-row">
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
        <label className={`tableRowValue ${color}`}>
          {sign}${valueNeutralFormatted}
        </label>
      </div>
    </>
  );
}
