import { fireEvent, render, screen } from '@testing-library/react';
import React, { act } from 'react';
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
    mockGetTransactions.mockResolvedValue(mockedTransactions);
    mockOnCategoryChange = jest.fn();
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
  });

  it('renders SelectionMenu', async () => {
    await act(async (): Promise<void> => {
      render(<SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />);
    });

    const component = screen.getByTestId('selection-menu');

    expect(component).toBeInTheDocument();
  });

  it('renders div dropdownCategory', async () => {
    const cut = await act(async (): Promise<HTMLElement> => {
      const { container } = render(
        <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
      );
      return container;
    });

    const element = cut.querySelector('.dropdownCategory');

    expect(element).toBeInTheDocument();
  });

  it('calls onCategoryChange when a different option is selected', async () => {
    await act(async (): Promise<void> => {
      render(<SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />);
    });

    const dropdownWrapper = screen.getByTestId('selection-menu');
    const dropdownButton = dropdownWrapper.querySelector('.selectionMenu');
    fireEvent.click(dropdownButton!);
    const optionElement = screen.getByText('General'); // Verwende den angezeigten Text der Option
    fireEvent.click(optionElement);

    expect(mockOnCategoryChange).toHaveBeenCalledWith('general');
  });
});
