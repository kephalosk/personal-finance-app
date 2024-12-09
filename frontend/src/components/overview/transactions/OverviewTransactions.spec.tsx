import { render, screen } from '@testing-library/react';
import OverviewTransactions from './OverviewTransactions';
import { mockedTransactions11Records } from '../../../fixtures/MockedTransactions';
import OverviewHeader from '../OverviewHeader';
import LoadingSpinner from '../../LoadingSpinner';
import TransactionRow from './TransactionRow';

jest.mock('../OverviewHeader', () => jest.fn(() => <div data-testid="overview-header"></div>));
jest.mock('../../LoadingSpinner', () => jest.fn(() => <div data-testid="loading-spinner"></div>));
jest.mock('./TransactionRow', () => jest.fn(() => <div data-testid="transaction-row"></div>));

describe('OverviewTransactions', () => {
  const transactions = mockedTransactions11Records;
  const isLoading = false;

  const testProps = {
    transactions,
    isLoading,
  };

  it('renders div overviewTransactions', () => {
    const { container } = render(<OverviewTransactions {...testProps} />);

    const htmlElement = container.querySelector('.overviewTransactions');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component OverviewHeader', () => {
    render(<OverviewTransactions {...testProps} />);

    const component = screen.getByTestId('overview-header');

    expect(component).toBeInTheDocument();
    expect(OverviewHeader).toHaveBeenCalledWith(
      { linkTarget: '/transactions', linkText: 'View All', title: 'Transactions' },
      {}
    );
  });

  it('renders div overviewTransactionsContent', () => {
    const { container } = render(<OverviewTransactions {...testProps} />);

    const htmlElement = container.querySelector('.overviewTransactionsContent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders LoadingSpinner if passed prop isLoading is true', () => {
    render(<OverviewTransactions {...testProps} isLoading={true} />);

    const component = screen.getByTestId('loading-spinner');
    const records = screen.queryAllByTestId('transaction-row');

    expect(component).toBeInTheDocument();
    expect(LoadingSpinner).toHaveBeenCalled();
    expect(records).toHaveLength(0);
  });

  it('does not render LoadingSpinner if passed prop isLoading is false', () => {
    render(<OverviewTransactions {...testProps} isLoading={false} />);

    const component = screen.queryByTestId('loading-spinner');

    expect(component).not.toBeInTheDocument();
    expect(LoadingSpinner).not.toHaveBeenCalled();
  });

  it('renders div wrapper max 5 times', () => {
    const { container } = render(
      <OverviewTransactions {...testProps} transactions={mockedTransactions11Records} />
    );

    const elements = container.querySelectorAll('.wrapper');

    expect(elements).toHaveLength(5);
  });

  it('renders component TransactionRow max 5 times with passed prop transactions', () => {
    render(<OverviewTransactions {...testProps} transactions={mockedTransactions11Records} />);

    const components = screen.getAllByTestId('transaction-row');

    expect(components).toHaveLength(5);
    mockedTransactions11Records.forEach((transaction, index) => {
      if (index < 5) {
        expect(TransactionRow).toHaveBeenNthCalledWith(
          index + 1,
          {
            name: transaction.name,
            value: transaction.amount,
            date: transaction.date,
            imgSrc: transaction.avatar,
          },
          {}
        );
      }
    });
  });

  it('renders hr max TransactionRow.length - 1 times', () => {
    const { container } = render(<OverviewTransactions {...testProps} />);

    const htmlElements = container.querySelectorAll('hr');
    const reactComponents = screen.getAllByTestId('transaction-row');

    expect(htmlElements).toHaveLength(reactComponents.length - 1);
  });
});
