import { fireEvent, render } from '@testing-library/react';
import CardHeaderDropdownItem from './CardHeaderDropdownItem';
import { CardHeaderItemOperationEnum } from '../../model/enum/CardHeaderItemOperationEnum';
import { CardHeaderItemNameEnum } from '../../model/enum/CardHeaderItemNameEnum';
import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import React from 'react';

describe('CardHeaderDropdownItem', () => {
  const itemOperation: CardHeaderItemOperationEnum = CardHeaderItemOperationEnum.EDIT;
  const itemName: CardHeaderItemNameEnum = CardHeaderItemNameEnum.BUDGET;
  const itemColor: ColorNameEnum = ColorNameEnum.BLACK;
  const mockHandleDropdownClick: jest.Mock = jest.fn();
  const mockHandleDropdownKeyDown: jest.Mock = jest.fn();
  const index: number = 1;
  const clickableRefs = { current: [] as (HTMLDivElement | null)[] };

  const testProps = {
    itemOperation,
    itemName,
    itemColor,
    handleDropdownClick: mockHandleDropdownClick,
    handleDropdownKeyDown: mockHandleDropdownKeyDown,
    index,
    clickableRefs,
  };

  it('renders tabable div cardHeaderDropdownItem', () => {
    const { container } = render(<CardHeaderDropdownItem {...testProps} />);

    const element = container.querySelector('.cardHeaderDropdownItem');

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('tabIndex', '0');
  });

  it('calls handleDropdownClick when div cardHeaderDropdownItem is clicked', () => {
    const { container } = render(<CardHeaderDropdownItem {...testProps} />);

    const element = container.querySelector('.cardHeaderDropdownItem');
    fireEvent.click(element!);

    expect(element).toBeInTheDocument();
    expect(mockHandleDropdownClick).toHaveBeenCalledWith(itemOperation, itemName);
  });

  it('calls handleDropdownKeyDown with passed props itemName and index when div cardHeaderDropdownItem is pressed', () => {
    const { container } = render(<CardHeaderDropdownItem {...testProps} />);

    const element = container.querySelector('.cardHeaderDropdownItem');
    fireEvent.keyDown(element!);

    expect(element).toBeInTheDocument();
    expect(mockHandleDropdownKeyDown).toHaveBeenCalledWith(
      expect.any(Object),
      itemOperation,
      itemName,
      index
    );
  });

  it('renders label cardHeaderDropdownItemLabel with passed props itemColor, itemOperation and itemName', () => {
    const { container } = render(<CardHeaderDropdownItem {...testProps} />);

    const element = container.querySelector('.cardHeaderDropdownItemLabel');

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(itemColor);
    expect(element).toHaveTextContent(`${itemOperation} ${itemName}`);
  });

  it('adds div cardHeaderDropdownItem to passed prop clickableRefs', () => {
    const clickableRefs = { current: [] as (HTMLDivElement | null)[] };

    render(<CardHeaderDropdownItem {...testProps} clickableRefs={clickableRefs} />);

    expect(clickableRefs.current[testProps.index + 1]).not.toBeNull();
    expect(clickableRefs.current[testProps.index + 1]).toBeInstanceOf(HTMLDivElement);
  });
});
