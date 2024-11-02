import { render } from '@testing-library/react';
import React from 'react';
import { BillSummary } from './BillSummary';
import { mockedBills } from '../../fixtures/MockedBills';
import { EPTransaction } from '../../model/entrypoints/EPTransaction';

describe('BillSummary', () => {
  const bills: EPTransaction[] = mockedBills;
  const fakeToday: Date = new Date('2024-08-03T14:23:11.000Z');
  const testProps = {
    bills,
    today: fakeToday,
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

  bills.forEach((bill) => {
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

  it('renders div billSummary', () => {
    const { container } = render(<BillSummary {...testProps} />);

    const htmlElement = container.querySelector('.billSummary');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billSummaryTitle', () => {
    const { container } = render(<BillSummary {...testProps} />);

    const htmlElement = container.querySelector('.billSummaryTitle');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders divs billSummaryRow', () => {
    const { container } = render(<BillSummary {...testProps} />);

    const htmlElement = container.querySelectorAll('.billSummaryRow');

    expect(htmlElement).toHaveLength(3);
  });

  it('renders hr', () => {
    const { container } = render(<BillSummary {...testProps} />);

    const htmlElements = container.querySelectorAll('hr');

    expect(htmlElements).toHaveLength(2);
  });

  it('calculates paid bills correctly', () => {
    const { container } = render(<BillSummary {...testProps} />);

    const htmlElement = container.querySelector('.billSummaryRowPaid');

    expect(htmlElement).toHaveTextContent(`${testPaidBillsIndex} ($${testPaidBillsSum}.00)`);
  });

  it('calculates upcoming bills correctly', () => {
    const { container } = render(<BillSummary {...testProps} />);

    const htmlElement = container.querySelector('.billSummaryRowUpcoming');

    expect(htmlElement).toHaveTextContent(
      `${testUpcomingBillsIndex} ($${testUpcomingBillsSum}.00)`
    );
  });

  it('calculates due bills correctly', () => {
    const { container } = render(<BillSummary {...testProps} />);

    const htmlElement = container.querySelector('.billSummaryRowDue');

    expect(htmlElement).toHaveTextContent(`${testDueBillsIndex} ($${testDueBillsSum}.00)`);
  });
});
