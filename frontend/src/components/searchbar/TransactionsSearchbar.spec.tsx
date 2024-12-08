import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { mockedTransactions2, mockedTransactions3 } from '../../fixtures/MockedTransactions';
import useIsSmallScreen from '../../globals/hooks/useIsSmallScreen';
import { useLocation } from 'react-router-dom';
import TransactionsSearchbar from './TransactionsSearchbar';
import SearchbarInput from './SearchbarInput';
import SearchbarDropdownSort from './SearchbarDropdownSort';
import SearchbarDropdownCategory from './SearchbarDropdownCategory';
import isDefined from '../../globals/helper/isDefined';

jest.mock('./SearchbarInput', () =>
  jest.fn((props) => (
    <input data-testid="searchbar-input" onChange={(e) => props.onInputChange(e.target.value)} />
  ))
);
jest.mock('./SearchbarDropdownSort', () =>
  jest.fn((props) => (
    <select data-testid="dropdown-sort" onChange={(e) => props.onSortChange(e.target.value)}>
      <option value="latest">Latest</option>
      <option value="oldest">Oldest</option>
      <option value="atoz">A to Z</option>
      <option value="ztoa">Z to A</option>
      <option value="highest">Highest</option>
      <option value="lowest">Lowest</option>
    </select>
  ))
);
jest.mock('./SearchbarDropdownCategory', () =>
  jest.fn((props) => (
    <select
      data-testid="dropdown-category"
      onChange={(e) => props.onCategoryChange(e.target.value)}
    >
      <option value="general">General</option>
    </select>
  ))
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));
jest.mock('../../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../../globals/helper/isDefined', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('TransactionsSearchbar', () => {
  const fetchedTransactions = mockedTransactions2;
  const mockUpdateTransactions = jest.fn();
  const testProps = {
    fetchedTransactions,
    updateTransactions: mockUpdateTransactions,
  };

  const testCategory = fetchedTransactions.at(0)!.category;
  const testSearchbarInput = 'emma';

  const changeSorting = (value: string) => {
    const component = screen.getByTestId('dropdown-sort');
    fireEvent.change(component!, { target: { value } });
  };

  const changeFiltering = (value: string) => {
    const component = screen.getByTestId('dropdown-category');
    fireEvent.change(component!, { target: { value } });
  };

  const changeSearching = (value: string) => {
    const inputElement = screen.getByTestId('searchbar-input');
    fireEvent.change(inputElement!, { target: { value } });
  };

  beforeEach(() => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
    (useLocation as jest.Mock).mockReturnValue({ search: '?cat=' });
    (isDefined as jest.Mock).mockReturnValue(false);
  });

  it('renders div transactionsSearchbar', () => {
    const { container } = render(<TransactionsSearchbar {...testProps} />);

    const htmlElement = container.querySelector('.transactionsSearchbar');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component SearchbarInput', () => {
    render(<TransactionsSearchbar {...testProps} />);

    const component = screen.getByTestId('searchbar-input');

    expect(component).toBeInTheDocument();
    expect(SearchbarInput).toHaveBeenCalledWith({ onInputChange: expect.any(Function) }, {});
  });

  it('triggers updateTransactions when onInputChange of SearchbarInput changes', () => {
    render(<TransactionsSearchbar {...testProps} />);

    const inputElement = screen.getByTestId('searchbar-input');
    fireEvent.change(inputElement!, { target: { value: `${testSearchbarInput}` } });

    expect(mockUpdateTransactions).toHaveBeenLastCalledWith([fetchedTransactions[0]]);
  });

  it('renders div searchbarSmall on mobile', () => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(true);
    const { container } = render(<TransactionsSearchbar {...testProps} />);

    const htmlElementMobile = container.querySelector('.searchbarSmall');
    const htmlElementDesktop = container.querySelector('.searchbarLabelWrapper');

    expect(htmlElementMobile).toBeInTheDocument();
    expect(htmlElementDesktop).not.toBeInTheDocument();
  });

  it('renders div searchbarLabelWrapper on desktop and tablet', () => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
    const { container } = render(<TransactionsSearchbar {...testProps} />);

    const htmlElementMobile = container.querySelector('.searchbarSmall');
    const htmlElementDesktop = container.querySelector('.searchbarLabelWrapper');

    expect(htmlElementMobile).not.toBeInTheDocument();
    expect(htmlElementDesktop).toBeInTheDocument();
  });

  it('renders label sortBy on desktop and tablet', async () => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
    const { container } = render(<TransactionsSearchbar {...testProps} />);

    const htmlElementDesktop = container.querySelector('.sortBy');

    expect(htmlElementDesktop).toBeInTheDocument();
  });

  it('does not render label sortBy on mobile', async () => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(true);
    const { container } = render(<TransactionsSearchbar {...testProps} />);

    const htmlElementDesktop = container.querySelector('.sortBy');

    expect(htmlElementDesktop).not.toBeInTheDocument();
  });

  it('renders component SearchbarDropdownSort', () => {
    render(<TransactionsSearchbar {...testProps} />);

    const component = screen.getByTestId('dropdown-sort');

    expect(component).toBeInTheDocument();
    expect(SearchbarDropdownSort).toHaveBeenCalledWith({ onSortChange: expect.any(Function) }, {});
  });

  it('renders label category on desktop and tablet', async () => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
    const { container } = render(<TransactionsSearchbar {...testProps} />);

    const htmlElementDesktop = container.querySelector('.category');

    expect(htmlElementDesktop).toBeInTheDocument();
  });

  it('does not render category sortBy on mobile', async () => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(true);
    const { container } = render(<TransactionsSearchbar {...testProps} />);

    const htmlElementDesktop = container.querySelector('.category');

    expect(htmlElementDesktop).not.toBeInTheDocument();
  });

  it('renders component SearchbarDropdownCategory', () => {
    render(<TransactionsSearchbar {...testProps} />);

    const component = screen.getByTestId('dropdown-category');

    expect(component).toBeInTheDocument();
    expect(SearchbarDropdownCategory).toHaveBeenCalledWith(
      { onCategoryChange: expect.any(Function), currentCategory: 'all' },
      {}
    );
  });

  describe('Sorting', () => {
    it('sorts the transactions from oldest to newest', async () => {
      render(<TransactionsSearchbar {...testProps} />);
      expect(mockUpdateTransactions).toHaveBeenLastCalledWith(mockedTransactions2);

      changeSorting('latest');

      expect(mockUpdateTransactions).toHaveBeenLastCalledWith([
        mockedTransactions2[1],
        mockedTransactions2[0],
      ]);
    });

    it('sorts the transactions from newest to oldest', async () => {
      render(<TransactionsSearchbar {...testProps} />);
      changeSorting('latest');
      expect(mockUpdateTransactions).toHaveBeenLastCalledWith([
        mockedTransactions2[1],
        mockedTransactions2[0],
      ]);

      changeSorting('oldest');

      expect(mockUpdateTransactions).toHaveBeenLastCalledWith(mockedTransactions2);
    });

    it('sorts the transactions from A to Z', async () => {
      render(<TransactionsSearchbar {...testProps} />);

      changeSorting('atoz');

      expect(mockUpdateTransactions).toHaveBeenLastCalledWith([
        expect.objectContaining({ name: 'Emma Richardson' }),
        expect.objectContaining({ name: 'Savory Bites Bistro' }),
      ]);
    });

    it('sorts the transactions from Z to A', async () => {
      render(<TransactionsSearchbar {...testProps} />);

      changeSorting('ztoa');

      expect(mockUpdateTransactions).toHaveBeenLastCalledWith([
        expect.objectContaining({ name: 'Savory Bites Bistro' }),
        expect.objectContaining({ name: 'Emma Richardson' }),
      ]);
    });

    it('sorts the transactions from highest to lowest', async () => {
      render(<TransactionsSearchbar {...testProps} />);

      changeSorting('highest');

      expect(mockUpdateTransactions).toHaveBeenLastCalledWith([
        expect.objectContaining({ amount: 75.5 }),
        expect.objectContaining({ amount: -55.5 }),
      ]);
    });

    it('sorts the transactions from lowest to highest', async () => {
      render(<TransactionsSearchbar {...testProps} />);

      changeSorting('lowest');

      expect(mockUpdateTransactions).toHaveBeenLastCalledWith([
        expect.objectContaining({ amount: -55.5 }),
        expect.objectContaining({ amount: 75.5 }),
      ]);
    });
  });

  describe('Filtering', () => {
    it('filters the transactions correctly', () => {
      render(<TransactionsSearchbar {...testProps} />);
      expect(mockUpdateTransactions).toHaveBeenLastCalledWith(mockedTransactions2);

      changeFiltering(mockedTransactions2[0].categoryKey);

      expect(mockUpdateTransactions).toHaveBeenLastCalledWith([
        expect.objectContaining({ category: testCategory }),
      ]);
    });

    it('keeps filtered transactions after sorting', async () => {
      render(<TransactionsSearchbar {...testProps} />);

      changeFiltering('general');
      changeSorting('lowest');

      expect(mockUpdateTransactions).toHaveBeenLastCalledWith([
        expect.objectContaining({ category: testCategory }),
      ]);
    });
  });

  describe('Searching', () => {
    it('filters all transactions for content of current input of searchbar', async () => {
      render(<TransactionsSearchbar {...testProps} fetchedTransactions={mockedTransactions2} />);

      changeSearching(testSearchbarInput);

      expect(mockUpdateTransactions).toHaveBeenLastCalledWith([
        expect.objectContaining({ name: 'Emma Richardson' }),
      ]);
    });
  });

  it('keeps sorting and filter after searching', async () => {
    render(<TransactionsSearchbar {...testProps} fetchedTransactions={mockedTransactions3} />);

    changeSorting('highest');
    changeFiltering('general');
    changeSearching(testSearchbarInput);

    expect(mockUpdateTransactions).toHaveBeenLastCalledWith([
      expect.objectContaining({
        name: 'Emma Richardson',
        category: testCategory,
        amount: 100,
      }),
      expect.objectContaining({
        name: 'Emma Richardson',
        category: testCategory,
        amount: 75.5,
      }),
    ]);
  });

  it('filters transactions with query param', async () => {
    (useLocation as jest.Mock).mockReturnValue({ search: '?cat=general' });

    render(<TransactionsSearchbar {...testProps} fetchedTransactions={mockedTransactions2} />);

    expect(mockUpdateTransactions).toHaveBeenLastCalledWith([
      expect.objectContaining({
        category: testCategory,
      }),
    ]);
  });

  it('clears input of searchbar when catagory changes', async () => {
    (isDefined as jest.Mock).mockReturnValue(true);
    render(<TransactionsSearchbar {...testProps} fetchedTransactions={mockedTransactions2} />);

    changeSearching('a');

    expect(SearchbarInput).toHaveBeenCalled();
  });
});
