import { fireEvent, render, screen } from '@testing-library/react';
import BudgetsPage from './BudgetsPage';
import { getTransactions } from '../globals/services/TransactionService';
import { mockedTransactions } from '../fixtures/MockedTransactions';
import { act, Fragment } from 'react';
import { addNewBudget, getBudgets } from '../globals/services/BudgetService';
import { mockedBudgets, mockedBudgetsWithEveryCategory } from '../fixtures/MockedBudgets';
import HeaderBar from '../components/HeaderBar';
import BudgetsDiagramCard from '../components/budgets/BudgetDiagrammCard/BudgetsDiagramCard';
import BudgetCard from '../components/budgets/BudgetCard/BudgetCard';
import OverlayCardBox from '../components/overlay/OverlayCardBox';
import OverlayContentAddNewBudget from '../components/overlay/OverlayContentAddNewBudget';
import EnsureFirstPossibleColorIsDefined from '../globals/utils/EnsureFirstPossibleColorIsDefined';
import Colors from '../constants/Colors';
import { ColorNameEnum } from '../model/enum/ColorNameEnum';
import { mockedBudgetCategory } from '../fixtures/MockedBudgetCategory';
import EnsureFirstPossibleItemIsDefined from '../globals/utils/EnsureFirstPossibleItemIsDefined';

jest.mock('../components/HeaderBar', () =>
  jest.fn((props) => <div data-testid="header-bar" onClick={() => props.handleClick()}></div>)
);
jest.mock('../components/budgets/BudgetDiagrammCard/BudgetsDiagramCard', () =>
  jest.fn(() => <div data-testid="budgets-diagram-card"></div>)
);
jest.mock('../components/budgets/BudgetCard/BudgetCard', () =>
  jest.fn(() => <div data-testid="budget-card"></div>)
);
jest.mock('../components/overlay/OverlayCardBox', () =>
  jest.fn((props) => (
    <div
      data-testid="overlay-card-box"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (props.onClose) props.onClose();
          if (props.handleEvent) props.handleEvent();
        }
      }}
    >
      {props.children}
    </div>
  ))
);
const newCategory = mockedBudgetCategory;
const newColor = Colors[4];
const newInput = 100;
const newInputInvalid = 0;
jest.mock('../components/overlay/OverlayContentAddNewBudget', () =>
  jest.fn((props) => (
    <Fragment>
      <div
        data-testid="overlay-content-add-new-budget"
        onClick={() => props.handleCategoryChange(newCategory)}
      ></div>
      <div
        data-testid="overlay-content-add-new-budget-second"
        onClick={() => props.handleColorChange(newColor)}
      ></div>
      <div
        data-testid="overlay-content-add-new-budget-input"
        onClick={() => props.handleInputChange(newInput)}
      ></div>
      <div
        data-testid="overlay-content-add-new-budget-input-invalid"
        onClick={() => props.handleInputChange(newInputInvalid)}
      ></div>
    </Fragment>
  ))
);

jest.mock('../globals/services/TransactionService', () => ({
  getTransactions: jest.fn(),
}));

jest.mock('../globals/services/BudgetService', () => ({
  getBudgets: jest.fn(),
  addNewBudget: jest.fn(),
}));

jest.mock('../globals/utils/EnsureFirstPossibleColorIsDefined', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../globals/utils/EnsureFirstPossibleItemIsDefined', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('BudgetsPage', () => {
  const overlayCardBoxProps = {
    title: 'Add New Budget',
    description:
      'Choose a category to set a spending budget. These categories can help you monitor spending.',
    submitText: 'Add Budget',
    isHidden: false,
    handleEvent: expect.any(Function),
    onClose: expect.any(Function),
    children: expect.any(Object),
    isButtonDisabled: false,
  };

  const triggerAddNewBudget = () => {
    const headerBar = screen.getByTestId('header-bar');
    fireEvent.click(headerBar!);
    const input = screen.getByTestId('overlay-content-add-new-budget-input');
    fireEvent.click(input!);
    const component = screen.getByTestId('overlay-card-box');
    fireEvent.click(component!);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getTransactions as jest.Mock).mockResolvedValue(mockedTransactions);
    (getBudgets as jest.Mock).mockResolvedValue(mockedBudgets);
    (addNewBudget as jest.Mock).mockResolvedValue(undefined);
    (EnsureFirstPossibleColorIsDefined as jest.Mock).mockReturnValue(Colors[0]);
    (EnsureFirstPossibleItemIsDefined as jest.Mock).mockReturnValue(mockedBudgetCategory);
  });

  it('renders div budgetsPage', async () => {
    const cut = await act(async () => {
      const { container } = render(<BudgetsPage />);
      return container;
    });

    const htmlElement = cut.querySelector('.budgetsPage');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component HeaderBar', async () => {
    await act(async () => {
      render(<BudgetsPage />);
    });

    const component = screen.getByTestId('header-bar');

    expect(component).toBeInTheDocument();
    expect(HeaderBar).toHaveBeenCalledWith(
      { buttonText: '+ Add New Budget', h1Headline: 'Budgets', handleClick: expect.any(Function) },
      {}
    );
  });

  it('renders div budgetsDetails', async () => {
    const cut = await act(async () => {
      const { container } = render(<BudgetsPage />);
      return container;
    });

    const htmlElement = cut.querySelector('.budgetsDetails');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div budgetsDetailsLeft', async () => {
    const cut = await act(async () => {
      const { container } = render(<BudgetsPage />);
      return container;
    });

    const htmlElement = cut.querySelector('.budgetsDetailsLeft');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BudgetsDiagramCard', async () => {
    await act(async () => {
      render(<BudgetsPage />);
    });

    const component = screen.getByTestId('budgets-diagram-card');

    expect(component).toBeInTheDocument();
    expect(BudgetsDiagramCard).toHaveBeenNthCalledWith(
      1,
      { isLoading: true, budgets: [], transactions: [] },
      {}
    );
    expect(BudgetsDiagramCard).toHaveBeenLastCalledWith(
      { isLoading: false, budgets: mockedBudgets, transactions: mockedTransactions },
      {}
    );
  });

  it('renders div budgetsDetailsRight', async () => {
    const cut = await act(async () => {
      const { container } = render(<BudgetsPage />);
      return container;
    });

    const htmlElement = cut.querySelector('.budgetsDetailsRight');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BudgetCard', async () => {
    await act(async () => {
      render(<BudgetsPage />);
    });

    const components = screen.getAllByTestId('budget-card');

    expect(components).toHaveLength(2);
    expect(BudgetCard).toHaveBeenNthCalledWith(
      1,
      {
        isLoading: false,
        budget: mockedBudgets[0],
        transactions: mockedTransactions,
        updatePage: expect.any(Function),
      },
      {}
    );
    expect(BudgetCard).toHaveBeenNthCalledWith(
      2,
      {
        isLoading: false,
        budget: mockedBudgets[1],
        transactions: mockedTransactions,
        updatePage: expect.any(Function),
      },
      {}
    );
  });

  it('renders component OverlayCardBox', async () => {
    await act(async () => {
      render(<BudgetsPage />);
    });
    expect(OverlayCardBox).not.toHaveBeenCalledWith();

    const headerBar = screen.getByTestId('header-bar');
    fireEvent.click(headerBar!);
    const component = screen.getByTestId('overlay-card-box');

    expect(component).toBeInTheDocument();
    expect(OverlayCardBox).toHaveBeenCalledWith(overlayCardBoxProps, {});
  });

  it('sets status of OverlayCardBox back to hidden when component is closed', async () => {
    await act(async () => {
      render(<BudgetsPage />);
    });
    const headerBar = screen.getByTestId('header-bar');
    fireEvent.click(headerBar!);
    const component = screen.getByTestId('overlay-card-box');
    expect(component).toBeInTheDocument();
    expect(OverlayCardBox).toHaveBeenLastCalledWith(overlayCardBoxProps, {});

    const cardBox = screen.getByTestId('overlay-card-box');
    fireEvent.click(cardBox!);

    expect(OverlayCardBox).toHaveBeenLastCalledWith({ ...overlayCardBoxProps, isHidden: true }, {});
  });

  it('renders component OverlayContentAddNewBudget', async () => {
    await act(async () => {
      render(<BudgetsPage />);
    });

    const headerBar = screen.getByTestId('header-bar');
    fireEvent.click(headerBar!);
    const component = screen.getByTestId('overlay-content-add-new-budget');

    expect(component).toBeInTheDocument();
    expect(OverlayContentAddNewBudget).toHaveBeenLastCalledWith(
      expect.objectContaining({ selectedCategoryItem: mockedBudgetCategory }),
      {}
    );
  });

  it('handles Category change of OverlayContentAddNewBudget', async () => {
    await act(async () => {
      render(<BudgetsPage />);
    });

    const headerBar = screen.getByTestId('header-bar');
    fireEvent.click(headerBar!);
    const component = screen.getByTestId('overlay-content-add-new-budget');
    fireEvent.click(component!);

    expect(component).toBeInTheDocument();
    expect(OverlayContentAddNewBudget).toHaveBeenLastCalledWith(
      expect.objectContaining({ selectedCategoryItem: newCategory }),
      {}
    );
  });

  it('handles Color change of OverlayContentAddNewBudget', async () => {
    await act(async () => {
      render(<BudgetsPage />);
    });

    const headerBar = screen.getByTestId('header-bar');
    fireEvent.click(headerBar!);
    const component = screen.getByTestId('overlay-content-add-new-budget-second');
    fireEvent.click(component!);

    expect(component).toBeInTheDocument();
    expect(OverlayContentAddNewBudget).toHaveBeenLastCalledWith(
      expect.objectContaining({ selectedColorItem: newColor }),
      {}
    );
  });

  it('handles input change of OverlayContentAddNewBudget', async () => {
    await act(async () => {
      render(<BudgetsPage />);
    });
    const headerBar = screen.getByTestId('header-bar');
    fireEvent.click(headerBar!);
    expect(OverlayContentAddNewBudget).toHaveBeenLastCalledWith(
      expect.objectContaining({ hasValidInput: true }),
      {}
    );

    const component = screen.getByTestId('overlay-content-add-new-budget-input-invalid');
    fireEvent.click(component!);

    expect(component).toBeInTheDocument();
    expect(OverlayContentAddNewBudget).toHaveBeenLastCalledWith(
      expect.objectContaining({ hasValidInput: false }),
      {}
    );
  });

  it('handles addNewBudget', async () => {
    await act(async () => {
      render(<BudgetsPage />);
    });

    triggerAddNewBudget();

    expect(addNewBudget).toHaveBeenCalledWith({
      category: 'General',
      categoryKey: 'general',
      color: ColorNameEnum.GREEN,
      maximum: 100,
    });
  });

  it('does not add new Budget, when no category is left', async () => {
    (getBudgets as jest.Mock).mockResolvedValue(mockedBudgetsWithEveryCategory);
    (EnsureFirstPossibleItemIsDefined as jest.Mock).mockReturnValue({
      ...mockedBudgetCategory,
      disabled: true,
    });
    await act(async () => {
      render(<BudgetsPage />);
    });

    triggerAddNewBudget();

    expect(addNewBudget).not.toHaveBeenCalled();
  });
});
