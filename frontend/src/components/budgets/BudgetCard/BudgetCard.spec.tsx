import { fireEvent, render, screen } from '@testing-library/react';
import BudgetCard from './BudgetCard';
import { mockedTransactionsEntertainmentWithPositiveAmounts } from '../../../fixtures/MockedTransactions';
import { mockedBudget, mockedBudgets } from '../../../fixtures/MockedBudgets';
import useIsSmallScreen from '../../../globals/hooks/useIsSmallScreen';
import LoadingSpinner from '../../LoadingSpinner';
import CardHeader from '../../CardHeader';
import ValueBox from '../../overview/ValueBox';
import BudgetCardList from './BudgetCardList';
import { ColorNameEnum } from '../../../model/enum/ColorNameEnum';
import getColorObject from '../../../globals/utils/getColorObject';
import { Color } from '../../../model/Color';
import { fromColorNameToCode } from '../../../globals/utils/FromColorNameToCode';
import { fromColorNameToDisplayName } from '../../../globals/utils/FromColorNameToDisplayName';
import { editBudget } from '../../../globals/services/BudgetService';
import { EPTransaction } from '../../../model/entrypoints/EPTransaction';
import { EPBudget } from '../../../model/entrypoints/EPBudget';
import { CardHeaderItemNameEnum } from '../../../model/enum/CardHeaderItemNameEnum';
import { CardHeaderItemOperationEnum } from '../../../model/enum/CardHeaderItemOperationEnum';
import OverlayCardBox from '../../overlay/OverlayCardBox';
import OverlayContentEditBudget from '../../overlay/OverlayContentEditBudget';
import { Fragment, ReactNode, MouseEvent } from 'react';
import Colors from '../../../constants/Colors';

jest.mock(
  '../../LoadingSpinner',
  (): jest.Mock => jest.fn((): ReactNode => <div data-testid="loading-spinner"></div>)
);
jest.mock(
  '../../CardHeader',
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <div
          data-testid="card-header"
          onClick={(): void => props.handleSelection(CardHeaderItemOperationEnum.EDIT)}
        ></div>
      )
    )
);
jest.mock(
  '../../overview/ValueBox',
  (): jest.Mock => jest.fn((): ReactNode => <div data-testid="value-box"></div>)
);
jest.mock(
  './BudgetCardList',
  (): jest.Mock => jest.fn((): ReactNode => <div data-testid="budget-card-list"></div>)
);
jest.mock(
  '../../overlay/OverlayCardBox',
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <Fragment>
          <div data-testid="overlay-card-box" onClick={(): void => props.handleEvent()}>
            {props.children}
          </div>
          <div
            data-testid="overlay-card-box-close-form"
            onClick={(): void => props.onClose()}
          ></div>
        </Fragment>
      )
    )
);
const spendAmount: number = 100;
const newColorGreen: Color = Colors[0];
jest.mock(
  '../../overlay/OverlayContentEditBudget',
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <Fragment>
          <div
            data-testid="overlay-content-edit-budget"
            onClick={(e: MouseEvent): void => {
              e.stopPropagation();
              props.handleInputChange(spendAmount);
            }}
          ></div>
          <div
            data-testid="overlay-content-edit-budget-input-zero"
            onClick={(e: MouseEvent): void => {
              e.stopPropagation();
              props.handleInputChange(0);
            }}
          ></div>
          <div
            data-testid="overlay-content-edit-budget-color-change"
            onClick={(e: MouseEvent): void => {
              e.stopPropagation();
              props.propagateColorChange(newColorGreen);
            }}
          ></div>
        </Fragment>
      )
    )
);

jest.mock('../../../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../../../globals/utils/getColorObject', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../../../globals/services/BudgetService', () => ({
  __esModule: true,
  editBudget: jest.fn(),
}));

describe('BudgetCard', () => {
  const transactions: EPTransaction[] = mockedTransactionsEntertainmentWithPositiveAmounts;
  const fetchedBudgets: EPBudget[] = mockedBudgets;
  const budget: EPBudget = mockedBudget;
  const mockUpdatePage: jest.Mock = jest.fn();
  const isLoading: boolean = false;

  const testProps: {
    transactions: EPTransaction[];
    fetchedBudgets: EPBudget[];
    budget: EPBudget;
    updatePage: () => Promise<void>;
    isLoading: boolean;
  } = {
    transactions,
    fetchedBudgets,
    budget,
    updatePage: mockUpdatePage,
    isLoading,
  };

  let spent: number = 0;
  transactions.forEach((transaction: EPTransaction): void => {
    const amountToAdd: number = transaction.amount < 0 ? transaction.amount : 0;
    spent = spent + amountToAdd;
  });
  spent = spent * -1;

  const remaining: number = budget.maximum - spent;

  const budgetColor: Color = {
    name: budget.color,
    code: fromColorNameToCode(budget.color),
    displayName: fromColorNameToDisplayName(budget.color),
    disabled: false,
  };

  beforeEach((): void => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
    (getColorObject as jest.Mock).mockReturnValue(budgetColor);
    (editBudget as jest.Mock).mockReturnValue(undefined);
  });

  it('renders component LoadingSpinner when passed prop isLoading is true', () => {
    render(<BudgetCard {...testProps} isLoading={true} />);

    const component: HTMLElement = screen.getByTestId('loading-spinner');

    expect(component).toBeInTheDocument();
    expect(LoadingSpinner).toHaveBeenCalled();
  });

  it('does not render component LoadingSpinner when passed prop isLoading is false', () => {
    render(<BudgetCard {...testProps} isLoading={false} />);

    const component: HTMLElement | null = screen.queryByTestId('loading-spinner');

    expect(component).not.toBeInTheDocument();
    expect(LoadingSpinner).not.toHaveBeenCalled();
  });

  it('renders div budgetCard', () => {
    const { container } = render(<BudgetCard {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.budgetCard');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component CardHeader with passed prop budget', () => {
    render(<BudgetCard {...testProps} budget={budget} />);

    const component: HTMLElement = screen.getByTestId('card-header');

    expect(component).toBeInTheDocument();
    expect(CardHeader).toHaveBeenCalledWith(
      {
        color: budget.color,
        title: budget.category,
        itemName: CardHeaderItemNameEnum.BUDGET,
        handleSelection: expect.any(Function),
      },
      {}
    );
  });

  it('sets OverlayCardBox visible when handleSelection of CardHeader is triggered', async () => {
    render(<BudgetCard {...testProps} />);
    expect(OverlayCardBox).toHaveBeenLastCalledWith(
      expect.objectContaining({ isHidden: true }),
      {}
    );

    const component: HTMLElement = screen.getByTestId('card-header');
    fireEvent.click(component);

    expect(OverlayCardBox).toHaveBeenLastCalledWith(
      expect.objectContaining({ isHidden: false }),
      {}
    );
  });

  it('renders div budgetCardBar', () => {
    const { container } = render(<BudgetCard {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.budgetCardBar');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label budgetCardBarLabel with correct text', () => {
    const { container } = render(<BudgetCard {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.budgetCardBarLabel');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`Maximum of $${budget.maximum}`);
  });

  it('renders div budgetCardBarMax', () => {
    const { container } = render(<BudgetCard {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.budgetCardBarMax');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div budgetCardBarCurrent with passed prop budget.color and percentage style', () => {
    const { container } = render(<BudgetCard {...testProps} budget={budget} />);

    const htmlElement: HTMLElement | null = container.querySelector('.budgetCardBarCurrent');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass(budget.color);
    expect(htmlElement).toHaveAttribute('style', '--barCurrentWidthPercent: 25%;');
  });

  it('renders div budgetCardBarValues', () => {
    const { container } = render(<BudgetCard {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.budgetCardBarValues');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders components ValueBox with passed color and correct amounts', () => {
    render(<BudgetCard {...testProps} />);

    const components: HTMLElement[] = screen.getAllByTestId('value-box');

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
    render(<BudgetCard {...testProps} />);

    expect(ValueBox).toHaveBeenNthCalledWith(2, expect.objectContaining({ title: 'Free' }), {});
  });

  it('renders component ValueBox-Remaining with value 0 when spent amount is higher than maximum', () => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(true);
    render(<BudgetCard {...testProps} budget={{ ...budget, maximum: 5 }} />);

    expect(ValueBox).toHaveBeenNthCalledWith(2, expect.objectContaining({ value: 0 }), {});
  });

  it('renders component BudgetCardList with passed prop transactions', () => {
    render(<BudgetCard {...testProps} transactions={transactions} />);

    const component: HTMLElement = screen.getByTestId('budget-card-list');

    expect(component).toBeInTheDocument();
    expect(BudgetCardList).toHaveBeenCalledWith(
      { link: '../transactions?cat=entertainment', transactions },
      {}
    );
  });

  it('renders component OverlayCardBox', () => {
    render(<BudgetCard {...testProps} />);

    const component: HTMLElement = screen.getByTestId('overlay-card-box');

    expect(component).toBeInTheDocument();
    expect(OverlayCardBox).toHaveBeenCalledWith(
      {
        children: expect.any(Object),
        description: 'As your budgets change, feel free to update your spending limits.',
        handleEvent: expect.any(Function),
        isHidden: true,
        onClose: expect.any(Function),
        submitText: 'Save Changes',
        title: 'Edit Budget',
      },
      {}
    );
  });

  it('calls editBudget when handleEvent of OverlayCardBox is triggered', () => {
    render(<BudgetCard {...testProps} />);
    const editComponent = screen.getByTestId('overlay-content-edit-budget');
    fireEvent.click(editComponent);

    const component: HTMLElement = screen.getByTestId('overlay-card-box');
    fireEvent.click(component);

    expect(component).toBeInTheDocument();
    expect(editBudget).toHaveBeenCalledTimes(1);
    expect(editBudget).toHaveBeenCalledWith({
      ...budget,
      maximum: spendAmount,
    });
  });

  it('does not call editBudget when spendAmount is still 0', () => {
    render(<BudgetCard {...testProps} />);

    const component: HTMLElement = screen.getByTestId('overlay-card-box');
    fireEvent.click(component);

    expect(component).toBeInTheDocument();
    expect(editBudget).not.toHaveBeenCalled();
  });

  it('sets OverlayCardBox invisible when closeForm() of OverlayCardBox is triggered', async () => {
    render(<BudgetCard {...testProps} />);
    const header: HTMLElement = screen.getByTestId('card-header');
    fireEvent.click(header);
    expect(OverlayCardBox).toHaveBeenLastCalledWith(
      expect.objectContaining({ isHidden: false }),
      {}
    );

    const component: HTMLElement = screen.getByTestId('overlay-card-box-close-form');
    fireEvent.click(component);

    expect(OverlayCardBox).toHaveBeenLastCalledWith(
      expect.objectContaining({ isHidden: true }),
      {}
    );
  });

  it('renders component OverlayContentEditBudget', () => {
    render(<BudgetCard {...testProps} />);

    const component: HTMLElement = screen.getByTestId('overlay-content-edit-budget');

    expect(component).toBeInTheDocument();
    expect(OverlayContentEditBudget).toHaveBeenCalledWith(
      {
        budget,
        fetchedBudgets,
        handleInputChange: expect.any(Function),
        hasFormToGetAReset: false,
        hasValidInput: true,
        isHidden: true,
        propagateColorChange: expect.any(Function),
      },
      {}
    );
  });

  it('handles inputChange of OverlayContentEditBudget', () => {
    render(<BudgetCard {...testProps} />);
    expect(OverlayContentEditBudget).toHaveBeenCalledWith(
      expect.objectContaining({
        hasValidInput: true,
      }),
      {}
    );

    const component: HTMLElement = screen.getByTestId('overlay-content-edit-budget-input-zero');
    fireEvent.click(component);

    expect(OverlayContentEditBudget).toHaveBeenCalledWith(
      expect.objectContaining({
        hasValidInput: false,
      }),
      {}
    );
  });

  it('handles colorChange of OverlayContentEditBudget', () => {
    render(<BudgetCard {...testProps} />);
    const colorComponent: HTMLElement = screen.getByTestId(
      'overlay-content-edit-budget-color-change'
    );
    fireEvent.click(colorComponent);
    const editComponent: HTMLElement = screen.getByTestId('overlay-content-edit-budget');
    fireEvent.click(editComponent);

    const component: HTMLElement = screen.getByTestId('overlay-card-box');
    fireEvent.click(component);

    expect(editBudget).not.toHaveBeenCalledWith({
      ...budget,
      color: budget.color,
    });
    expect(editBudget).toHaveBeenCalledWith({
      ...budget,
      color: newColorGreen.name,
    });
  });
});
