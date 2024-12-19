import { fireEvent, render, screen } from '@testing-library/react';
import React, { forwardRef, useImperativeHandle } from 'react';
import OverlayContentAddNewBudget from './OverlayContentAddNewBudget';
import { Color } from '../../model/Color';
import Colors from '../../constants/Colors';
import OverlayDropdownColor from './OverlayDropdownColor';
import OverlayDropdownCategory from './dropdownCategory/OverlayDropdownCategory';
import { mockedBudgetCategories } from '../../fixtures/MockedBudgetCategory';
import { BudgetCategory } from '../../model/BudgetCategory';

jest.mock('./dropdownCategory/OverlayDropdownCategory', () =>
  jest.fn((props) => (
    <div data-testid="dropdown-category" onClick={props.handleCategoryChange}></div>
  ))
);
const mockReset = jest.fn();
jest.mock('../atoms/InputMoney', () => {
  const MockInputMoney = forwardRef(
    (props: { handleInputChange: (input: string) => void }, ref) => {
      const { handleInputChange, ...rest } = props;

      useImperativeHandle(ref, () => ({
        reset: mockReset,
      }));

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(event.target.value);
      };

      return <input {...rest} data-testid="input-money" onChange={handleChange} />;
    }
  );

  MockInputMoney.displayName = 'InputMoney';

  return MockInputMoney;
});
jest.mock('./OverlayDropdownColor', () => jest.fn(() => <div data-testid="dropdown-color"></div>));

describe('OverlayContentAddNewBudget', () => {
  const selectedCategoryItem = mockedBudgetCategories[0];
  const mockHandleCategoryChange = jest.fn();
  const selectedColorItem: Color = Colors[0];
  const mockHandleColorChange = jest.fn();
  const mockHandleInputChange = jest.fn();
  const colors = Colors;
  const budgetCategories: BudgetCategory[] = mockedBudgetCategories;
  const isHidden = false;
  const hasValidInput = true;

  const testProps = {
    selectedCategoryItem,
    handleCategoryChange: mockHandleCategoryChange,
    selectedColorItem,
    handleColorChange: mockHandleColorChange,
    handleInputChange: mockHandleInputChange,
    colors,
    budgetCategories,
    isHidden,
    hasValidInput,
  };

  it('renders component OverlayDropdownCategory', async () => {
    render(<OverlayContentAddNewBudget {...testProps} />);

    const component = screen.getByTestId('dropdown-category');

    expect(component).toBeInTheDocument();
    expect(OverlayDropdownCategory).toHaveBeenCalledWith(
      {
        budgetCategories: mockedBudgetCategories,
        handleCategoryChange: expect.any(Function),
        selectedItem: mockedBudgetCategories[0],
      },
      {}
    );
  });

  it('calls handleCategoryChange when OverlayDropdownCategory handleCategoryChange is triggered', async () => {
    render(<OverlayContentAddNewBudget {...testProps} />);

    const component = screen.getByTestId('dropdown-category');
    fireEvent.click(component);

    expect(mockHandleCategoryChange).toHaveBeenCalled();
  });

  it('renders component InputMoney', async () => {
    render(<OverlayContentAddNewBudget {...testProps} />);

    const component = screen.getByTestId('input-money');

    expect(component).toBeInTheDocument();
  });

  it('handles input change of InputMoney', async () => {
    render(<OverlayContentAddNewBudget {...testProps} />);

    const component = screen.getByTestId('input-money');
    fireEvent.change(component, { target: { value: '1000' } });

    expect(mockHandleInputChange).toHaveBeenCalledWith('1000');
  });

  it('resets InputMoney when passed prop isHidden changes', async () => {
    const { rerender } = render(<OverlayContentAddNewBudget {...testProps} />);

    rerender(<OverlayContentAddNewBudget {...testProps} isHidden={true} />);

    expect(mockReset).toHaveBeenCalled();
  });

  it('renders component OverlayDropdownColor', async () => {
    render(<OverlayContentAddNewBudget {...testProps} />);

    const component = screen.getByTestId('dropdown-color');

    expect(component).toBeInTheDocument();
  });

  it('passes selectedColorItem prop to OverlayDropdownColor', async () => {
    render(<OverlayContentAddNewBudget {...testProps} />);

    expect(OverlayDropdownColor).toHaveBeenCalledWith(
      expect.objectContaining({
        selectedColor: selectedColorItem,
      }),
      {}
    );
  });

  it('passes handleColorChange callback to OverlayDropdownColor', async () => {
    render(<OverlayContentAddNewBudget {...testProps} />);

    expect(OverlayDropdownColor).toHaveBeenCalledWith(
      expect.objectContaining({
        handleColorChange: mockHandleColorChange,
      }),
      {}
    );
  });

  it('passes colors prop to OverlayDropdownColor', () => {
    render(<OverlayContentAddNewBudget {...testProps} />);

    expect(OverlayDropdownColor).toHaveBeenCalledWith(
      expect.objectContaining({
        colors,
      }),
      {}
    );
  });
});
