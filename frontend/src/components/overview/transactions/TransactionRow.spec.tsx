import { render, screen } from '@testing-library/react';
import { TransactionRow } from './TransactionRow';

describe('TransactionRow', () => {
  const name: string = 'testName';
  const value: number = 100;
  const date: string = 'testDate';
  const imgSrc: string = 'testImgSrc';

  const testProps = {
    name,
    value,
    date,
    imgSrc,
  };

  it('renders div overviewTransactionRow', () => {
    const { container } = render(<TransactionRow {...testProps} />);

    const htmlElement = container.querySelector('.overviewTransactionRow');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders image of payment partner with passed imgSrc', () => {
    render(<TransactionRow {...testProps} />);

    const imgElement: HTMLElement = screen.getByAltText('image of payment partner');

    expect(imgElement).toHaveAttribute('src', imgSrc);
  });

  it('renders label overviewTransactionRowName with passed name', () => {
    const { container } = render(<TransactionRow {...testProps} />);

    const htmlElement = container.querySelector('.overviewTransactionRowName');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(name);
  });

  it('renders div overviewTransactionRowInfo', () => {
    const { container } = render(<TransactionRow {...testProps} />);

    const htmlElement = container.querySelector('.overviewTransactionRowInfo');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label overviewTransactionRowInfoValue with passed value', () => {
    const { container } = render(<TransactionRow {...testProps} />);

    const htmlElement = container.querySelector('.overviewTransactionRowInfoValue');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`+$${value}`);
  });

  it('renders label overviewTransactionRowInfoDate with passed date', () => {
    const { container } = render(<TransactionRow {...testProps} />);

    const htmlElement = container.querySelector('.overviewTransactionRowInfoDate');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(date);
  });
});
