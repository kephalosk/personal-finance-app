import './BillCardTableRowSmall.scss';
import { toOrdinal } from '../../globals/utils/ToOrdinal';
import { EPTransaction } from '../../model/entrypoints/EPTransaction';
import { ReactNode } from 'react';

interface Props {
  transaction: EPTransaction;
  today: Date;
}

const BillCardTableRowSmall: ({ transaction, today }: Props) => ReactNode = ({
  transaction,
  today,
}: Props): ReactNode => {
  const amountNeutral: number = transaction.amount * -1;
  const amountFormatted: string = amountNeutral.toFixed(2);

  const transactionDay: number = transaction.dateRaw.getDate();
  const transactionDaySuffix: string = toOrdinal(transactionDay);
  const todayDay: number = today.getDate();
  const soonDay: number = todayDay + 5;

  let isPaid: boolean = false;
  let isDue: boolean = false;
  if (transactionDay <= todayDay) {
    isPaid = true;
  } else if (transactionDay <= soonDay) {
    isDue = true;
  }

  return (
    <>
      <div className="billCardTableRowSmallWrapper" data-testid="bill-card-table-row-small">
        <div className="billCardTableRowSmall">
          <div className="billCardTableRowSmallName">
            <img
              className="billCardTableRowSmallNamePicture"
              src={transaction.avatar}
              alt="avatar picture"
            />
            <label className="billCardTableRowSmallNameLabel">{transaction.name}</label>
          </div>
          <div className="billCardTableRowSmallDateAmount">
            <label className={`billCardTableRowSmallDate ${isPaid ? `green` : ``}`}>
              Monthly - {transactionDaySuffix}
              {isDue && (
                <img
                  src="/images/icon-bill-due.svg"
                  alt="exclamation mark icon"
                  className="billCardTableRowSmallDateIcon"
                />
              )}
              {isPaid && (
                <img
                  src="/images/icon-bill-paid.svg"
                  alt="check mark icon"
                  className="billCardTableRowSmallDateIcon"
                />
              )}
            </label>
            <label className={`billCardTableRowSmallAmount ${isDue ? `red` : ``}`}>
              ${amountFormatted}
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillCardTableRowSmall;
