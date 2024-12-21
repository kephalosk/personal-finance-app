import { fireEvent, render, screen } from '@testing-library/react';
import CardHeaderDropdownList from './CardHeaderDropdownList';
import CardHeaderDropdownItem from './CardHeaderDropdownItem';
import { CardHeaderItemNameEnum } from '../../model/enum/CardHeaderItemNameEnum';
import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import { CardHeaderItemOperationEnum } from '../../model/enum/CardHeaderItemOperationEnum';

const itemName: CardHeaderItemNameEnum = CardHeaderItemNameEnum.BUDGET;
jest.mock('./CardHeaderDropdownItem', () =>
  jest.fn((props) => (
    <div
      data-testid="card-header-dropdown-item"
      onClick={() => {
        props.handleSelection(CardHeaderItemOperationEnum.EDIT, itemName);
        props.hideDropdown();
      }}
    ></div>
  ))
);

describe('CardHeaderDropdownList', () => {
  const isDropdownVisible: boolean = false;
  const mockHandleSelection: jest.Mock = jest.fn();
  const mockHideDropdown: jest.Mock = jest.fn();

  const testProps = {
    itemName,
    isDropdownVisible,
    handleSelection: mockHandleSelection,
    hideDropdown: mockHideDropdown,
  };

  it('renders div cardHeaderDropdownList with passed prop isDropdownVisible === true', () => {
    const { container } = render(
      <CardHeaderDropdownList {...testProps} isDropdownVisible={true} />
    );

    const element = container.querySelector('.cardHeaderDropdownList');

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('isVisible');
  });

  it('renders div cardHeaderDropdownList with passed prop isDropdownVisible === false', () => {
    const { container } = render(
      <CardHeaderDropdownList {...testProps} isDropdownVisible={false} />
    );

    const element = container.querySelector('.cardHeaderDropdownList');

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('isVisible');
  });

  it('renders components CardHeaderDropdownItem to edit and to delete with passed prop itemName', () => {
    render(<CardHeaderDropdownList {...testProps} isDropdownVisible={false} />);

    const components = screen.getAllByTestId('card-header-dropdown-item');

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
        clickableRefs: { current: [] },
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
        clickableRefs: { current: [] },
      },
      {}
    );
  });

  it('renders hr cardHeaderDropdownListLine', () => {
    const { container } = render(
      <CardHeaderDropdownList {...testProps} isDropdownVisible={false} />
    );

    const element = container.querySelector('.cardHeaderDropdownListLine');

    expect(element).toBeInTheDocument();
  });

  it('calls handleSelection and hideDropdown when a CardHeaderDropdownItem is clicked', () => {
    render(<CardHeaderDropdownList {...testProps} />);

    const components = screen.getAllByTestId('card-header-dropdown-item');
    fireEvent.click(components[0]);

    expect(mockHandleSelection).toHaveBeenCalledWith('');
    expect(mockHideDropdown).toHaveBeenCalled();
  });
});
