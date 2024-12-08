import { render, screen } from '@testing-library/react';
import { OverviewTransactions } from './OverviewTransactions';
import { MemoryRouter } from 'react-router-dom';
import {
  mockedTransactions,
  mockedTransactionsLength6,
} from '../../../fixtures/MockedTransactions';
import { ReactFutureFlags } from '../../../constants/ReactFutureFlags';

describe('OverviewTransactions', () => {
  const transactions = mockedTransactions;
  const isLoading = false;
  const testProps = {
    transactions,
    isLoading,
  };

  it('renders div overviewTransactions', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverviewTransactions {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewTransactions');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders the react component TransactionRowSmall max 5 times', () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverviewTransactions {...testProps} transactions={mockedTransactionsLength6} />
      </MemoryRouter>
    );

    const reactComponents = screen.getAllByTestId('transaction-row');

    expect(reactComponents).toHaveLength(5);
  });

  it('renders hr only between TransactionRows', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverviewTransactions {...testProps} />
      </MemoryRouter>
    );

    const htmlElements = container.querySelectorAll('hr');
    const reactComponents = screen.getAllByTestId('transaction-row');

    expect(htmlElements).toHaveLength(reactComponents.length - 1);
  });

  it('renders LoadingSpinner if isLoading is true', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverviewTransactions {...testProps} isLoading={true} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.loadingSpinner');
    const components = screen.queryAllByTestId('transaction-row');

    expect(htmlElement).toBeInTheDocument();
    expect(components).toHaveLength(0);
  });
});
