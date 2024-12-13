import { fireEvent, render, screen } from '@testing-library/react';
import { BillCard } from './BillCard';
import { mockedBills } from '../../fixtures/MockedBills';
import React from 'react';
import useIsSmallScreen from '../../globals/hooks/useIsSmallScreen';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('BillCard', () => {
  const fakeToday: Date = new Date('2024-08-01T14:23:11.000Z');

  const testProps = {
    bills: mockedBills,
    today: fakeToday,
    isLoading: false,
  };

  const testSearchbarInput = 'sp';

  beforeEach(() => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
  });

  it('renders div billCard', () => {
    const { container } = render(<BillCard {...testProps} />);

    const htmlElement = container.querySelector('.billCard');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billCardSearchbar', () => {
    const { container } = render(<BillCard {...testProps} />);

    const htmlElement = container.querySelector('.billCardSearchbar');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billCardTable', () => {
    const { container } = render(<BillCard {...testProps} />);

    const htmlElement = container.querySelector('.billCardTable');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billCardTableHeader', () => {
    const { container } = render(<BillCard {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableHeader');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BillCardTableRow', () => {
    render(<BillCard {...testProps} />);

    const component = screen.getAllByTestId('bill-card-table-row');

    expect(component).toHaveLength(4);
  });

  it('renders component BillCardTableRowSmall for mobile screen', () => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(true);
    render(<BillCard {...testProps} />);

    const component = screen.getAllByTestId('bill-card-table-row-small');

    expect(component).toHaveLength(4);
  });

  describe('Sorting', () => {
    it('sorts the bills from oldest to newest', () => {
      const { container } = render(<BillCard {...testProps} />);
      let tableRows = screen.getAllByTestId('bill-card-table-row');
      let firstDateString = tableRows[0].querySelector('.billCardTableRowDate')!.textContent!;
      let secondDateString = tableRows[1].querySelector('.billCardTableRowDate')!.textContent!;
      let firstDateNumber = parseInt(firstDateString.substring(10, firstDateString.length - 2));
      let secondDateNumber = parseInt(secondDateString.substring(10, secondDateString.length - 2));
      expect(firstDateNumber - secondDateNumber > 0).toBe(true);

      const dropdown = container.querySelector('.dropdownSort');
      const selectElement = dropdown!.querySelector('.selectionMenu');
      fireEvent.click(selectElement!);
      const optionElement = screen.getByText('Oldest');
      fireEvent.click(optionElement);

      tableRows = screen.getAllByTestId('bill-card-table-row');
      firstDateString = tableRows[0].querySelector('.billCardTableRowDate')!.textContent!;
      secondDateString = tableRows[1].querySelector('.billCardTableRowDate')!.textContent!;
      firstDateNumber = parseInt(firstDateString.substring(10, firstDateString.length - 2));
      secondDateNumber = parseInt(secondDateString.substring(10, secondDateString.length - 2));
      expect(firstDateNumber - secondDateNumber > 0).toBe(false);
    });

    it('sorts the bills from newest to oldest', () => {
      const { container } = render(<BillCard {...testProps} />);
      let dropdown = container.querySelector('.dropdownSort');
      let selectElement = dropdown!.querySelector('.selectionMenu');
      fireEvent.click(selectElement!);
      let optionElement = screen.getByText('Oldest');
      fireEvent.click(optionElement);
      let tableRows = screen.getAllByTestId('bill-card-table-row');
      let firstDateString = tableRows[0].querySelector('.billCardTableRowDate')!.textContent!;
      let secondDateString = tableRows[1].querySelector('.billCardTableRowDate')!.textContent!;
      let firstDateNumber = parseInt(firstDateString.substring(10, firstDateString.length - 2));
      let secondDateNumber = parseInt(secondDateString.substring(10, secondDateString.length - 2));
      expect(firstDateNumber - secondDateNumber > 0).toBe(false);

      dropdown = container.querySelector('.dropdownSort');
      selectElement = dropdown!.querySelector('.selectionMenu');
      fireEvent.click(selectElement!);
      optionElement = screen.getByText('Latest');
      fireEvent.click(optionElement);

      tableRows = screen.getAllByTestId('bill-card-table-row');
      firstDateString = tableRows[0].querySelector('.billCardTableRowDate')!.textContent!;
      secondDateString = tableRows[1].querySelector('.billCardTableRowDate')!.textContent!;
      firstDateNumber = parseInt(firstDateString.substring(10, firstDateString.length - 2));
      secondDateNumber = parseInt(secondDateString.substring(10, secondDateString.length - 2));
      expect(firstDateNumber - secondDateNumber > 0).toBe(true);
    });

    it('sorts the bills from A to Z', () => {
      const { container } = render(<BillCard {...testProps} />);

      const dropdown = container.querySelector('.dropdownSort');
      const selectElement = dropdown!.querySelector('.selectionMenu');
      fireEvent.click(selectElement!);
      const optionElement = screen.getByText('A to Z');
      fireEvent.click(optionElement);

      const tableRows = screen.getAllByTestId('bill-card-table-row');
      const firstName = tableRows[1].querySelector('.billCardTableRowNameLabel')!.textContent!;
      const secondName = tableRows[2].querySelector('.billCardTableRowNameLabel')!.textContent!;
      expect(firstName.localeCompare(secondName) < 0).toBe(true);
    });

    it('sorts the bills from Z to A', () => {
      const { container } = render(<BillCard {...testProps} />);

      const dropdown = container.querySelector('.dropdownSort');
      const selectElement = dropdown!.querySelector('.selectionMenu');
      fireEvent.click(selectElement!);
      const optionElement = screen.getByText('Z to A');
      fireEvent.click(optionElement);

      const tableRows = screen.getAllByTestId('bill-card-table-row');
      const firstName = tableRows[1].querySelector('.billCardTableRowNameLabel')!.textContent!;
      const secondName = tableRows[2].querySelector('.billCardTableRowNameLabel')!.textContent!;
      expect(firstName.localeCompare(secondName) < 0).toBe(false);
    });

    it('sorts the bills from highest to lowest', () => {
      const { container } = render(<BillCard {...testProps} />);

      const dropdown = container.querySelector('.dropdownSort');
      const selectElement = dropdown!.querySelector('.selectionMenu');
      fireEvent.click(selectElement!);
      const optionElement = screen.getByText('Highest');
      fireEvent.click(optionElement);

      const tableRows = screen.getAllByTestId('bill-card-table-row');
      const firstAmount = tableRows[0].querySelector('.billCardTableRowAmount')!.textContent!;
      const firstAmountValue = parseInt(firstAmount.substring(1, firstAmount.length));
      const secondAmount = tableRows[1].querySelector('.billCardTableRowAmount')!.textContent!;
      const secondAmountValue = parseInt(secondAmount.substring(1, firstAmount.length));
      expect(firstAmountValue - secondAmountValue > 0).toBe(true);
    });

    it('sorts the bills from lowest to highest', () => {
      const { container } = render(<BillCard {...testProps} />);

      const dropdown = container.querySelector('.dropdownSort');
      const selectElement = dropdown!.querySelector('.selectionMenu');
      fireEvent.click(selectElement!);
      const optionElement = screen.getByText('Lowest');
      fireEvent.click(optionElement);

      const tableRows = screen.getAllByTestId('bill-card-table-row');
      const firstAmount = tableRows[0].querySelector('.billCardTableRowAmount')!.textContent!;
      const firstAmountValue = parseInt(firstAmount.substring(1, firstAmount.length));
      const secondAmount = tableRows[1].querySelector('.billCardTableRowAmount')!.textContent!;
      const secondAmountValue = parseInt(secondAmount.substring(1, firstAmount.length));
      expect(firstAmountValue - secondAmountValue > 0).toBe(false);
    });
  });

  describe('Searching', () => {
    it('filters all bills for content of current input of searchbar', () => {
      render(<BillCard {...testProps} />);

      const inputElement = screen.getByTestId('searchbar-input').querySelector('input');
      fireEvent.change(inputElement!, { target: { value: `${testSearchbarInput}` } });

      const filteredTableRowAfterSearching = screen.getAllByTestId('bill-card-table-row');
      filteredTableRowAfterSearching.forEach((row) => {
        const rowName = row.querySelector('.billCardTableRowNameLabel')!.textContent;
        expect(rowName!.toLowerCase()).toContain(testSearchbarInput);
      });
    });

    it('keeps sorting after searching', () => {
      const { container } = render(<BillCard {...testProps} />);
      const dropdown = container.querySelector('.dropdownSort');
      const selectElement = dropdown!.querySelector('.selectionMenu');
      fireEvent.click(selectElement!);
      const optionElement = screen.getByText('Highest');
      fireEvent.click(optionElement);

      const inputElement = screen.getByTestId('searchbar-input').querySelector('input');
      fireEvent.change(inputElement!, { target: { value: `${testSearchbarInput}` } });

      const tableAfterSortingAndSearching = screen.getAllByTestId('bill-card-table-row');
      const firstAmount =
        tableAfterSortingAndSearching[0].querySelector('.billCardTableRowAmount')!.textContent!;
      const firstAmountValue = parseInt(firstAmount.substring(1, firstAmount.length));
      const secondAmount =
        tableAfterSortingAndSearching[1].querySelector('.billCardTableRowAmount')!.textContent!;
      const secondAmountValue = parseInt(secondAmount.substring(1, firstAmount.length));
      expect(firstAmountValue > secondAmountValue).toBe(true);
    });
  });

  it('renders LoadingSpinner if isLoading is true', () => {
    const { container } = render(
      <MemoryRouter>
        <BillCard {...testProps} isLoading={true} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.loadingSpinner');
    const components = screen.queryAllByTestId('bill-card-table-row');

    expect(htmlElement).toBeInTheDocument();
    expect(components).toHaveLength(0);
  });
});
