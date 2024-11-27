import { fireEvent, render } from '@testing-library/react';
import OverlayDropDownColorListItem from './OverlayDropDownColorListItem';
import Colors from '../../constants/Colors';
import { Color } from '../../model/Color';
import React from 'react';

describe('OverlayDropDownColorListItem', () => {
  const itemClassContainer: string = 'dropDownColorListItem';
  const color: Color = Colors[0];
  const mockOnItemClick: (color: Color) => void = jest.fn();
  const mockHandleCategoryKeyDown: (
    event: React.KeyboardEvent<HTMLDivElement>,
    color: Color,
    index: number
  ) => void = jest.fn();
  const clickableRefs: React.MutableRefObject<(HTMLDivElement | null)[]> = {
    current: [document.createElement('div')],
  };
  const index: number = 1;
  const testProps = {
    itemClassContainer,
    color,
    onItemClick: mockOnItemClick,
    handleCategoryKeyDown: mockHandleCategoryKeyDown,
    clickableRefs,
    index,
  };

  it('renders div with passed itemClassContainer', () => {
    const { container } = render(<OverlayDropDownColorListItem {...testProps} />);

    const div = container.querySelector(`.${itemClassContainer}`);

    expect(div).toBeInTheDocument();
  });

  it('renders div dropdownColorCircle', () => {
    const { container } = render(<OverlayDropDownColorListItem {...testProps} />);

    const div = container.querySelector('.dropdownColorCircle');

    expect(div).toBeInTheDocument();
  });

  it('renders label dropdownColorLabel', () => {
    const { container } = render(<OverlayDropDownColorListItem {...testProps} />);

    const div = container.querySelector('.dropdownColorLabel');

    expect(div).toBeInTheDocument();
  });

  it('sets span Already used when color is disabled', () => {
    const { container } = render(
      <OverlayDropDownColorListItem {...testProps} color={{ ...color, disabled: true }} />
    );

    const span = container.querySelector('span');

    expect(span).toHaveTextContent('Already used');
  });

  it('calls onItemClick with passed color when item is clicked', () => {
    const { container } = render(<OverlayDropDownColorListItem {...testProps} />);

    const div = container.querySelector(`.${itemClassContainer}`);
    fireEvent.click(div!);

    expect(mockOnItemClick).toHaveBeenCalledWith(color);
  });

  it('calls mockHandleCategoryKeyDown with passed color when item is tipped', () => {
    const { container } = render(<OverlayDropDownColorListItem {...testProps} />);

    const keyboardEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
    });

    const div = container.querySelector(`.${itemClassContainer}`);
    fireEvent.keyDown(div!, keyboardEvent);

    expect(mockHandleCategoryKeyDown).toHaveBeenCalledWith(
      expect.objectContaining({
        _reactName: 'onKeyDown',
        _targetInst: null,
        altKey: false,
        bubbles: true,
        cancelable: true,
        charCode: 0,
        code: '',
        ctrlKey: false,
        currentTarget: null,
        defaultPrevented: false,
        detail: 0,
        eventPhase: 3,
        getModifierState: expect.any(Function), // expecting a function
        isDefaultPrevented: expect.any(Function), // expecting a function
        isPropagationStopped: expect.any(Function), // expecting a function
        isTrusted: false,
        key: 'Unidentified',
        keyCode: 0,
        locale: undefined,
        location: 0,
        metaKey: false,
        nativeEvent: expect.objectContaining({
          isTrusted: false,
        }),
        repeat: false,
        shiftKey: false,
        target: expect.any(Object),
        timeStamp: expect.any(Number), // expect a number, ignore specific value
        type: 'keydown',
        view: null,
        which: 0,
      }),
      expect.objectContaining({
        code: '#277C78',
        disabled: false,
        displayName: 'Green',
        name: 'green',
      }),
      expect.any(Number) // index, expecting a number
    );
  });
});
