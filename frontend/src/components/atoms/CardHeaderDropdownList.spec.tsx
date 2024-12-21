import { fireEvent, render, screen } from '@testing-library/react';
import CardHeaderDropdownList from './CardHeaderDropdownList';
import CardHeaderDropdownItem from './CardHeaderDropdownItem';
import { CardHeaderItemNameEnum } from '../../model/enum/CardHeaderItemNameEnum';
import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import { CardHeaderItemOperationEnum } from '../../model/enum/CardHeaderItemOperationEnum';
import React, { MutableRefObject, KeyboardEvent, useEffect, useRef, ReactNode } from 'react';
import SpyInstance = jest.SpyInstance;

const itemName: CardHeaderItemNameEnum = CardHeaderItemNameEnum.BUDGET;
jest.mock(
  './CardHeaderDropdownItem',
  (): jest.Mock =>
    jest.fn((props): ReactNode => {
      const mockRef: MutableRefObject<null> = useRef(null);

      useEffect((): void => {
        if (props.clickableRefs?.current) {
          props.clickableRefs.current[props.index] = mockRef.current;
        }
      }, [props.index, props.clickableRefs]);

      return (
        <div
          data-testid="card-header-dropdown-item"
          ref={mockRef}
          onClick={(): void =>
            props.handleDropdownClick(CardHeaderItemOperationEnum.EDIT, itemName)
          }
          onKeyDown={(event: KeyboardEvent<HTMLDivElement>): void =>
            props.handleDropdownKeyDown(
              event,
              CardHeaderItemOperationEnum.EDIT,
              itemName,
              props.index
            )
          }
        ></div>
      );
    })
);

describe('CardHeaderDropdownList', () => {
  const isDropdownVisible: boolean = false;
  const mockHandleSelection: jest.Mock = jest.fn();
  const mockHideDropdown: jest.Mock = jest.fn();

  const testProps: {
    itemName: CardHeaderItemNameEnum;
    isDropdownVisible: boolean;
    handleSelection: (
      itemOperation: CardHeaderItemOperationEnum,
      itemName: CardHeaderItemNameEnum
    ) => void;
    hideDropdown: () => void;
  } = {
    itemName,
    isDropdownVisible,
    handleSelection: mockHandleSelection,
    hideDropdown: mockHideDropdown,
  };

  it('renders div cardHeaderDropdownList with passed prop isDropdownVisible === true', () => {
    const { container } = render(
      <CardHeaderDropdownList {...testProps} isDropdownVisible={true} />
    );

    const element: HTMLElement | null = container.querySelector('.cardHeaderDropdownList');

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('isVisible');
  });

  it('renders div cardHeaderDropdownList with passed prop isDropdownVisible === false', () => {
    const { container } = render(
      <CardHeaderDropdownList {...testProps} isDropdownVisible={false} />
    );

    const element: HTMLElement | null = container.querySelector('.cardHeaderDropdownList');

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('isVisible');
  });

  it('renders components CardHeaderDropdownItem to edit and to delete with passed prop itemName', () => {
    render(<CardHeaderDropdownList {...testProps} isDropdownVisible={false} />);

    const components: HTMLElement[] = screen.getAllByTestId('card-header-dropdown-item');

    expect(components).toHaveLength(2);
    expect(CardHeaderDropdownItem).toHaveBeenNthCalledWith(
      1,
      {
        itemOperation: CardHeaderItemOperationEnum.EDIT,
        itemName,
        itemColor: ColorNameEnum.BLACK,
        handleDropdownClick: expect.any(Function),
        handleDropdownKeyDown: expect.any(Function),
        index: 0,
        clickableRefs: {
          current: expect.arrayContaining([expect.any(Object), expect.any(Object)]),
        },
      },
      {}
    );
    expect(CardHeaderDropdownItem).toHaveBeenNthCalledWith(
      2,
      {
        itemOperation: CardHeaderItemOperationEnum.DELETE,
        itemName,
        itemColor: ColorNameEnum.RED,
        handleDropdownClick: expect.any(Function),
        handleDropdownKeyDown: expect.any(Function),
        index: 1,
        clickableRefs: {
          current: expect.arrayContaining([expect.any(Object), expect.any(Object)]),
        },
      },
      {}
    );
  });

  it('renders hr cardHeaderDropdownListLine', () => {
    const { container } = render(
      <CardHeaderDropdownList {...testProps} isDropdownVisible={false} />
    );

    const element: HTMLElement | null = container.querySelector('.cardHeaderDropdownListLine');

    expect(element).toBeInTheDocument();
  });

  it('calls handleSelection and hideDropdown when a CardHeaderDropdownItem is clicked', () => {
    render(<CardHeaderDropdownList {...testProps} />);

    const components: HTMLElement[] = screen.getAllByTestId('card-header-dropdown-item');
    fireEvent.click(components[0]);

    expect(mockHandleSelection).toHaveBeenCalledTimes(1);
    expect(mockHandleSelection).toHaveBeenCalledWith(
      CardHeaderItemOperationEnum.EDIT,
      CardHeaderItemNameEnum.BUDGET
    );
    expect(mockHideDropdown).toHaveBeenCalledTimes(1);
  });

  it('handles keydown enter when CardHeaderDropdownItem is pressed', () => {
    render(<CardHeaderDropdownList {...testProps} />);

    const components: HTMLElement[] = screen.getAllByTestId('card-header-dropdown-item');
    fireEvent.keyDown(components[0], { key: 'Enter', name: 'Enter', code: 13 });

    expect(mockHandleSelection).toHaveBeenCalledTimes(1);
    expect(mockHandleSelection).toHaveBeenCalledWith(
      CardHeaderItemOperationEnum.EDIT,
      CardHeaderItemNameEnum.BUDGET
    );
    expect(mockHideDropdown).toHaveBeenCalledTimes(1);
  });

  it('handles keydown tab when CardHeaderDropdownItem is pressed', () => {
    const focusSpy: SpyInstance = jest.spyOn(HTMLElement.prototype, 'focus');

    render(<CardHeaderDropdownList {...testProps} />);

    const components: HTMLElement[] = screen.getAllByTestId('card-header-dropdown-item');
    fireEvent.keyDown(components[1], {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
    });

    expect(focusSpy).toHaveBeenCalled();
  });

  it('handles keydown tabshift when CardHeaderDropdownItem is pressed', () => {
    const focusSpy: SpyInstance = jest.spyOn(HTMLElement.prototype, 'focus');

    render(<CardHeaderDropdownList {...testProps} />);

    const components: HTMLElement[] = screen.getAllByTestId('card-header-dropdown-item');
    fireEvent.keyDown(components[0], {
      key: 'Tab',
      code: 'Tab',
      keyCode: 9,
      shiftKey: true,
    });

    expect(focusSpy).toHaveBeenCalled();
  });

  it('handles keydown escape when CardHeaderDropdownItem is pressed', () => {
    render(<CardHeaderDropdownList {...testProps} />);

    const components: HTMLElement[] = screen.getAllByTestId('card-header-dropdown-item');
    fireEvent.keyDown(components[0], { key: 'Escape', code: 'Escape', keyCode: 27 });

    expect(mockHideDropdown).toHaveBeenCalledTimes(1);
  });

  it('handles outside click', () => {
    const { container } = render(
      <CardHeaderDropdownList {...testProps} isDropdownVisible={true} />
    );

    const element: HTMLElement | null = container.querySelector('.cardHeaderDropdownList');
    fireEvent.mouseDown(element!);

    expect(mockHideDropdown).toHaveBeenCalledTimes(1);
  });
});
