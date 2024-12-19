import './BillCardTableRow.scss';
import { toOrdinal } from '../../globals/utils/ToOrdinal';
import { EPTransaction } from '../../model/entrypoints/EPTransaction';
import { ReactNode } from 'react';

interface Props {
  transaction: EPTransaction;
  today: Date;
}

const BillCardTableRow: ({ transaction, today }: Props) => ReactNode = ({
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
      <div className="billCardTableRowWrapper" data-testid="bill-card-table-row">
        <hr />
        <div className="billCardTableRow">
          <div className="billCardTableRowName">
            <img
              className="billCardTableRowNamePicture"
              src={transaction.avatar}
              alt="avatar picture"
            />
            <label className="billCardTableRowNameLabel">{transaction.name}</label>
          </div>
          <label className={`billCardTableRowDate ${isPaid ? `green` : ``}`}>
            Monthly - {transactionDaySuffix}
            {isDue && (
              <img
                src="/images/icon-bill-due.svg"
                alt="exclamation mark icon"
                className="billCardTableRowDateIcon"
              />
            )}
            {isPaid && (
              <img
                src="/images/icon-bill-paid.svg"
                alt="check mark icon"
                className="billCardTableRowDateIcon"
              />
            )}
          </label>
          <label className={`billCardTableRowAmount ${isDue ? `red` : ``}`}>
            ${amountFormatted}
          </label>
        </div>
      </div>
    </>
  );
};

export default BillCardTableRow;
