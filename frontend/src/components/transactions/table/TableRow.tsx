import './TableRow.scss';
import React from 'react';

interface Props {
  name: string;
  imgSrc: string;
  category: string;
  date: string;
  value: number;
}

const TableRow: ({ name, imgSrc, category, date, value }: Props) => React.ReactNode = ({
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
};

export default TableRow;
