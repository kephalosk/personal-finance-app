import './OverviewTransactions.scss';
import OverviewHeader from '../OverviewHeader';
import TransactionRow from './TransactionRow';
import { EPTransaction } from '../../../model/entrypoints/EPTransaction';
import LoadingSpinner from '../../LoadingSpinner';
import { ReactNode } from 'react';

interface Props {
  transactions: EPTransaction[];
  isLoading: boolean;
}

const OverviewTransactions: ({ transactions, isLoading }: Props) => ReactNode = ({
  transactions,
  isLoading,
}: Props): ReactNode => {
  const latestTransactions: EPTransaction[] = transactions.slice(0, 5);

  return (
    <>
      <div className="overviewTransactions" data-testid="overview-transactions">
        <OverviewHeader title="Transactions" linkText="View All" linkTarget="/transactions" />
        <div className="overviewTransactionsContent">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            latestTransactions.map((transaction: EPTransaction, index: number) => (
              <div key={index} className="wrapper">
                <TransactionRow
                  name={transaction.name}
                  value={transaction.amount}
                  date={transaction.date}
                  imgSrc={transaction.avatar}
                />
                {index < latestTransactions.length - 1 && <hr />}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default OverviewTransactions;
