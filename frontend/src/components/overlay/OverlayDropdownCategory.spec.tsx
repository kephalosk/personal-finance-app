import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import OverlayDropdownCategory from './OverlayDropdownCategory';
import { Categories, CategoriesMap } from '../../constants/Categories';

describe('OverlayDropdownCategory', () => {
  const selectedItem = 'General';
  const mockHandleCategoryChange = jest.fn();
  const testProps = {
    selectedItem,
    handleCategoryChange: mockHandleCategoryChange,
  };

  it('renders div dropdownCategory', async () => {
    const { container } = render(
      <MemoryRouter>
        <OverlayDropdownCategory {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.dropdownCategory');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders selectedItem', async () => {
    const { container } = render(
      <MemoryRouter>
        <OverlayDropdownCategory {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.dropdownCategory');

    expect(htmlElement).toHaveTextContent(selectedItem);
  });

  it('renders img dropdownCategoryIcon', async () => {
    const { container } = render(
      <MemoryRouter>
        <OverlayDropdownCategory {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.dropdownCategoryIcon');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('src', '/images/icon-caret-down.svg');
    expect(htmlElement).toHaveAttribute('alt', 'caret icon');
    expect(htmlElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders div dropdownCategoryList', async () => {
    const { container } = render(
      <MemoryRouter>
        <OverlayDropdownCategory {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.dropdownCategoryList');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders all categorie labels', async () => {
    const { container } = render(
      <MemoryRouter>
        <OverlayDropdownCategory {...testProps} />
      </MemoryRouter>
    );

    const htmlElements = container.querySelectorAll('.dropdownCategoryListItem');
    let countLabels = 0;
    htmlElements.forEach((el) => {
      if (CategoriesMap[el.textContent!]) {
        countLabels = countLabels + 1;
      }
    });

    expect(countLabels).toEqual(Categories.length);
  });

  it('renders labels - 1 horizontal lines', async () => {
    const { container } = render(
      <MemoryRouter>
        <OverlayDropdownCategory {...testProps} />
      </MemoryRouter>
    );

    const labels = container.querySelectorAll('.dropdownCategoryListItem');
    const lines = container.querySelectorAll('.dropdownCategoryListLine');

    expect(lines).toHaveLength(labels.length - 1);
  });

  it('adds class isOpen to dropdownCategoryList when dropdownCategory is clicked', async () => {
    const { container } = render(
      <MemoryRouter>
        <OverlayDropdownCategory {...testProps} />
      </MemoryRouter>
    );

    let htmlListElement = container.querySelector('.dropdownCategoryList');
    expect(htmlListElement).not.toHaveClass('isOpen');

    const htmlElement = container.querySelector('.dropdownCategory');
    fireEvent.click(htmlElement!);

    htmlListElement = container.querySelector('.dropdownCategoryList');
    expect(htmlListElement).toHaveClass('isOpen');
  });

  it('removes class isOpen from dropdownCategoryList when a dropdownCategoryListItem is clicked', async () => {
    const { container } = render(
      <MemoryRouter>
        <OverlayDropdownCategory {...testProps} />
      </MemoryRouter>
    );

    const dropdown = container.querySelector('.dropdownCategory');
    fireEvent.click(dropdown!);
    let htmlListElement = container.querySelector('.dropdownCategoryList');
    expect(htmlListElement).toHaveClass('isOpen');

    const labels = container.querySelectorAll('.dropdownCategoryListItem');
    fireEvent.click(labels[1]!);

    htmlListElement = container.querySelector('.dropdownCategoryList');
    expect(htmlListElement).not.toHaveClass('isOpen');
  });

  it('calls handleCategoryChange when a dropdownCategoryListItem is clicked', async () => {
    const { container } = render(
      <MemoryRouter>
        <OverlayDropdownCategory {...testProps} />
      </MemoryRouter>
    );

    const labels = container.querySelectorAll('.dropdownCategoryListItem');
    fireEvent.click(labels[1]!);

    expect(mockHandleCategoryChange).toHaveBeenCalledWith(labels[1].textContent);
  });

  it('sets passed selectedItem to top of the list', async () => {
    const { container } = render(
      <MemoryRouter>
        <OverlayDropdownCategory {...testProps} />
      </MemoryRouter>
    );

    const labels = container.querySelectorAll('.dropdownCategoryListItem');

    expect(labels[0]).toHaveTextContent(selectedItem);
  });
});
