import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { SearchbarDropdownSort } from './SearchbarDropdownSort';

describe('SearchbarDropdownSort', () => {
  let mockOnSortChange: jest.Mock<() => void>;

  beforeEach(() => {
    mockOnSortChange = jest.fn();
  });

  it('renders div searchbarDropdownSortWrapper', () => {
    const { container } = render(<SearchbarDropdownSort onSortChange={mockOnSortChange} />);

    const htmlElement = container.querySelector('.searchbarDropdownSortWrapper');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders select searchbarDropdownSort', () => {
    const { container } = render(<SearchbarDropdownSort onSortChange={mockOnSortChange} />);

    const htmlElement = container.querySelector('.searchbarDropdownSort');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders all 6 sort options', () => {
    const { container } = render(<SearchbarDropdownSort onSortChange={mockOnSortChange} />);

    const htmlElements = container.querySelectorAll('option');

    expect(htmlElements).toHaveLength(6);
  });

  it('renders sort option latest', () => {
    const { container } = render(<SearchbarDropdownSort onSortChange={mockOnSortChange} />);

    const htmlElement = container.querySelector('.latest');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders sort option oldest', () => {
    const { container } = render(<SearchbarDropdownSort onSortChange={mockOnSortChange} />);

    const htmlElement = container.querySelector('.oldest');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders sort option atoz', () => {
    const { container } = render(<SearchbarDropdownSort onSortChange={mockOnSortChange} />);

    const htmlElement = container.querySelector('.atoz');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders sort option ztoa', () => {
    const { container } = render(<SearchbarDropdownSort onSortChange={mockOnSortChange} />);

    const htmlElement = container.querySelector('.ztoa');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders sort option highest', () => {
    const { container } = render(<SearchbarDropdownSort onSortChange={mockOnSortChange} />);

    const htmlElement = container.querySelector('.highest');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders sort option lowest', () => {
    const { container } = render(<SearchbarDropdownSort onSortChange={mockOnSortChange} />);

    const htmlElement = container.querySelector('.lowest');

    expect(htmlElement).toBeInTheDocument();
  });

  it('calls onSortChange when a different option is selected', () => {
    render(<SearchbarDropdownSort onSortChange={mockOnSortChange} />);

    const selectElement = screen.getByTestId('searchbar-dropdown-sort').querySelector('select');

    fireEvent.change(selectElement!, { target: { value: 'oldest' } });

    expect(mockOnSortChange).toHaveBeenCalledWith('oldest');
  });
});
