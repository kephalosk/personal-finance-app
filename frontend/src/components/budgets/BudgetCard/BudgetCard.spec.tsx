import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BudgetCard } from './BudgetCard';
import { BudgetCardProps } from '../../../types/BudgetCardProps';
import {
  mockedTransactionsEntertainment,
  mockedTransactionsWithDifferentCategoriesAndCategoryAsNames,
} from '../../../fixtures/MockedTransactions';
import { mockedBudget } from '../../../fixtures/mockedBudgets';

describe('BudgetCard', () => {
  const testProps: BudgetCardProps = {
    budget: mockedBudget,
    transactions: mockedTransactionsEntertainment,
  };

  let spent: number = 0;
  mockedTransactionsEntertainment.forEach((transaction) => {
    spent = spent + transaction.amount;
  });
  spent = spent * -1;

  const remaining: number = mockedBudget.maximum - spent;

  it('renders div budgetCard', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCard');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component CardHeader', () => {
    render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const component = screen.getByTestId('card-header');

    expect(component).toBeInTheDocument();
  });

  it('renders div budgetCardBar', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardBar');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label budgetCardBarLabel', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardBarLabel');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`Maximum of $${mockedBudget.maximum}`);
  });

  it('renders div budgetCardBarMax', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardBarMax');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div budgetCardBarCurrent', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardBarCurrent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div budgetCardBarValues', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardBarValues');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component ValueBox-spent with passed color', () => {
    render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const components = screen.getAllByTestId('value-box');

    components.forEach((component) => {
      const title = component.querySelector('.valueBoxContentTitle')!.textContent;
      if (title === 'Spent') {
        expect(component.querySelector('.valueBoxBorder')).toHaveClass(mockedBudget.color);
        const value = component.querySelector('.valueBoxContentValue')!.textContent;
        expect(value).toEqual(`$${spent.toFixed(2)}`);
      }
    });
  });

  it('renders component ValueBox-remaining', () => {
    render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const components = screen.getAllByTestId('value-box');

    components.forEach((component) => {
      const title = component.querySelector('.valueBoxContentTitle')!.textContent;
      if (title === 'Remaining') {
        const value = component.querySelector('.valueBoxContentValue')!.textContent;
        expect(value).toEqual(`$${remaining.toFixed(2)}`);
      }
    });
  });

  it('resets negative remaining to 0', () => {
    const propsWithOvermaxedSpending = {
      ...testProps,
      budget: { ...mockedBudget, maximum: 5 },
    };
    render(
      <MemoryRouter>
        <BudgetCard {...propsWithOvermaxedSpending} />
      </MemoryRouter>
    );

    const components = screen.getAllByTestId('value-box');

    components.forEach((component) => {
      const title = component.querySelector('.valueBoxContentTitle')!.textContent;
      if (title === 'Remaining') {
        const value = component.querySelector('.valueBoxContentValue')!.textContent;
        expect(value).toEqual('$0.00');
      }
    });
  });

  it('renders component BudgetCardList', () => {
    render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const component = screen.getByTestId('budget-card-list');

    expect(component).toBeInTheDocument();
  });

  it('passes the link to the the BudgetCardList', () => {
    render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const component = screen.getByRole('link');

    expect(component).toHaveAttribute('href', '/transactions');
  });

  it('filters the transactions for the BudgetCardList', () => {
    const propsWithTransactionsWithDifferentCategoriesAndCategoryAsNames = {
      ...testProps,
      transactions: mockedTransactionsWithDifferentCategoriesAndCategoryAsNames,
    };
    const { container } = render(
      <MemoryRouter>
        <BudgetCard {...propsWithTransactionsWithDifferentCategoriesAndCategoryAsNames} />
      </MemoryRouter>
    );

    const htmlElements = container.querySelectorAll('.overviewTransactionRowName');
    htmlElements.forEach((category) => {
      expect(category.textContent).toEqual(mockedBudget.category);
    });
  });
});
