import { fireEvent, render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { Color } from '../../model/Color';
import { EPBudget } from '../../model/entrypoints/EPBudget';
import { mockedBudgets } from '../../fixtures/MockedBudgets';
import Colors from '../../constants/Colors';
import OverlayContentEditBudget from './OverlayContentEditBudget';
import OverlayContentLabel from '../atoms/OverlayContentLabel';
import OverlayDropdownCategory from './dropdownCategory/OverlayDropdownCategory';
import InputMoney from '../atoms/InputMoney';
import OverlayDropdownColor from './OverlayDropdownColor';
import getColorObject from '../../globals/utils/getColorObject';

jest.mock(
  '../atoms/OverlayContentLabel',
  (): jest.Mock => jest.fn((): ReactNode => <div data-testid="overlay-content-label"></div>)
);
jest.mock(
  './dropdownCategory/OverlayDropdownCategory',
  (): jest.Mock =>
    jest.fn(
      (props: { handleCategoryChange: () => void }): ReactNode => (
        <div data-testid="dropdown-category" onClick={() => props.handleCategoryChange()}></div>
      )
    )
);
const budget: EPBudget = mockedBudgets[0];
jest.mock(
  '../atoms/InputMoney',
  (): jest.Mock =>
    jest.fn(
      (props: { handleInputChange: (input: number) => void }): ReactNode => (
        <div
          data-testid="input-money"
          onClick={() => props.handleInputChange(budget.maximum)}
        ></div>
      )
    )
);
const budgetFilteredColors: Color[] = Colors.filter((color: Color): boolean => {
  return color.name === budget.color;
});
const color: Color = budgetFilteredColors[0];
jest.mock(
  './OverlayDropdownColor',
  (): jest.Mock =>
    jest.fn(
      (props: { handleColorChange: (color: Color) => void }): ReactNode => (
        <div data-testid="dropdown-color" onClick={() => props.handleColorChange(color)}></div>
      )
    )
);

jest.mock(
  '../../globals/utils/getColorObject',
  (): { __esModule: boolean; default: jest.Mock } => ({
    __esModule: true,
    default: jest.fn(),
  })
);

describe('OverlayContentEditBudget', () => {
  const fetchedBudgets: EPBudget[] = mockedBudgets;
  const mockHandleInputChange: jest.Mock = jest.fn();
  const mockPropagateColorChange: jest.Mock = jest.fn();
  const isHidden: boolean = true;
  const hasValidInput: boolean = true;
  const hasFormToGetAReset: boolean = false;

  const testProps: {
    fetchedBudgets: EPBudget[];
    budget: EPBudget;
    handleInputChange: (input: number) => void;
    propagateColorChange: (color: Color) => void;
    isHidden: boolean;
    hasValidInput: boolean;
    hasFormToGetAReset: boolean;
  } = {
    fetchedBudgets,
    budget,
    handleInputChange: mockHandleInputChange,
    propagateColorChange: mockPropagateColorChange,
    isHidden,
    hasValidInput,
    hasFormToGetAReset,
  };

  const titleCategory: string = 'Budget Category';
  const titleMoney: string = `Maximum Spend (current Maximum: $${budget.maximum})`;
  const titleColor: string = 'Theme';

  beforeEach((): void => {
    jest.clearAllMocks();
    (getColorObject as jest.Mock).mockReturnValue(color);
  });

  it('renders div overlayContentEditBudget', () => {
    const { container } = render(<OverlayContentEditBudget {...testProps} />);

    const element: HTMLElement | null = container.querySelector('.overlayContentEditBudget');

    expect(element).toBeInTheDocument();
  });

  it('renders components OverlayContentLabel', () => {
    render(<OverlayContentEditBudget {...testProps} />);

    const components: HTMLElement[] = screen.getAllByTestId('overlay-content-label');

    expect(components).toHaveLength(3);
    expect(OverlayContentLabel).toHaveBeenNthCalledWith(1, { title: titleCategory }, {});
    expect(OverlayContentLabel).toHaveBeenNthCalledWith(2, { title: titleMoney }, {});
    expect(OverlayContentLabel).toHaveBeenNthCalledWith(3, { title: titleColor }, {});
  });

  it('renders div overlayContentEditBudgetNotAllowed', () => {
    const { container } = render(<OverlayContentEditBudget {...testProps} />);

    const element: HTMLElement | null = container.querySelector(
      '.overlayContentEditBudgetNotAllowed'
    );

    expect(element).toBeInTheDocument();
  });

  it('renders div overlayContentEditBudgetNoEvents', () => {
    const { container } = render(<OverlayContentEditBudget {...testProps} />);

    const element: HTMLElement | null = container.querySelector(
      '.overlayContentEditBudgetNoEvents'
    );

    expect(element).toBeInTheDocument();
  });

  it('renders component OverlayDropdownCategory', () => {
    render(<OverlayContentEditBudget {...testProps} />);

    const component: HTMLElement = screen.getByTestId('dropdown-category');

    expect(component).toBeInTheDocument();
    expect(OverlayDropdownCategory).toHaveBeenCalledWith(
      {
        selectedItem: { name: budget.category, key: budget.categoryKey, disabled: false },
        budgetCategories: [],
        handleCategoryChange: expect.any(Function),
        isDisabled: true,
      },
      {}
    );
  });

  it('does not do anything when OverlayDropdownCategory handleCategoryChange is triggered', () => {
    render(<OverlayContentEditBudget {...testProps} />);
    jest.clearAllMocks();

    const component: HTMLElement = screen.getByTestId('dropdown-category');
    fireEvent.click(component);

    expect(mockHandleInputChange).not.toHaveBeenCalled();
    expect(mockPropagateColorChange).not.toHaveBeenCalled();
    expect(OverlayContentLabel).not.toHaveBeenCalled();
    expect(OverlayDropdownCategory).not.toHaveBeenCalled();
    expect(InputMoney).not.toHaveBeenCalled();
    expect(OverlayDropdownColor).not.toHaveBeenCalled();
    expect(getColorObject).not.toHaveBeenCalled();
  });

  it('renders component InputMoney with passed props hasValidInput, budget.maximum and handleInputChange', () => {
    render(<OverlayContentEditBudget {...testProps} />);

    const component: HTMLElement = screen.getByTestId('input-money');

    expect(component).toBeInTheDocument();
    expect(InputMoney).toHaveBeenCalledWith(
      {
        handleInputChange: mockHandleInputChange,
        hasValidInput,
        initialValue: budget.maximum.toString(),
        isLimitInput: true,
      },
      {}
    );
  });

  it('handels inputChange of InputMoney', () => {
    render(<OverlayContentEditBudget {...testProps} />);

    const component: HTMLElement = screen.getByTestId('input-money');
    fireEvent.click(component);

    expect(component).toBeInTheDocument();
    expect(mockHandleInputChange).toHaveBeenCalledWith(budget.maximum);
  });

  it('renders component OverlayDropdownColor with passed prop budget.color', () => {
    render(<OverlayContentEditBudget {...testProps} />);

    const component: HTMLElement = screen.getByTestId('dropdown-color');

    expect(component).toBeInTheDocument();
    expect(OverlayDropdownColor).toHaveBeenLastCalledWith(
      { colors: expect.any(Array), handleColorChange: expect.any(Function), selectedColor: color },
      {}
    );
  });

  it('handels colorChange of OverlayDropdownColor', () => {
    render(<OverlayContentEditBudget {...testProps} />);

    const component: HTMLElement = screen.getByTestId('dropdown-color');
    fireEvent.click(component);

    expect(component).toBeInTheDocument();
    expect(mockPropagateColorChange).toHaveBeenCalledWith(color);
  });
});
