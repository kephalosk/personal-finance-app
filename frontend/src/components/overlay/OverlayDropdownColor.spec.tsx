import { fireEvent, render, screen } from '@testing-library/react';
import Colors from '../../constants/Colors';
import { Color } from '../../model/Color';
import React from 'react';
import OverlayDropdownColor from './OverlayDropdownColor';
import OverlayDropDownColorListItem from './OverlayDropDownColorListItem';

jest.mock('./OverlayDropDownColorListItem', () =>
  jest.fn(({ onItemClick, handleColorKeyDown, color, index, clickableRefs }) => (
    <div
      className={`${index + 1}`}
      data-testid="overlay-dropdown-color-list-item"
      ref={(el) => {
        if (!color.disabled) {
          clickableRefs.current[index + 1] = el;
        }
      }}
      onClick={onItemClick}
      onKeyDown={(event) => handleColorKeyDown(event, color, index + 1)}
      tabIndex={0}
    ></div>
  ))
);

jest.mock('./OverlayDropdownIcon', () =>
  jest.fn(() => <div data-testid="dropdown-color-icon"></div>)
);

jest.mock('../ScrollToTop', () => jest.fn(() => <div data-testid="scroll-to-top"></div>));

describe('OverlayDropDownColorListItem', () => {
  const selectedColor: Color = Colors[0];
  const mockHandleColorChange: (color: Color) => void = jest.fn();
  const colors: Color[] = Colors;
  const testProps = {
    selectedColor,
    handleColorChange: mockHandleColorChange,
    colors,
  };

  it('renders div dropdownColorContainer', () => {
    const { container } = render(<OverlayDropdownColor {...testProps} />);

    const div = container.querySelector('.dropdownColorContainer');

    expect(div).toBeInTheDocument();
  });

  it('renders div dropdownColorWrapper', () => {
    const { container } = render(<OverlayDropdownColor {...testProps} />);

    const div = container.querySelector('.dropdownColorWrapper');

    expect(div).toBeInTheDocument();
  });

  it('renders div dropdownColor', () => {
    const { container } = render(<OverlayDropdownColor {...testProps} />);

    const div = container.querySelector('.dropdownColor');

    expect(div).toBeInTheDocument();
  });

  it('renders div dropdownColorCircle with passed selectedColor', () => {
    const { container } = render(<OverlayDropdownColor {...testProps} />);

    const div = container.querySelector('.dropdownColorCircle');

    expect(div).toBeInTheDocument();
    expect(div).toHaveClass(selectedColor.name);
  });

  it('renders closed div dropDownColorList', () => {
    const { container } = render(<OverlayDropdownColor {...testProps} />);

    const div = container.querySelector('.dropDownColorList');

    expect(div).toBeInTheDocument();
    expect(div).not.toHaveClass('isOpen');
  });

  it('renders components OverlayDropDownColorListItem with correct Props and passed colors', () => {
    render(<OverlayDropdownColor {...testProps} />);

    const components = screen.getAllByTestId('overlay-dropdown-color-list-item');

    expect(components).toHaveLength(16);
    colors.forEach((color, index) => {
      expect(OverlayDropDownColorListItem).toHaveBeenCalledWith(
        expect.objectContaining({
          clickableRefs: {
            current: expect.any(Array),
          },
          color: color,
          handleColorKeyDown: expect.any(Function),
          index: index - 1,
          itemClassContainer: `dropDownColorListItem ${index}`,
          onItemClick: expect.any(Function),
        }),
        {}
      );
    });
  });

  it('renders hr dropDownColorListItemLine', () => {
    const { container } = render(<OverlayDropdownColor {...testProps} />);

    const hrs = container.querySelectorAll('.dropDownColorListItemLine');

    const expectedAmountOfRenderedHr = Colors.length - 1;
    expect(hrs).toHaveLength(expectedAmountOfRenderedHr);
  });

  it('renders icon OverlayDropdownIcon', () => {
    render(<OverlayDropdownColor {...testProps} />);

    const icon = screen.getByTestId('dropdown-color-icon');

    expect(icon).toBeInTheDocument();
  });

  it('renders component ScrollToTop', () => {
    render(<OverlayDropdownColor {...testProps} />);

    const icon = screen.getByTestId('scroll-to-top');

    expect(icon).toBeInTheDocument();
  });

  it('opens dropDownColorList when dropdownColorWrapper is clicked', () => {
    const { container } = render(<OverlayDropdownColor {...testProps} />);

    const div = container.querySelector('.dropdownColorWrapper');
    fireEvent.click(div!);

    const list = container.querySelector('.dropDownColorList');
    expect(list).toHaveClass('isOpen');
  });

  it('calls handleColorChange when a OverlayDropDownColorListItem is clicked', () => {
    render(<OverlayDropdownColor {...testProps} />);

    const components = screen.getAllByTestId('overlay-dropdown-color-list-item');
    fireEvent.click(components[0]!);

    expect(mockHandleColorChange).toHaveBeenCalled();
  });

  it('closes itemList when a OverlayDropDownColorListItem is clicked', () => {
    const { container } = render(<OverlayDropdownColor {...testProps} />);
    const div = container.querySelector('.dropdownColorWrapper');
    fireEvent.click(div!);
    const list = container.querySelector('.dropDownColorList');
    expect(list).toHaveClass('isOpen');

    const components = screen.getAllByTestId('overlay-dropdown-color-list-item');
    fireEvent.click(components[0]!);

    expect(list).not.toHaveClass('isOpen');
  });

  it('closes itemList when an outsideClick is performed', () => {
    const { container } = render(<OverlayDropdownColor {...testProps} />);
    const div = container.querySelector('.dropdownColorWrapper');
    fireEvent.click(div!);
    const list = container.querySelector('.dropDownColorList');
    expect(list).toHaveClass('isOpen');

    const notListElement = container.querySelector('.dropdownColorContainer');
    fireEvent.mouseDown(notListElement!);

    expect(list).not.toHaveClass('isOpen');
  });

  it('handles keydown enter on dropdownColorWrapper', () => {
    const { container } = render(<OverlayDropdownColor {...testProps} />);

    const div = container.querySelector('.dropdownColorWrapper');
    fireEvent.keyDown(div!, { key: 'Enter', code: 'Enter', keyCode: 13 });

    const list = container.querySelector('.dropDownColorList');
    expect(list).toHaveClass('isOpen');
  });

  it('handles keydown enter on OverlayDropDownColorListItem', () => {
    const { container } = render(<OverlayDropdownColor {...testProps} />);
    const div = container.querySelector('.dropdownColorWrapper');
    fireEvent.click(div!);
    const list = container.querySelector('.dropDownColorList');
    expect(list).toHaveClass('isOpen');

    const components = screen.getAllByTestId('overlay-dropdown-color-list-item');
    fireEvent.keyDown(components[0]!, { key: 'Enter', code: 'Enter', keyCode: 13 });

    expect(list).not.toHaveClass('isOpen');
  });

  it('handles keydown tab on last OverlayDropDownColorListItem to jump back to first Item', () => {
    const { container } = render(<OverlayDropdownColor {...testProps} />);
    const div = container.querySelector('.dropdownColorWrapper');
    fireEvent.click(div!);
    const list = container.querySelector('.dropDownColorList');
    expect(list).toHaveClass('isOpen');

    const components = screen.getAllByTestId('overlay-dropdown-color-list-item');
    fireEvent.keyDown(components[colors.length - 1]!, { key: 'Tab', code: 'Tab', keyCode: 9 });

    expect(components[0]).toHaveFocus();
    expect(components[0]).toHaveClass('0');
  });

  it('handles keydown back tab on first OverlayDropDownColorListItem to jump to last Item', () => {
    const { container } = render(<OverlayDropdownColor {...testProps} />);
    const div = container.querySelector('.dropdownColorWrapper');
    fireEvent.click(div!);
    const list = container.querySelector('.dropDownColorList');
    expect(list).toHaveClass('isOpen');

    const components = screen.getAllByTestId('overlay-dropdown-color-list-item');
    fireEvent.keyDown(components[0]!, { key: 'Tab', code: 'Tab', keyCode: 9, shiftKey: true });

    expect(components[colors.length - 1]).toHaveFocus();
    expect(components[colors.length - 1]).toHaveClass(`${colors.length - 1}`);
  });

  it('handles keydown Escape and closes list', () => {
    const { container } = render(<OverlayDropdownColor {...testProps} />);
    const div = container.querySelector('.dropdownColorWrapper');
    fireEvent.click(div!);
    const list = container.querySelector('.dropDownColorList');
    expect(list).toHaveClass('isOpen');

    const components = screen.getAllByTestId('overlay-dropdown-color-list-item');
    fireEvent.keyDown(components[0]!, { key: 'Escape', code: 'Escape', keyCode: 27 });

    expect(list).not.toHaveClass('isOpen');
  });
});
