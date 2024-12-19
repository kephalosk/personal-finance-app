import { render } from '@testing-library/react';
import TransactionRowSmall from './TransactionRowSmall';
import { ColorNameEnum } from '../../../model/enum/ColorNameEnum';

describe('TransactionRowSmall', () => {
  const name: string = 'testName';
  const value: number = 100;
  const date: string = 'testDate';

  const testProps = {
    name,
    value,
    date,
  };

  it('renders div overviewTransactionRowSmall', () => {
    const { container } = render(<TransactionRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.overviewTransactionRowSmall');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label overviewTransactionRowSmallName with passed prop name', () => {
    const { container } = render(<TransactionRowSmall {...testProps} name={name} />);

    const htmlElement = container.querySelector('.overviewTransactionRowSmallName');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(name);
  });

  it('renders div overviewTransactionRowSmallInfo', () => {
    const { container } = render(<TransactionRowSmall {...testProps} />);

    const htmlElement = container.querySelector('.overviewTransactionRowSmallInfo');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label overviewTransactionRowSmallInfoValue with positive passed prop value and correct color', () => {
    const { container } = render(<TransactionRowSmall {...testProps} value={value} />);

    const htmlElement = container.querySelector('.overviewTransactionRowSmallInfoValue');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass(ColorNameEnum.GREEN);
    expect(htmlElement).toHaveTextContent(`+$${value}`);
  });

  it('renders label overviewTransactionRowSmallInfoValue with negative passed prop value and correct color', () => {
    const { container } = render(<TransactionRowSmall {...testProps} value={-value} />);

    const htmlElement = container.querySelector('.overviewTransactionRowSmallInfoValue');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass(ColorNameEnum.BLACK);
    expect(htmlElement).toHaveTextContent(`-$${value}`);
  });

  it('renders label overviewTransactionRowSmallInfoDate with passed date', () => {
    const { container } = render(<TransactionRowSmall {...testProps} date={date} />);

    const htmlElement = container.querySelector('.overviewTransactionRowSmallInfoDate');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(date);
  });
});
