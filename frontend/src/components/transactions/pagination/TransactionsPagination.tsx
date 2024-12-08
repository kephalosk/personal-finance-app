import './TransactionsPagination.scss';
import PaginationButtonPrev from './PaginationButtonPrev';
import PaginationPages from './PaginationPages';
import PaginationButtonNext from './PaginationButtonNext';
import React from 'react';
import { EPTransaction } from '../../../model/entrypoints/EPTransaction';

interface Props {
  pageIndex: number;
  isMaxIndex: boolean;
  transactionsPaged: EPTransaction[][];
  changePageIndex: (newIndex: number) => void;
}

const TransactionsPagination = ({
  pageIndex,
  isMaxIndex,
  transactionsPaged,
  changePageIndex,
}: Props) => {
  const handlePrevClick = () => {
    if (pageIndex <= 0) {
      return;
    }
    changePageIndex(pageIndex - 1);
  };

  const handlePageClick = (newIndex: number) => {
    if (newIndex === pageIndex) {
      return;
    }
    changePageIndex(newIndex);
  };

  const handleNextClick = () => {
    if (isMaxIndex) {
      return;
    }
    changePageIndex(pageIndex + 1);
  };
  return (
    <div className="transactionsPagination" data-testid="transactions-pagination">
      <PaginationButtonPrev onClick={handlePrevClick} currentIndex={pageIndex} />
      <PaginationPages
        onPageClick={handlePageClick}
        indexMax={transactionsPaged.length}
        currentIndex={pageIndex}
      />
      <PaginationButtonNext onClick={handleNextClick} isMaxIndex={isMaxIndex} />
    </div>
  );
};

export default TransactionsPagination;
