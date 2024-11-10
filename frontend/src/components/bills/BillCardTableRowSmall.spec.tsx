import { render } from '@testing-library/react';
import { mockedTransaction } from '../../fixtures/MockedTransactions';
import { toOrdinal } from '../../globals/utils/ToOrdinal';
import React from 'react';
import { BillCardTableRowSmall } from './BillCardTableRowSmall';

describe('BillCardTableRowSmall', () => {
  const transaction = mockedTransaction;
  const fakeToday: Date = new Date('2024-08-03T14:23:11.000Z');

  const testProps = {
    transaction,
    today: fakeToday,
  };

  it('renders div billCardTableRowSmallWrapper', () => {
    const { container } = render(<BillCardTableRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowSmallWrapper');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billCardTableRowSmallDateAmount', () => {
    const { container } = render(<BillCardTableRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowSmallDateAmount');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billCardTableRowSmall', () => {
    const { container } = render(<BillCardTableRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowSmall');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billCardTableRowSmallName', () => {
    const { container } = render(<BillCardTableRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowSmallName');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders img billCardTableRowSmallNamePicture', () => {
    const { container } = render(<BillCardTableRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowSmallNamePicture');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('src', transaction.avatar);
  });

  it('renders label billCardTableRowSmallNameLabel', () => {
    const { container } = render(<BillCardTableRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowSmallNameLabel');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(transaction.name);
  });

  it('renders label billCardTableRowSmallDate', () => {
    const transactionDay = mockedTransaction.dateRaw.getDate();
    const expectedText = `Monthly - ${toOrdinal(transactionDay)}`;
    const { container } = render(<BillCardTableRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowSmallDate');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(expectedText);
  });

  it('renders label billCardTableRowSmallAmount', () => {
    const { container } = render(<BillCardTableRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowSmallAmount');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`${transaction.amount}`);
  });

  it('sets isPaid to true if transactionDay is smaller then today', () => {
    const fakeToday: Date = new Date('2024-08-20T14:23:11.000Z');
    const { container } = render(<BillCardTableRowSmall {...testProps} today={fakeToday} />);

    const htmlElement = container.querySelector('.billCardTableRowSmallDate');
    const htmlElementIcon = container.querySelector('.billCardTableRowSmallDateIcon');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass('green');
    expect(htmlElementIcon).toHaveAttribute('alt', 'check mark icon');
  });

  it('sets isDue to true if transactionDay is less then 5 days in the future', () => {
    const fakeToday: Date = new Date('2024-08-18T14:23:11.000Z');
    const { container } = render(<BillCardTableRowSmall {...testProps} today={fakeToday} />);

    const htmlElement = container.querySelector('.billCardTableRowSmallAmount');
    const htmlElementIcon = container.querySelector('.billCardTableRowSmallDateIcon');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass('red');
    expect(htmlElementIcon).toHaveAttribute('alt', 'exclamation mark icon');
  });

  it('does not set isPaid or isDue if transactionDay is more then 5 days in the future', () => {
    const fakeToday: Date = new Date('2024-08-10T14:23:11.000Z');
    const { container } = render(<BillCardTableRowSmall {...testProps} today={fakeToday} />);

    const htmlElementDate = container.querySelector('.billCardTableRowSmallDate');
    const htmlElementAmount = container.querySelector('.billCardTableRowSmallAmount');
    const htmlElementIcon = container.querySelector('.billCardTableRowSmallDateIcon');

    expect(htmlElementDate).not.toHaveClass('green');
    expect(htmlElementAmount).not.toHaveClass('red');
    expect(htmlElementIcon).not.toBeInTheDocument();
  });
});
