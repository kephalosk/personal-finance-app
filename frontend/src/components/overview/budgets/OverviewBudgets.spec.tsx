import { render, screen } from '@testing-library/react';
import OverviewBudgets from './OverviewBudgets';
import { mockedBudgets6 } from '../../../fixtures/MockedBudgets';
import { mockedTransactions } from '../../../fixtures/MockedTransactions';
import OverviewHeader from '../OverviewHeader';
import LoadingSpinner from '../../LoadingSpinner';
import BudgetsDiagram from '../../budgets/BudgetsDiagram';
import ValueBox from '../ValueBox';

jest.mock('../OverviewHeader', () => jest.fn(() => <div data-testid="overview-header"></div>));
jest.mock('../../LoadingSpinner', () => jest.fn(() => <div data-testid="loading-spinner"></div>));
jest.mock('../../budgets/BudgetsDiagram', () =>
  jest.fn(() => <div data-testid="budgets-diagram"></div>)
);
jest.mock('../ValueBox', () => jest.fn(() => <div data-testid="value-box"></div>));

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
    const { container } = render(<OverviewBudgets {...testProps} />);

    const htmlElement = container.querySelector('.overviewBudgets');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component OverviewHeader', () => {
    render(<OverviewBudgets {...testProps} />);

    const reactComponent = screen.getByTestId('overview-header');

    expect(reactComponent).toBeInTheDocument();
    expect(OverviewHeader).toHaveBeenCalledWith(
      { linkTarget: '/budgets', linkText: 'See Details', title: 'Budgets' },
      {}
    );
  });

  it('renders component LoadingSpinner when passed prop isLoading is true', () => {
    render(<OverviewBudgets {...testProps} isLoading={true} />);

    const component = screen.getByTestId('loading-spinner');

    expect(component).toBeInTheDocument();
    expect(LoadingSpinner).toHaveBeenCalled();
  });

  it('does not render component LoadingSpinner when passed prop isLoading is false', () => {
    render(<OverviewBudgets {...testProps} isLoading={false} />);

    const component = screen.queryByTestId('loading-spinner');

    expect(component).not.toBeInTheDocument();
    expect(LoadingSpinner).not.toHaveBeenCalled();
  });

  it('renders div overviewBudgetsContent', () => {
    const { container } = render(<OverviewBudgets {...testProps} />);

    const htmlElement = container.querySelector('.overviewBudgetsContent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BudgetsDiagram', () => {
    render(<OverviewBudgets {...testProps} />);

    const component = screen.getByTestId('budgets-diagram');

    expect(component).toBeInTheDocument();
    expect(BudgetsDiagram).toHaveBeenCalledWith(
      { budgets: mockedBudgets6, transactions: mockedTransactions },
      {}
    );
  });

  it('renders div overviewBudgetsValues', () => {
    const { container } = render(<OverviewBudgets {...testProps} />);

    const htmlElement = container.querySelector('.overviewBudgetsValues');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component ValueBox max 4 times', () => {
    render(<OverviewBudgets {...testProps} />);

    const components = screen.getAllByTestId('value-box');

    expect(components).toHaveLength(4);
    components.forEach((valueBox, index) => {
      expect(ValueBox).toHaveBeenNthCalledWith(
        index + 1,
        {
          title: mockedBudgets6[index].category,
          value: mockedBudgets6[index].maximum,
          color: mockedBudgets6[index].color,
        },
        {}
      );
    });
  });
});
