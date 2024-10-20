import { render, screen } from '@testing-library/react';
import { OverviewTransactions } from './OverviewTransactions';

describe('OverviewTransactions', () => {
  it('renders div overviewTransactions', () => {
    const { container } = render(<OverviewTransactions />);

    const htmlElement = container.querySelector('.overviewTransactions');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders the react component TransactionRow 5 times', () => {});
  render(<OverviewTransactions />);

  const reactComponents = screen.getAllByTestId('transaction-row');

  expect(reactComponents).toHaveLength(5);
});
