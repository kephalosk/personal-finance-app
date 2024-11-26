import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import OverlayContentAddNewBudget from './OverlayContentAddNewBudget';

describe('OverlayContentAddNewBudget', () => {
  const selectedItem = 'General';
  const handleCategoryChange = jest.fn();
  const testProps = {
    selectedItem,
    handleCategoryChange,
  };
  it('renders component OverlayDropdownCategory', async () => {
    render(
      <MemoryRouter>
        <OverlayContentAddNewBudget {...testProps} />
      </MemoryRouter>
    );

    const component = screen.getByTestId('dropdown-category');

    expect(component).toBeInTheDocument();
  });
});
