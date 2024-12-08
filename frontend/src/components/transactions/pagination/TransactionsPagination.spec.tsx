import { fireEvent, render, screen } from '@testing-library/react';
import TransactionsPagination from './TransactionsPagination';
import Mock = jest.Mock;
import { EPTransaction } from '../../../model/entrypoints/EPTransaction';
import { mockedTransactions } from '../../../fixtures/MockedTransactions';
import PaginationButtonPrev from './PaginationButtonPrev';
import PaginationPages from './PaginationPages';
import PaginationButtonNext from './PaginationButtonNext';

jest.mock('./PaginationButtonPrev', () =>
  jest.fn((props) => <div data-testid="pagination-button-prev" onClick={props.onClick}></div>)
);
jest.mock('./PaginationPages', () =>
  jest.fn(({ onPageClick }) => (
    <div data-testid="pagination-pages" onClick={() => onPageClick(2)}></div>
  ))
);
jest.mock('./PaginationButtonNext', () =>
  jest.fn((props) => <div data-testid="pagination-button-next" onClick={props.onClick}></div>)
);

describe('TransactionsPagination', () => {
  const mockChangePageIndex: Mock = jest.fn();
  const pageIndex: number = 1;
  const isMaxIndex: boolean = false;
  const transactionsPaged: EPTransaction[][] = [mockedTransactions, mockedTransactions];
  const testProps = {
    pageIndex,
    isMaxIndex,
    transactionsPaged,
    changePageIndex: mockChangePageIndex,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders div transactionsPagination', () => {
    const { container } = render(<TransactionsPagination {...testProps} />);

    const element = container.querySelector('.transactionsPagination');

    expect(element).toBeInTheDocument();
  });

  describe('PaginationButtonPrev', () => {
    it('renders component PaginationButtonPrev', () => {
      render(<TransactionsPagination {...testProps} />);

      const component = screen.getByTestId('pagination-button-prev');

      expect(component).toBeInTheDocument();
      expect(PaginationButtonPrev).toHaveBeenCalledWith(
        { currentIndex: pageIndex, onClick: expect.any(Function) },
        {}
      );
    });

    it('handles handlePrevClick when pageIndex is 0', () => {
      render(<TransactionsPagination {...testProps} pageIndex={0} />);

      const component = screen.getByTestId('pagination-button-prev');
      fireEvent.click(component);

      expect(mockChangePageIndex).not.toHaveBeenCalled();
    });

    it('handles handlePrevClick when pageIndex is greater than 0', () => {
      render(<TransactionsPagination {...testProps} />);

      const component = screen.getByTestId('pagination-button-prev');
      fireEvent.click(component);

      expect(mockChangePageIndex).toHaveBeenCalledWith(pageIndex - 1);
    });
  });

  describe('PaginationPages', () => {
    it('renders component PaginationPages', () => {
      render(<TransactionsPagination {...testProps} />);

      const component = screen.getByTestId('pagination-pages');

      expect(component).toBeInTheDocument();
      expect(PaginationPages).toHaveBeenCalledWith(
        {
          currentIndex: pageIndex,
          indexMax: transactionsPaged.length,
          onPageClick: expect.any(Function),
        },
        {}
      );
    });

    it('handles handlePageClick when newIndex === pageIndex', () => {
      render(<TransactionsPagination {...testProps} pageIndex={2} />);

      const component = screen.getByTestId('pagination-pages');
      fireEvent.click(component);

      expect(mockChangePageIndex).not.toHaveBeenCalled();
    });

    it('handles handlePageClick when newIndex !== pageIndex', () => {
      render(<TransactionsPagination {...testProps} />);

      const component = screen.getByTestId('pagination-pages');
      fireEvent.click(component);

      expect(mockChangePageIndex).toHaveBeenCalledWith(2);
    });
  });

  describe('PaginationButtonNext', () => {
    it('renders component PaginationButtonNext', () => {
      render(<TransactionsPagination {...testProps} />);

      const component = screen.getByTestId('pagination-button-next');

      expect(component).toBeInTheDocument();
      expect(PaginationButtonNext).toHaveBeenCalledWith(
        {
          isMaxIndex,
          onClick: expect.any(Function),
        },
        {}
      );
    });

    it('handles handleNextClick when isMaxindex === false', () => {
      render(<TransactionsPagination {...testProps} isMaxIndex={false} />);

      const component = screen.getByTestId('pagination-button-next');
      fireEvent.click(component);

      expect(mockChangePageIndex).toHaveBeenCalled();
    });

    it('handles handleNextClick when isMaxindex === true', () => {
      render(<TransactionsPagination {...testProps} isMaxIndex={true} />);

      const component = screen.getByTestId('pagination-button-next');
      fireEvent.click(component);

      expect(mockChangePageIndex).not.toHaveBeenCalledWith(2);
    });
  });
});
