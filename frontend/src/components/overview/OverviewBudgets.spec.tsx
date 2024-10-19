import { render, screen } from '@testing-library/react';
import { OverviewBudgets } from './OverviewBudgets';

describe('OverviewBudgets', () => {
  it('renders div overviewBudgets', () => {
    const { container } = render(<OverviewBudgets />);

    const htmlElement = container.querySelector('.overviewBudgets');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component OverviewHeader', () => {
    render(<OverviewBudgets />);

    const reactComponent = screen.getByTestId('overview-header');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewBudgetsContent', () => {
    const { container } = render(<OverviewBudgets />);

    const htmlElement = container.querySelector('.overviewBudgetsContent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component BudgetsDiagram', () => {
    render(<OverviewBudgets />);

    const reactComponent = screen.getByTestId('budgets-diagram');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewBudgetsValues', () => {
    const { container } = render(<OverviewBudgets />);

    const htmlElement = container.querySelector('.overviewBudgetsValues');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component ValueBox 4 times', () => {
    render(<OverviewBudgets />);

    const reactComponents = screen.getAllByTestId('value-box');

    expect(reactComponents).toHaveLength(4);
  });
});
