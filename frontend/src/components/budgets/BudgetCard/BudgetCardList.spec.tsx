import { render, screen } from '@testing-library/react';
import BudgetCardList from './BudgetCardList';
import { MemoryRouter } from 'react-router-dom';
import { mockedTransactions2 } from '../../../fixtures/MockedTransactions';
import useIsSmallScreen from '../../../globals/hooks/useIsSmallScreen';
import { ReactFutureFlags } from '../../../constants/ReactFutureFlags';
import TransactionRow from '../../overview/transactions/TransactionRow';
import { EPTransaction } from '../../../model/entrypoints/EPTransaction';
import TransactionRowSmall from './TransactionRowSmall';

jest.mock('../../overview/transactions/TransactionRow', () =>
  jest.fn(() => <div data-testid="transaction-row"></div>)
);
jest.mock('./TransactionRowSmall', () =>
  jest.fn(() => <div data-testid="transaction-row-small"></div>)
);

jest.mock('../../../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('BudgetCardList', () => {
  const transactions = mockedTransactions2;
  const link: string = 'testLink';

  const testProps = {
    transactions,
    link,
  };

  const latestTransactions: EPTransaction[] = [...transactions].sort(
    (a: EPTransaction, b: EPTransaction) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  beforeEach(() => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
  });

  it('renders div budgetCardList', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCardList {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardList');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div budgetCardListHeader', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCardList {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardListHeader');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label budgetCardListHeaderLabel with correct text', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCardList {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardListHeaderLabel');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Latest Spending');
  });

  it('renders Link budgetCardListHeaderLink with passed prop link', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCardList {...testProps} link={link} />
      </MemoryRouter>
    );

    const component = container.querySelector('.budgetCardListHeaderLink');

    expect(component).toBeInTheDocument();
    expect(component).toHaveTextContent('See All');
    expect(component).toHaveAttribute('href', `/${link}`);
  });

  it('renders link icon', () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCardList {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = screen.getByRole('link');
    const svgElement = htmlElement.querySelector('svg');

    expect(svgElement).toBeInTheDocument();
  });

  it('renders div budgetCardListTransactions', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCardList {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardListTransactions');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders a maximum of 3 transaction-rows with passed prop transactions', () => {
    const moreThan3Transactions = [...mockedTransactions2, ...mockedTransactions2];
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCardList transactions={moreThan3Transactions} link="/" />
      </MemoryRouter>
    );

    const components = screen.getAllByTestId('transaction-row');

    expect(components).toHaveLength(3);
  });

  it('renders components TransactionRow with latest first', () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCardList {...testProps} transactions={transactions} />
      </MemoryRouter>
    );

    const components = screen.getAllByTestId('transaction-row');

    components.forEach((component, index) => {
      expect(TransactionRow).toHaveBeenNthCalledWith(
        index + 1,
        {
          date: latestTransactions[index].date,
          imgSrc: latestTransactions[index].avatar,
          name: latestTransactions[index].name,
          value: latestTransactions[index].amount,
        },
        {}
      );
    });
  });

  it('renders components TransactionRowSmall in mobile view', () => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(true);
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCardList {...testProps} transactions={transactions} />
      </MemoryRouter>
    );

    const components = screen.getAllByTestId('transaction-row-small');

    components.forEach((component, index) => {
      expect(TransactionRowSmall).toHaveBeenNthCalledWith(
        index + 1,
        {
          date: latestTransactions[index].date,
          name: latestTransactions[index].name,
          value: latestTransactions[index].amount,
        },
        {}
      );
    });
  });

  it('renders hr budgetCardListLine TransactionRows - 1 times', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCardList {...testProps} />
      </MemoryRouter>
    );

    const components = screen.getAllByTestId('transaction-row');
    const htmlElement = container.querySelectorAll('.budgetCardListLine');

    expect(htmlElement).toHaveLength(components.length - 1);
  });
});
