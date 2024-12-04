import './TableRowSmall.scss';
import React from 'react';

interface Props {
  name: string;
  imgSrc: string;
  category: string;
  date: string;
  value: number;
}

const TableRowSmall: ({ name, imgSrc, category, date, value }: Props) => React.ReactNode = ({
  name,
  imgSrc,
  category,
  date,
  value,
}: Props): React.ReactNode => {
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
};

export default TableRowSmall;
