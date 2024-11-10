import { fireEvent, render, screen } from '@testing-library/react';
import { BillCard } from './BillCard';
import { mockedBills } from '../../fixtures/MockedBills';
import { SortOptionEnum } from '../../constants/SortOptionEnum';
import React from 'react';
import useIsSmallScreen from '../../globals/hooks/useIsSmallScreen';

jest.mock('../../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('BillCard', () => {
  const fakeToday: Date = new Date('2024-08-01T14:23:11.000Z');

  const testProps = {
    bills: mockedBills,
    today: fakeToday,
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
      render(<BillCard {...testProps} />);
      let tableRows = screen.getAllByTestId('bill-card-table-row');
      let firstDateString = tableRows[0].querySelector('.billCardTableRowDate')!.textContent!;
      let secondDateString = tableRows[1].querySelector('.billCardTableRowDate')!.textContent!;
      let firstDateNumber = parseInt(firstDateString.substring(10, firstDateString.length - 2));
      let secondDateNumber = parseInt(secondDateString.substring(10, secondDateString.length - 2));
      expect(firstDateNumber - secondDateNumber > 0).toBe(true);

      const selectElement = screen.getByTestId('searchbar-dropdown-sort').querySelector('select');
      fireEvent.change(selectElement!, { target: { value: 'oldest' } });

      tableRows = screen.getAllByTestId('bill-card-table-row');
      firstDateString = tableRows[0].querySelector('.billCardTableRowDate')!.textContent!;
      secondDateString = tableRows[1].querySelector('.billCardTableRowDate')!.textContent!;
      firstDateNumber = parseInt(firstDateString.substring(10, firstDateString.length - 2));
      secondDateNumber = parseInt(secondDateString.substring(10, secondDateString.length - 2));
      expect(firstDateNumber - secondDateNumber > 0).toBe(false);
    });

    it('sorts the bills from newest to oldest', () => {
      render(<BillCard {...testProps} />);
      let selectElement = screen.getByTestId('searchbar-dropdown-sort').querySelector('select');
      fireEvent.change(selectElement!, { target: { value: 'oldest' } });
      let tableRows = screen.getAllByTestId('bill-card-table-row');
      let firstDateString = tableRows[0].querySelector('.billCardTableRowDate')!.textContent!;
      let secondDateString = tableRows[1].querySelector('.billCardTableRowDate')!.textContent!;
      let firstDateNumber = parseInt(firstDateString.substring(10, firstDateString.length - 2));
      let secondDateNumber = parseInt(secondDateString.substring(10, secondDateString.length - 2));
      expect(firstDateNumber - secondDateNumber > 0).toBe(false);

      selectElement = screen.getByTestId('searchbar-dropdown-sort').querySelector('select');
      fireEvent.change(selectElement!, { target: { value: 'newest' } });

      tableRows = screen.getAllByTestId('bill-card-table-row');
      firstDateString = tableRows[0].querySelector('.billCardTableRowDate')!.textContent!;
      secondDateString = tableRows[1].querySelector('.billCardTableRowDate')!.textContent!;
      firstDateNumber = parseInt(firstDateString.substring(10, firstDateString.length - 2));
      secondDateNumber = parseInt(secondDateString.substring(10, secondDateString.length - 2));
      expect(firstDateNumber - secondDateNumber > 0).toBe(true);
    });

    it('sorts the bills from A to Z', () => {
      render(<BillCard {...testProps} />);

      const selectElement = screen.getByTestId('searchbar-dropdown-sort').querySelector('select');
      fireEvent.change(selectElement!, { target: { value: 'atoz' } });

      const tableRows = screen.getAllByTestId('bill-card-table-row');
      const firstName = tableRows[1].querySelector('.billCardTableRowNameLabel')!.textContent!;
      const secondName = tableRows[2].querySelector('.billCardTableRowNameLabel')!.textContent!;
      expect(firstName.localeCompare(secondName) < 0).toBe(true);
    });

    it('sorts the bills from Z to A', () => {
      render(<BillCard {...testProps} />);

      const selectElement = screen.getByTestId('searchbar-dropdown-sort').querySelector('select');
      fireEvent.change(selectElement!, { target: { value: 'ztoa' } });

      const tableRows = screen.getAllByTestId('bill-card-table-row');
      const firstName = tableRows[1].querySelector('.billCardTableRowNameLabel')!.textContent!;
      const secondName = tableRows[2].querySelector('.billCardTableRowNameLabel')!.textContent!;
      expect(firstName.localeCompare(secondName) < 0).toBe(false);
    });

    it('sorts the bills from highest to lowest', () => {
      render(<BillCard {...testProps} />);

      const selectElement = screen.getByTestId('searchbar-dropdown-sort').querySelector('select');
      fireEvent.change(selectElement!, { target: { value: 'highest' } });

      const tableRows = screen.getAllByTestId('bill-card-table-row');
      const firstAmount = tableRows[0].querySelector('.billCardTableRowAmount')!.textContent!;
      const firstAmountValue = parseInt(firstAmount.substring(1, firstAmount.length));
      const secondAmount = tableRows[1].querySelector('.billCardTableRowAmount')!.textContent!;
      const secondAmountValue = parseInt(secondAmount.substring(1, firstAmount.length));
      expect(firstAmountValue - secondAmountValue > 0).toBe(true);
    });

    it('sorts the bills from lowest to highest', () => {
      render(<BillCard {...testProps} />);

      const selectElement = screen.getByTestId('searchbar-dropdown-sort').querySelector('select');
      fireEvent.change(selectElement!, { target: { value: 'lowest' } });

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
      render(<BillCard {...testProps} />);
      const selectSortElement = screen
        .getByTestId('searchbar-dropdown-sort')
        .querySelector('select');
      fireEvent.change(selectSortElement!, { target: { value: SortOptionEnum.HIGHEST } });

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
});
