import './TableRowSmall.scss';
import PropTypes from 'prop-types';
import { TableRowProps } from '../../../model/props/TableRowProps';

TableRowSmall.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export function TableRowSmall({ name, imgSrc, category, date, value }: TableRowProps) {
  const isPositive: boolean = value > 0;
  const color = isPositive ? 'green' : 'dark';
  const sign = isPositive ? '+' : '-';

  const valueNeutral = isPositive ? value : value * -1;
  const valueNeutralFormatted = valueNeutral.toFixed(2);

  return (
    <div className="transactionsTableRowSmall" data-testid="table-row-small">
      <div className="tableRowSmallPartner">
        <img
          className="tableRowSmallPartnerImage"
          alt="icon of payment partner"
          aria-hidden="true"
          src={imgSrc}
        />
      </div>
      <div className="tableRowSmallNameCategoryWrapper">
        <label className="tableRowSmallPartnerName">{name}</label>
        <label className="tableRowSmallCategory">{category}</label>
      </div>
      <div className="tableRowSmallValueDateWrapper">
        <label className={`tableRowSmallValue ${color}`}>
          {sign}${valueNeutralFormatted}
        </label>
        <label className="tableRowSmallDate">{date}</label>
      </div>
    </div>
  );
}
