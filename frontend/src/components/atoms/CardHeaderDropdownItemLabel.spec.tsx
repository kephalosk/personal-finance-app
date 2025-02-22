import { fireEvent, render } from '@testing-library/react';
import CardHeaderDropdownItemLabel from './CardHeaderDropdownItemLabel';
import { CardHeaderItemOperationEnum } from '../../model/enum/CardHeaderItemOperationEnum';
import { CardHeaderItemNameEnum } from '../../model/enum/CardHeaderItemNameEnum';
import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import React from 'react';

describe('CardHeaderDropdownItemLabel', () => {
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

  it('renders tabable div cardHeaderDropdownItem with passed prop itemColor', () => {
    const { container } = render(<CardHeaderDropdownItemLabel {...testProps} />);

    const element = container.querySelector('.cardHeaderDropdownItem');

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(itemColor);
    expect(element).toHaveAttribute('tabIndex', '0');
  });

  it('calls handleDropdownClick when div cardHeaderDropdownItem is clicked', () => {
    const { container } = render(<CardHeaderDropdownItemLabel {...testProps} />);

    const element = container.querySelector('.cardHeaderDropdownItem');
    fireEvent.click(element!);

    expect(element).toBeInTheDocument();
    expect(mockHandleDropdownClick).toHaveBeenCalledWith(itemOperation);
  });

  it('calls handleDropdownKeyDown with passed props itemName and index when div cardHeaderDropdownItem is pressed', () => {
    const { container } = render(<CardHeaderDropdownItemLabel {...testProps} />);

    const element = container.querySelector('.cardHeaderDropdownItem');
    fireEvent.keyDown(element!);

    expect(element).toBeInTheDocument();
    expect(mockHandleDropdownKeyDown).toHaveBeenCalledWith(
      expect.any(Object),
      itemOperation,
      index
    );
  });

  it('renders label cardHeaderDropdownItemLabel with passed props itemOperation and itemName', () => {
    const { container } = render(<CardHeaderDropdownItemLabel {...testProps} />);

    const element = container.querySelector('.cardHeaderDropdownItemLabel');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(`${itemOperation} ${itemName}`);
  });

  it('adds div cardHeaderDropdownItem to passed prop clickableRefs', () => {
    const clickableRefs = { current: [] as (HTMLDivElement | null)[] };

    render(<CardHeaderDropdownItemLabel {...testProps} clickableRefs={clickableRefs} />);

    expect(clickableRefs.current[testProps.index]).not.toBeNull();
    expect(clickableRefs.current[testProps.index]).toBeInstanceOf(HTMLDivElement);
  });
});
