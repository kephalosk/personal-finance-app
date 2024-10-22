import { render } from '@testing-library/react';
import React from 'react';
import { SearchbarDropdownCategory } from './SearchbarDropdownCategory';

describe('searchbarDropdownCategory', () => {
  it('renders select searchbarDropdownCategory', () => {
    const { container } = render(<SearchbarDropdownCategory />);

    const htmlElement = container.querySelector('.searchbarDropdownCategory');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders all 6 sort options', () => {
    const { container } = render(<SearchbarDropdownCategory />);

    const htmlElements = container.querySelectorAll('option');

    expect(htmlElements).toHaveLength(11);
  });

  it('renders category option all', () => {
    const { container } = render(<SearchbarDropdownCategory />);

    const htmlElement = container.querySelector('.all');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option entertainment', () => {
    const { container } = render(<SearchbarDropdownCategory />);

    const htmlElement = container.querySelector('.entertainment');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option bills', () => {
    const { container } = render(<SearchbarDropdownCategory />);

    const htmlElement = container.querySelector('.bills');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option groceries', () => {
    const { container } = render(<SearchbarDropdownCategory />);

    const htmlElement = container.querySelector('.groceries');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option dining', () => {
    const { container } = render(<SearchbarDropdownCategory />);

    const htmlElement = container.querySelector('.dining');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option transportation', () => {
    const { container } = render(<SearchbarDropdownCategory />);

    const htmlElement = container.querySelector('.transportation');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option personalcare', () => {
    const { container } = render(<SearchbarDropdownCategory />);

    const htmlElement = container.querySelector('.personalcare');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option education', () => {
    const { container } = render(<SearchbarDropdownCategory />);

    const htmlElement = container.querySelector('.education');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option lifestyle', () => {
    const { container } = render(<SearchbarDropdownCategory />);

    const htmlElement = container.querySelector('.lifestyle');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option shopping', () => {
    const { container } = render(<SearchbarDropdownCategory />);

    const htmlElement = container.querySelector('.shopping');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders category option general', () => {
    const { container } = render(<SearchbarDropdownCategory />);

    const htmlElement = container.querySelector('.general');

    expect(htmlElement).toBeInTheDocument();
  });
});
