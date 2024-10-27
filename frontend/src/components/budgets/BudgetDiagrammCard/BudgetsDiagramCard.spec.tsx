import { render, screen } from '@testing-library/react';
import React from 'react';
import { BudgetsDiagramCard } from './BudgetsDiagramCard';

describe('BudgetsDiagramCard', () => {
  it('renders div budgetsDiagramCard', () => {
    const { container } = render(<BudgetsDiagramCard />);

    const htmlElement = container.querySelector('.budgetsDiagramCard');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label budgetsDiagramCardDetailsLabel', () => {
    const { container } = render(<BudgetsDiagramCard />);

    const htmlElement = container.querySelector('.budgetsDiagramCardDetailsLabel');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Spending Summary');
  });

  it('renders all 4 divs budgetsDiagramCardDetails', () => {
    render(<BudgetsDiagramCard />);

    const reactComponents = screen.getAllByTestId('budgets-diagramm-card-row');

    expect(reactComponents).toHaveLength(4);
  });
});
