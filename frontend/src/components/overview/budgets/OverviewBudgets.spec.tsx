import { render, screen } from '@testing-library/react';
import { OverviewBudgets } from './OverviewBudgets';
import { MemoryRouter } from 'react-router-dom';
import { mockedBudget, mockedBudgets6 } from '../../../fixtures/MockedBudgets';
import { mockedTransactions } from '../../../fixtures/MockedTransactions';
import { ReactFutureFlags } from '../../../constants/ReactFutureFlags';

describe('OverviewBudgets', () => {
  const budgets = mockedBudgets6;
  const transactions = mockedTransactions;
  const isLoading = false;
  const testProps = {
    budgets,
    transactions,
    isLoading,
  };

  it('renders div overviewBudgets', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverviewBudgets {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewBudgets');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component OverviewHeader', () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverviewBudgets {...testProps} />
      </MemoryRouter>
    );

    const reactComponent = screen.getByTestId('overview-header');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewBudgetsContent', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverviewBudgets {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewBudgetsContent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component BudgetsDiagram', () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverviewBudgets {...testProps} />
      </MemoryRouter>
    );

    const reactComponent = screen.getByTestId('budgets-diagram');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewBudgetsValues', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverviewBudgets {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewBudgetsValues');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component ValueBox max 4 times', () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverviewBudgets {...testProps} />
      </MemoryRouter>
    );

    const reactComponents = screen.getAllByTestId('value-box');

    expect(reactComponents).toHaveLength(4);
  });

  it('renders react component ValueBox only once if only 1 budget is passed', () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverviewBudgets {...testProps} budgets={[mockedBudget]} />
      </MemoryRouter>
    );

    const reactComponents = screen.getAllByTestId('value-box');

    expect(reactComponents).toHaveLength(1);
  });

  it('renders LoadingSpinner if isLoading is true', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverviewBudgets {...testProps} isLoading={true} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.loadingSpinner');
    const components = screen.queryAllByTestId('budgets-diagram');

    expect(htmlElement).toBeInTheDocument();
    expect(components).toHaveLength(0);
  });
});
