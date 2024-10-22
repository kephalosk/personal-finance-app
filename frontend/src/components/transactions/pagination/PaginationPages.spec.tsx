import { fireEvent, render } from '@testing-library/react';
import { PaginationPages } from './PaginationPages';
import React from 'react';

describe('PaginationPages', () => {
  let mockOnClick: jest.Mock<() => void>;

  const indexMax = 10;
  const currentIndex = 5;

  const testProps = {
    indexMax,
    currentIndex,
  };

  beforeEach(() => {
    mockOnClick = jest.fn();
  });

  it('renders div paginationPages', () => {
    const { container } = render(<PaginationPages onPageClick={mockOnClick} {...testProps} />);

    const htmlElement = container.querySelector('.paginationPages');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders buttons with prop indexMax times', () => {
    const { container } = render(<PaginationPages onPageClick={mockOnClick} {...testProps} />);

    const htmlElements = container.querySelectorAll('.paginationPagesButton');

    expect(htmlElements).toHaveLength(indexMax);
  });

  it('renders buttons with correct number', () => {
    const { container } = render(<PaginationPages onPageClick={mockOnClick} {...testProps} />);

    const htmlElements = container.querySelectorAll('.paginationPagesButton');

    htmlElements.forEach((button, index) => {
      expect(button).toHaveTextContent((index + 1).toString());
    });
  });

  it('sets active button with prop currentIndex', () => {
    const { container } = render(<PaginationPages onPageClick={mockOnClick} {...testProps} />);

    const htmlElements = container.querySelectorAll('.paginationPagesButton');

    expect(htmlElements[currentIndex]).toHaveClass('isActive');
    htmlElements.forEach((button, index) => {
      if (index !== currentIndex) {
        expect(button).not.toHaveClass('isActive');
      }
    });
  });

  it('sets not active button with prop currentIndex', () => {
    const { container } = render(<PaginationPages onPageClick={mockOnClick} {...testProps} />);

    const htmlElements = container.querySelectorAll('.paginationPagesButton');

    expect(htmlElements[currentIndex]).not.toHaveClass('isNotActive');
    htmlElements.forEach((button, index) => {
      if (index !== currentIndex) {
        expect(button).toHaveClass('isNotActive');
      }
    });
  });

  it('calls onClick with correct index when button is clicked', () => {
    const { container } = render(<PaginationPages onPageClick={mockOnClick} {...testProps} />);

    const buttons = container.querySelectorAll('.paginationPagesButton');
    buttons.forEach((button, index) => {
      fireEvent.click(buttons[index]!);
      expect(mockOnClick).toHaveBeenLastCalledWith(index);
    });
  });
});
