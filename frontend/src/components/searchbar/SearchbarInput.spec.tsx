import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { SearchbarInput } from './SearchbarInput';

const imgAlt: string = 'icon of search';
const imgSrc: string = '/images/icon-search.svg';

describe('SearchbarInput', () => {
  let mockOnInputChange: jest.Mock<() => void>;

  beforeEach(() => {
    mockOnInputChange = jest.fn();
  });

  it('renders div searchbarInputContainer', () => {
    const { container } = render(<SearchbarInput onInputChange={mockOnInputChange} />);

    const htmlElement = container.querySelector('.searchbarInputContainer');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders relative div searchbarInputRelative', () => {
    const { container } = render(<SearchbarInput onInputChange={mockOnInputChange} />);

    const htmlElement = container.querySelector('.searchbarInputRelative');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders search icon of SearchbarInput', () => {
    render(<SearchbarInput onInputChange={mockOnInputChange} />);

    const imgElement: HTMLElement = screen.getByAltText(imgAlt);

    expect(imgElement).toHaveAttribute('src', imgSrc);
  });

  it('passes current input to parent component', () => {
    render(<SearchbarInput onInputChange={mockOnInputChange} />);

    const selectElement = screen.getByTestId('searchbar-input').querySelector('input');
    fireEvent.change(selectElement!, { target: { value: 'a' } });

    expect(mockOnInputChange).toHaveBeenCalledWith('a');
  });
});
