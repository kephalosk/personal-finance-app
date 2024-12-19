import { fireEvent, render } from '@testing-library/react';
import OverlayDropDownColorListItem from './OverlayDropDownColorListItem';
import Colors from '../../constants/Colors';
import { Color } from '../../model/Color';
import React from 'react';

describe('OverlayDropDownColorListItem', () => {
  const itemClassContainer: string = 'dropDownColorListItem';
  const color: Color = Colors[0];
  const mockOnItemClick: (color: Color) => void = jest.fn();
  const mockHandleColorKeyDown: (
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
    handleColorKeyDown: mockHandleColorKeyDown,
    clickableRefs,
    index,
  };

  it('renders div with passed itemClassContainer', () => {
    const { container } = render(<OverlayDropDownColorListItem {...testProps} />);

    const div = container.querySelector(`.${itemClassContainer}`);

    expect(div).toBeInTheDocument();
  });

  it('renders div itemClassContainer with class disabled when passep prop color.disabled is true', () => {
    const { container } = render(
      <OverlayDropDownColorListItem {...testProps} color={{ ...color, disabled: true }} />
    );

    const div = container.querySelector(`.${itemClassContainer}`);

    expect(div).toHaveClass('disabled');
  });

  it('renders div dropdownColorCircle with passed prop color.name', () => {
    const { container } = render(<OverlayDropDownColorListItem {...testProps} />);

    const div = container.querySelector('.dropdownColorCircle');

    expect(div).toBeInTheDocument();
    expect(div).toHaveClass(color.name);
  });

  it('renders label dropdownColorLabel', () => {
    const { container } = render(<OverlayDropDownColorListItem {...testProps} />);

    const div = container.querySelector('.dropdownColorLabel');

    expect(div).toBeInTheDocument();
    expect(div).toHaveTextContent(color.displayName);
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

  it('calls mockHandleColorKeyDown with passed color when item is tipped', () => {
    const { container } = render(<OverlayDropDownColorListItem {...testProps} />);

    const keyboardEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
    });

    const div = container.querySelector(`.${itemClassContainer}`);
    fireEvent.keyDown(div!, keyboardEvent);

    expect(mockHandleColorKeyDown).toHaveBeenCalledWith(expect.any(Object), color, index + 1);
  });
});
