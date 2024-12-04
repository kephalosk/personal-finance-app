import { fireEvent, render, screen } from '@testing-library/react';
import React, { act } from 'react';
import { getTransactions } from '../../globals/services/TransactionService';
import { mockedTransactions } from '../../fixtures/MockedTransactions';
import useIsSmallScreen from '../../globals/hooks/useIsSmallScreen';
import SearchbarDropdownSort from './SearchbarDropdownSort';
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
    expect(SelectionMenu).toHaveBeenCalledWith(
      {
        handleItemChange: expect.any(Function),
        hasSmallerWidth: true,
        items: [
          { key: 'latest', name: 'Latest' },
          { key: 'oldest', name: 'Oldest' },
          { key: 'atoz', name: 'A to Z' },
          { key: 'ztoa', name: 'Z to A' },
          { key: 'highest', name: 'Highest' },
          { key: 'lowest', name: 'Lowest' },
        ],
        mobileIcon: '/images/icon-sort-mobile.svg',
        selectedItem: 'Latest',
      },
      {}
    );
  });

  it('calls onSortChange when a different option is selected', async () => {
    await act(async (): Promise<void> => {
      render(<SearchbarDropdownSort onSortChange={mockOnSortChange} />);
    });

    const component = screen.getByTestId('selection-menu');
    fireEvent.click(component!);

    expect(mockOnSortChange).toHaveBeenCalled();
  });
});
