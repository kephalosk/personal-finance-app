import { render, screen } from '@testing-library/react';
import { PaginationButtonNext } from './PaginationButtonNext';
import React from 'react';

const imgAlt: string = 'icon of caret right';
const imgSrc: string = './src/assets/images/icon-caret-right.svg';

describe('PaginationButtonNext', () => {
  const isMaxIndex: boolean = true;
  const isNotMaxIndex: boolean = false;

  it('renders button paginationButtonNext', () => {
    const { container } = render(<PaginationButtonNext isMaxIndex={isMaxIndex} />);

    const htmlElement = container.querySelector('.paginationButtonNext');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders text of paginationButtonNext', () => {
    const { container } = render(<PaginationButtonNext isMaxIndex={isMaxIndex} />);

    const htmlElement = container.querySelector('.paginationButtonNext');

    expect(htmlElement).toHaveTextContent('Next');
  });

  it('renders caret icon of paginationButtonNext', () => {
    render(<PaginationButtonNext isMaxIndex={isMaxIndex} />);

    const imgElement: HTMLElement = screen.getByAltText(imgAlt);

    expect(imgElement).toHaveAttribute('src', imgSrc);
  });

  it('disables button paginationButtonNext if isMaxIndex is true', () => {
    const { container } = render(<PaginationButtonNext isMaxIndex={isMaxIndex} />);

    const htmlElement = container.querySelector('.paginationButtonNext');

    expect(htmlElement).toHaveClass('isDisabled');
  });

  it('enables button paginationButtonNext if isMaxIndex is false', () => {
    const { container } = render(<PaginationButtonNext isMaxIndex={isNotMaxIndex} />);

    const htmlElement = container.querySelector('.paginationButtonNext');

    expect(htmlElement).toHaveClass('isEnabled');
  });
});
