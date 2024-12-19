import { render, screen } from '@testing-library/react';
import React from 'react';
import { mockedBills } from '../../fixtures/MockedBills';
import { EPTransaction } from '../../model/entrypoints/EPTransaction';
import LoadingSpinner from '../LoadingSpinner';
import BillSummary from './BillSummary';
import { BillsHelper } from '../../globals/helper/BillsHelper';

jest.mock('../LoadingSpinner', () => jest.fn(() => <div data-testid="loading-spinner"></div>));

jest.mock('../../globals/helper/BillsHelper', () => ({
  __esModule: true,
  BillsHelper: {
    getPaidUpcomingAndDueBillsSumAndIndex: jest.fn(),
  },
}));

describe('BillSummary', () => {
  const bills: EPTransaction[] = mockedBills;
  const fakeToday: Date = new Date('2024-08-03T14:23:11.000Z');
  const isLoading = false;

  const testProps = {
    bills,
    today: fakeToday,
    isLoading,
  };

  let testPaidBillsSum = 0;
  let testPaidBillsIndex = 0;
  let testUpcomingBillsSum = 0;
  let testUpcomingBillsIndex = 0;
  let testDueBillsSum = 0;
  let testDueBillsIndex = 0;

  const raisePaidBills = (amount: number) => {
    const amountPositive = amount * -1;
    testPaidBillsSum = testPaidBillsSum + amountPositive;
    testPaidBillsIndex = testPaidBillsIndex + 1;
  };

  const raiseUpcomingBills = (amount: number) => {
    const amountPositive = amount * -1;
    testUpcomingBillsSum = testUpcomingBillsSum + amountPositive;
    testUpcomingBillsIndex = testUpcomingBillsIndex + 1;
  };

  const raiseDueBills = (amount: number) => {
    const amountPositive = amount * -1;
    testDueBillsSum = testDueBillsSum + amountPositive;
    testDueBillsIndex = testDueBillsIndex + 1;
  };

  const mockedGetPaidUpcomingAndDueBillsSumAndIndex = {
    paidBillsSum: 100,
    paidBillsIndex: 1,
    upcomingBillsSum: 50,
    upcomingBillsIndex: 2,
    dueBillsSum: 25,
    dueBillsIndex: 3,
  };

  bills.forEach((bill) => {
    (BillsHelper.getPaidUpcomingAndDueBillsSumAndIndex as jest.Mock).mockReturnValue(
      mockedGetPaidUpcomingAndDueBillsSumAndIndex
    );
    const billDay = bill.dateRaw.getDate();
    if (billDay <= fakeToday.getDate()) {
      raisePaidBills(bill.amount);
    } else if (billDay <= fakeToday.getDate() + 5) {
      raiseUpcomingBills(bill.amount);
      raiseDueBills(bill.amount);
    } else {
      raiseUpcomingBills(bill.amount);
    }
  });

  it('renders component LoadingSpinner if passed prop isLoading is true', () => {
    render(<BillSummary {...testProps} isLoading={true} />);

    const htmlElement = screen.getByTestId('loading-spinner');

    expect(htmlElement).toBeInTheDocument();
    expect(LoadingSpinner).toHaveBeenCalled();
  });

  it('renders component LoadingSpinner if passed prop isLoading is false', () => {
    render(<BillSummary {...testProps} isLoading={false} />);

    const htmlElement = screen.queryByTestId('loading-spinner');

    expect(htmlElement).not.toBeInTheDocument();
    expect(LoadingSpinner).not.toHaveBeenCalled();
  });

  it('renders div billSummary', () => {
    const { container } = render(<BillSummary {...testProps} />);

    const htmlElement = container.querySelector('.billSummary');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billSummaryTitle with correct text', () => {
    const { container } = render(<BillSummary {...testProps} />);

    const htmlElement = container.querySelector('.billSummaryTitle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Summary');
  });

  it('renders divs billSummaryRowWrapper', () => {
    const { container } = render(<BillSummary {...testProps} />);

    const htmlElement = container.querySelector('.billSummaryRowWrapper');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders divs billSummaryRow', () => {
    const { container } = render(<BillSummary {...testProps} />);

    const htmlElements = container.querySelectorAll('.billSummaryRow');

    expect(htmlElements).toHaveLength(3);
  });

  it('renders divs billSummaryRowTitle with correct text', () => {
    const { container } = render(<BillSummary {...testProps} />);

    const htmlElements = container.querySelectorAll('.billSummaryRowTitle');

    expect(htmlElements).toHaveLength(3);
    expect(htmlElements[0]).toHaveTextContent('Paid Bills');
    expect(htmlElements[1]).toHaveTextContent('Total Upcoming');
    expect(htmlElements[2]).toHaveTextContent('Due soon');
  });

  it('renders hr 2 times', () => {
    const { container } = render(<BillSummary {...testProps} />);

    const htmlElements = container.querySelectorAll('hr');

    expect(htmlElements).toHaveLength(2);
  });

  it('calculates paid bills correctly', () => {
    const { container } = render(<BillSummary {...testProps} />);

    const htmlElement = container.querySelector('.billSummaryRowPaid');

    expect(htmlElement).toHaveTextContent(
      `${mockedGetPaidUpcomingAndDueBillsSumAndIndex.paidBillsIndex} ($${mockedGetPaidUpcomingAndDueBillsSumAndIndex.paidBillsSum}.00)`
    );
  });

  it('calculates upcoming bills correctly', () => {
    const { container } = render(<BillSummary {...testProps} />);

    const htmlElement = container.querySelector('.billSummaryRowUpcoming');

    expect(htmlElement).toHaveTextContent(
      `${mockedGetPaidUpcomingAndDueBillsSumAndIndex.upcomingBillsIndex} ($${mockedGetPaidUpcomingAndDueBillsSumAndIndex.upcomingBillsSum}.00)`
    );
  });

  it('calculates due bills correctly', () => {
    const { container } = render(<BillSummary {...testProps} />);

    const htmlElement = container.querySelector('.billSummaryRowDue');

    expect(htmlElement).toHaveTextContent(
      `${mockedGetPaidUpcomingAndDueBillsSumAndIndex.dueBillsIndex} ($${mockedGetPaidUpcomingAndDueBillsSumAndIndex.dueBillsSum}.00)`
    );
  });
});
