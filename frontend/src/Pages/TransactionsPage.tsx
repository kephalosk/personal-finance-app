import './TransactionsPage.scss';
import { PaginationButtonNext } from '../components/transactions/pagination/PaginationButtonNext';
import { PaginationButtonPrev } from '../components/transactions/pagination/PaginationButtonPrev';
import { PaginationPages } from '../components/transactions/pagination/PaginationPages';
import { SearchbarInput } from '../components/transactions/searchbar/SearchbarInput';
import { SearchbarDropdownSort } from '../components/transactions/searchbar/SearchbarDropdownSort';
import { SearchbarDropdownCategory } from '../components/transactions/searchbar/SearchbarDropdownCategory';
import { TableHeader } from '../components/transactions/table/TableHeader';
import { TableRow } from '../components/transactions/table/TableRow';
import { TransactionsPageEntries } from '../constants/TransactionsPageEntries';
import { TransactionsPageTableRowProps } from '../types/TransactionsPageTableRowProps';
import { EPTransaction } from '../types/EPTransaction';
import { getTransactions } from '../globals/services/TransactionService';
import { splitIntoChunks } from '../globals/utils/SplitIntoChunks';
import { useState } from 'react';

export function TransactionsPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const transactions: EPTransaction[] = getTransactions();
  const pageEntrySize: number = 10;
  const [sortedTransactions, setSortedTransactions] = useState(transactions);

  const handleSortChange = (sortOption: string) => {
    let sorted = [...transactions]; // Kopie der originalen Daten

    switch (sortOption) {
      case 'latest':
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'atoz':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'ztoa':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'highest':
        sorted.sort((a, b) => b.amount - a.amount);
        break;
      case 'lowest':
        sorted.sort((a, b) => a.amount - b.amount);
        break;
      default:
        break;
    }

    setSortedTransactions(sorted);

    setPageIndex(0);
  };

  const transactionsPaged: EPTransaction[][] = splitIntoChunks(sortedTransactions, pageEntrySize);

  const isMaxIndex = pageIndex === transactionsPaged.length - 1;

  const currentIndexedTransactions = transactionsPaged.at(pageIndex) ?? [];

  const handlePrevClick = () => {
    if (pageIndex <= 0) {
      return;
    }
    setPageIndex((prevIndex: number) => prevIndex - 1);
  };

  const handleNextClick = () => {
    if (isMaxIndex) {
      return;
    }
    setPageIndex((nextIndex: number) => nextIndex + 1);
  };

  const handlePageClick = (newIndex: number) => {
    if (newIndex === pageIndex) {
      return;
    }
    setPageIndex(newIndex);
  };

  return (
    <>
      <div className="transactionsPage" data-testid="transactions-page">
        <h1>Transactions</h1>
        <div className="transactionsDetails">
          <div className="transactionsSearchbar">
            <SearchbarInput />
            <label className="searchbarLabel sortBy">Sort by</label>
            <SearchbarDropdownSort onSortChange={handleSortChange} />
            <label className="searchbarLabel category">Category</label>
            <SearchbarDropdownCategory />
          </div>
          <div className="transactionsTable">
            <TableHeader />
            {currentIndexedTransactions.map((entry: EPTransaction) => (
              <TableRow
                key={entry.date + entry.name}
                name={entry.name}
                imgSrc={entry.avatar}
                category={entry.category}
                date={entry.date}
                value={entry.amount}
              />
            ))}
          </div>
          <div className="transactionsPagination">
            <PaginationButtonPrev onClick={handlePrevClick} currentIndex={pageIndex} />
            <PaginationPages
              onPageClick={handlePageClick}
              indexMax={transactionsPaged.length}
              currentIndex={pageIndex}
            />
            <PaginationButtonNext onClick={handleNextClick} isMaxIndex={isMaxIndex} />
          </div>
        </div>
      </div>
    </>
  );
}
