import { render, screen } from '@testing-library/react';
import React from 'react';
import BudgetsDiagramCard from './BudgetsDiagramCard';
import { mockedBudgets } from '../../../fixtures/MockedBudgets';
import { mockedTransactionsEntertainment } from '../../../fixtures/MockedTransactions';
import LoadingSpinner from '../../LoadingSpinner';
import BudgetsDiagram from '../BudgetsDiagram';
import BudgetsDiagramCardRow from './BudgetsDiagramCardRow';

jest.mock('../../LoadingSpinner', () => jest.fn(() => <div data-testid="loading-spinner"></div>));
jest.mock('../BudgetsDiagram', () => jest.fn(() => <div data-testid="budgets-diagram"></div>));
jest.mock('./BudgetsDiagramCardRow', () =>
  jest.fn(() => <div data-testid="budgets-diagramm-card-row"></div>)
);

describe('BudgetsDiagramCard', () => {
  const budgets = mockedBudgets;
  const transactions = mockedTransactionsEntertainment;
  const isLoading = false;

  const testProps = {
    budgets,
    transactions,
    isLoading,
  };

  const getCurrentAmount: (categoryKey: string) => number = (categoryKey: string): number => {
    let spent: number = 0;
    transactions.forEach((transaction) => {
      if (transaction.categoryKey === categoryKey) {
        spent = spent + transaction.amount;
      }
    });
    spent = spent * -1;
    return spent;
  };

  it('renders component LoadingSpinner if passed prop isLoading is true', () => {
    render(<BudgetsDiagramCard {...testProps} isLoading={true} />);

    const component = screen.getByTestId('loading-spinner');

    expect(component).toBeInTheDocument();
    expect(LoadingSpinner).toHaveBeenCalled();
  });

  it('does not render component LoadingSpinner if passed prop isLoading is false', () => {
    render(<BudgetsDiagramCard {...testProps} isLoading={false} />);

    const component = screen.queryByTestId('loading-spinner');

    expect(component).not.toBeInTheDocument();
    expect(LoadingSpinner).not.toHaveBeenCalled();
  });

  it('renders div budgetsDiagramCard', () => {
    const { container } = render(<BudgetsDiagramCard {...testProps} />);

    const htmlElement = container.querySelector('.budgetsDiagramCard');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div budgetsDiagramWrapper', () => {
    const { container } = render(<BudgetsDiagramCard {...testProps} />);

    const htmlElement = container.querySelector('.budgetsDiagramWrapper');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BudgetsDiagram with passed props budgets and transactions', () => {
    render(<BudgetsDiagramCard {...testProps} budgets={budgets} transactions={transactions} />);

    const component = screen.getByTestId('budgets-diagram');

    expect(component).toBeInTheDocument();
    expect(BudgetsDiagram).toHaveBeenCalledWith({ budgets, transactions }, {});
  });

  it('renders div budgetsDiagramCardDetails', () => {
    const { container } = render(<BudgetsDiagramCard {...testProps} />);

    const htmlElement = container.querySelector('.budgetsDiagramCardDetails');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label budgetsDiagramCardDetailsLabel with correct text', () => {
    const { container } = render(<BudgetsDiagramCard {...testProps} />);

    const htmlElement = container.querySelector('.budgetsDiagramCardDetailsLabel');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Spending Summary');
  });

  it('renders div budgetsDiagramCardRowWrapper', () => {
    const { container } = render(<BudgetsDiagramCard {...testProps} />);

    const htmlElement = container.querySelector('.budgetsDiagramCardRowWrapper');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders components BudgetsDiagramCardRow with passed prop budgets', () => {
    render(<BudgetsDiagramCard {...testProps} budgets={budgets} />);

    const components = screen.getAllByTestId('budgets-diagramm-card-row');

    expect(components).toHaveLength(budgets.length);
    budgets.forEach((budget, index) => {
      expect(BudgetsDiagramCardRow).toHaveBeenNthCalledWith(
        index + 1,
        {
          title: budget.category,
          currentAmount: getCurrentAmount(budget.categoryKey),
          maxAmount: budget.maximum,
          color: budget.color,
        },
        {}
      );
    });
  });

  it('renders hr budgetsDiagramCardDetailsLine budgets.length - 1 times', () => {
    const { container } = render(<BudgetsDiagramCard {...testProps} budgets={budgets} />);

    const hr = container.querySelectorAll('.budgetsDiagramCardDetailsLine');

    expect(hr).toHaveLength(budgets.length - 1);
  });
});
