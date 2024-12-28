import { fireEvent, render, screen } from '@testing-library/react';
import React, { Fragment } from 'react';
import {
  mockedTransactions11Records,
  mockedTransactions2,
} from '../../fixtures/MockedTransactions';
import TransactionsDetails from './TransactionsDetails';
import TransactionsPagination from './pagination/TransactionsPagination';
import TransactionsTable from './table/TransactionsTable';
import LoadingSpinner from '../LoadingSpinner';
import TransactionsSearchbar from '../searchbar/TransactionsSearchbar';
import { EPTransaction } from '../../model/entrypoints/EPTransaction';

jest.mock('../LoadingSpinner', () => jest.fn(() => <div data-testid="loading-spinner"></div>));
jest.mock('../searchbar/TransactionsSearchbar', () =>
  jest.fn((props) => (
    <Fragment>
      <div
        data-testid="transactions-searchbar"
        onClick={() => {
          props.updateTransactions(mockedTransactions2);
        }}
      ></div>
      <div
        data-testid="transactions-searchbar-empty"
        onClick={() => {
          props.updateTransactions([]);
        }}
      ></div>
    </Fragment>
  ))
);
jest.mock('./table/TransactionsTable', () =>
  jest.fn(({ currentIndexedTransactions }) => (
    <div data-testid="transactions-table">
      {currentIndexedTransactions &&
        currentIndexedTransactions.map((transaction: EPTransaction, index: number) => (
          <div key={index}>{transaction.name}</div>
        ))}
    </div>
  ))
);
const changedPageIndex = 0;
jest.mock('./pagination/TransactionsPagination', () =>
  jest.fn(({ changePageIndex }) => (
    <Fragment>
      <div
        data-testid="transactions-pagination"
        onClick={() => changePageIndex && changePageIndex(changedPageIndex)}
      ></div>
      <div
        data-testid="transactions-pagination-page2"
        onClick={() => changePageIndex && changePageIndex(1)}
      ></div>
    </Fragment>
  ))
);

describe('TransactionsDetails', () => {
  const fetchedTransactions = mockedTransactions11Records;
  const isLoading = false;

  const testProps = {
    fetchedTransactions,
    isLoading,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders component LoadingSpinner if passed prop isLoading is true', () => {
    render(<TransactionsDetails {...testProps} isLoading={true} />);

    const component = screen.getByTestId('loading-spinner');

    expect(component).toBeInTheDocument();
    expect(LoadingSpinner).toHaveBeenCalled();
  });

  it('does not render component LoadingSpinner if isLoading is false', () => {
    render(<TransactionsDetails {...testProps} isLoading={false} />);

    const component = screen.queryByTestId('loading-spinner');

    expect(component).not.toBeInTheDocument();
    expect(LoadingSpinner).not.toHaveBeenCalled();
  });

  it('renders div transactionsDetails', async () => {
    const { container } = render(<TransactionsDetails {...testProps} />);

    const htmlElement = container.querySelector('.transactionsDetails');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component TransactionsSearchbar with passed prop fetchedTransactions', () => {
    render(<TransactionsDetails {...testProps} />);

    const component = screen.getByTestId('transactions-searchbar');

    expect(component).toBeInTheDocument();
    expect(TransactionsSearchbar).toHaveBeenCalledWith(
      {
        fetchedTransactions: mockedTransactions11Records,
        updateTransactions: expect.any(Function),
      },
      {}
    );
  });

  it('renders component TransactionsTable', () => {
    render(<TransactionsDetails {...testProps} />);

    const component = screen.getByTestId('transactions-table');

    expect(component).toBeInTheDocument();
    expect(TransactionsTable).toHaveBeenCalledWith(
      { currentIndexedTransactions: fetchedTransactions.slice(0, 10) },
      {}
    );
  });

  it('renders component TransactionsPagination', () => {
    render(<TransactionsDetails {...testProps} />);

    const component = screen.getByTestId('transactions-pagination');

    expect(component).toBeInTheDocument();
    expect(TransactionsPagination).toHaveBeenCalledWith(
      {
        changePageIndex: expect.any(Function),
        isMaxIndex: false,
        pageIndex: 0,
        transactionsPaged: [],
      },
      {}
    );
  });

  it('updates transactions if updateTransactions of TransactionsSearchbar is triggered', () => {
    render(<TransactionsDetails {...testProps} />);

    const component = screen.getByTestId('transactions-searchbar');
    fireEvent.click(component);

    expect(component).toBeInTheDocument();
    expect(TransactionsTable).toHaveBeenLastCalledWith(
      { currentIndexedTransactions: mockedTransactions2 },
      {}
    );
  });

  it('updates pageIndex if changePageIndex of TransactionsPagination is triggered', () => {
    render(<TransactionsDetails {...testProps} />);

    const searchbar = screen.getByTestId('transactions-searchbar');
    fireEvent.click(searchbar);
    const component = screen.getByTestId('transactions-pagination');
    fireEvent.click(component);

    expect(component).toBeInTheDocument();
    expect(TransactionsPagination).not.toHaveBeenLastCalledWith(
      {
        changePageIndex: expect.any(Function),
        isMaxIndex: true,
        pageIndex: 0,
        transactionsPaged: mockedTransactions2,
      },
      {}
    );
  });

  it('updates transactions with empty transactions', () => {
    render(<TransactionsDetails {...testProps} />);

    const component = screen.getByTestId('transactions-searchbar-empty');
    fireEvent.click(component);

    expect(component).toBeInTheDocument();
    expect(TransactionsTable).toHaveBeenLastCalledWith({ currentIndexedTransactions: [] }, {});
  });

  it('sets pageIndex to 0 if transactions are updated', () => {
    render(
      <TransactionsDetails {...testProps} fetchedTransactions={mockedTransactions11Records} />
    );
    const goToPage2 = screen.getByTestId('transactions-pagination-page2');
    fireEvent.click(goToPage2);

    const component = screen.getByTestId('transactions-searchbar');
    fireEvent.click(component);

    expect(TransactionsPagination).toHaveBeenLastCalledWith(
      expect.objectContaining({ pageIndex: 0 }),
      {}
    );
  });
});
