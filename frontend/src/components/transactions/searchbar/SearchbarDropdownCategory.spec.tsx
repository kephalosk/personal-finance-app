import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { SearchbarDropdownCategory } from './SearchbarDropdownCategory';

describe('searchbarDropdownCategory', () => {
  let mockOnCategoryChange: jest.Mock<() => void>;

  beforeEach(() => {
    mockOnCategoryChange = jest.fn();
  });

  it('renders div searchbarDropdownCategoryWrapper', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElement = container.querySelector('.searchbarDropdownCategoryWrapper');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders select searchbarDropdownCategory', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElement = container.querySelector('.searchbarDropdownCategory');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders all 6 sort options', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElements = container.querySelectorAll('option');

    expect(htmlElements).toHaveLength(11);
  });

  it('renders category option all', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElement = container.querySelector('.all');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option entertainment', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElement = container.querySelector('.entertainment');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option bills', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElement = container.querySelector('.bills');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option groceries', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElement = container.querySelector('.groceries');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option diningout', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElement = container.querySelector('.diningout');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option transportation', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElement = container.querySelector('.transportation');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option personalcare', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElement = container.querySelector('.personalcare');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option education', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElement = container.querySelector('.education');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option lifestyle', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElement = container.querySelector('.lifestyle');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option shopping', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElement = container.querySelector('.shopping');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option general', () => {
    const { container } = render(
      <SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />
    );

    const htmlElement = container.querySelector('.general');

    expect(htmlElement).toBeInTheDocument();
  });

  it('calls onSortChange when a different option is selected', () => {
    render(<SearchbarDropdownCategory onCategoryChange={mockOnCategoryChange} />);

    const selectElement = screen.getByTestId('searchbar-dropdown-category').querySelector('select');

    fireEvent.change(selectElement!, { target: { value: 'all' } });

    expect(mockOnCategoryChange).toHaveBeenCalledWith('all');
  });
});
