import { render, screen } from '@testing-library/react';
import React from 'react';
import { PaginationButtonPrev } from './PaginationButtonPrev';

const imgAlt: string = 'icon of caret left';
const imgSrc: string = './src/assets/images/icon-caret-left.svg';

describe('PaginationButtonPrev', () => {
  it('renders button paginationButtonPrev', () => {
    const { container } = render(<PaginationButtonPrev />);

    const htmlElement = container.querySelector('.paginationButtonPrev');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders text of paginationButtonPrev', () => {
    const { container } = render(<PaginationButtonPrev />);

    const htmlElement = container.querySelector('.paginationButtonPrev');

    expect(htmlElement).toHaveTextContent('Prev');
  });

  it('renders caret icon of paginationButtonPrev', () => {
    render(<PaginationButtonPrev />);

    const imgElement: HTMLElement = screen.getByAltText(imgAlt);

    expect(imgElement).toHaveAttribute('src', imgSrc);
  });
});
