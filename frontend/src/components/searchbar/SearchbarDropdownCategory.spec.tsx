import { fireEvent, render, screen } from '@testing-library/react';
import React, { act } from 'react';
import SearchbarDropdownCategory from './SearchbarDropdownCategory';
import { getTransactions } from '../../globals/services/TransactionService';
import { mockedTransactions } from '../../fixtures/MockedTransactions';
import useIsSmallScreen from '../../globals/hooks/useIsSmallScreen';
import SelectionMenu from './SelectionMenu';

jest.mock('./SelectionMenu', () =>
  jest.fn((props) => <div data-testid="selection-menu" onClick={props.handleItemChange}></div>)
);

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
  const currentCategory = 'all';

  beforeEach(() => {
    mockGetTransactions.mockResolvedValue(mockedTransactions);
    mockOnCategoryChange = jest.fn();
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
  });

  it('renders div searchbarDropdownCategory', async () => {
    const cut = await act(async (): Promise<HTMLElement> => {
      const { container } = render(
        <SearchbarDropdownCategory
          onCategoryChange={mockOnCategoryChange}
          currentCategory={currentCategory}
        />
      );
      return container;
    });

    const element = cut.querySelector('.searchbarDropdownCategory');

    expect(element).toBeInTheDocument();
  });

  it('renders SelectionMenu', async () => {
    await act(async (): Promise<void> => {
      render(
        <SearchbarDropdownCategory
          onCategoryChange={mockOnCategoryChange}
          currentCategory={currentCategory}
        />
      );
    });

    const component = screen.getByTestId('selection-menu');

    expect(component).toBeInTheDocument();
    expect(SelectionMenu).toHaveBeenCalledWith(
      {
        handleItemChange: expect.any(Function),
        items: [
          { key: 'all', name: 'All Transactions' },
          { key: 'general', name: 'General' },
          { key: 'diningout', name: 'Dining Out' },
        ],
        mobileIcon: '/images/icon-filter-mobile.svg',
        selectedItem: 'All Transactions',
      },
      {}
    );
  });

  it('calls onCategoryChange when a different option is selected', async () => {
    await act(async (): Promise<void> => {
      render(
        <SearchbarDropdownCategory
          onCategoryChange={mockOnCategoryChange}
          currentCategory={currentCategory}
        />
      );
    });

    const component = screen.getByTestId('selection-menu');
    fireEvent.click(component!);

    expect(mockOnCategoryChange).toHaveBeenCalled();
  });
});
