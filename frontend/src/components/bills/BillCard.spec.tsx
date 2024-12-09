import { fireEvent, render, screen } from '@testing-library/react';
import BillCard from './BillCard';
import { mockedBills } from '../../fixtures/MockedBills';
import React from 'react';
import useIsSmallScreen from '../../globals/hooks/useIsSmallScreen';
import LoadingSpinner from '../LoadingSpinner';
import SearchbarInput from '../searchbar/SearchbarInput';
import SearchbarDropdownSort from '../searchbar/SearchbarDropdownSort';
import BillCardTableRow from './BillCardTableRow';
import BillCardTableRowSmall from './BillCardTableRowSmall';
import isDefined from '../../globals/helper/isDefined';

jest.mock('../LoadingSpinner', () => jest.fn(() => <div data-testid="loading-spinner"></div>));
jest.mock('../searchbar/SearchbarInput', () =>
  jest.fn((props) => (
    <input data-testid="searchbar-input" onChange={(e) => props.onInputChange(e.target.value)} />
  ))
);
jest.mock('../searchbar/SearchbarDropdownSort', () =>
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
jest.mock('./BillCardTableRow', () => jest.fn(() => <div data-testid="bill-card-table-row"></div>));
jest.mock('./BillCardTableRowSmall', () =>
  jest.fn(() => <div data-testid="bill-card-table-row-small"></div>)
);

jest.mock('../../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../../globals/helper/isDefined', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('BillCard', () => {
  const bills = mockedBills;
  const fakeToday: Date = new Date('2024-08-01T14:23:11.000Z');

  const testProps = {
    bills,
    today: fakeToday,
    isLoading: false,
  };

  const changeSorting = (value: string) => {
    const component = screen.getByTestId('dropdown-sort');
    fireEvent.change(component!, { target: { value } });
  };

  const changeSearching = (value: string) => {
    const inputElement = screen.getByTestId('searchbar-input');
    fireEvent.change(inputElement!, { target: { value } });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
    (isDefined as jest.Mock).mockReturnValue(false);
  });

  it('renders component LoadingSpinner if passed propisLoading is true', () => {
    render(<BillCard {...testProps} isLoading={true} />);

    const component = screen.queryByTestId('loading-spinner');

    expect(component).toBeInTheDocument();
    expect(LoadingSpinner).toHaveBeenCalled();
  });

  it('does not render component LoadingSpinner if passed propisLoading is false', () => {
    render(<BillCard {...testProps} isLoading={false} />);

    const component = screen.queryByTestId('loading-spinner');

    expect(component).not.toBeInTheDocument();
    expect(LoadingSpinner).not.toHaveBeenCalled();
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

  it('renders component SearchbarInput', () => {
    render(<BillCard {...testProps} />);

    const component = screen.queryByTestId('searchbar-input');

    expect(component).toBeInTheDocument();
    expect(SearchbarInput).toHaveBeenCalledWith({ onInputChange: expect.any(Function) }, {});
  });

  it('renders label searchbarLabel with correct text', () => {
    const { container } = render(<BillCard {...testProps} />);

    const htmlElement = container.querySelector('.searchbarLabel');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass('sortBy');
    expect(htmlElement).toHaveTextContent('Sort by');
  });

  it('does not render label searchbarLabel for mobile', () => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(true);
    const { container } = render(<BillCard {...testProps} />);

    const htmlElement = container.querySelector('.searchbarLabel');

    expect(htmlElement).not.toBeInTheDocument();
  });

  it('renders component SearchbarDropdownSort', () => {
    render(<BillCard {...testProps} />);

    const component = screen.queryByTestId('dropdown-sort');

    expect(component).toBeInTheDocument();
    expect(SearchbarDropdownSort).toHaveBeenCalledWith({ onSortChange: expect.any(Function) }, {});
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

  it('does not render div billCardTableHeader for mobile', () => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(true);
    const { container } = render(<BillCard {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableHeader');

    expect(htmlElement).not.toBeInTheDocument();
  });

  it('renders div billCardTableHeaderName with correct text', () => {
    const { container } = render(<BillCard {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableHeaderName');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Bill Title');
  });

  it('renders div billCardTableHeaderDate with correct text', () => {
    const { container } = render(<BillCard {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableHeaderDate');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Due Date');
  });

  it('renders div billCardTableHeaderAmount with correct text', () => {
    const { container } = render(<BillCard {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableHeaderAmount');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Amount');
  });

  it('renders components BillCardTableRow with passed prop bills', () => {
    render(<BillCard {...testProps} />);

    const components = screen.getAllByTestId('bill-card-table-row');

    expect(components).toHaveLength(4);
    components.forEach((el, index) => {
      expect(BillCardTableRow).toHaveBeenNthCalledWith(
        index + 1,
        { today: fakeToday, transaction: mockedBills[index] },
        {}
      );
    });
  });

  it('renders component BillCardTableRowSmall for mobile screen', () => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(true);
    render(<BillCard {...testProps} />);

    const components = screen.getAllByTestId('bill-card-table-row-small');

    expect(components).toHaveLength(4);
    components.forEach((el, index) => {
      expect(BillCardTableRowSmall).toHaveBeenNthCalledWith(
        index + 1,
        { today: fakeToday, transaction: mockedBills[index] },
        {}
      );
    });
  });

  it('renders hr for mobile screen', () => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(true);
    const { container } = render(<BillCard {...testProps} />);

    const hrs = container.querySelectorAll('hr');

    expect(hrs).toHaveLength(3);
  });

  describe('Sorting', () => {
    it('sorts the bills from oldest to newest', () => {
      render(<BillCard {...testProps} />);
      jest.clearAllMocks();
      changeSorting('oldest');
      expect(BillCardTableRow).toHaveBeenNthCalledWith(
        1,
        { transaction: mockedBills[3], today: fakeToday },
        {}
      );

      jest.clearAllMocks();
      changeSorting('latest');

      expect(BillCardTableRow).toHaveBeenNthCalledWith(
        1,
        { transaction: mockedBills[0], today: fakeToday },
        {}
      );
    });

    it('sorts the bills from newest to oldest', () => {
      render(<BillCard {...testProps} />);
      expect(BillCardTableRow).toHaveBeenNthCalledWith(
        1,
        { transaction: mockedBills[0], today: fakeToday },
        {}
      );

      jest.clearAllMocks();
      changeSorting('oldest');

      expect(BillCardTableRow).toHaveBeenNthCalledWith(
        1,
        { transaction: mockedBills[3], today: fakeToday },
        {}
      );
    });

    it('sorts the bills from A to Z', () => {
      render(<BillCard {...testProps} />);
      expect(BillCardTableRow).toHaveBeenNthCalledWith(
        1,
        { transaction: mockedBills[0], today: fakeToday },
        {}
      );

      jest.clearAllMocks();
      changeSorting('atoz');

      expect(BillCardTableRow).toHaveBeenNthCalledWith(
        1,
        { transaction: mockedBills[1], today: fakeToday },
        {}
      );
    });

    it('sorts the bills from Z to A', () => {
      render(<BillCard {...testProps} />);
      expect(BillCardTableRow).toHaveBeenNthCalledWith(
        1,
        { transaction: mockedBills[0], today: fakeToday },
        {}
      );

      jest.clearAllMocks();
      changeSorting('ztoa');

      expect(BillCardTableRow).toHaveBeenNthCalledWith(
        1,
        { transaction: mockedBills[3], today: fakeToday },
        {}
      );
    });

    it('sorts the bills from highest to lowest', () => {
      render(<BillCard {...testProps} />);
      expect(BillCardTableRow).toHaveBeenNthCalledWith(
        1,
        { transaction: mockedBills[0], today: fakeToday },
        {}
      );

      jest.clearAllMocks();
      changeSorting('highest');

      expect(BillCardTableRow).toHaveBeenNthCalledWith(
        1,
        { transaction: mockedBills[3], today: fakeToday },
        {}
      );
    });

    it('sorts the bills from lowest to highest', () => {
      render(<BillCard {...testProps} />);
      expect(BillCardTableRow).toHaveBeenNthCalledWith(
        1,
        { transaction: mockedBills[0], today: fakeToday },
        {}
      );

      jest.clearAllMocks();
      changeSorting('lowest');

      expect(BillCardTableRow).toHaveBeenNthCalledWith(
        1,
        { transaction: mockedBills[0], today: fakeToday },
        {}
      );
    });
  });

  describe('Searching', () => {
    it('filters all bills for content of current input of searchbar', () => {
      render(<BillCard {...testProps} />);
      expect(BillCardTableRow).toHaveBeenNthCalledWith(
        1,
        { transaction: mockedBills[0], today: fakeToday },
        {}
      );

      jest.clearAllMocks();
      changeSearching('Spark');

      expect(BillCardTableRow).toHaveBeenNthCalledWith(
        1,
        { transaction: mockedBills[3], today: fakeToday },
        {}
      );
    });

    it('keeps sorting after searching', () => {
      render(<BillCard {...testProps} />);
      expect(BillCardTableRow).toHaveBeenNthCalledWith(
        1,
        { transaction: mockedBills[0], today: fakeToday },
        {}
      );

      jest.clearAllMocks();
      changeSorting('highest');
      changeSearching('S');

      expect(BillCardTableRow).toHaveBeenNthCalledWith(
        1,
        { transaction: mockedBills[3], today: fakeToday },
        {}
      );
    });
  });

  it('clears input of searchbar when catagory changes', async () => {
    (isDefined as jest.Mock).mockReturnValue(true);
    render(<BillCard {...testProps} />);

    changeSearching('a');

    expect(SearchbarInput).toHaveBeenCalled();
  });
});
