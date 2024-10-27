import { fireEvent, render, screen } from '@testing-library/react';
import { PaginationButtonNext } from './PaginationButtonNext';
import React from 'react';

const imgAlt: string = 'icon of caret right';
const imgSrc: string = './src/assets/images/icon-caret-right.svg';

describe('PaginationButtonNext', () => {
  let mockOnClick: jest.Mock<() => void>;

  const isMaxIndex: boolean = true;
  const isNotMaxIndex: boolean = false;

  beforeEach(() => {
    mockOnClick = jest.fn();
  });

  it('renders button paginationButtonNext', () => {
    const { container } = render(
      <PaginationButtonNext onClick={mockOnClick} isMaxIndex={isMaxIndex} />
    );

    const htmlElement = container.querySelector('.paginationButtonNext');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders text of paginationButtonNext', () => {
    const { container } = render(
      <PaginationButtonNext onClick={mockOnClick} isMaxIndex={isMaxIndex} />
    );

    const htmlElement = container.querySelector('.paginationButtonNext');

    expect(htmlElement).toHaveTextContent('Next');
  });

  it('renders caret icon of paginationButtonNext', () => {
    render(<PaginationButtonNext onClick={mockOnClick} isMaxIndex={isMaxIndex} />);

    const imgElement: HTMLElement = screen.getByAltText(imgAlt);

    expect(imgElement).toHaveAttribute('src', imgSrc);
  });

  it('disables button paginationButtonNext if isMaxIndex is true', () => {
    const { container } = render(
      <PaginationButtonNext onClick={mockOnClick} isMaxIndex={isMaxIndex} />
    );

    const htmlElement = container.querySelector('.paginationButtonNext');

    expect(htmlElement).toHaveClass('isDisabled');
  });

  it('enables button paginationButtonNext if isMaxIndex is false', () => {
    const { container } = render(
      <PaginationButtonNext onClick={mockOnClick} isMaxIndex={isNotMaxIndex} />
    );

    const htmlElement = container.querySelector('.paginationButtonNext');

    expect(htmlElement).toHaveClass('isEnabled');
  });

  it('calls onClick when button is clicked', () => {
    const { getByTestId } = render(
      <PaginationButtonNext onClick={mockOnClick} isMaxIndex={isNotMaxIndex} />
    );

    const button = getByTestId('pagination-button-next');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
