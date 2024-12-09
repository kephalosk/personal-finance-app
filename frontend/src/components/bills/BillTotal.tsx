import './BillTotal.scss';
import LoadingSpinner from '../LoadingSpinner';
import { ReactNode } from 'react';

interface Props {
  sum: number;
  isLoading: boolean;
}

const BillTotal: ({ sum, isLoading }: Props) => ReactNode = ({
  sum,
  isLoading,
}: Props): ReactNode => {
  const sumFormatted: string = sum.toFixed(2);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="billTotal" data-testid="bill-total">
          <div className="billTotalImageWrapper">
            <img
              className="billTotalImage"
              src="/images/icon-recurring-bills.svg"
              alt="icon of recurring bills"
            />
          </div>
          <div className="billTotalLabelWrapper">
            <label className="billTotalTitle">Total Bills</label>
            <label className="billTotalAmount">${sumFormatted}</label>
          </div>
        </div>
      )}
    </>
  );
};

export default BillTotal;
