import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { SearchbarDropdownCategory } from './SearchbarDropdownCategory';
import { getTransactions } from '../../globals/services/TransactionService';
import { mockedTransactions } from '../../fixtures/MockedTransactions';

jest.mock('../../globals/services/TransactionService', () => ({
  getTransactions: jest.fn(),
}));

const mockGetTransactions = getTransactions as jest.Mock;

describe('searchbarDropdownCategory', () => {
  let mockOnCategoryChange: jest.Mock<() => void>;

  beforeEach(() => {
    mockGetTransactions.mockReturnValue(mockedTransactions);
    mockOnCategoryChange = jest.fn();
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
});
