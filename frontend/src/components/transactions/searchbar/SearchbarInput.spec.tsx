import { render, screen } from '@testing-library/react';
import React from 'react';
import { SearchbarInput } from './SearchbarInput';

const imgAlt: string = 'icon of search';
const imgSrc: string = './src/assets/images/icon-search.svg';

describe('SearchbarInput', () => {
  it('renders div searchbarInputContainer', () => {
    const { container } = render(<SearchbarInput />);

    const htmlElement = container.querySelector('.searchbarInputContainer');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders relative div searchbarInputRelative', () => {
    const { container } = render(<SearchbarInput />);

    const htmlElement = container.querySelector('.searchbarInputRelative');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders search icon of SearchbarInput', () => {
    render(<SearchbarInput />);

    const imgElement: HTMLElement = screen.getByAltText(imgAlt);

    expect(imgElement).toHaveAttribute('src', imgSrc);
  });
});
