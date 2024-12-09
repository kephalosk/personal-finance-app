import { render, screen } from '@testing-library/react';
import OverviewBills from './OverviewBills';
import { mockedBills } from '../../../fixtures/MockedBills';
import { mockedTodayAugust3rd } from '../../../fixtures/MockedToday';
import { BillsHelper } from '../../../globals/helper/BillsHelper';
import LoadingSpinner from '../../LoadingSpinner';
import BillRow from './BillRow';

jest.mock('../OverviewHeader', () => jest.fn(() => <div data-testid="overview-header"></div>));
jest.mock('../../LoadingSpinner', () => jest.fn(() => <div data-testid="loading-spinner"></div>));
jest.mock('./BillRow', () => jest.fn(() => <div data-testid="bill-row"></div>));

jest.mock('../../../globals/helper/BillsHelper', () => ({
  __esModule: true,
  BillsHelper: {
    getPaidUpcomingAndDueBillsSumAndIndex: jest.fn(),
  },
}));

describe('OverviewBills', () => {
  const bills = mockedBills;
  const today = mockedTodayAugust3rd;
  const isLoading = false;

  const testProps = {
    bills,
    today,
    isLoading,
  };

  const mockedGetPaidUpcomingAndDueBillsSumAndIndex = {
    paidBillsSum: 100,
    paidBillsIndex: 1,
    upcomingBillsSum: 50,
    upcomingBillsIndex: 2,
    dueBillsSum: 25,
    dueBillsIndex: 3,
  };

  beforeEach(() => {
    (BillsHelper.getPaidUpcomingAndDueBillsSumAndIndex as jest.Mock).mockReturnValue(
      mockedGetPaidUpcomingAndDueBillsSumAndIndex
    );
  });

  it('renders div overviewBills', () => {
    const { container } = render(<OverviewBills {...testProps} />);

    const htmlElement = container.querySelector('.overviewBills');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component OverviewHeader', () => {
    render(<OverviewBills {...testProps} />);

    const reactComponent = screen.getByTestId('overview-header');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders component LoadingSpinner when passed prop isLoading is true', () => {
    render(<OverviewBills {...testProps} isLoading={true} />);

    const reactComponent = screen.getByTestId('loading-spinner');

    expect(reactComponent).toBeInTheDocument();
    expect(LoadingSpinner).toHaveBeenCalled();
  });

  it('renders component LoadingSpinner when passed prop isLoading is false', () => {
    render(<OverviewBills {...testProps} isLoading={false} />);

    const reactComponent = screen.queryByTestId('loading-spinner');

    expect(reactComponent).not.toBeInTheDocument();
    expect(LoadingSpinner).not.toHaveBeenCalled();
  });

  it('renders div overviewBillsContent', () => {
    const { container } = render(<OverviewBills {...testProps} />);

    const htmlElement = container.querySelector('.overviewBillsContent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BillRow 3 times', () => {
    render(<OverviewBills {...testProps} />);

    const components = screen.getAllByTestId('bill-row');

    expect(components).toHaveLength(3);
  });

  it('renders component BillRow with paid Bills sum with passed bills and today', () => {
    render(<OverviewBills {...testProps} />);

    expect(BillRow).toHaveBeenNthCalledWith(
      1,
      {
        color: 'green',
        title: 'Paid Bills',
        value: mockedGetPaidUpcomingAndDueBillsSumAndIndex.paidBillsSum,
      },
      {}
    );
  });

  it('renders component BillRow with upcoming Bills sum with passed bills and today', () => {
    render(<OverviewBills {...testProps} />);

    expect(BillRow).toHaveBeenNthCalledWith(
      2,
      {
        color: 'yellow',
        title: 'Total Upcoming',
        value: mockedGetPaidUpcomingAndDueBillsSumAndIndex.upcomingBillsSum,
      },
      {}
    );
  });

  it('renders component BillRow with due Bills sum with passed bills and today', () => {
    render(<OverviewBills {...testProps} />);

    expect(BillRow).toHaveBeenNthCalledWith(
      3,
      {
        color: 'cyan',
        title: 'Due Soon',
        value: mockedGetPaidUpcomingAndDueBillsSumAndIndex.dueBillsSum,
      },
      {}
    );
  });
});
