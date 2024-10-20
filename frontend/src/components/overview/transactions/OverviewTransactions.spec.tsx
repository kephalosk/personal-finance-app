import { render, screen } from '@testing-library/react';
import { OverviewTransactions } from './OverviewTransactions';
import { MemoryRouter } from 'react-router-dom';

describe('OverviewTransactions', () => {
  it('renders div overviewTransactions', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewTransactions />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewTransactions');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders the react component TransactionRow 5 times', () => {});
  render(
    <MemoryRouter>
      <OverviewTransactions />
    </MemoryRouter>
  );

  const reactComponents = screen.getAllByTestId('transaction-row');

  expect(reactComponents).toHaveLength(5);
});
