import './TransactionsTable.scss';
import TableHeader from './TableHeader';
import { EPTransaction } from '../../../model/entrypoints/EPTransaction';
import TableRow from './TableRow';
import TableRowSmall from './TableRowSmall';
import React, { ReactNode } from 'react';
import useIsSmallScreen from '../../../globals/hooks/useIsSmallScreen';

interface Props {
  currentIndexedTransactions: EPTransaction[];
}

const TransactionsTable: ({ currentIndexedTransactions }: Props) => ReactNode = ({
  currentIndexedTransactions,
}: Props): ReactNode => {
  const isSmallScreen: boolean = useIsSmallScreen();
  return (
    <>
      {!isSmallScreen && (
        <div className="transactionsTable" data-testid="transactions-table">
          <TableHeader />
          {currentIndexedTransactions.map((entry: EPTransaction, index: number) => (
            <TableRow
              key={index}
              name={entry.name}
              imgSrc={entry.avatar}
              category={entry.category}
              date={entry.date}
              value={entry.amount}
            />
          ))}
        </div>
      )}
      {isSmallScreen && (
        <div className="transactionsTable" data-testid="transactions-table">
          {currentIndexedTransactions.map((entry: EPTransaction, index: number) => (
            <div key={index}>
              <TableRowSmall
                name={entry.name}
                imgSrc={entry.avatar}
                category={entry.category}
                date={entry.date}
                value={entry.amount}
              />
              {index < currentIndexedTransactions.length - 1 && (
                <hr className="transactionsTableLine" />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TransactionsTable;
