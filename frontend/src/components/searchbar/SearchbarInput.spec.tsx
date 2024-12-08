import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React, { createRef } from 'react';
import SearchbarInput, { SearchbarInputHandle } from './SearchbarInput';
import { userEvent } from '@testing-library/user-event';

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

  it('clears input when clearInput is called', async () => {
    const ref = createRef<SearchbarInputHandle>();
    render(<SearchbarInput ref={ref} onInputChange={mockOnInputChange} />);
    const inputElement = screen.getByPlaceholderText('Search transaction');
    await userEvent.type(inputElement, 'Test input');
    expect(inputElement).toHaveValue('Test input');

    ref.current?.clearInput();

    await waitFor(() => {
      expect(inputElement).toHaveValue('');
    });
  });
});
