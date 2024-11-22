import './OverviewTransactions.scss';
import { OverviewHeader } from '../OverviewHeader';
import { TransactionRow } from './TransactionRow';
import { EPTransaction } from '../../../model/entrypoints/EPTransaction';
import { OverviewTransactionsProps } from '../../../model/props/OverviewTransactionsProps';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../LoadingSpinner';

OverviewTransactions.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export function OverviewTransactions({ transactions, isLoading }: OverviewTransactionsProps) {
  const latestTransactions = transactions.slice(0, 5);

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
}
