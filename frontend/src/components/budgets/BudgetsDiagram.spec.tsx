import { render } from '@testing-library/react';
import BudgetsDiagram from './BudgetsDiagram';
import { mockedTransactionsEntertainmentWithPositiveAmounts } from '../../fixtures/MockedTransactions';
import { mockedBudgets2 } from '../../fixtures/MockedBudgets';

describe('BudgetsDiagram', () => {
  let totalSpend = 0;
  mockedTransactionsEntertainmentWithPositiveAmounts.forEach((transaction) => {
    const amountToAdd: number = transaction.amount < 0 ? transaction.amount : 0;
    totalSpend = totalSpend + amountToAdd;
  });
  totalSpend = totalSpend * -1;

  let totalBudget = 0;
  mockedBudgets2.forEach((budget) => {
    totalBudget = totalBudget + budget.maximum;
  });

  const testProps = {
    budgets: mockedBudgets2,
    transactions: mockedTransactionsEntertainmentWithPositiveAmounts,
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

  it('renders div overviewBudgetsDiagramCircleMiddle', () => {
    const { container } = render(<BudgetsDiagram {...testProps} />);

    const htmlElement = container.querySelector('.overviewBudgetsDiagramCircleMiddle');

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

    expect(htmlElement).toHaveTextContent(`$${totalSpend}`);
  });
});
