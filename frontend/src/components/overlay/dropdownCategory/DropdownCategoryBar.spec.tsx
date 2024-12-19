import { fireEvent, render } from '@testing-library/react';
import DropdownCategoryBar from './DropdownCategoryBar';
import { mockedBudgetCategory } from '../../../fixtures/MockedBudgetCategory';
import { BudgetCategory } from '../../../model/BudgetCategory';

describe('DropdownCategoryBar', () => {
  const selectedItem: BudgetCategory = mockedBudgetCategory;
  const mockHandleClick: jest.Mock = jest.fn();
  const mockHandleKeyDown: jest.Mock = jest.fn();
  const dropdownCategoryBarClass: string = 'dropdownCategoryBar';
  const dropdownCategoryIconClass: string = 'dropdownCategoryIconClass';

  const testProps = {
    selectedItem,
    handleClick: mockHandleClick,
    handleKeyDown: mockHandleKeyDown,
    dropdownCategoryBarClass,
    dropdownCategoryIconClass,
  };

  it('renders div DropdownCategoryBarContainer', () => {
    const { container } = render(<DropdownCategoryBar {...testProps} />);

    const element = container.querySelector('.DropdownCategoryBarContainer');

    expect(element).toBeInTheDocument();
  });

  it(`renders div ${dropdownCategoryBarClass} with passed prop selectedItem.disabled === true`, () => {
    const { container } = render(
      <DropdownCategoryBar {...testProps} selectedItem={{ ...selectedItem, disabled: true }} />
    );

    const element = container.querySelector(`.${dropdownCategoryBarClass}`);

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('tabIndex', '0');
    expect(element).toHaveClass('disabled');
  });

  it(`renders div ${dropdownCategoryBarClass} with passed prop selectedItem.disabled === false`, () => {
    const { container } = render(
      <DropdownCategoryBar {...testProps} selectedItem={{ ...selectedItem, disabled: false }} />
    );

    const element = container.querySelector(`.${dropdownCategoryBarClass}`);

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('disabled');
  });

  it(`calls handleClick when div ${dropdownCategoryBarClass} is clicked`, () => {
    const { container } = render(<DropdownCategoryBar {...testProps} />);

    const element = container.querySelector(`.${dropdownCategoryBarClass}`);
    fireEvent.click(element!);

    expect(mockHandleClick).toHaveBeenCalled();
  });

  it(`calls handleKeyDown when div ${dropdownCategoryBarClass} is pressed`, () => {
    const { container } = render(<DropdownCategoryBar {...testProps} />);

    const element = container.querySelector(`.${dropdownCategoryBarClass}`);
    fireEvent.keyDown(element!);

    expect(mockHandleKeyDown).toHaveBeenCalled();
  });

  it('renders div dropdownCategoryBarItem with passed prop selectedItem.disabled === true', () => {
    const { container } = render(
      <DropdownCategoryBar {...testProps} selectedItem={{ ...selectedItem, disabled: true }} />
    );

    const element = container.querySelector('.dropdownCategoryBarItem');

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('disabled');
  });

  it('renders div dropdownCategoryBarItem with passed prop selectedItem.disabled === false', () => {
    const { container } = render(
      <DropdownCategoryBar {...testProps} selectedItem={{ ...selectedItem, disabled: false }} />
    );

    const element = container.querySelector('.dropdownCategoryBarItem');

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('disabled');
  });

  it('renders label dropdownCategoryBarItemLabel with passed prop selectedItem.name', () => {
    const { container } = render(<DropdownCategoryBar {...testProps} />);

    const element = container.querySelector('.dropdownCategoryBarItemLabel');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(selectedItem.name);
  });

  it('renders span dropdownCategoryBarItemInfo when passed prop selectedItem.disabled === true', () => {
    const { container } = render(
      <DropdownCategoryBar {...testProps} selectedItem={{ ...selectedItem, disabled: true }} />
    );

    const element = container.querySelector('.dropdownCategoryBarItemInfo');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Already used');
  });

  it('does not render span dropdownCategoryBarItemInfo when passed prop selectedItem.disabled === false', () => {
    const { container } = render(
      <DropdownCategoryBar {...testProps} selectedItem={{ ...selectedItem, disabled: false }} />
    );

    const element = container.querySelector('.dropdownCategoryBarItemInfo');

    expect(element).not.toBeInTheDocument();
  });

  it(`renders img ${dropdownCategoryIconClass}`, () => {
    const { container } = render(<DropdownCategoryBar {...testProps} />);

    const element = container.querySelector(`.${dropdownCategoryIconClass}`);

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('alt', 'caret icon');
    expect(element).toHaveAttribute('aria-hidden', 'true');
    expect(element).toHaveAttribute('src', '/images/icon-caret-down.svg');
  });

  it('renders label dropdownCategoryValidation with passed prop selectedItem.disabled === true', () => {
    const { container } = render(
      <DropdownCategoryBar {...testProps} selectedItem={{ ...selectedItem, disabled: true }} />
    );

    const element = container.querySelector('.dropdownCategoryValidation');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('There is already a Budget for every Category!');
    expect(element).toHaveClass('visible');
  });

  it('renders label dropdownCategoryValidation with passed prop selectedItem.disabled === false', () => {
    const { container } = render(
      <DropdownCategoryBar {...testProps} selectedItem={{ ...selectedItem, disabled: false }} />
    );

    const element = container.querySelector('.dropdownCategoryValidation');

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('visible');
  });
});
