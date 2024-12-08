import { fireEvent, render, screen } from '@testing-library/react';
import React, { act } from 'react';
import {
  mockedTransactions11Records,
  mockedTransactions2,
  mockedTransactions3,
} from '../../fixtures/MockedTransactions';
import { getTransactions } from '../../globals/services/TransactionService';
import useIsSmallScreen from '../../globals/hooks/useIsSmallScreen';
import TransactionsDetails from './TransactionsDetails';
import { useLocation } from 'react-router-dom';
import TransactionsPagination from './pagination/TransactionsPagination';
import TransactionsTable from './table/TransactionsTable';

jest.mock('./table/TransactionsTable', () =>
  jest.fn(() => <div data-testid="transactions-table"></div>)
);
const changedPageIndex = 4;
jest.mock('./pagination/TransactionsPagination', () =>
  jest.fn(({ changePageIndex }) => (
    <div
      data-testid="transactions-pagination"
      onClick={() => changePageIndex(changedPageIndex)}
    ></div>
  ))
);

jest.mock('../../globals/services/TransactionService', () => ({
  getTransactions: jest.fn(),
}));

jest.mock('../../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('TransactionsDetails', () => {
  const fetchedTransactions = mockedTransactions11Records;
  const testCategory = fetchedTransactions.at(0)!.category;
  const testSearchbarInput = 'emma';
  const isLoading = false;

  const testProps = {
    fetchedTransactions,
    isLoading,
  };

  const flushPromises = (): Promise<void> => {
    return new Promise((resolve) => process.nextTick(resolve));
  };

  const selectSortOption = async (container: HTMLElement, optionText: string) => {
    await flushPromises();
    const dropdown = container.querySelector('.dropdownSort')!;
    const selectElement = dropdown.querySelector('.selectionMenu')!;
    fireEvent.click(selectElement);

    const optionElement = screen.getByText(optionText);
    fireEvent.click(optionElement);
  };

  const selectCategoryOption = async (container: HTMLElement, testCategory: string) => {
    await flushPromises();
    const dropdown = container.querySelector('.searchbarDropdownCategory');
    const selectElement = dropdown!.querySelector('.selectionMenu');
    fireEvent.click(selectElement!);

    const optionElements = screen.getAllByText(testCategory);
    fireEvent.click(optionElements[0]);
  };

  beforeEach(() => {
    (getTransactions as jest.Mock).mockResolvedValue(mockedTransactions11Records);
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
    (useLocation as jest.Mock).mockReturnValue({ search: '?cat=' });
  });

  it('renders div transactionsDetails', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<TransactionsDetails {...testProps} />);
      return container;
    });

    const htmlElement = cut.querySelector('.transactionsDetails');

    expect(htmlElement).toBeInTheDocument();
  });

  describe('transactionsSearchbar', () => {
    it('renders react component SearchbarInput', async () => {
      await act(async (): Promise<void> => {
        render(<TransactionsDetails {...testProps} />);
      });

      const reactComponent = screen.getByTestId('searchbar-input');

      expect(reactComponent).toBeInTheDocument();
    });

    it('renders div searchbarLabelWrapper', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsDetails {...testProps} />);
        return container;
      });

      const htmlElement = cut.querySelector('.searchbarLabelWrapper');

      expect(htmlElement).toBeInTheDocument();
    });

    it('renders label Sort by', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsDetails {...testProps} />);
        return container;
      });
      const htmlElement = cut.querySelector('.sortBy');

      expect(htmlElement).toHaveTextContent('Sort by');
    });

    it('renders react component SearchbarDropdownSort', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsDetails {...testProps} />);
        return container;
      });

      const htmlElement = cut.querySelector('.dropdownSort');

      expect(htmlElement).toBeInTheDocument();
    });

    it('renders label Category', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsDetails {...testProps} />);
        return container;
      });

      const htmlElement = cut.querySelector('.category');

      expect(htmlElement).toHaveTextContent('Category');
    });

    it('renders react component SearchbarDropdownCategory', () => {
      const { container } = render(<TransactionsDetails {...testProps} />);

      const htmlElement = container.querySelector('.searchbarDropdownCategory');

      expect(htmlElement).toBeInTheDocument();
    });

    describe('Sorting', () => {
      it('sorts the transactions from oldest to newest', async () => {
        const { container } = render(
          <TransactionsDetails {...testProps} fetchedTransactions={mockedTransactions2} />
        );
        await selectSortOption(container, 'Z to A');
        expect(TransactionsTable).toHaveBeenNthCalledWith(
          3,
          {
            currentIndexedTransactions: [
              expect.objectContaining({ date: '20 Aug 2024' }),
              expect.objectContaining({ date: '19 Aug 2024' }),
            ],
          },
          {}
        );

        await selectSortOption(container, 'Oldest');

        expect(TransactionsTable).toHaveBeenLastCalledWith(
          {
            currentIndexedTransactions: [
              expect.objectContaining({ date: '19 Aug 2024' }),
              expect.objectContaining({ date: '20 Aug 2024' }),
            ],
          },
          {}
        );
      });

      it('sorts the transactions from newest to oldest', async () => {
        const { container } = render(
          <TransactionsDetails {...testProps} fetchedTransactions={mockedTransactions2} />
        );
        await selectSortOption(container, 'Oldest');
        expect(TransactionsTable).toHaveBeenNthCalledWith(
          3,
          {
            currentIndexedTransactions: [
              expect.objectContaining({ date: '19 Aug 2024' }),
              expect.objectContaining({ date: '20 Aug 2024' }),
            ],
          },
          {}
        );

        await selectSortOption(container, 'Latest');

        expect(TransactionsTable).toHaveBeenLastCalledWith(
          {
            currentIndexedTransactions: [
              expect.objectContaining({ date: '20 Aug 2024' }),
              expect.objectContaining({ date: '19 Aug 2024' }),
            ],
          },
          {}
        );
      });

      it('sorts the transactions from A to Z', async () => {
        const { container } = render(
          <TransactionsDetails {...testProps} fetchedTransactions={mockedTransactions2} />
        );

        await selectSortOption(container, 'A to Z');

        expect(TransactionsTable).toHaveBeenLastCalledWith(
          {
            currentIndexedTransactions: [
              expect.objectContaining({ name: 'Emma Richardson' }),
              expect.objectContaining({ name: 'Savory Bites Bistro' }),
            ],
          },
          {}
        );
      });

      it('sorts the transactions from Z to A', async () => {
        const { container } = render(
          <TransactionsDetails {...testProps} fetchedTransactions={mockedTransactions2} />
        );

        await selectSortOption(container, 'Z to A');

        expect(TransactionsTable).toHaveBeenLastCalledWith(
          {
            currentIndexedTransactions: [
              expect.objectContaining({ name: 'Savory Bites Bistro' }),
              expect.objectContaining({ name: 'Emma Richardson' }),
            ],
          },
          {}
        );
      });

      it('sorts the transactions from highest to lowest', async () => {
        const { container } = render(
          <TransactionsDetails {...testProps} fetchedTransactions={mockedTransactions2} />
        );

        await selectSortOption(container, 'Highest');

        expect(TransactionsTable).toHaveBeenLastCalledWith(
          {
            currentIndexedTransactions: [
              expect.objectContaining({ amount: 75.5 }),
              expect.objectContaining({ amount: -55.5 }),
            ],
          },
          {}
        );
      });

      it('sorts the transactions from lowest to highest', async () => {
        const { container } = render(
          <TransactionsDetails {...testProps} fetchedTransactions={mockedTransactions2} />
        );

        await selectSortOption(container, 'Lowest');

        expect(TransactionsTable).toHaveBeenLastCalledWith(
          {
            currentIndexedTransactions: [
              expect.objectContaining({ amount: -55.5 }),
              expect.objectContaining({ amount: 75.5 }),
            ],
          },
          {}
        );
      });

      it('resets the pageIndex after sorting the transactions', async () => {
        const { container } = render(
          <TransactionsDetails {...testProps} fetchedTransactions={mockedTransactions2} />
        );

        await selectSortOption(container, 'Lowest');

        expect(TransactionsPagination).toHaveBeenLastCalledWith(
          expect.objectContaining({ pageIndex: 0 }),
          {}
        );
      });
    });

    describe('Filtering', () => {
      it('filters the transactions correctly', async () => {
        const { container } = render(
          <TransactionsDetails {...testProps} fetchedTransactions={mockedTransactions2} />
        );

        await selectCategoryOption(container, testCategory);

        expect(TransactionsTable).toHaveBeenLastCalledWith(
          {
            currentIndexedTransactions: [expect.objectContaining({ category: testCategory })],
          },
          {}
        );
      });

      it('keeps filtered transactions after sorting', async () => {
        const { container } = render(
          <TransactionsDetails {...testProps} fetchedTransactions={mockedTransactions2} />
        );

        await selectCategoryOption(container, testCategory);
        await selectSortOption(container, 'Lowest');

        expect(TransactionsTable).toHaveBeenLastCalledWith(
          {
            currentIndexedTransactions: [expect.objectContaining({ category: testCategory })],
          },
          {}
        );
      });

      it('resets the pageIndex after filtering the transactions', async () => {
        const { container } = render(
          <TransactionsDetails {...testProps} fetchedTransactions={mockedTransactions2} />
        );

        await selectCategoryOption(container, testCategory);

        expect(TransactionsPagination).toHaveBeenLastCalledWith(
          expect.objectContaining({ pageIndex: 0 }),
          {}
        );
      });
    });

    describe('Searching', () => {
      it('filters all transactions for content of current input of searchbar', async () => {
        render(<TransactionsDetails {...testProps} fetchedTransactions={mockedTransactions2} />);

        const inputElement = screen.getByTestId('searchbar-input').querySelector('input');
        fireEvent.change(inputElement!, { target: { value: `${testSearchbarInput}` } });

        expect(TransactionsTable).toHaveBeenLastCalledWith(
          {
            currentIndexedTransactions: [expect.objectContaining({ name: 'Emma Richardson' })],
          },
          {}
        );
      });
    });

    it('keeps sorting and filter after searching', async () => {
      const { container } = render(
        <TransactionsDetails {...testProps} fetchedTransactions={mockedTransactions3} />
      );
      await selectSortOption(container, 'Highest');
      await selectCategoryOption(container, testCategory);

      const inputElement = screen.getByTestId('searchbar-input').querySelector('input');
      fireEvent.change(inputElement!, { target: { value: `${testSearchbarInput}` } });

      expect(TransactionsTable).toHaveBeenLastCalledWith(
        {
          currentIndexedTransactions: [
            expect.objectContaining({
              name: 'Emma Richardson',
              category: testCategory,
              amount: 100,
            }),
            expect.objectContaining({
              name: 'Emma Richardson',
              category: testCategory,
              amount: 75.5,
            }),
          ],
        },
        {}
      );
    });

    it('resets the pageIndex after input of searchbar changes', async () => {
      render(<TransactionsDetails {...testProps} fetchedTransactions={mockedTransactions2} />);

      const inputElement = screen.getByTestId('searchbar-input').querySelector('input');
      fireEvent.change(inputElement!, { target: { value: `${testSearchbarInput}` } });

      expect(TransactionsPagination).toHaveBeenLastCalledWith(
        expect.objectContaining({ pageIndex: 0 }),
        {}
      );
    });
  });

  it('renders component TransactionsTable', async () => {
    await act(async (): Promise<HTMLElement> => {
      const { container } = render(
        <TransactionsDetails {...testProps} fetchedTransactions={mockedTransactions2} />
      );
      return container;
    });

    const component = screen.getByTestId('transactions-table');

    expect(component).toBeInTheDocument();
    expect(TransactionsTable).toHaveBeenLastCalledWith(
      {
        currentIndexedTransactions: mockedTransactions2,
      },
      {}
    );
  });

  describe('TransactionsPagination', () => {
    it('renders component TransactionsPagination', async () => {
      await act(async (): Promise<void> => {
        render(<TransactionsDetails {...testProps} />);
      });

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

    it('handles changePageIndex when TransactionsPagination is clicked', async () => {
      await act(async (): Promise<void> => {
        render(<TransactionsDetails {...testProps} />);
      });

      const component = screen.getByTestId('transactions-pagination');
      fireEvent.click(component);

      expect(TransactionsPagination).toHaveBeenLastCalledWith(
        {
          changePageIndex: expect.any(Function),
          isMaxIndex: false,
          pageIndex: changedPageIndex,
          transactionsPaged: [expect.any(Array), expect.any(Array)],
        },
        {}
      );
    });
  });

  describe('Mobile View', () => {
    it('does not render divs searchbarLabel in Mobile View', async () => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(true);
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsDetails {...testProps} />);
        return container;
      });

      const htmlElements = cut.querySelectorAll('.searchbarLabel');

      expect(htmlElements.length).toBe(0);
    });

    it('renders div searchbarSmall', async () => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(true);
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsDetails {...testProps} />);
        return container;
      });
      const htmlElement = cut.querySelector('.searchbarSmall');

      expect(htmlElement).toBeInTheDocument();
    });
  });

  it('renders LoadingSpinner if isLoading is true', () => {
    const { container } = render(<TransactionsDetails {...testProps} isLoading={true} />);

    const htmlElement = container.querySelector('.loadingSpinner');
    const components = screen.queryAllByTestId('table-row');

    expect(htmlElement).toBeInTheDocument();
    expect(components).toHaveLength(0);
  });

  it('filters transactions with query param', async () => {
    (useLocation as jest.Mock).mockReturnValue({ search: '?cat=general' });

    render(<TransactionsDetails {...testProps} fetchedTransactions={mockedTransactions2} />);

    expect(TransactionsTable).toHaveBeenLastCalledWith(
      {
        currentIndexedTransactions: [
          expect.objectContaining({
            category: testCategory,
          }),
        ],
      },
      {}
    );
  });
});
