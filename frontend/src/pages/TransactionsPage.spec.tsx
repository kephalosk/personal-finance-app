import { fireEvent, render, screen } from '@testing-library/react';
import { TransactionsPage } from './TransactionsPage';
import React, { act } from 'react';
import { convertSignedDollarStringToNumber } from '../globals/utils/ConvertSignedDollarStringToNumber';
import { getTransactions } from '../globals/services/TransactionService';
import { SortOptionEnum } from '../constants/SortOptionEnum';
import useIsSmallScreen from '../globals/hooks/useIsSmallScreen';
import { mockedTransactions } from '../fixtures/MockedTransactions';
import { MemoryRouter } from 'react-router-dom';
import { OverviewPage } from './OverviewPage';

jest.mock('../globals/services/TransactionService', () => ({
  getTransactions: jest.fn(),
}));

jest.mock('../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('TransactionsPage', () => {
  const transactions = getTransactions();
  const testCategory = transactions.at(0)!.category;
  const testCategoryKey = transactions.at(0)!.categoryKey;
  const testSearchbarInput = 'liam';

  beforeEach(() => {
    (getTransactions as jest.Mock).mockResolvedValue(mockedTransactions);
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
  });

  it('renders div transactionsPage', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<TransactionsPage />);
      return container;
    });

    const htmlElement = cut.querySelector('.transactionsPage');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders headline h1 of TransactionsPage', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<TransactionsPage />);
      return container;
    });

    const htmlElement = cut.querySelector('h1');

    expect(htmlElement).toHaveTextContent('Transactions');
  });

  it('renders div transactionsDetails', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<TransactionsPage />);
      return container;
    });

    const htmlElement = cut.querySelector('.transactionsDetails');

    expect(htmlElement).toBeInTheDocument();
  });

  describe('transactionsSearchbar', () => {
    it('renders react component SearchbarInput', () => {
      render(<TransactionsPage />);

      const reactComponent = screen.getByTestId('searchbar-input');

      expect(reactComponent).toBeInTheDocument();
    });

    it('renders div searchbarLabelWrapper', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsPage />);
        return container;
      });

      const htmlElement = cut.querySelector('.searchbarLabelWrapper');

      expect(htmlElement).toBeInTheDocument();
    });

    it('renders label Sort by', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsPage />);
        return container;
      });
      const htmlElement = cut.querySelector('.sortBy');

      expect(htmlElement).toHaveTextContent('Sort by');
    });

    it('renders react component SearchbarDropdownSort', () => {
      render(<TransactionsPage />);

      const reactComponent = screen.getByTestId('searchbar-dropdown-sort');

      expect(reactComponent).toBeInTheDocument();
    });

    it('renders label Category', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsPage />);
        return container;
      });

      const htmlElement = cut.cut('.category');

      expect(htmlElement).toHaveTextContent('Category');
    });

    it('renders react component SearchbarDropdownCategory', () => {
      render(<TransactionsPage />);

      const reactComponent = screen.getByTestId('searchbar-dropdown-category');

      expect(reactComponent).toBeInTheDocument();
    });

    describe('Sorting', () => {
      it('sorts the transactions from oldest to newest', () => {
        render(<TransactionsPage />);
        let tableRows = screen.getAllByTestId('table-row');
        let secondDate = new Date(
          tableRows[1].querySelector('.tableRowDate')!.textContent!
        ).getTime();
        let thirdDate = new Date(
          tableRows[2].querySelector('.tableRowDate')!.textContent!
        ).getTime();
        expect(secondDate - thirdDate > 0).toBe(true);

        const selectElement = screen.getByTestId('searchbar-dropdown-sort').querySelector('select');
        fireEvent.change(selectElement!, { target: { value: 'oldest' } });

        tableRows = screen.getAllByTestId('table-row');
        secondDate = new Date(tableRows[1].querySelector('.tableRowDate')!.textContent!).getTime();
        thirdDate = new Date(tableRows[2].querySelector('.tableRowDate')!.textContent!).getTime();
        expect(secondDate - thirdDate > 0).toBe(false);
      });

      it('sorts the transactions from newest to oldest', () => {
        render(<TransactionsPage />);
        let selectElement = screen.getByTestId('searchbar-dropdown-sort').querySelector('select');
        fireEvent.change(selectElement!, { target: { value: 'oldest' } });
        let tableRows = screen.getAllByTestId('table-row');
        let secondDate = new Date(
          tableRows[1].querySelector('.tableRowDate')!.textContent!
        ).getTime();
        let thirdDate = new Date(
          tableRows[2].querySelector('.tableRowDate')!.textContent!
        ).getTime();
        expect(secondDate - thirdDate > 0).toBe(false);

        selectElement = screen.getByTestId('searchbar-dropdown-sort').querySelector('select');
        fireEvent.change(selectElement!, { target: { value: 'latest' } });

        tableRows = screen.getAllByTestId('table-row');
        thirdDate = new Date(tableRows[2].querySelector('.tableRowDate')!.textContent!).getTime();
        secondDate = new Date(tableRows[1].querySelector('.tableRowDate')!.textContent!).getTime();
        expect(secondDate - thirdDate > 0).toBe(true);
      });

      it('sorts the transactions from A to Z', () => {
        render(<TransactionsPage />);

        const selectElement = screen.getByTestId('searchbar-dropdown-sort').querySelector('select');
        fireEvent.change(selectElement!, { target: { value: 'atoz' } });

        const tableRows = screen.getAllByTestId('table-row');
        const secondName = tableRows[1].querySelector('.tableRowPartnerName')!.textContent!;
        const thirdName = tableRows[2].querySelector('.tableRowPartnerName')!.textContent!;
        expect(secondName.localeCompare(thirdName) < 0).toBe(true);
      });

      it('sorts the transactions from Z to A', () => {
        render(<TransactionsPage />);

        const selectElement = screen.getByTestId('searchbar-dropdown-sort').querySelector('select');
        fireEvent.change(selectElement!, { target: { value: 'ztoa' } });

        const tableRows = screen.getAllByTestId('table-row');
        const secondName = tableRows[1].querySelector('.tableRowPartnerName')!.textContent!;
        const thirdName = tableRows[2].querySelector('.tableRowPartnerName')!.textContent!;
        expect(secondName.localeCompare(thirdName) > 0).toBe(true);
      });

      it('sorts the transactions from highest to lowest', () => {
        render(<TransactionsPage />);

        const selectElement = screen.getByTestId('searchbar-dropdown-sort').querySelector('select');
        fireEvent.change(selectElement!, { target: { value: 'highest' } });

        const tableRows = screen.getAllByTestId('table-row');
        const thirdAmount = tableRows[2].querySelector('.tableRowValue')!.textContent!;
        const thirdAmountValue = convertSignedDollarStringToNumber(thirdAmount);
        const fourthAmount = tableRows[3].querySelector('.tableRowValue')!.textContent!;
        const fourthAmountValue = convertSignedDollarStringToNumber(fourthAmount);
        expect(thirdAmountValue - fourthAmountValue > 0).toBe(true);
      });

      it('sorts the transactions from lowest to highest', () => {
        render(<TransactionsPage />);

        const selectElement = screen.getByTestId('searchbar-dropdown-sort').querySelector('select');
        fireEvent.change(selectElement!, { target: { value: 'lowest' } });

        const tableRows = screen.getAllByTestId('table-row');
        const fourthAmount = tableRows[3].querySelector('.tableRowValue')!.textContent!;
        const fourthAmountValue = convertSignedDollarStringToNumber(fourthAmount);
        const thirdAmount = tableRows[2].querySelector('.tableRowValue')!.textContent!;
        const thirdAmountValue = convertSignedDollarStringToNumber(thirdAmount);
        expect(thirdAmountValue - fourthAmountValue < 0).toBe(true);
      });

      it('resets the pageIndex after sorting the transactions', async () => {
        const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
          const { container } = render(<TransactionsPage />);
          return container;
        });
        const buttons = cut.querySelectorAll('.paginationPagesButton');
        fireEvent.click(buttons[3]);
        let activeButton = cut.querySelector('.isActive');
        expect(activeButton).toHaveTextContent('4');

        const selectElement = screen.getByTestId('searchbar-dropdown-sort').querySelector('select');
        fireEvent.change(selectElement!, { target: { value: 'ztoa' } });
        activeButton = cut.querySelector('.isActive');

        expect(activeButton).toHaveTextContent('1');
      });
    });

    describe('Filtering', () => {
      it('filters the transactions correctly', () => {
        render(<TransactionsPage />);

        const selectElement = screen
          .getByTestId('searchbar-dropdown-category')
          .querySelector('select');
        fireEvent.change(selectElement!, { target: { value: `${testCategoryKey}` } });

        const tableRows = screen.getAllByTestId('table-row');
        tableRows.forEach((row) => {
          const rowCategory = row.querySelector('.tableRowCategory')!.textContent;
          expect(rowCategory).toEqual(testCategory);
        });
      });

      it('resets the pageIndex after filtering the transactions', async () => {
        const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
          const { container } = render(<TransactionsPage />);
          return container;
        });
        const buttons = cut.querySelectorAll('.paginationPagesButton');
        fireEvent.click(buttons[3]);
        let activeButton = cut.querySelector('.isActive');
        expect(activeButton).toHaveTextContent('4');

        const selectElement = screen
          .getByTestId('searchbar-dropdown-category')
          .querySelector('select');
        fireEvent.change(selectElement!, { target: { value: `${testCategoryKey}` } });
        activeButton = cut.querySelector('.isActive');

        expect(activeButton).toHaveTextContent('1');
      });

      it('keeps filtered transactions after sorting', () => {
        render(<TransactionsPage />);
        const selectElement = screen
          .getByTestId('searchbar-dropdown-category')
          .querySelector('select');
        fireEvent.change(selectElement!, { target: { value: `${testCategoryKey}` } });
        const filteredTableRowBeforeSorting = screen.getAllByTestId('table-row');
        filteredTableRowBeforeSorting.forEach((row) => {
          const rowCategory = row.querySelector('.tableRowCategory')!.textContent;
          expect(rowCategory).toEqual(testCategory);
        });

        const selectElementSort = screen
          .getByTestId('searchbar-dropdown-sort')
          .querySelector('select');
        fireEvent.change(selectElementSort!, { target: { value: 'lowest' } });

        const filteredTableRowAfterSorting = screen.getAllByTestId('table-row');
        filteredTableRowAfterSorting.forEach((row) => {
          const rowCategory = row.querySelector('.tableRowCategory')!.textContent;
          expect(rowCategory).toEqual(testCategory);
        });
      });
    });

    describe('Searching', () => {
      it('filters all transactions for content of current input of searchbar', () => {
        render(<TransactionsPage />);

        const inputElement = screen.getByTestId('searchbar-input').querySelector('input');
        fireEvent.change(inputElement!, { target: { value: `${testSearchbarInput}` } });

        const filteredTableRowAfterSearching = screen.getAllByTestId('table-row');
        filteredTableRowAfterSearching.forEach((row) => {
          const rowName = row.querySelector('.tableRowPartnerName')!.textContent;
          expect(rowName!.toLowerCase()).toContain(testSearchbarInput);
        });
      });

      it('resets the pageIndex after input of searchbar changes', async () => {
        const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
          const { container } = render(<TransactionsPage />);
          return container;
        });
        const buttons = cut.querySelectorAll('.paginationPagesButton');
        fireEvent.click(buttons[3]);
        let activeButton = cut.querySelector('.isActive');
        expect(activeButton).toHaveTextContent('4');

        const inputElement = screen.getByTestId('searchbar-input').querySelector('input');
        fireEvent.change(inputElement!, { target: { value: `${testSearchbarInput}` } });
        activeButton = cut.querySelector('.isActive');

        expect(activeButton).toHaveTextContent('1');
      });

      it('keeps sorting and filter after searching', () => {
        const testCategoryKeyGroceries = 'groceries';
        render(<TransactionsPage />);
        const selectSortElement = screen
          .getByTestId('searchbar-dropdown-sort')
          .querySelector('select');
        fireEvent.change(selectSortElement!, { target: { value: SortOptionEnum.HIGHEST } });
        const selectCategoryElement = screen
          .getByTestId('searchbar-dropdown-category')
          .querySelector('select');
        fireEvent.change(selectCategoryElement!, {
          target: { value: `${testCategoryKeyGroceries}` },
        });

        const inputElement = screen.getByTestId('searchbar-input').querySelector('input');
        fireEvent.change(inputElement!, { target: { value: `${testSearchbarInput}` } });
        const tableAfterSortingFilteringSearching = screen.getAllByTestId('table-row');
        const firstRowValue =
          tableAfterSortingFilteringSearching[0].querySelector('.tableRowValue');
        const firstRowValueRaw = convertSignedDollarStringToNumber(firstRowValue!.textContent!);
        const secondRowValue =
          tableAfterSortingFilteringSearching[1].querySelector('.tableRowValue');
        const secondRowValueRaw = convertSignedDollarStringToNumber(secondRowValue!.textContent!);

        expect(firstRowValueRaw > secondRowValueRaw).toBe(true);
        tableAfterSortingFilteringSearching.forEach((row) => {
          const rowCategory = row.querySelector('.tableRowCategory')!.textContent;
          expect(rowCategory!.toLowerCase()).toEqual(testCategoryKeyGroceries);
        });
      });
    });
  });

  describe('transactionsTable', () => {
    it('renders div transactionsTable', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsPage />);
        return container;
      });

      const htmlElement = cut.querySelector('.transactionsTable');

      expect(htmlElement).toBeInTheDocument();
    });

    it('renders react component TableHeader', () => {
      render(<TransactionsPage />);

      const reactComponent = screen.getByTestId('table-header');

      expect(reactComponent).toBeInTheDocument();
    });

    it('renders react component TableRow 10 times', () => {
      render(<TransactionsPage />);

      const reactComponents = screen.getAllByTestId('table-row');

      expect(reactComponents).toHaveLength(10);
    });
  });

  describe('transactionsPagination', () => {
    it('renders div transactionsPagination', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsPage />);
        return container;
      });

      const htmlElement = cut.querySelector('.transactionsPagination');

      expect(htmlElement).toBeInTheDocument();
    });

    it('renders react component PaginationButtonPrev', () => {
      render(<TransactionsPage />);

      const reactComponent = screen.getByTestId('pagination-button-prev');

      expect(reactComponent).toBeInTheDocument();
    });

    it('renders react component PaginationPages', () => {
      render(<TransactionsPage />);

      const reactComponent = screen.getByTestId('pagination-pages');

      expect(reactComponent).toBeInTheDocument();
    });

    it('renders react component PaginationButtonNext', () => {
      render(<TransactionsPage />);

      const reactComponent = screen.getByTestId('pagination-button-next');

      expect(reactComponent).toBeInTheDocument();
    });

    it('increases page Number when next button is clicked', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsPage />);
        return container;
      });
      let activePageButton = cut.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('1');

      const button = screen.getByTestId('pagination-button-next');
      fireEvent.click(button);

      activePageButton = cut.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('2');
    });

    it('does not increases page Number when isMaxIndex is true and next button is clicked', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsPage />);
        return container;
      });
      const buttons = cut.querySelectorAll('.paginationPagesButton');
      fireEvent.click(buttons[4]);
      let activePageButton = cut.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('5');

      const button = screen.getByTestId('pagination-button-next');
      fireEvent.click(button);

      activePageButton = cut.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('5');
    });

    it('decreases page Number when prev button is clicked', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsPage />);
        return container;
      });
      const buttonNext = screen.getByTestId('pagination-button-next');
      fireEvent.click(buttonNext);
      let activePageButton = cut.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('2');

      const buttonPrev = screen.getByTestId('pagination-button-prev');
      fireEvent.click(buttonPrev);

      activePageButton = cut.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('1');
    });

    it('does not decreases page Number when pageIndex is 0 and prev button is clicked', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsPage />);
        return container;
      });
      let activePageButton = cut.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('1');

      const buttonPrev = screen.getByTestId('pagination-button-prev');
      fireEvent.click(buttonPrev);

      activePageButton = cut.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('1');
    });

    it('changes page Number when a pageButton is clicked', () => {
      const { container } = render(<TransactionsPage />);
      let activePageButton = container.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('1');

      const buttons = container.querySelectorAll('.paginationPagesButton');
      fireEvent.click(buttons[3]);

      activePageButton = container.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('4');
    });

    it('does not change page Number when same pageButton is clicked', () => {
      const { container } = render(<TransactionsPage />);
      const buttons = container.querySelectorAll('.paginationPagesButton');
      fireEvent.click(buttons[2]);
      let activePageButton = container.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('3');

      fireEvent.click(buttons[2]);

      activePageButton = container.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('3');
    });
  });

  describe('Mobile View', () => {
    it('does not render divs searchbarLabel in Mobile View', () => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(true);
      const { container } = render(<TransactionsPage />);

      const htmlElements = container.querySelectorAll('.searchbarLabel');

      expect(htmlElements.length).toBe(0);
    });

    it('renders div searchbarSmall', () => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(true);
      const { container } = render(<TransactionsPage />);

      const htmlElement = container.querySelector('.searchbarSmall');

      expect(htmlElement).toBeInTheDocument();
    });
  });
});
