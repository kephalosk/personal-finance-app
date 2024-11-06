import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { PaginationButtonPrev } from './PaginationButtonPrev';

const imgAlt: string = 'icon of caret left';
const imgSrc: string = '/images/icon-caret-left.svg';

describe('PaginationButtonPrev', () => {
  let mockOnClick: jest.Mock<() => void>;

  const currentIndexZero: number = 0;
  const currentIndexOne: number = 1;

  beforeEach(() => {
    mockOnClick = jest.fn();
  });

  it('renders button paginationButtonPrev', () => {
    const { container } = render(
      <PaginationButtonPrev onClick={mockOnClick} currentIndex={currentIndexOne} />
    );

    const htmlElement = container.querySelector('.paginationButtonPrev');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders text of paginationButtonPrev', () => {
    const { container } = render(
      <PaginationButtonPrev onClick={mockOnClick} currentIndex={currentIndexOne} />
    );

    const htmlElement = container.querySelector('.paginationButtonPrev');

    expect(htmlElement).toHaveTextContent('Prev');
  });

  it('renders caret icon of paginationButtonPrev', () => {
    render(<PaginationButtonPrev onClick={mockOnClick} currentIndex={currentIndexOne} />);

    const imgElement: HTMLElement = screen.getByAltText(imgAlt);

    expect(imgElement).toHaveAttribute('src', imgSrc);
  });

  it('disables button paginationButtonPrev if currentIndex is 0', () => {
    const { container } = render(
      <PaginationButtonPrev onClick={mockOnClick} currentIndex={currentIndexZero} />
    );

    const htmlElement = container.querySelector('.paginationButtonPrev');

    expect(htmlElement).toHaveClass('isDisabled');
  });

  it('enables button paginationButtonPrev if currentIndex is greater than 0', () => {
    const { container } = render(
      <PaginationButtonPrev onClick={mockOnClick} currentIndex={currentIndexOne} />
    );

    const htmlElement = container.querySelector('.paginationButtonPrev');

    expect(htmlElement).toHaveClass('isEnabled');
  });

  it('calls onClick when button is clicked', () => {
    const { getByTestId } = render(
      <PaginationButtonPrev onClick={mockOnClick} currentIndex={currentIndexOne} />
    );

    const button = getByTestId('pagination-button-prev');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
