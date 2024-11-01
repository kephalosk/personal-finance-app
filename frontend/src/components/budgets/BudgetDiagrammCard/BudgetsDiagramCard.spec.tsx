import { render, screen } from '@testing-library/react';
import React from 'react';
import { BudgetsDiagramCard } from './BudgetsDiagramCard';
import { BudgetsDiagramCardProps } from '../../../model/props/BudgetsDiagramCardProps';
import { mockedBudgets } from '../../../fixtures/MockedBudgets';
import { mockedTransactionsEntertainment } from '../../../fixtures/MockedTransactions';

describe('BudgetsDiagramCard', () => {
  const testProps: BudgetsDiagramCardProps = {
    budgets: mockedBudgets,
    transactions: mockedTransactionsEntertainment,
  };

  const currentAmountEntertainment = 25;
  const currentAmountDiningOut = 0;

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

  it('renders div budgetsDiagramCardDetails', () => {
    const { container } = render(<BudgetsDiagramCard {...testProps} />);

    const htmlElement = container.querySelector('.budgetsDiagramCardDetails');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label budgetsDiagramCardDetailsLabel', () => {
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

  it('renders divs budgetsDiagramCardDetails with passed budgets', () => {
    render(<BudgetsDiagramCard {...testProps} />);

    const reactComponents = screen.getAllByTestId('budgets-diagramm-card-row');
    let hasRenderedBudgets = true;
    reactComponents.forEach((row) => {
      const title = row.querySelector('.cardRowTitle')!.textContent;
      if (title !== mockedBudgets.at(0)!.category && title !== mockedBudgets.at(1)!.category) {
        hasRenderedBudgets = false;
      }
    });

    expect(hasRenderedBudgets).toBe(true);
  });

  it('calculates currentAmount with passed transactions', () => {
    const categoryEntertainment = mockedBudgets.at(0)!.category;
    const categoryDiningOut = mockedBudgets.at(1)!.category;
    render(<BudgetsDiagramCard {...testProps} />);

    const reactComponents = screen.getAllByTestId('budgets-diagramm-card-row');

    reactComponents.forEach((row) => {
      const title = row.querySelector('.cardRowTitle')!.textContent;
      const currentAmount = row.querySelector('.cardRowTitleCurrentAmount')!.textContent;
      switch (title) {
        case categoryEntertainment:
          expect(currentAmount).toEqual(`$${currentAmountEntertainment}.00`);
          break;
        case categoryDiningOut:
          expect(currentAmount).toEqual(`$${currentAmountDiningOut}.00`);
          break;
      }
    });
  });
});
