import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { SearchbarDropdownCategory } from './SearchbarDropdownCategory';
import { getTransactions } from '../../globals/services/TransactionService';
import { mockedTransactions } from '../../fixtures/MockedTransactions';
import useIsSmallScreen from '../../globals/hooks/useIsSmallScreen';

jest.mock('../../globals/services/TransactionService', () => ({
  getTransactions: jest.fn(),
}));

jest.mock('../../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockGetTransactions = getTransactions as jest.Mock;

describe('searchbarDropdownCategory', () => {
  let mockOnCategoryChange: jest.Mock<() => void>;

  beforeEach(() => {
    mockGetTransactions.mockReturnValue(mockedTransactions);
    mockOnCategoryChange = jest.fn();
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
  });

  it('renders div searchbarDropdownCategoryWrapper', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElement = container.querySelector('.searchbarDropdownCategoryWrapper');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders select searchbarDropdownCategory', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElement = container.querySelector('.searchbarDropdownCategory');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders all 3 categories when there are only 2 different ones', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElements = container.querySelectorAll('option');

    expect(htmlElements).toHaveLength(3);
  });

  it('renders category option all', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElement = container.querySelector('.all');

    expect(htmlElement).toBeInTheDocument();
  });

  it('calls onCategoryChange when a different option is selected', () => {
    render(<SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />);

    const selectElement = screen.getByTestId('searchbar-dropdown-category').querySelector('select');

    fireEvent.change(selectElement!, { target: { value: 'all' } });

    expect(mockOnCategoryChange).toHaveBeenCalledWith('all');
  });

  it('has only categories in Dropdown, that are available in received transactions plus all', () => {
    render(<SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />);

    const optionElements = screen
      .getByTestId('searchbar-dropdown-category')
      .querySelectorAll('option');

    optionElements.forEach((option) => {
      const testCategories = [
        'All Transactions',
        mockedTransactions[0].category,
        mockedTransactions[1].category,
      ];
      expect(testCategories).toContain(option.textContent);
    });
  });

  describe('Mobile View', () => {
    it('renders caret icon in desktop and tablet view', () => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(false);
      const { container } = render(
        <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
      );

      const htmlElement = container.querySelector('.searchbarDropdownCategoryIcon');

      expect(htmlElement).toBeInTheDocument();
      expect(htmlElement).toHaveAttribute('src', '/images/icon-caret-down.svg');
    });

    it('renders filter icon in mobile view', () => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(true);
      const { container } = render(
        <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
      );

      const htmlElement = container.querySelector('.searchbarDropdownCategoryIcon');

      expect(htmlElement).toBeInTheDocument();
      expect(htmlElement).toHaveAttribute('src', '/images/icon-filter-mobile.svg');
    });
  });
});
