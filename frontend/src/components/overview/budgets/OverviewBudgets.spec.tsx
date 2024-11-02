import { render, screen } from '@testing-library/react';
import { OverviewBudgets } from './OverviewBudgets';
import { MemoryRouter } from 'react-router-dom';
import { mockedBudget, mockedBudgets6 } from '../../../fixtures/MockedBudgets';
import { mockedTransactions } from '../../../fixtures/MockedTransactions';

describe('OverviewBudgets', () => {
  const budgets = mockedBudgets6;
  const transactions = mockedTransactions;
  const testProps = {
    budgets,
    transactions,
  };

  it('renders div overviewBudgets', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewBudgets {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewBudgets');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component OverviewHeader', () => {
    render(
      <MemoryRouter>
        <OverviewBudgets {...testProps} />
      </MemoryRouter>
    );

    const reactComponent = screen.getByTestId('overview-header');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewBudgetsContent', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewBudgets {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewBudgetsContent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component BudgetsDiagram', () => {
    render(
      <MemoryRouter>
        <OverviewBudgets {...testProps} />
      </MemoryRouter>
    );

    const reactComponent = screen.getByTestId('budgets-diagram');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewBudgetsValues', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewBudgets {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewBudgetsValues');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component ValueBox max 4 times', () => {
    render(
      <MemoryRouter>
        <OverviewBudgets {...testProps} />
      </MemoryRouter>
    );

    const reactComponents = screen.getAllByTestId('value-box');

    expect(reactComponents).toHaveLength(4);
  });

  it('renders react component ValueBox only once if only 1 budget is passed', () => {
    render(
      <MemoryRouter>
        <OverviewBudgets {...testProps} budgets={[mockedBudget]} />
      </MemoryRouter>
    );

    const reactComponents = screen.getAllByTestId('value-box');

    expect(reactComponents).toHaveLength(1);
  });
});
