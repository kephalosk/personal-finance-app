import { fireEvent, render, screen } from '@testing-library/react';
import BudgetsPage from './BudgetsPage';
import { getTransactions } from '../globals/services/TransactionService';
import { mockedTransactions } from '../fixtures/MockedTransactions';
import { act } from 'react';
import { getBudgets } from '../globals/services/BudgetService';
import { mockedBudgets } from '../fixtures/MockedBudgets';
import HeaderBar from '../components/HeaderBar';
import { BudgetsDiagramCard } from '../components/budgets/BudgetDiagrammCard/BudgetsDiagramCard';
import { BudgetCard } from '../components/budgets/BudgetCard/BudgetCard';
import OverlayCardBox from '../components/overlay/OverlayCardBox';
import OverlayContentAddNewBudget from '../components/overlay/OverlayContentAddNewBudget';
import EnsureFirstPossibleColorIsDefined from '../globals/utils/EnsureFirstPossibleColorIsDefined';
import Colors from '../constants/Colors';

jest.mock('../components/HeaderBar', () =>
  jest.fn((props) => <div data-testid="header-bar" onClick={() => props.handleClick()}></div>)
);
jest.mock('../components/budgets/BudgetDiagrammCard/BudgetsDiagramCard', () => ({
  BudgetsDiagramCard: jest.fn(() => <div data-testid="budgets-diagram-card"></div>),
}));
jest.mock('../components/budgets/BudgetCard/BudgetCard', () => ({
  BudgetCard: jest.fn(() => <div data-testid="budget-card"></div>),
}));
jest.mock('../components/overlay/OverlayCardBox', () =>
  jest.fn((props) => (
    <div
      data-testid="overlay-card-box"
      onClick={() => {
        props.onClose();
        props.handleEvent();
      }}
    >
      {props.children}
    </div>
  ))
);
const newCategory = 'newCategory';
const newColor = Colors[4];
jest.mock('../components/overlay/OverlayContentAddNewBudget', () =>
  jest.fn((props) => (
    <div
      data-testid="overlay-content-add-new-budget"
      onClick={props.handleCategoryChange(newCategory)}
    >
      <div
        data-testid="overlay-content-add-new-budget-second"
        onClick={props.handleColorChange(newColor)}
      ></div>
    </div>
  ))
);

jest.mock('../globals/services/TransactionService', () => ({
  getTransactions: jest.fn(),
}));
jest.mock('../globals/services/BudgetService', () => ({
  getBudgets: jest.fn(),
}));

jest.mock('../globals/utils/EnsureFirstPossibleColorIsDefined', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('BudgetsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getTransactions as jest.Mock).mockResolvedValue(mockedTransactions);
    (getBudgets as jest.Mock).mockResolvedValue(mockedBudgets);
    (EnsureFirstPossibleColorIsDefined as jest.Mock).mockReturnValue(Colors[0]);
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
      { isLoading: false, budget: mockedBudgets[0], transactions: mockedTransactions },
      {}
    );
    expect(BudgetCard).toHaveBeenNthCalledWith(
      2,
      { isLoading: false, budget: mockedBudgets[1], transactions: mockedTransactions },
      {}
    );
  });

  it('renders component OverlayCardBox', async () => {
    await act(async () => {
      render(<BudgetsPage />);
    });
    expect(OverlayCardBox).not.toHaveBeenCalledWith(
      {
        children: expect.any(Object),
        description: expect.any(String),
        handleEvent: expect.any(Function),
        isHidden: false,
        onClose: expect.any(Function),
        submitText: expect.any(String),
        title: expect.any(String),
      },
      {}
    );

    const headerBar = screen.getByTestId('header-bar');
    fireEvent.click(headerBar!);
    const component = screen.getByTestId('overlay-card-box');

    expect(component).toBeInTheDocument();
    expect(OverlayCardBox).toHaveBeenCalledWith(
      {
        children: expect.any(Object),
        description:
          'Choose a category to set a spending budget. These categories can help you monitor spending.',
        handleEvent: expect.any(Function),
        isHidden: false,
        onClose: expect.any(Function),
        submitText: 'Save Changes',
        title: 'Add New Budget',
      },
      {}
    );
  });

  it('sets status of OverlayCardBox back to hidden when component is closed', async () => {
    await act(async () => {
      render(<BudgetsPage />);
    });
    const headerBar = screen.getByTestId('header-bar');
    fireEvent.click(headerBar!);
    const component = screen.getByTestId('overlay-card-box');
    expect(component).toBeInTheDocument();
    expect(OverlayCardBox).toHaveBeenLastCalledWith(
      {
        children: expect.any(Object),
        description:
          'Choose a category to set a spending budget. These categories can help you monitor spending.',
        handleEvent: expect.any(Function),
        isHidden: false,
        onClose: expect.any(Function),
        submitText: 'Save Changes',
        title: 'Add New Budget',
      },
      {}
    );

    const cardBox = screen.getByTestId('overlay-card-box');
    fireEvent.click(cardBox!);

    expect(OverlayCardBox).toHaveBeenLastCalledWith(
      {
        children: expect.any(Object),
        description:
          'Choose a category to set a spending budget. These categories can help you monitor spending.',
        handleEvent: expect.any(Function),
        isHidden: true,
        onClose: expect.any(Function),
        submitText: 'Save Changes',
        title: 'Add New Budget',
      },
      {}
    );
  });

  it('renders component OverlayContentAddNewBudget', async () => {
    await act(async () => {
      render(<BudgetsPage />);
    });

    const headerBar = screen.getByTestId('header-bar');
    fireEvent.click(headerBar!);
    const component = screen.getByTestId('overlay-content-add-new-budget');

    expect(component).toBeInTheDocument();
    expect(OverlayContentAddNewBudget).toHaveBeenCalledWith(
      {
        colors: expect.any(Array),
        handleCategoryChange: expect.any(Function),
        handleColorChange: expect.any(Function),
        selectedCategoryItem: 'General',
        selectedColorItem: expect.any(Object),
      },
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
      {
        colors: expect.any(Array),
        handleCategoryChange: expect.any(Function),
        handleColorChange: expect.any(Function),
        selectedCategoryItem: newCategory,
        selectedColorItem: expect.any(Object),
      },
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
      {
        colors: expect.any(Array),
        handleCategoryChange: expect.any(Function),
        handleColorChange: expect.any(Function),
        selectedCategoryItem: expect.any(String),
        selectedColorItem: newColor,
      },
      {}
    );
  });

  it('handles addNewBudget', async () => {
    await act(async () => {
      render(<BudgetsPage />);
    });

    const headerBar = screen.getByTestId('header-bar');
    fireEvent.click(headerBar!);
    const component = screen.getByTestId('overlay-card-box');
    fireEvent.click(component!);

    expect(component).toBeInTheDocument();
    //TODO: implement fe-23-add-new-budget-part2
  });
});
