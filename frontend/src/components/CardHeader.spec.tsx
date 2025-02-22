import { fireEvent, render, screen } from '@testing-library/react';
import React, { Fragment, ReactNode } from 'react';
import CardHeader from './CardHeader';
import { CardHeaderItemNameEnum } from '../model/enum/CardHeaderItemNameEnum';
import CardHeaderDropdownList from './CardHeaderDropdownList';
import { CardHeaderItemOperationEnum } from '../model/enum/CardHeaderItemOperationEnum';

const itemOperation = CardHeaderItemNameEnum.BUDGET;
jest.mock(
  './CardHeaderDropdownList',
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <Fragment>
          <div
            data-testid="card-header-dropdown-list"
            onClick={() => props.handleSelection(itemOperation)}
          ></div>
          <div
            data-testid="card-header-dropdown-list-hide"
            onClick={() => props.hideDropdown()}
          ></div>
        </Fragment>
      )
    )
);

describe('CardHeader', () => {
  const title = 'testTitle';
  const color = 'testColor';
  const itemName = CardHeaderItemNameEnum.BUDGET;
  const mockHandleSelection = jest.fn();

  const testProps: {
    title: string;
    color: string;
    itemName: CardHeaderItemNameEnum;
    handleSelection: (itemOperation: CardHeaderItemOperationEnum) => void;
  } = {
    title,
    color,
    itemName,
    handleSelection: mockHandleSelection,
  };

  it('renders div CardHeader', () => {
    const { container } = render(<CardHeader {...testProps} />);
    const htmlElement = container.querySelector('.cardHeader');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div CardHeaderCircle with passed color', () => {
    const { container } = render(<CardHeader {...testProps} />);

    const htmlElement = container.querySelector('.cardHeaderCircle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass(color);
  });

  it('renders label CardHeaderTitle with passed title', () => {
    const { container } = render(<CardHeader {...testProps} />);

    const htmlElement = container.querySelector('.cardHeaderTitle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(title);
  });

  it('renders image CardHeaderEditIcon', () => {
    const { container } = render(<CardHeader {...testProps} />);

    const htmlElement = container.querySelector('.cardHeaderEditIcon');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('alt', 'ellipsis icon');
    expect(htmlElement).toHaveAttribute('src', '/images/icon-ellipsis.svg');
    expect(htmlElement).toHaveAttribute('tabIndex', '0');
  });

  it('sets CardHeaderDropdownList visible when image CardHeaderEditIcon is clicked', () => {
    const { container } = render(<CardHeader {...testProps} />);
    expect(CardHeaderDropdownList).toHaveBeenLastCalledWith(
      expect.objectContaining({ isDropdownVisible: false }),
      {}
    );

    const htmlElement = container.querySelector('.cardHeaderEditIcon');
    fireEvent.click(htmlElement!);

    expect(CardHeaderDropdownList).toHaveBeenLastCalledWith(
      expect.objectContaining({ isDropdownVisible: true }),
      {}
    );
  });

  it('sets CardHeaderDropdownList visible when image CardHeaderEditIcon is pressed', () => {
    const { container } = render(<CardHeader {...testProps} />);
    expect(CardHeaderDropdownList).toHaveBeenLastCalledWith(
      expect.objectContaining({ isDropdownVisible: false }),
      {}
    );

    const htmlElement = container.querySelector('.cardHeaderEditIcon');
    fireEvent.keyDown(htmlElement!, { name: 'Enter', key: 'Enter', code: '13' });

    expect(CardHeaderDropdownList).toHaveBeenLastCalledWith(
      expect.objectContaining({ isDropdownVisible: true }),
      {}
    );
  });

  it('renders component CardHeaderDropdownList', () => {
    render(<CardHeader {...testProps} />);

    const component = screen.getByTestId('card-header-dropdown-list');

    expect(component).toBeInTheDocument();
    expect(CardHeaderDropdownList).toHaveBeenCalledWith(
      {
        handleSelection: mockHandleSelection,
        hideDropdown: expect.any(Function),
        isDropdownVisible: false,
        itemName,
      },
      {}
    );
  });

  it('calls handleSelection when component CardHeaderDropdownList is clicked', () => {
    render(<CardHeader {...testProps} />);

    const component = screen.getByTestId('card-header-dropdown-list');
    fireEvent.click(component);

    expect(mockHandleSelection).toHaveBeenCalledWith(itemOperation);
  });

  it('calls hideDropdown when component CardHeaderDropdownList is clicked', () => {
    const { container } = render(<CardHeader {...testProps} />);
    const htmlElement = container.querySelector('.cardHeaderEditIcon');
    fireEvent.click(htmlElement!);
    expect(CardHeaderDropdownList).toHaveBeenLastCalledWith(
      expect.objectContaining({ isDropdownVisible: true }),
      {}
    );

    const component = screen.getByTestId('card-header-dropdown-list-hide');
    fireEvent.click(component);

    expect(CardHeaderDropdownList).toHaveBeenLastCalledWith(
      expect.objectContaining({ isDropdownVisible: false }),
      {}
    );
  });
});
