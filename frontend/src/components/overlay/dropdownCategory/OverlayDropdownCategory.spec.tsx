import { fireEvent, render, screen } from '@testing-library/react';
import React, { KeyboardEvent, MutableRefObject, ReactNode } from 'react';
import { BudgetCategory } from '../../../model/BudgetCategory';
import {
  mockedBudgetCategories,
  mockedBudgetCategoriesAllEnabled,
} from '../../../fixtures/MockedBudgetCategory';
import OverlayDropdownCategory from './OverlayDropdownCategory';
import DropdownCategoryBar from './DropdownCategoryBar';
import DropdownCategoryListItem from './DropdownCategoryListItem';
import ScrollToTop from '../../ScrollToTop';

jest.mock(
  './DropdownCategoryBar',
  (): jest.Mock =>
    jest.fn(
      (props: {
        handleClick: () => void;
        handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
      }): ReactNode => (
        <div
          data-testid="dropdown-category-bar"
          onClick={() => props.handleClick()}
          onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => props.handleKeyDown(event)}
        ></div>
      )
    )
);
jest.mock(
  './DropdownCategoryListItem',
  (): jest.Mock =>
    jest.fn(
      (props: {
        clickableRefs: MutableRefObject<(HTMLDivElement | null)[]>;
        index: number;
        onItemClick: (category: BudgetCategory) => void;
        handleCategoryKeyDown: (
          event: React.KeyboardEvent<HTMLDivElement>,
          category: BudgetCategory,
          index: number
        ) => void;
        category: BudgetCategory;
      }): ReactNode => {
        const mockRef: MutableRefObject<null> = React.useRef(null);

        React.useEffect((): void => {
          if (props.clickableRefs?.current) {
            props.clickableRefs.current[props.index] = mockRef.current;
          }
        }, [props.index, props.clickableRefs]);

        return (
          <div
            data-testid="dropdown-category-list-item"
            ref={mockRef}
            onClick={() => props.onItemClick(props.category)}
            onKeyDown={(event: KeyboardEvent<HTMLDivElement>) =>
              props.handleCategoryKeyDown(event, props.category, props.index)
            }
          ></div>
        );
      }
    )
);
jest.mock(
  '../../ScrollToTop',
  (): jest.Mock => jest.fn((): ReactNode => <div data-testid="scroll-to-top"></div>)
);

describe('OverlayDropdownCategory', (): void => {
  const selectedItem: BudgetCategory = mockedBudgetCategories[0];
  const mockHandleCategoryChange: jest.Mock = jest.fn();
  const budgetCategories: BudgetCategory[] = mockedBudgetCategories;
  const isDisabled: boolean = false;

  const testProps: {
    selectedItem: BudgetCategory;
    handleCategoryChange: (category: BudgetCategory) => void;
    budgetCategories: BudgetCategory[];
    isDisabled?: boolean;
  } = {
    selectedItem,
    handleCategoryChange: mockHandleCategoryChange,
    budgetCategories,
    isDisabled,
  };

  const dropdownCategoryBarClass: string = 'dropdownCategoryBar';
  const dropdownCategoryIconClass: string = 'dropdownCategoryIcon';
  const dropdownCategoryListItemContainerClass: string = 'dropdownCategoryListItemContainer';
  const dropdownCategoryListItemClass: string = 'dropdownCategoryListItem';
  const dropdownCategoryListItemLabelClass: string = 'dropdownCategoryListItemLabel';

  beforeEach((): void => {
    jest.clearAllMocks();
  });

  it('renders div dropdownCategoryContainer', (): void => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.dropdownCategoryContainer');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component DropdownCategoryBar', (): void => {
    render(<OverlayDropdownCategory {...testProps} />);

    const component: HTMLElement = screen.getByTestId('dropdown-category-bar');

    expect(component).toBeInTheDocument();
    expect(DropdownCategoryBar).toHaveBeenCalledWith(
      {
        dropdownCategoryBarClass,
        dropdownCategoryIconClass,
        handleClick: expect.any(Function),
        handleKeyDown: expect.any(Function),
        selectedItem: mockedBudgetCategories[0],
        isDisabled: false,
      },
      {}
    );
  });

  it.each([false, true])(
    'renders component DropdownCategoryBar with passed prop isDisabled === %s',
    (isDisabled: boolean): void => {
      render(<OverlayDropdownCategory {...testProps} isDisabled={isDisabled} />);

      expect(DropdownCategoryBar).toHaveBeenCalledWith(expect.objectContaining({ isDisabled }), {});
    }
  );

  it('renders div dropdownCategoryList', (): void => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.dropdownCategoryList');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders correct visible state of dropdownCategoryList', (): void => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);
    const htmlElement: HTMLElement | null = container.querySelector('.dropdownCategoryList');
    expect(htmlElement).not.toHaveClass('isOpen');

    const component: HTMLElement = screen.getByTestId('dropdown-category-bar');
    fireEvent.click(component);

    expect(htmlElement).toHaveClass('isOpen');
  });

  it('renders components DropdownCategoryListItem', (): void => {
    render(<OverlayDropdownCategory {...testProps} />);

    const components: HTMLElement[] = screen.getAllByTestId('dropdown-category-list-item');

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

  it('renders component ScrollToTop', (): void => {
    render(<OverlayDropdownCategory {...testProps} />);

    const component: HTMLElement = screen.getByTestId('scroll-to-top');

    expect(component).toBeInTheDocument();
    expect(ScrollToTop).toHaveBeenCalled();
  });

  it('handles keydown Enter on DropdownCategoryBar', (): void => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);
    const htmlElement: HTMLElement | null = container.querySelector('.dropdownCategoryList');
    expect(htmlElement).not.toHaveClass('isOpen');

    const component: HTMLElement = screen.getByTestId('dropdown-category-bar');
    fireEvent.keyDown(component, { key: 'Enter', code: 'Enter', keyCode: 13 });

    expect(htmlElement).toHaveClass('isOpen');
  });

  it('handles click on DropdownCategoryListItem', (): void => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);
    const htmlElement: HTMLElement | null = container.querySelector('.dropdownCategoryList');
    const component: HTMLElement = screen.getByTestId('dropdown-category-bar');
    fireEvent.click(component);
    expect(htmlElement).toHaveClass('isOpen');

    const item: HTMLElement[] = screen.getAllByTestId('dropdown-category-list-item');
    fireEvent.click(item[0]);

    expect(htmlElement).not.toHaveClass('isOpen');
  });

  it('handles keydown Enter on DropdownCategoryListItem', (): void => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);
    const htmlElement: HTMLElement | null = container.querySelector('.dropdownCategoryList');
    const component: HTMLElement = screen.getByTestId('dropdown-category-bar');
    fireEvent.click(component);
    expect(htmlElement).toHaveClass('isOpen');

    const item: HTMLElement[] = screen.getAllByTestId('dropdown-category-list-item');
    fireEvent.keyDown(item[0], { key: 'Enter', code: 'Enter', keyCode: 13 });

    expect(htmlElement).not.toHaveClass('isOpen');
    expect(mockHandleCategoryChange).toHaveBeenCalled();
  });

  it('handles keydown Tab on last dropdownCategoryListItem to focus first listitem', (): void => {
    const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');
    render(
      <OverlayDropdownCategory {...testProps} budgetCategories={mockedBudgetCategoriesAllEnabled} />
    );

    const item: HTMLElement[] = screen.getAllByTestId('dropdown-category-list-item');
    fireEvent.keyDown(item[item.length - 1], {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });

    expect(focusSpy).toHaveBeenCalled();
  });

  it('handles keydown Back Tab on first dropdownCategoryListItem to focus last listitem', (): void => {
    const focusSpy: jest.SpyInstance = jest.spyOn(HTMLElement.prototype, 'focus');
    render(
      <OverlayDropdownCategory {...testProps} budgetCategories={mockedBudgetCategoriesAllEnabled} />
    );

    const item: HTMLElement[] = screen.getAllByTestId('dropdown-category-list-item');
    fireEvent.keyDown(item[1], {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
      shiftKey: true,
    });

    expect(focusSpy).toHaveBeenCalled();
  });

  it('handles keydown Escape on DropdownCategoryListItem', (): void => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);
    const htmlElement: HTMLElement | null = container.querySelector('.dropdownCategoryList');
    const component: HTMLElement = screen.getByTestId('dropdown-category-bar');
    fireEvent.click(component);
    expect(htmlElement).toHaveClass('isOpen');

    const item: HTMLElement[] = screen.getAllByTestId('dropdown-category-list-item');
    fireEvent.keyDown(item[0], { key: 'Escape', code: 'Escape', keyCode: 27 });

    expect(htmlElement).not.toHaveClass('isOpen');
  });

  it('sets passed selectedItem to top of the list', (): void => {
    render(<OverlayDropdownCategory {...testProps} />);

    expect(DropdownCategoryListItem).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ category: selectedItem }),
      {}
    );
  });

  it('handles a click outside of the list', (): void => {
    const { container } = render(<OverlayDropdownCategory {...testProps} />);
    const htmlElement: HTMLElement | null = container.querySelector('.dropdownCategoryList');
    const component: HTMLElement = screen.getByTestId('dropdown-category-bar');
    fireEvent.click(component);
    expect(htmlElement).toHaveClass('isOpen');

    const element: HTMLElement | null = container.querySelector('.dropdownCategoryContainer');
    fireEvent.mouseDown(element!);

    expect(htmlElement).not.toHaveClass('isOpen');
  });
});
