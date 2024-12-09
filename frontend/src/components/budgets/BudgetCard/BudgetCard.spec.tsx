import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BudgetCard from './BudgetCard';
import { mockedTransactionsEntertainment } from '../../../fixtures/MockedTransactions';
import { mockedBudget } from '../../../fixtures/MockedBudgets';
import useIsSmallScreen from '../../../globals/hooks/useIsSmallScreen';
import { ReactFutureFlags } from '../../../constants/ReactFutureFlags';
import LoadingSpinner from '../../LoadingSpinner';
import CardHeader from '../../CardHeader';
import ValueBox from '../../overview/ValueBox';
import BudgetCardList from './BudgetCardList';
import { ColorNameEnum } from '../../../model/enum/ColorNameEnum';

jest.mock('../../LoadingSpinner', () => jest.fn(() => <div data-testid="loading-spinner"></div>));
jest.mock('../../CardHeader', () => jest.fn(() => <div data-testid="card-header"></div>));
jest.mock('../../overview/ValueBox', () => jest.fn(() => <div data-testid="value-box"></div>));
jest.mock('./BudgetCardList', () => jest.fn(() => <div data-testid="budget-card-list"></div>));

jest.mock('../../../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('BudgetCard', () => {
  const budget = mockedBudget;
  const transactions = mockedTransactionsEntertainment;
  const isLoading = false;

  const testProps = {
    budget,
    transactions,
    isLoading,
  };

  let spent: number = 0;
  mockedTransactionsEntertainment.forEach((transaction) => {
    spent = spent + transaction.amount;
  });
  spent = spent * -1;

  const remaining: number = mockedBudget.maximum - spent;

  beforeEach(() => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
  });

  it('renders component LoadingSpinner when passed prop isLoading is true', () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCard {...testProps} isLoading={true} />
      </MemoryRouter>
    );

    const component = screen.getByTestId('loading-spinner');

    expect(component).toBeInTheDocument();
    expect(LoadingSpinner).toHaveBeenCalled();
  });

  it('does not render component LoadingSpinner when passed prop isLoading is false', () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCard {...testProps} isLoading={false} />
      </MemoryRouter>
    );

    const component = screen.queryByTestId('loading-spinner');

    expect(component).not.toBeInTheDocument();
    expect(LoadingSpinner).not.toHaveBeenCalled();
  });

  it('renders div budgetCard', () => {
    const { container } = render(<BudgetCard {...testProps} />);

    const htmlElement = container.querySelector('.budgetCard');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component CardHeader with passed prop budget', () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCard {...testProps} budget={budget} />
      </MemoryRouter>
    );

    const component = screen.getByTestId('card-header');

    expect(component).toBeInTheDocument();
    expect(CardHeader).toHaveBeenCalledWith({ color: budget.color, title: budget.category }, {});
  });

  it('renders div budgetCardBar', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardBar');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label budgetCardBarLabel with correct text', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardBarLabel');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`Maximum of $${mockedBudget.maximum}`);
  });

  it('renders div budgetCardBarMax', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardBarMax');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div budgetCardBarCurrent with passed prop budget.color and percentage style', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCard {...testProps} budget={budget} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardBarCurrent');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass(budget.color);
    expect(htmlElement).toHaveAttribute('style', '--barCurrentWidthPercent: 25%;');
  });

  it('renders div budgetCardBarValues', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetCardBarValues');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders components ValueBox with passed color and correct amounts', () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    const components = screen.getAllByTestId('value-box');

    expect(components).toHaveLength(2);
    expect(ValueBox).toHaveBeenNthCalledWith(
      1,
      { color: budget.color, title: 'Spent', value: spent },
      {}
    );
    expect(ValueBox).toHaveBeenNthCalledWith(
      2,
      { color: ColorNameEnum.SEPIA, title: 'Remaining', value: remaining },
      {}
    );
  });

  it('renders component ValueBox-Remaining with correct title for mobile', () => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(true);
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCard {...testProps} />
      </MemoryRouter>
    );

    expect(ValueBox).toHaveBeenNthCalledWith(2, expect.objectContaining({ title: 'Free' }), {});
  });

  it('renders component ValueBox-Remaining with value 0 when spent amount is higher than maximum', () => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(true);
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCard {...testProps} budget={{ ...budget, maximum: 5 }} />
      </MemoryRouter>
    );

    expect(ValueBox).toHaveBeenNthCalledWith(2, expect.objectContaining({ value: 0 }), {});
  });

  it('renders component BudgetCardList with passed prop transactions', () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <BudgetCard {...testProps} transactions={transactions} />
      </MemoryRouter>
    );

    const component = screen.getByTestId('budget-card-list');

    expect(component).toBeInTheDocument();
    expect(BudgetCardList).toHaveBeenCalledWith(
      { link: '../transactions?cat=entertainment', transactions },
      {}
    );
  });
});
