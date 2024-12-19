import { render } from '@testing-library/react';
import { mockedTransaction } from '../../fixtures/MockedTransactions';
import BillCardTableRow from './BillCardTableRow';
import { toOrdinal } from '../../globals/utils/ToOrdinal';
import React from 'react';

describe('BillCardTableRow', () => {
  const transaction = mockedTransaction;
  const fakeToday: Date = new Date('2024-08-03T14:23:11.000Z');

  const testProps = {
    transaction,
    today: fakeToday,
  };

  it('renders div billCardTableRowWrapper', () => {
    const { container } = render(<BillCardTableRow {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowWrapper');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders hr', () => {
    const { container } = render(<BillCardTableRow {...testProps} />);

    const htmlElement = container.querySelector('hr');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billCardTableRow', () => {
    const { container } = render(<BillCardTableRow {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRow');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billCardTableRowName', () => {
    const { container } = render(<BillCardTableRow {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowName');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders img billCardTableRowNamePicture', () => {
    const { container } = render(<BillCardTableRow {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowNamePicture');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('src', transaction.avatar);
    expect(htmlElement).toHaveAttribute('alt', 'avatar picture');
  });

  it('renders label billCardTableRowNameLabel with passed prop transaction.name', () => {
    const { container } = render(<BillCardTableRow {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowNameLabel');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(transaction.name);
  });

  it('renders label billCardTableRowDate with passed prop today', () => {
    const transactionDay = mockedTransaction.dateRaw.getDate();
    const expectedText = `Monthly - ${toOrdinal(transactionDay)}`;
    const { container } = render(<BillCardTableRow {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowDate');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(expectedText);
  });

  it('renders div billCardTableRowAmount', () => {
    const { container } = render(<BillCardTableRow {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowAmount');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`${transaction.amount}`);
  });

  it('sets isPaid to true if transactionDay is smaller then today', () => {
    const fakeToday: Date = new Date('2024-08-20T14:23:11.000Z');
    const { container } = render(<BillCardTableRow {...testProps} today={fakeToday} />);

    const htmlElement = container.querySelector('.billCardTableRowDate');
    const htmlElementIcon = container.querySelector('.billCardTableRowDateIcon');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass('green');
    expect(htmlElementIcon).toHaveAttribute('alt', 'check mark icon');
  });

  it('sets isDue to true if transactionDay is less then 5 days in the future', () => {
    const fakeToday: Date = new Date('2024-08-18T14:23:11.000Z');
    const { container } = render(<BillCardTableRow {...testProps} today={fakeToday} />);

    const htmlElement = container.querySelector('.billCardTableRowAmount');
    const htmlElementIcon = container.querySelector('.billCardTableRowDateIcon');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass('red');
    expect(htmlElementIcon).toHaveAttribute('alt', 'exclamation mark icon');
  });

  it('does not set isPaid or isDue if transactionDay is more then 5 days in the future', () => {
    const fakeToday: Date = new Date('2024-08-10T14:23:11.000Z');
    const { container } = render(<BillCardTableRow {...testProps} today={fakeToday} />);

    const htmlElementDate = container.querySelector('.billCardTableRowDate');
    const htmlElementAmount = container.querySelector('.billCardTableRowAmount');
    const htmlElementIcon = container.querySelector('.billCardTableRowDateIcon');

    expect(htmlElementDate).not.toHaveClass('green');
    expect(htmlElementAmount).not.toHaveClass('red');
    expect(htmlElementIcon).not.toBeInTheDocument();
  });
});
