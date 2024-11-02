import { render, screen } from '@testing-library/react';
import { BudgetCardList } from './BudgetCardList';
import { BudgetCardListProps } from '../../../model/props/BudgetCardListProps';
import { MemoryRouter } from 'react-router-dom';
import { mockedTransactions } from '../../../fixtures/MockedTransactions';

describe('BudgetCardList', () => {
  const link: string = 'testLink';

  const testProps: BudgetCardListProps = {
    transactions: mockedTransactions,
    link,
  };

  it('renders div budgetCardList', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetCardList {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardList');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div budgetCardListHeader', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetCardList {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardListHeader');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label budgetCardListHeaderLabel', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetCardList {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardListHeaderLabel');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders passed link', () => {
    render(
      <MemoryRouter>
        <BudgetCardList {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = screen.getByRole('link');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('See All');
    expect(htmlElement).toHaveAttribute('href', `/${link}`);
  });

  it('renders link icon', () => {
    render(
      <MemoryRouter>
        <BudgetCardList {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = screen.getByRole('link');
    const svgElement = htmlElement.querySelector('svg');

    expect(svgElement).toBeInTheDocument();
  });

  it('renders div budgetCardListTransactions', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetCardList {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardListTransactions');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders a maximum of 3 transaction-rows with all passed transactions', () => {
    const moreThan3Transactions = [...mockedTransactions, ...mockedTransactions];
    render(
      <MemoryRouter>
        <BudgetCardList transactions={moreThan3Transactions} link="/" />
      </MemoryRouter>
    );

    const reactComponents = screen.getAllByTestId('transaction-row');

    expect(reactComponents).toHaveLength(3);
  });

  it('renders transaction-rows with latest first', () => {
    render(
      <MemoryRouter>
        <BudgetCardList {...testProps} />
      </MemoryRouter>
    );

    const reactComponents = screen.getAllByTestId('transaction-row');

    const firstTransactionDate = reactComponents[0].querySelector(
      '.overviewTransactionRowInfoDate'
    )!.textContent;
    const secondTransactionDate = reactComponents[1].querySelector(
      '.overviewTransactionRowInfoDate'
    )!.textContent;

    expect(firstTransactionDate! > secondTransactionDate!).toBe(true);
  });
});
