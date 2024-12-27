import './TransactionsDetails.scss';
import { EPTransaction } from '../../model/entrypoints/EPTransaction';
import React, { useState } from 'react';
import { splitIntoChunks } from '../../globals/utils/SplitIntoChunks';
import LoadingSpinner from '../LoadingSpinner';
import TransactionsPagination from './pagination/TransactionsPagination';
import TransactionsTable from './table/TransactionsTable';
import TransactionsSearchbar from '../searchbar/TransactionsSearchbar';

interface Props {
  isLoading: boolean;
  fetchedTransactions: EPTransaction[];
}

const TransactionsDetails = ({ isLoading, fetchedTransactions }: Props) => {
  const pageEntrySize: number = 10;
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [transactionsPaged, setTransactionsPaged] = useState<EPTransaction[][]>([]);
  const [currentIndexedTransactions, setCurrentIndexedTransactions] = useState<EPTransaction[]>([]);
  const [isMaxIndex, setIsMaxIndex] = useState<boolean>(false);

  const updateTransactions = (filteredTransactions: EPTransaction[]) => {
    const newTransactionsPaged: EPTransaction[][] = splitIntoChunks(
      filteredTransactions,
      pageEntrySize
    );
    console.log('newTransactionsPaged', newTransactionsPaged);
    setTransactionsPaged(newTransactionsPaged);

    setPageIndex(0);
    const validValues: EPTransaction[] = newTransactionsPaged.at(pageIndex) as EPTransaction[];
    setCurrentIndexedTransactions(validValues ?? []);
    setIsMaxIndex(pageIndex === newTransactionsPaged.length - 1);
  };

  const changePageIndex = (newIndex: number) => {
    setPageIndex(newIndex);
    const validValues: EPTransaction[] = transactionsPaged.at(newIndex) as EPTransaction[];
    setCurrentIndexedTransactions(validValues);
    setIsMaxIndex(newIndex === transactionsPaged.length - 1);
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="transactionsDetails" data-testid="transactions-details">
          <TransactionsSearchbar
            fetchedTransactions={fetchedTransactions}
            updateTransactions={updateTransactions}
          />
          <TransactionsTable currentIndexedTransactions={currentIndexedTransactions} />
          <TransactionsPagination
            pageIndex={pageIndex}
            isMaxIndex={isMaxIndex}
            transactionsPaged={transactionsPaged}
            changePageIndex={changePageIndex}
          />
        </div>
      )}
    </>
  );
};

export default TransactionsDetails;
