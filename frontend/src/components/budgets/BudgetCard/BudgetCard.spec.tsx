import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BudgetCard } from './BudgetCard';
import { BudgetCardProps } from '../../../types/BudgetCardProps';
import { EPTransaction } from '../../../types/EPTransaction';
import { EPBudget } from '../../../types/EPBudget';

describe('BudgetCard', () => {
  const transactions: EPTransaction[] = [
    {
      avatar: './src/assets/images/avatars/james-thompson.jpg',
      name: 'James Thompson',
      category: 'Entertainment',
      categoryKey: 'entertainment',
      date: '11 Aug 2024',
      amount: -5,
      recurring: false,
    },
    {
      avatar: './src/assets/images/avatars/pixel-playground.jpg',
      name: 'Pixel Playground',
      category: 'Entertainment',
      categoryKey: 'entertainment',
      date: '15 Aug 2024',
      amount: -10,
      recurring: true,
    },
    {
      avatar: './src/assets/images/avatars/rina-sato.jpg',
      name: 'Rina Sato',
      category: 'Entertainment',
      categoryKey: 'entertainment',
      date: '13 Jul 2024',
      amount: -10,
      recurring: false,
    },
  ];

  const transactionsWithDifferentCategoriesAndCategoryAsNames: EPTransaction[] = [
    {
      avatar: './src/assets/images/avatars/james-thompson.jpg',
      name: 'Entertainment',
      category: 'Entertainment',
      categoryKey: 'entertainment',
      date: '11 Aug 2024',
      amount: -5,
      recurring: false,
    },
    {
      avatar: './src/assets/images/avatars/pixel-playground.jpg',
      name: 'School',
      category: 'School',
      categoryKey: 'school',
      date: '15 Aug 2024',
      amount: -10,
      recurring: true,
    },
    {
      avatar: './src/assets/images/avatars/rina-sato.jpg',
      name: 'Bills',
      category: 'Bills',
      categoryKey: 'bills',
      date: '13 Jul 2024',
      amount: -10,
      recurring: false,
    },
  ];

  const budget: EPBudget = {
    category: 'Entertainment',
    categoryKey: 'entertainment',
    maximum: 100,
    color: 'testColor',
  };

  const testProps: BudgetCardProps = {
    budget,
    transactions,
  };

  let spent: number = 0;
  transactions.forEach((transaction) => {
    spent = spent + transaction.amount;
  });
  spent = spent * -1;

  const remaining: number = budget.maximum - spent;

  it('renders div budgetCard', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCard');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BudgetCardHeader', () => {
    render(
      <MemoryRouter>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const component = screen.getByTestId('budget-card-header');

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
    expect(htmlElement).toHaveTextContent(`Maximum of $${budget.maximum}`);
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
        expect(component.querySelector('.valueBoxBorder')).toHaveClass(budget.color);
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
      budget: { ...budget, maximum: 5 },
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
      transactions: transactionsWithDifferentCategoriesAndCategoryAsNames,
    };
    const { container } = render(
      <MemoryRouter>
        <BudgetCard {...propsWithTransactionsWithDifferentCategoriesAndCategoryAsNames} />
      </MemoryRouter>
    );

    const htmlElements = container.querySelectorAll('.overviewTransactionRowName');
    htmlElements.forEach((category) => {
      expect(category.textContent).toEqual(budget.category);
    });
  });
});
