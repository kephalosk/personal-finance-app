import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import OverlayContentAddNewBudget from './OverlayContentAddNewBudget';
import { ReactFutureFlags } from '../../constants/ReactFutureFlags';
import { Color } from '../../model/Color';
import Colors from '../../constants/Colors';
import OverlayDropdownColor from './OverlayDropdownColor';
import OverlayDropdownCategory from './OverlayDropdownCategory';

jest.mock('./OverlayDropdownCategory', () =>
  jest.fn(() => <div data-testid="dropdown-category"></div>)
);
jest.mock('./OverlayDropdownColor', () => jest.fn(() => <div data-testid="dropdown-color"></div>));

describe('OverlayContentAddNewBudget', () => {
  const selectedCategoryItem = 'General';
  const mockHandleCategoryChange = jest.fn();
  const selectedColorItem: Color = Colors[0];
  const mockHandleColorChange = jest.fn();
  const colors = Colors;
  const testProps = {
    selectedCategoryItem,
    handleCategoryChange: mockHandleCategoryChange,
    selectedColorItem,
    handleColorChange: mockHandleColorChange,
    colors,
  };

  it('renders component OverlayDropdownCategory', async () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverlayContentAddNewBudget {...testProps} />
      </MemoryRouter>
    );

    const component = screen.getByTestId('dropdown-category');

    expect(component).toBeInTheDocument();
  });

  it('passes selectedCategoryItem to OverlayDropdownCategory', async () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverlayContentAddNewBudget {...testProps} />
      </MemoryRouter>
    );

    expect(OverlayDropdownCategory).toHaveBeenCalledWith(
      expect.objectContaining({
        selectedItem: selectedCategoryItem,
      }),
      {}
    );
  });

  it('passes handleCategoryChange callback to OverlayDropdownCategory', async () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverlayContentAddNewBudget {...testProps} />
      </MemoryRouter>
    );

    expect(OverlayDropdownCategory).toHaveBeenCalledWith(
      expect.objectContaining({
        handleCategoryChange: mockHandleCategoryChange,
      }),
      {}
    );
  });

  it('renders component OverlayDropdownColor', async () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverlayContentAddNewBudget {...testProps} />
      </MemoryRouter>
    );

    const component = screen.getByTestId('dropdown-color');

    expect(component).toBeInTheDocument();
  });

  it('passes selectedColorItem prop to OverlayDropdownColor', async () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverlayContentAddNewBudget {...testProps} />
      </MemoryRouter>
    );

    expect(OverlayDropdownColor).toHaveBeenCalledWith(
      expect.objectContaining({
        selectedColor: selectedColorItem,
      }),
      {}
    );
  });

  it('passes handleColorChange callback to OverlayDropdownColor', async () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverlayContentAddNewBudget {...testProps} />
      </MemoryRouter>
    );

    expect(OverlayDropdownColor).toHaveBeenCalledWith(
      expect.objectContaining({
        handleColorChange: mockHandleColorChange,
      }),
      {}
    );
  });

  it('passes colors prop to OverlayDropdownColor', () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <OverlayContentAddNewBudget {...testProps} />
      </MemoryRouter>
    );

    expect(OverlayDropdownColor).toHaveBeenCalledWith(
      expect.objectContaining({
        colors,
      }),
      {}
    );
  });
});