import { render, screen } from '@testing-library/react';
import { PaginationButtonNext } from './PaginationButtonNext';
import React from 'react';

const imgAlt: string = 'icon of caret right';
const imgSrc: string = './src/assets/images/icon-caret-right.svg';

describe('PaginationButtonNext', () => {
  it('renders button paginationButtonNext', () => {
    const { container } = render(<PaginationButtonNext />);

    const htmlElement = container.querySelector('.paginationButtonNext');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders text of paginationButtonNext', () => {
    const { container } = render(<PaginationButtonNext />);

    const htmlElement = container.querySelector('.paginationButtonNext');

    expect(htmlElement).toHaveTextContent('Next');
  });

  it('renders caret icon of paginationButtonNext', () => {
    render(<PaginationButtonNext />);

    const imgElement: HTMLElement = screen.getByAltText(imgAlt);

    expect(imgElement).toHaveAttribute('src', imgSrc);
  });
});
