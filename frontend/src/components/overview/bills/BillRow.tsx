import './BillRow.scss';
import { ReactNode } from 'react';

interface Props {
  title: string;
  value: number;
  color: string;
}

const BillRow: ({ title, value, color }: Props) => ReactNode = ({
  title,
  value,
  color,
}: Props): ReactNode => {
  const valueFormatted: string = value.toFixed(2);

  return (
    <>
      <div className={`overviewBillsRow ${color}`} data-testid="bill-row">
        <label className="overviewBillsRowTitle">{title}</label>
        <label className="overviewBillsRowValue">${valueFormatted}</label>
      </div>
    </>
  );
};

export default BillRow;
