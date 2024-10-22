import { render, screen } from '@testing-library/react';
import React from 'react';
import { PaginationButtonPrev } from './PaginationButtonPrev';

const imgAlt: string = 'icon of caret left';
const imgSrc: string = './src/assets/images/icon-caret-left.svg';

describe('PaginationButtonPrev', () => {
  const currentIndexZero: number = 0;
  const currentIndexOne: number = 1;

  it('renders button paginationButtonPrev', () => {
    const { container } = render(<PaginationButtonPrev currentIndex={currentIndexOne} />);

    const htmlElement = container.querySelector('.paginationButtonPrev');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders text of paginationButtonPrev', () => {
    const { container } = render(<PaginationButtonPrev currentIndex={currentIndexOne} />);

    const htmlElement = container.querySelector('.paginationButtonPrev');

    expect(htmlElement).toHaveTextContent('Prev');
  });

  it('renders caret icon of paginationButtonPrev', () => {
    render(<PaginationButtonPrev currentIndex={currentIndexOne} />);

    const imgElement: HTMLElement = screen.getByAltText(imgAlt);

    expect(imgElement).toHaveAttribute('src', imgSrc);
  });

  it('disables button paginationButtonPrev if currentIndex is 0', () => {
    const { container } = render(<PaginationButtonPrev currentIndex={currentIndexZero} />);

    const htmlElement = container.querySelector('.paginationButtonPrev');

    expect(htmlElement).toHaveClass('isDisabled');
  });

  it('enables button paginationButtonPrev if currentIndex is greater than 0', () => {
    const { container } = render(<PaginationButtonPrev currentIndex={currentIndexOne} />);

    const htmlElement = container.querySelector('.paginationButtonPrev');

    expect(htmlElement).toHaveClass('isEnabled');
  });
});
