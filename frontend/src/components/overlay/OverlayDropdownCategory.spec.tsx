import { fireEvent, render } from '@testing-library/react';
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
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

    const htmlElement = container.querySelector('.dropdownCategory');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders selectedItem', async () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

    const htmlElement = container.querySelector('.dropdownCategory');

    expect(htmlElement).toHaveTextContent(selectedItem);
  });

  it('renders img dropdownCategoryIcon', async () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

    const htmlElement = container.querySelector('.dropdownCategoryIcon');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('src', '/images/icon-caret-down.svg');
    expect(htmlElement).toHaveAttribute('alt', 'caret icon');
    expect(htmlElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders div dropdownCategoryList', async () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

    const htmlElement = container.querySelector('.dropdownCategoryList');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders all categorie labels', async () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

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
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

    const labels = container.querySelectorAll('.dropdownCategoryListItem');
    const lines = container.querySelectorAll('.dropdownCategoryListLine');

    expect(lines).toHaveLength(labels.length - 1);
  });

  it('adds class isOpen to dropdownCategoryList when dropdownCategory is clicked', async () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

    let htmlListElement = container.querySelector('.dropdownCategoryList');
    expect(htmlListElement).not.toHaveClass('isOpen');

    const htmlElement = container.querySelector('.dropdownCategory');
    fireEvent.click(htmlElement!);

    htmlListElement = container.querySelector('.dropdownCategoryList');
    expect(htmlListElement).toHaveClass('isOpen');
  });

  it('removes class isOpen from dropdownCategoryList when a dropdownCategoryListItem is clicked', async () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

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
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

    const labels = container.querySelectorAll('.dropdownCategoryListItem');
    fireEvent.click(labels[1]!);

    expect(mockHandleCategoryChange).toHaveBeenCalledWith(labels[1].textContent);
  });

  it('sets passed selectedItem to top of the list', async () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

    const labels = container.querySelectorAll('.dropdownCategoryListItem');

    expect(labels[0]).toHaveTextContent(selectedItem);
  });

  it('handles a click outside of the list', () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

    const htmlElement = container.querySelector('.dropdownCategory');
    fireEvent.mouseDown(htmlElement!);
    const list = container.querySelector('.dropdownCategoryList');

    expect(list).not.toHaveClass('isOpen');
  });

  it('handles keydown Enter on dropdownCategoryListItem', () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

    const htmlElements = container.querySelectorAll('.dropdownCategoryListItem');
    fireEvent.keyDown(htmlElements[1]!, { key: 'Enter', code: 'Enter', keyCode: 13 });

    expect(mockHandleCategoryChange).toHaveBeenCalledWith(htmlElements[1].textContent);
  });

  it('handles keydown Tab on last dropdownCategoryListItem to focus first listitem', () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

    const htmlElements = container.querySelectorAll('.dropdownCategoryListItem');
    fireEvent.keyDown(htmlElements[htmlElements.length - 1]!, {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });

    expect(htmlElements[1]).toHaveFocus();
  });

  it('handles keydown Back Tab on first dropdownCategoryListItem to focus last listitem', () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

    const htmlElements = container.querySelectorAll('.dropdownCategoryListItem');
    fireEvent.keyDown(htmlElements[1]!, {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
      shiftKey: true,
    });

    expect(htmlElements[htmlElements.length - 1]).toHaveFocus();
  });

  it('handles keydown Escape on dropdownCategoryListItem', () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

    const htmlElements = container.querySelectorAll('.dropdownCategoryListItem');
    fireEvent.keyDown(htmlElements[1]!, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
    });
    const list = container.querySelector('.dropdownCategoryList');

    expect(list).not.toHaveClass('isOpen');
  });

  it('handles keydown Enter on dropdownCategory', () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);
    const htmlElement = container.querySelector('.dropdownCategory');
    fireEvent.click(htmlElement!);
    const list = container.querySelector('.dropdownCategoryList');
    expect(list).toHaveClass('isOpen');

    const htmlElements = container.querySelectorAll('.dropdownCategoryListItem');
    fireEvent.keyDown(htmlElements[1]!, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
    });

    expect(list).not.toHaveClass('isOpen');
  });
});
