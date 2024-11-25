import { fireEvent, render, screen } from '@testing-library/react';
import React, { act } from 'react';
import { mockedTransactions11Records } from '../../../fixtures/MockedTransactions';
import { getTransactions } from '../../../globals/services/TransactionService';
import useIsSmallScreen from '../../../globals/hooks/useIsSmallScreen';
import { convertSignedDollarStringToNumber } from '../../../globals/utils/ConvertSignedDollarStringToNumber';
import TransactionsDetails from './TransactionsDetails';
import { MemoryRouter, useLocation } from 'react-router-dom';

jest.mock('../../../globals/services/TransactionService', () => ({
  getTransactions: jest.fn(),
}));

jest.mock('../../../globals/hooks/useIsSmallScreen', () => ({
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

    it('renders react component SearchbarDropdownCategory', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsDetails {...testProps} />);
        return container;
      });

      const htmlElement = cut.querySelector('.searchbarDropdownCategory');

      expect(htmlElement).toBeInTheDocument();
    });

    function flushPromises(): Promise<void> {
      return new Promise((resolve) => process.nextTick(resolve));
    }

    describe('Sorting', () => {
      it('sorts the transactions from oldest to newest', async () => {
        const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
          const { container } = render(<TransactionsDetails {...testProps} />);
          await flushPromises();
          return container;
        });
        let tableRows = await screen.findAllByTestId('table-row');
        let secondDate = new Date(
          tableRows[1].querySelector('.tableRowDate')!.textContent!
        ).getTime();
        let thirdDate = new Date(
          tableRows[2].querySelector('.tableRowDate')!.textContent!
        ).getTime();
        expect(secondDate - thirdDate > 0).toBe(true);

        const dropdown = cut.querySelector('.dropdownSort');
        const selectElement = dropdown!.querySelector('.selectionMenu');
        fireEvent.click(selectElement!);
        const optionElement = screen.getByText('Oldest');
        fireEvent.click(optionElement);

        tableRows = screen.getAllByTestId('table-row');
        secondDate = new Date(tableRows[1].querySelector('.tableRowDate')!.textContent!).getTime();
        thirdDate = new Date(tableRows[2].querySelector('.tableRowDate')!.textContent!).getTime();
        expect(secondDate - thirdDate > 0).toBe(false);
      });

      it('sorts the transactions from newest to oldest', async () => {
        const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
          const { container } = render(<TransactionsDetails {...testProps} />);
          return container;
        });
        let dropdown = cut.querySelector('.dropdownSort');
        let selectElement = dropdown!.querySelector('.selectionMenu');
        fireEvent.click(selectElement!);
        let optionElement = screen.getByText('Oldest');
        fireEvent.click(optionElement);
        let tableRows = screen.getAllByTestId('table-row');
        let secondDate = new Date(
          tableRows[1].querySelector('.tableRowDate')!.textContent!
        ).getTime();
        let thirdDate = new Date(
          tableRows[2].querySelector('.tableRowDate')!.textContent!
        ).getTime();
        expect(secondDate - thirdDate > 0).toBe(false);

        dropdown = cut.querySelector('.dropdownSort');
        selectElement = dropdown!.querySelector('.selectionMenu');
        fireEvent.click(selectElement!);
        optionElement = screen.getByText('Latest');
        fireEvent.click(optionElement);

        tableRows = screen.getAllByTestId('table-row');
        thirdDate = new Date(tableRows[2].querySelector('.tableRowDate')!.textContent!).getTime();
        secondDate = new Date(tableRows[1].querySelector('.tableRowDate')!.textContent!).getTime();
        expect(secondDate - thirdDate > 0).toBe(true);
      });

      it('sorts the transactions from A to Z', async () => {
        const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
          const { container } = render(<TransactionsDetails {...testProps} />);
          await flushPromises();
          return container;
        });

        const dropdown = cut.querySelector('.dropdownSort');
        const selectElement = dropdown!.querySelector('.selectionMenu');
        fireEvent.click(selectElement!);
        const optionElement = screen.getByText('A to Z');
        fireEvent.click(optionElement);

        const tableRows = screen.getAllByTestId('table-row');
        const secondName = tableRows[1].querySelector('.tableRowPartnerName')!.textContent!;
        const thirdName = tableRows[2].querySelector('.tableRowPartnerName')!.textContent!;
        expect(secondName.localeCompare(thirdName) < 0).toBe(true);
      });

      it('sorts the transactions from Z to A', async () => {
        const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
          const { container } = render(<TransactionsDetails {...testProps} />);
          await flushPromises();
          return container;
        });

        const dropdown = cut.querySelector('.dropdownSort');
        const selectElement = dropdown!.querySelector('.selectionMenu');
        fireEvent.click(selectElement!);
        const optionElement = screen.getByText('Z to A');
        fireEvent.click(optionElement);

        const tableRows = screen.getAllByTestId('table-row');
        const secondName = tableRows[1].querySelector('.tableRowPartnerName')!.textContent!;
        const thirdName = tableRows[2].querySelector('.tableRowPartnerName')!.textContent!;
        expect(secondName.localeCompare(thirdName) > 0).toBe(true);
      });

      it('sorts the transactions from highest to lowest', async () => {
        const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
          const { container } = render(<TransactionsDetails {...testProps} />);
          await flushPromises();
          return container;
        });

        const dropdown = cut.querySelector('.dropdownSort');
        const selectElement = dropdown!.querySelector('.selectionMenu');
        fireEvent.click(selectElement!);
        const optionElement = screen.getByText('Highest');
        fireEvent.click(optionElement);

        const tableRows = screen.getAllByTestId('table-row');
        const thirdAmount = tableRows[2].querySelector('.tableRowValue')!.textContent!;
        const thirdAmountValue = convertSignedDollarStringToNumber(thirdAmount);
        const fourthAmount = tableRows[3].querySelector('.tableRowValue')!.textContent!;
        const fourthAmountValue = convertSignedDollarStringToNumber(fourthAmount);
        expect(thirdAmountValue - fourthAmountValue > 0).toBe(true);
      });

      it('sorts the transactions from lowest to highest', async () => {
        const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
          const { container } = render(<TransactionsDetails {...testProps} />);
          await flushPromises();
          return container;
        });

        const dropdown = cut.querySelector('.dropdownSort');
        const selectElement = dropdown!.querySelector('.selectionMenu');
        fireEvent.click(selectElement!);
        const optionElement = screen.getByText('Lowest');
        fireEvent.click(optionElement);

        const tableRows = screen.getAllByTestId('table-row');
        const fourthAmount = tableRows[3].querySelector('.tableRowValue')!.textContent!;
        const fourthAmountValue = convertSignedDollarStringToNumber(fourthAmount);
        const thirdAmount = tableRows[2].querySelector('.tableRowValue')!.textContent!;
        const thirdAmountValue = convertSignedDollarStringToNumber(thirdAmount);
        expect(thirdAmountValue - fourthAmountValue < 0).toBe(true);
      });

      it('resets the pageIndex after sorting the transactions', async () => {
        const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
          const { container } = render(<TransactionsDetails {...testProps} />);
          await flushPromises();
          return container;
        });
        const buttons = cut.querySelectorAll('.paginationPagesButton');
        fireEvent.click(buttons[1]);
        let activeButton = cut.querySelector('.isActive');
        expect(activeButton).toHaveTextContent('2');

        const dropdown = cut.querySelector('.dropdownSort');
        const selectElement = dropdown!.querySelector('.selectionMenu');
        fireEvent.click(selectElement!);
        const optionElement = screen.getByText('Z to A');
        fireEvent.click(optionElement);
        activeButton = cut.querySelector('.isActive');

        expect(activeButton).toHaveTextContent('1');
      });
    });

    describe('Filtering', () => {
      it('filters the transactions correctly', async () => {
        const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
          const { container } = render(<TransactionsDetails {...testProps} />);
          await flushPromises();
          return container;
        });

        const dropdown = cut.querySelector('.searchbarDropdownCategory');
        const selectElement = dropdown!.querySelector('.selectionMenu');
        fireEvent.click(selectElement!);
        const optionElements = screen.getAllByText(testCategory);
        fireEvent.click(optionElements[0]);

        const tableRows = screen.getAllByTestId('table-row');
        tableRows.forEach((row) => {
          const rowCategory = row.querySelector('.tableRowCategory')!.textContent;
          expect(rowCategory).toEqual(testCategory);
        });
      });

      it('resets the pageIndex after filtering the transactions', async () => {
        const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
          const { container } = render(<TransactionsDetails {...testProps} />);
          await flushPromises();
          return container;
        });
        const buttons = cut.querySelectorAll('.paginationPagesButton');
        fireEvent.click(buttons[1]);
        let activeButton = cut.querySelector('.isActive');
        expect(activeButton).toHaveTextContent('2');

        const dropdown = cut.querySelector('.searchbarDropdownCategory');
        const selectElement = dropdown!.querySelector('.selectionMenu');
        fireEvent.click(selectElement!);
        const optionElements = screen.getAllByText(testCategory);
        fireEvent.click(optionElements[0]);
        activeButton = cut.querySelector('.isActive');

        expect(activeButton).toHaveTextContent('1');
      });

      it('keeps filtered transactions after sorting', async () => {
        const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
          const { container } = render(<TransactionsDetails {...testProps} />);
          await flushPromises();
          return container;
        });
        const dropdown = cut.querySelector('.searchbarDropdownCategory');
        const selectElement = dropdown!.querySelector('.selectionMenu');
        fireEvent.click(selectElement!);
        const optionElements = screen.getAllByText(testCategory);
        fireEvent.click(optionElements[0]);
        const filteredTableRowBeforeSorting = screen.getAllByTestId('table-row');
        filteredTableRowBeforeSorting.forEach((row) => {
          const rowCategory = row.querySelector('.tableRowCategory')!.textContent;
          expect(rowCategory).toEqual(testCategory);
        });

        const dropdownSort = cut.querySelector('.dropdownSort');
        const selectElementSort = dropdownSort!.querySelector('.selectionMenu');
        fireEvent.click(selectElementSort!);
        const optionElement = screen.getByText('Lowest');
        fireEvent.click(optionElement);

        const filteredTableRowAfterSorting = screen.getAllByTestId('table-row');
        filteredTableRowAfterSorting.forEach((row) => {
          const rowCategory = row.querySelector('.tableRowCategory')!.textContent;
          expect(rowCategory).toEqual(testCategory);
        });
      });
    });

    describe('Searching', () => {
      it('filters all transactions for content of current input of searchbar', async () => {
        await act(async (): Promise<void> => {
          render(<TransactionsDetails {...testProps} />);
        });

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
          const { container } = render(<TransactionsDetails {...testProps} />);
          await flushPromises();
          return container;
        });
        const buttons = cut.querySelectorAll('.paginationPagesButton');
        fireEvent.click(buttons[1]);
        let activeButton = cut.querySelector('.isActive');
        expect(activeButton).toHaveTextContent('2');

        const inputElement = screen.getByTestId('searchbar-input').querySelector('input');
        fireEvent.change(inputElement!, { target: { value: `${testSearchbarInput}` } });
        activeButton = cut.querySelector('.isActive');

        expect(activeButton).toHaveTextContent('1');
      });

      it('keeps sorting and filter after searching', async () => {
        const testCategoryKeyGeneral = 'general';
        const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
          const { container } = render(<TransactionsDetails {...testProps} />);
          await flushPromises();
          return container;
        });
        const dropdownSort = cut.querySelector('.dropdownSort');
        const selectElementSort = dropdownSort!.querySelector('.selectionMenu');
        fireEvent.click(selectElementSort!);
        const optionElement = screen.getByText('Highest');
        fireEvent.click(optionElement);
        const dropdown = cut.querySelector('.searchbarDropdownCategory');
        const selectElement = dropdown!.querySelector('.selectionMenu');
        fireEvent.click(selectElement!);
        const optionElements = screen.getAllByText(testCategory);
        fireEvent.click(optionElements[0]);

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
          expect(rowCategory!.toLowerCase()).toEqual(testCategoryKeyGeneral);
        });
      });
    });
  });

  describe('transactionsTable', () => {
    it('renders div transactionsTable', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsDetails {...testProps} />);
        return container;
      });

      const htmlElement = cut.querySelector('.transactionsTable');

      expect(htmlElement).toBeInTheDocument();
    });

    it('renders react component TableHeader', async () => {
      await act(async (): Promise<void> => {
        render(<TransactionsDetails {...testProps} />);
      });

      const reactComponent = screen.getByTestId('table-header');

      expect(reactComponent).toBeInTheDocument();
    });

    it('renders react component TableRow 10 times', async () => {
      await act(async (): Promise<void> => {
        render(<TransactionsDetails {...testProps} />);
      });

      const reactComponents = screen.getAllByTestId('table-row');

      expect(reactComponents).toHaveLength(10);
    });
  });

  describe('transactionsPagination', () => {
    it('renders div transactionsPagination', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsDetails {...testProps} />);
        return container;
      });

      const htmlElement = cut.querySelector('.transactionsPagination');

      expect(htmlElement).toBeInTheDocument();
    });

    it('renders react component PaginationButtonPrev', async () => {
      await act(async (): Promise<void> => {
        render(<TransactionsDetails {...testProps} />);
      });

      const reactComponent = screen.getByTestId('pagination-button-prev');

      expect(reactComponent).toBeInTheDocument();
    });

    it('renders react component PaginationPages', async () => {
      await act(async (): Promise<void> => {
        render(<TransactionsDetails {...testProps} />);
      });

      const reactComponent = screen.getByTestId('pagination-pages');

      expect(reactComponent).toBeInTheDocument();
    });

    it('renders react component PaginationButtonNext', async () => {
      await act(async (): Promise<void> => {
        render(<TransactionsDetails {...testProps} />);
      });

      const reactComponent = screen.getByTestId('pagination-button-next');

      expect(reactComponent).toBeInTheDocument();
    });

    it('increases page Number when next button is clicked', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsDetails {...testProps} />);
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
        const { container } = render(<TransactionsDetails {...testProps} />);
        return container;
      });
      const buttons = cut.querySelectorAll('.paginationPagesButton');
      fireEvent.click(buttons[1]);
      let activePageButton = cut.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('2');

      const button = screen.getByTestId('pagination-button-next');
      fireEvent.click(button);

      activePageButton = cut.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('2');
    });

    it('decreases page Number when prev button is clicked', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsDetails {...testProps} />);
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
        const { container } = render(<TransactionsDetails {...testProps} />);
        return container;
      });
      let activePageButton = cut.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('1');

      const buttonPrev = screen.getByTestId('pagination-button-prev');
      fireEvent.click(buttonPrev);

      activePageButton = cut.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('1');
    });

    it('changes page Number when a pageButton is clicked', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsDetails {...testProps} />);
        return container;
      });
      let activePageButton = cut.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('1');

      const buttons = cut.querySelectorAll('.paginationPagesButton');
      fireEvent.click(buttons[1]);

      activePageButton = cut.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('2');
    });

    it('does not change page Number when same pageButton is clicked', async () => {
      const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
        const { container } = render(<TransactionsDetails {...testProps} />);
        return container;
      });
      const buttons = cut.querySelectorAll('.paginationPagesButton');
      fireEvent.click(buttons[1]);
      let activePageButton = cut.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('2');

      fireEvent.click(buttons[1]);

      activePageButton = cut.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('2');
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
    const { container } = render(
      <MemoryRouter>
        <TransactionsDetails {...testProps} isLoading={true} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.loadingSpinner');
    const components = screen.queryAllByTestId('table-row');

    expect(htmlElement).toBeInTheDocument();
    expect(components).toHaveLength(0);
  });

  it('filters transactions with query param', async () => {
    (useLocation as jest.Mock).mockReturnValue({ search: '?cat=entertainment' });
    await act(async (): Promise<void> => {
      render(<TransactionsDetails {...testProps} />);
    });

    const tableRows = screen.getAllByTestId('table-row');
    tableRows.forEach((row) => {
      const rowCategory = row.querySelector('.tableRowCategory')!.textContent;
      expect(rowCategory).toEqual('Entertainment');
    });
  });
});
