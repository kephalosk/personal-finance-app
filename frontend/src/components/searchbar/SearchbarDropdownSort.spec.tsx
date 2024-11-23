import { fireEvent, render, screen } from '@testing-library/react';
import React, { act } from 'react';
import { getTransactions } from '../../globals/services/TransactionService';
import { mockedTransactions } from '../../fixtures/MockedTransactions';
import useIsSmallScreen from '../../globals/hooks/useIsSmallScreen';
import { SearchbarDropdownSort } from './SearchbarDropdownSort';

jest.mock('../../globals/services/TransactionService', () => ({
  getTransactions: jest.fn(),
}));

jest.mock('../../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockGetTransactions = getTransactions as jest.Mock;

describe('SearchbarDropdownSort', () => {
  let mockOnSortChange: jest.Mock<() => void>;

  beforeEach(() => {
    mockGetTransactions.mockResolvedValue(mockedTransactions);
    mockOnSortChange = jest.fn();
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
  });

  it('renders div dropdownSort', async () => {
    const cut = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<SearchbarDropdownSort onSortChange={mockOnSortChange} />);
      return container;
    });

    const element = cut.querySelector('.dropdownSort');

    expect(element).toBeInTheDocument();
  });

  it('renders SelectionMenu', async () => {
    await act(async (): Promise<void> => {
      render(<SearchbarDropdownSort onSortChange={mockOnSortChange} />);
    });

    const component = screen.getByTestId('selection-menu');

    expect(component).toBeInTheDocument();
  });

  it('calls onCategoryChange when a different option is selected', async () => {
    await act(async (): Promise<void> => {
      render(<SearchbarDropdownSort onSortChange={mockOnSortChange} />);
    });

    const dropdownWrapper = screen.getByTestId('selection-menu');
    const dropdownButton = dropdownWrapper.querySelector('.selectionMenu');
    fireEvent.click(dropdownButton!);
    const optionElement = screen.getByText('Oldest');
    fireEvent.click(optionElement);

    expect(mockOnSortChange).toHaveBeenCalledWith('oldest');
  });
});
