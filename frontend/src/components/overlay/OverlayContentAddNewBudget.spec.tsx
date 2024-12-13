import { fireEvent, render, screen } from '@testing-library/react';
import React, { forwardRef, ReactNode, useImperativeHandle } from 'react';
import OverlayContentAddNewBudget from './OverlayContentAddNewBudget';
import { Color } from '../../model/Color';
import Colors from '../../constants/Colors';
import OverlayDropdownColor from './OverlayDropdownColor';
import OverlayDropdownCategory from './OverlayDropdownCategory';

jest.mock('./OverlayDropdownCategory', () =>
  jest.fn(() => <div data-testid="dropdown-category"></div>)
);
const mockReset = jest.fn();
jest.mock('../atoms/InputMoney', () => {
  const MockInputMoney = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
      reset: mockReset,
    }));

    return <input {...props} data-testid="input-money" />;
  });

  MockInputMoney.displayName = 'InputMoney';

  return MockInputMoney;
});
jest.mock('./OverlayDropdownColor', () => jest.fn(() => <div data-testid="dropdown-color"></div>));

describe('OverlayContentAddNewBudget', () => {
  const selectedCategoryItem = 'General';
  const mockHandleCategoryChange = jest.fn();
  const selectedColorItem: Color = Colors[0];
  const mockHandleColorChange = jest.fn();
  const colors = Colors;
  const isHidden = false;

  const testProps = {
    selectedCategoryItem,
    handleCategoryChange: mockHandleCategoryChange,
    selectedColorItem,
    handleColorChange: mockHandleColorChange,
    colors,
    isHidden,
  };

  it('renders component OverlayDropdownCategory', async () => {
    render(<OverlayContentAddNewBudget {...testProps} />);

    const component = screen.getByTestId('dropdown-category');

    expect(component).toBeInTheDocument();
  });

  it('passes selectedCategoryItem to OverlayDropdownCategory', async () => {
    render(<OverlayContentAddNewBudget {...testProps} />);

    expect(OverlayDropdownCategory).toHaveBeenCalledWith(
      expect.objectContaining({
        selectedItem: selectedCategoryItem,
      }),
      {}
    );
  });

  it('passes handleCategoryChange callback to OverlayDropdownCategory', async () => {
    render(<OverlayContentAddNewBudget {...testProps} />);

    expect(OverlayDropdownCategory).toHaveBeenCalledWith(
      expect.objectContaining({
        handleCategoryChange: mockHandleCategoryChange,
      }),
      {}
    );
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

    //TODO fe-23-add-new-budget-part2: expect(component)...
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
