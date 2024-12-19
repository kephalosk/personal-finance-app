import DropdownCategoryListItem from './DropdownCategoryListItem';
import { fireEvent, render } from '@testing-library/react';
import { mockedBudgetCategory } from '../../../fixtures/MockedBudgetCategory';

describe('DropdownCategoryListItem', () => {
  const category = mockedBudgetCategory;
  const mockOnItemClick = jest.fn();
  const mockHandleCategoryKeyDown = jest.fn();
  const clickableRefs = { current: [] as (HTMLDivElement | null)[] };
  const index = 0;
  const dropdownCategoryListItemClass = 'dropdownCategoryListItem';
  const dropdownCategoryListItemContainerClass = 'dropdownCategoryListItemContainer';
  const dropdownCategoryListItemLabelClass = 'dropdownCategoryListItemLabel';

  const testProps = {
    category,
    onItemClick: mockOnItemClick,
    handleCategoryKeyDown: mockHandleCategoryKeyDown,
    clickableRefs,
    index,
    dropdownCategoryListItemContainerClass,
    dropdownCategoryListItemClass,
    dropdownCategoryListItemLabelClass,
  };

  it(`renders div ${dropdownCategoryListItemContainerClass} with passed prop category.disabled = false`, () => {
    const { container } = render(
      <DropdownCategoryListItem
        {...testProps}
        category={{ ...mockedBudgetCategory, disabled: false }}
      />
    );

    const element = container.querySelector(`.${dropdownCategoryListItemContainerClass}`);

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('disabled');
  });

  it(`renders div ${dropdownCategoryListItemContainerClass} with passed prop category.disabled = false`, () => {
    const { container } = render(
      <DropdownCategoryListItem
        {...testProps}
        category={{ ...mockedBudgetCategory, disabled: true }}
      />
    );

    const element = container.querySelector(`.${dropdownCategoryListItemContainerClass}`);

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('disabled');
  });

  it(`renders div ${dropdownCategoryListItemClass} with passed prop category.disabled = false`, () => {
    const { container } = render(
      <DropdownCategoryListItem
        {...testProps}
        category={{ ...mockedBudgetCategory, disabled: false }}
      />
    );

    const element = container.querySelector(`.${dropdownCategoryListItemClass}`);

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('disabled');
  });

  it(`renders div ${dropdownCategoryListItemClass} with passed prop category.disabled = false`, () => {
    const { container } = render(
      <DropdownCategoryListItem
        {...testProps}
        category={{ ...mockedBudgetCategory, disabled: true }}
      />
    );

    const element = container.querySelector(`.${dropdownCategoryListItemClass}`);

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('disabled');
  });

  it(`calls onItemClick with category when ${dropdownCategoryListItemClass} is clicked`, () => {
    const { container } = render(<DropdownCategoryListItem {...testProps} />);

    const element = container.querySelector(`.${dropdownCategoryListItemClass}`);
    fireEvent.click(element!);

    expect(element).toBeInTheDocument();
    expect(mockOnItemClick).toHaveBeenCalledWith(category);
  });

  it(`calls handleCategoryKeyDown with category and index when ${dropdownCategoryListItemClass} is pressed`, () => {
    const { container } = render(<DropdownCategoryListItem {...testProps} />);

    const element = container.querySelector(`.${dropdownCategoryListItemClass}`);
    fireEvent.keyDown(element!);

    expect(element).toBeInTheDocument();
    expect(mockHandleCategoryKeyDown).toHaveBeenCalledWith(expect.any(Object), category, index + 1);
  });

  it.each([
    [false, 0],
    [true, -1],
  ])(
    `is tabable with passed prop category.disabled === %s`,
    (disabled: boolean, tabindex: number) => {
      const { container } = render(
        <DropdownCategoryListItem {...testProps} category={{ ...mockedBudgetCategory, disabled }} />
      );

      const element = container.querySelector(`.${dropdownCategoryListItemClass}`);

      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('tabIndex', `${tabindex}`);
      expect(element).toHaveAttribute('ref', '');
    }
  );
});
