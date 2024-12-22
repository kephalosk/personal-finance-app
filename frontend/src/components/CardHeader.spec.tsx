import { fireEvent, render, screen } from '@testing-library/react';
import React, { ReactNode } from 'react';
import CardHeader from './CardHeader';
import { CardHeaderItemNameEnum } from '../model/enum/CardHeaderItemNameEnum';
import CardHeaderDropdownList from './atoms/CardHeaderDropdownList';
import { CardHeaderItemOperationEnum } from '../model/enum/CardHeaderItemOperationEnum';

const itemOperation = CardHeaderItemNameEnum.BUDGET;
const itemName = CardHeaderItemNameEnum.BUDGET;
jest.mock(
  './atoms/CardHeaderDropdownList',
  (): jest.Mock =>
    jest.fn(
      (props): ReactNode => (
        <div
          data-testid="card-header-dropdown-list"
          onClick={props.handleSelection(itemOperation, itemName)}
        ></div>
      )
    )
);

describe('CardHeader', () => {
  const title = 'testTitle';
  const color = 'testColor';
  const mockHandleSelection = jest.fn();

  const testProps: {
    title: string;
    color: string;
    itemName: CardHeaderItemNameEnum;
    handleSelection: (
      itemOperation: CardHeaderItemOperationEnum,
      itemName: CardHeaderItemNameEnum
    ) => void;
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

  it('renders select CardHeaderEditIcon', () => {
    const { container } = render(<CardHeader {...testProps} />);

    const htmlElement = container.querySelector('.cardHeaderEditIcon');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('alt', 'ellipsis icon');
    expect(htmlElement).toHaveAttribute('aria-hidden', 'true');
    expect(htmlElement).toHaveAttribute('src', '/images/icon-ellipsis.svg');
    expect(htmlElement).toHaveAttribute('tabIndex', '0');
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

    expect(mockHandleSelection).toHaveBeenCalledWith(itemOperation, itemName);
  });
});
