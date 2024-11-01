import './BillCard.scss';
import { EPTransaction } from '../../types/EPTransaction';
import { BillCardTableRow } from './BillCardTableRow';
import { BillCardProps } from '../../types/BillCardProps';

export function BillCard({ bills }: BillCardProps) {
  return (
    <>
      <div className="billCard" data-testid="bill-card">
        <div className="billCardSearchbar"></div>
        <div className="billCardTable">
          <div className="billCardTableHeader"></div>
          {bills.map((transaction: EPTransaction, index: number) => (
            <BillCardTableRow key={index} transaction={transaction} />
          ))}
        </div>
      </div>
    </>
  );
}
