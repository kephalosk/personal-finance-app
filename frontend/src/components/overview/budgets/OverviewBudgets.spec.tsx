import { render, screen } from '@testing-library/react';
import { OverviewBudgets } from './OverviewBudgets';
import { MemoryRouter } from 'react-router-dom';

describe('OverviewBudgets', () => {
  it('renders div overviewBudgets', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewBudgets />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewBudgets');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component OverviewHeader', () => {
    render(
      <MemoryRouter>
        <OverviewBudgets />
      </MemoryRouter>
    );

    const reactComponent = screen.getByTestId('overview-header');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewBudgetsContent', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewBudgets />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewBudgetsContent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component BudgetsDiagram', () => {
    render(
      <MemoryRouter>
        <OverviewBudgets />
      </MemoryRouter>
    );

    const reactComponent = screen.getByTestId('budgets-diagram');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewBudgetsValues', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewBudgets />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewBudgetsValues');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component ValueBox 4 times', () => {
    render(
      <MemoryRouter>
        <OverviewBudgets />
      </MemoryRouter>
    );

    const reactComponents = screen.getAllByTestId('value-box');

    expect(reactComponents).toHaveLength(4);
  });
});
