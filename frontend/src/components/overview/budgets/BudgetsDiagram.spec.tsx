import { render } from '@testing-library/react';
import { BudgetsDiagram } from './BudgetsDiagram';
import { BudgetsDiagramProps } from '../../../types/BudgetsDiagramProps';
import { mockedTransactionsEntertainment } from '../../../fixtures/MockedTransactions';
import { mockedBudgets } from '../../../fixtures/mockedBudgets';

describe('BudgetsDiagram', () => {
  let totalSpend = 0;
  mockedTransactionsEntertainment.forEach((transaction) => {
    totalSpend = totalSpend + transaction.amount;
  });
  totalSpend = totalSpend * -1;

  let totalBudget = 0;
  mockedBudgets.forEach((budget) => {
    totalBudget = totalBudget + budget.maximum;
  });

  const testProps: BudgetsDiagramProps = {
    budgets: mockedBudgets,
    transactions: mockedTransactionsEntertainment,
  };
  it('renders div overviewBudgetsDiagram', () => {
    const { container } = render(<BudgetsDiagram {...testProps} />);

    const htmlElement = container.querySelector('.overviewBudgetsDiagram');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div overviewBudgetsDiagramCircleBig', () => {
    const { container } = render(<BudgetsDiagram {...testProps} />);

    const htmlElement = container.querySelector('.overviewBudgetsDiagramCircleBig');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div overviewBudgetsDiagramCircleSmall', () => {
    const { container } = render(<BudgetsDiagram {...testProps} />);

    const htmlElement = container.querySelector('.overviewBudgetsDiagramCircleSmall');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label overviewBudgetsDiagramSpend', () => {
    const { container } = render(<BudgetsDiagram {...testProps} />);

    const htmlElement = container.querySelector('.overviewBudgetsDiagramSpend');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label overviewBudgetsDiagramTotal', () => {
    const { container } = render(<BudgetsDiagram {...testProps} />);

    const htmlElement = container.querySelector('.overviewBudgetsDiagramTotal');

    expect(htmlElement).toBeInTheDocument();
  });

  it('calculates maximum budget with passed budgets', () => {
    const { container } = render(<BudgetsDiagram {...testProps} />);

    const htmlElement = container.querySelector('.overviewBudgetsDiagramTotal');

    expect(htmlElement).toHaveTextContent(`${totalBudget}`);
  });

  it('calculates maximum spend with passed transactions', () => {
    const { container } = render(<BudgetsDiagram {...testProps} />);

    const htmlElement = container.querySelector('.overviewBudgetsDiagramSpend');

    expect(htmlElement).toHaveTextContent(`${totalSpend}`);
  });
});
