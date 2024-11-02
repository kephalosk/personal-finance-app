import { render, screen } from '@testing-library/react';
import { OverviewTransactions } from './OverviewTransactions';
import { MemoryRouter } from 'react-router-dom';
import {
  mockedTransactions,
  mockedTransactionsLength6,
} from '../../../fixtures/MockedTransactions';

describe('OverviewTransactions', () => {
  const transactions = mockedTransactions;
  const testProps = {
    transactions,
  };

  it('renders div overviewTransactions', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewTransactions {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewTransactions');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders the react component TransactionRow max 5 times', () => {
    render(
      <MemoryRouter>
        <OverviewTransactions {...testProps} transactions={mockedTransactionsLength6} />
      </MemoryRouter>
    );

    const reactComponents = screen.getAllByTestId('transaction-row');

    expect(reactComponents).toHaveLength(5);
  });

  it('renders hr only between TransactionRows', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewTransactions {...testProps} />
      </MemoryRouter>
    );

    const htmlElements = container.querySelectorAll('hr');
    const reactComponents = screen.getAllByTestId('transaction-row');

    expect(htmlElements).toHaveLength(reactComponents.length - 1);
  });
});
