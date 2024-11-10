import { render } from '@testing-library/react';
import { TransactionRowSmall } from './TransactionRowSmall';
import { TransactionRowSmallProps } from '../../../model/props/TransactionRowSmallProps';

describe('TransactionRowSmall', () => {
  const name: string = 'testName';
  const value: number = 100;
  const date: string = 'testDate';

  const testProps: TransactionRowSmallProps = {
    name,
    value,
    date,
  };

  it('renders div overviewTransactionRowSmall', () => {
    const { container } = render(<TransactionRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.overviewTransactionRowSmall');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label overviewTransactionRowSmallName with passed name', () => {
    const { container } = render(<TransactionRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.overviewTransactionRowSmallName');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(name);
  });

  it('renders div overviewTransactionRowSmallInfo', () => {
    const { container } = render(<TransactionRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.overviewTransactionRowSmallInfo');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label overviewTransactionRowSmallInfoValue with passed value', () => {
    const { container } = render(<TransactionRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.overviewTransactionRowSmallInfoValue');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`+$${value}`);
  });

  it('renders label overviewTransactionRowSmallInfoDate with passed date', () => {
    const { container } = render(<TransactionRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.overviewTransactionRowSmallInfoDate');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(date);
  });
});
