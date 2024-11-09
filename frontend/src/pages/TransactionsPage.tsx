import './TransactionsPage.scss';
import { PaginationButtonNext } from '../components/transactions/pagination/PaginationButtonNext';
import { PaginationButtonPrev } from '../components/transactions/pagination/PaginationButtonPrev';
import { PaginationPages } from '../components/transactions/pagination/PaginationPages';
import { SearchbarInput } from '../components/searchbar/SearchbarInput';
import { SearchbarDropdownSort } from '../components/searchbar/SearchbarDropdownSort';
import { SearchbarDropdownCategory } from '../components/searchbar/SearchbarDropdownCategory';
import { TableHeader } from '../components/transactions/table/TableHeader';
import { TableRow } from '../components/transactions/table/TableRow';
import { EPTransaction } from '../model/entrypoints/EPTransaction';
import { getTransactions } from '../globals/services/TransactionService';
import { splitIntoChunks } from '../globals/utils/SplitIntoChunks';
import React, { useRef, useState } from 'react';
import { SortOptionEnum } from '../constants/SortOptionEnum';
import { SearchbarInputHandle } from '../model/SearchbarInputHandle';
import useIsSmallScreen from '../globals/hooks/useIsSmallScreen';
import { TableRowSmall } from '../components/transactions/table/TableRowSmall';

export function TransactionsPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const [currentSortOption, setCurrentSortOption] = useState<string>(SortOptionEnum.LATEST);
  const [currentCategory, setCurrentCategory] = useState<string>('all');

  const transactions: EPTransaction[] = getTransactions();
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  const pageEntrySize: number = 10;
  const transactionsPaged: EPTransaction[][] = splitIntoChunks(filteredTransactions, pageEntrySize);
  const currentIndexedTransactions = transactionsPaged.at(pageIndex) ?? [];
  const isMaxIndex = pageIndex === transactionsPaged.length - 1;

  let shadowFilteredTransactions: EPTransaction[] = [...filteredTransactions];

  const searchbarRef = useRef<SearchbarInputHandle>();

  const isSmallScreen = useIsSmallScreen();

  const handleSortChange = (sortOption: string) => {
    let sorted = [...shadowFilteredTransactions];

    setCurrentSortOption(sortOption);

    switch (sortOption) {
      case SortOptionEnum.LATEST:
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case SortOptionEnum.OLDEST:
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case SortOptionEnum.ATOZ:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortOptionEnum.ZTOA:
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case SortOptionEnum.HIGHEST:
        sorted.sort((a, b) => b.amount - a.amount);
        break;
      case SortOptionEnum.LOWEST:
        sorted.sort((a, b) => a.amount - b.amount);
        break;
      default:
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }

    setFilteredTransactions(sorted);

    setPageIndex(0);
  };

  const handleCategoryChange = (
    category: string,
    usedTransactions: EPTransaction[] = transactions
  ) => {
    if (usedTransactions.length === transactions.length && searchbarRef.current) {
      searchbarRef.current.clearInput();
    }

    const filtered = usedTransactions.filter((transaction) => {
      return transaction.categoryKey === category || category === 'all';
    });

    setCurrentCategory(category);

    shadowFilteredTransactions = [...filtered];

    handleSortChange(currentSortOption);
  };

  const handleInputChange = (currentInput: string) => {
    const filteredByInput = transactions.filter((transaction) => {
      const transactionSmall = transaction.name.toLowerCase();
      const inputSmall = currentInput.toLowerCase();
      return transactionSmall.includes(inputSmall);
    });

    shadowFilteredTransactions = [...filteredByInput];

    handleCategoryChange(currentCategory, filteredByInput);
  };

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
            <SearchbarInput ref={searchbarRef} onInputChange={handleInputChange} />
            {!isSmallScreen && (
              <div className="searchbarLabelWrapper">
                <label className="searchbarLabel sortBy">Sort by</label>
                <SearchbarDropdownSort onSortChange={handleSortChange} />
                <label className="searchbarLabel category">Category</label>
                <SearchbarDropdownCategory onCategoryChange={handleCategoryChange} />
              </div>
            )}
            {isSmallScreen && (
              <div className="searchbarSmall">
                <SearchbarDropdownSort onSortChange={handleSortChange} />
                <SearchbarDropdownCategory onCategoryChange={handleCategoryChange} />
              </div>
            )}
          </div>
          {!isSmallScreen && (
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
          )}
          {isSmallScreen && (
            <div className="transactionsTable">
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
