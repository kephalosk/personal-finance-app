import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import OverlayDropdownCategory from './OverlayDropdownCategory';
import {
  mockedBudgetCategories,
  mockedBudgetCategoriesAllEnabled,
} from '../../../fixtures/MockedBudgetCategory';
import DropdownCategoryBar from './DropdownCategoryBar';
import DropdownCategoryListItem from './DropdownCategoryListItem';
import ScrollToTop from '../../ScrollToTop';

jest.mock('./DropdownCategoryBar', () =>
  jest.fn((props) => (
    <div
      data-testid="dropdown-category-bar"
      onClick={props.handleClick}
      onKeyDown={props.handleKeyDown}
    ></div>
  ))
);
jest.mock('./DropdownCategoryListItem', () =>
  jest.fn((props) => {
    const mockRef = React.useRef(null);

    React.useEffect(() => {
      if (props.clickableRefs?.current) {
        props.clickableRefs.current[props.index] = mockRef.current;
      }
    }, [props.index, props.clickableRefs]);

    return (
      <div
        data-testid="dropdown-category-list-item"
        ref={mockRef}
        onClick={props.onItemClick}
        onKeyDown={(event) => props.handleCategoryKeyDown(event, props.category, props.index)} // Index weiterleiten
      ></div>
    );
  })
);
jest.mock('../../ScrollToTop', () => jest.fn(() => <div data-testid="scroll-to-top"></div>));

describe('OverlayDropdownCategory', () => {
  const selectedItem = mockedBudgetCategories[0];
  const mockHandleCategoryChange = jest.fn();
  const budgetCategories = mockedBudgetCategories;

  const testProps = {
    selectedItem,
    handleCategoryChange: mockHandleCategoryChange,
    budgetCategories,
  };

  const dropdownCategoryBarClass: string = 'dropdownCategoryBar';
  const dropdownCategoryIconClass: string = 'dropdownCategoryIcon';
  const dropdownCategoryListItemContainerClass: string = 'dropdownCategoryListItemContainer';
  const dropdownCategoryListItemClass: string = 'dropdownCategoryListItem';
  const dropdownCategoryListItemLabelClass: string = 'dropdownCategoryListItemLabel';

  it('renders div dropdownCategoryContainer', async () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

    const htmlElement = container.querySelector('.dropdownCategoryContainer');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component DropdownCategoryBar', async () => {
    render(<OverlayDropdownCategory {...testProps} />);

    const component = screen.getByTestId('dropdown-category-bar');

    expect(component).toBeInTheDocument();
    expect(DropdownCategoryBar).toHaveBeenCalledWith(
      {
        dropdownCategoryBarClass,
        dropdownCategoryIconClass,
        handleClick: expect.any(Function),
        handleKeyDown: expect.any(Function),
        selectedItem: mockedBudgetCategories[0],
      },
      {}
    );
  });

  it('renders div dropdownCategoryList', async () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

    const htmlElement = container.querySelector('.dropdownCategoryList');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders correct visible state of dropdownCategoryList', async () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);
    const htmlElement = container.querySelector('.dropdownCategoryList');
    expect(htmlElement).not.toHaveClass('isOpen');

    const component = screen.getByTestId('dropdown-category-bar');
    fireEvent.click(component);

    expect(htmlElement).toHaveClass('isOpen');
  });

  it('renders components DropdownCategoryListItem', async () => {
    render(<OverlayDropdownCategory {...testProps} />);

    const components = screen.getAllByTestId('dropdown-category-list-item');

    expect(components).toHaveLength(10);
    budgetCategories.forEach((category, index) => {
      expect(DropdownCategoryListItem).toHaveBeenNthCalledWith(
        index + 1,
        {
          category: category,
          clickableRefs: { current: expect.any(Array) },
          dropdownCategoryListItemClass,
          dropdownCategoryListItemContainerClass,
          dropdownCategoryListItemLabelClass,
          handleCategoryKeyDown: expect.any(Function),
          index: index - 1,
          onItemClick: expect.any(Function),
        },
        {}
      );
    });
  });

  it('renders component ScrollToTop', async () => {
    render(<OverlayDropdownCategory {...testProps} />);

    const component = screen.getByTestId('scroll-to-top');

    expect(component).toBeInTheDocument();
    expect(ScrollToTop).toHaveBeenCalled();
  });

  it('handles keydown Enter on DropdownCategoryBar', async () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);
    const htmlElement = container.querySelector('.dropdownCategoryList');
    expect(htmlElement).not.toHaveClass('isOpen');

    const component = screen.getByTestId('dropdown-category-bar');
    fireEvent.keyDown(component, { key: 'Enter', code: 'Enter', keyCode: 13 });

    expect(htmlElement).toHaveClass('isOpen');
  });

  it('handles click on DropdownCategoryListItem', async () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);
    const htmlElement = container.querySelector('.dropdownCategoryList');
    const component = screen.getByTestId('dropdown-category-bar');
    fireEvent.click(component);
    expect(htmlElement).toHaveClass('isOpen');

    const item = screen.getAllByTestId('dropdown-category-list-item');
    fireEvent.click(item[0]);

    expect(htmlElement).not.toHaveClass('isOpen');
  });

  it('handles keydown Enter on DropdownCategoryListItem', async () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);
    const htmlElement = container.querySelector('.dropdownCategoryList');
    const component = screen.getByTestId('dropdown-category-bar');
    fireEvent.click(component);
    expect(htmlElement).toHaveClass('isOpen');

    const item = screen.getAllByTestId('dropdown-category-list-item');
    fireEvent.keyDown(item[0], { key: 'Enter', code: 'Enter', keyCode: 13 });

    expect(htmlElement).not.toHaveClass('isOpen');
    expect(mockHandleCategoryChange).toHaveBeenCalled();
  });

  it('handles keydown Tab on last dropdownCategoryListItem to focus first listitem', () => {
    const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');
    render(
      <OverlayDropdownCategory {...testProps} budgetCategories={mockedBudgetCategoriesAllEnabled} />
    );

    const item = screen.getAllByTestId('dropdown-category-list-item');
    fireEvent.keyDown(item[item.length - 1], {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });

    expect(focusSpy).toHaveBeenCalled();
  });

  it('handles keydown Back Tab on first dropdownCategoryListItem to focus last listitem', () => {
    const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');
    render(
      <OverlayDropdownCategory {...testProps} budgetCategories={mockedBudgetCategoriesAllEnabled} />
    );

    const item = screen.getAllByTestId('dropdown-category-list-item');
    fireEvent.keyDown(item[1], {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
      shiftKey: true,
    });

    expect(focusSpy).toHaveBeenCalled();
  });

  it('handles keydown Escape on DropdownCategoryListItem', async () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);
    const htmlElement = container.querySelector('.dropdownCategoryList');
    const component = screen.getByTestId('dropdown-category-bar');
    fireEvent.click(component);
    expect(htmlElement).toHaveClass('isOpen');

    const item = screen.getAllByTestId('dropdown-category-list-item');
    fireEvent.keyDown(item[0], { key: 'Escape', code: 'Escape', keyCode: 27 });

    expect(htmlElement).not.toHaveClass('isOpen');
  });

  it('sets passed selectedItem to top of the list', async () => {
    render(<OverlayDropdownCategory {...testProps} />);

    expect(DropdownCategoryListItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ category: selectedItem }),
      {}
    );
  });

  it('handles a click outside of the list', () => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);
    const htmlElement = container.querySelector('.dropdownCategoryList');
    const component = screen.getByTestId('dropdown-category-bar');
    fireEvent.click(component);
    expect(htmlElement).toHaveClass('isOpen');

    const element = container.querySelector('.dropdownCategoryContainer');
    fireEvent.mouseDown(element!);

    expect(htmlElement).not.toHaveClass('isOpen');
  });
});
