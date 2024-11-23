import { fireEvent, render, screen } from '@testing-library/react';
import React, { act } from 'react';
import useIsSmallScreen from '../../globals/hooks/useIsSmallScreen';
import SelectionMenu from './SelectionMenu';
import { Item } from '../../model/Item';

jest.mock('../../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('SelectionMenu', () => {
  const selectedItem = 'General';
  const items: Item[] = [
    { key: 'all', name: 'All Transactions' },
    { key: 'general', name: 'General' },
  ];
  let mockHandleItemChange: jest.Mock<() => void>;
  const mobileIcon = '/images/icon-caret-down.svg';
  const hasSmallerWidth = false;
  const testProps = {
    selectedItem,
    items,
    mobileIcon,
    hasSmallerWidth,
  };

  const menuClass = 'selectionMenuListElement';

  beforeEach(() => {
    mockHandleItemChange = jest.fn();
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
  });

  it('renders div selectionMenuWrapper', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(
        <SelectionMenu {...testProps} handleItemChange={mockHandleItemChange} />
      );
      return container;
    });

    const htmlElement = cut.querySelector('.selectionMenuWrapper');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div selectionMenu with passed selectedItem', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(
        <SelectionMenu {...testProps} handleItemChange={mockHandleItemChange} />
      );
      return container;
    });

    const htmlElement = cut.querySelector('.selectionMenu');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(selectedItem);
  });

  it('renders with smallerWidth, when hasSmallerWidth is passed as true', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(
        <SelectionMenu
          {...testProps}
          handleItemChange={mockHandleItemChange}
          hasSmallerWidth={true}
        />
      );
      return container;
    });

    const htmlElement = cut.querySelector('.selectionMenu');
    fireEvent.click(htmlElement!);
    const htmlElement2 = cut.querySelector('.selectionMenuList');

    expect(htmlElement).toHaveClass('smallerWidth');
    expect(htmlElement2).toHaveClass('smallerWidth');
  });

  it('renders div selectionMenuList', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(
        <SelectionMenu {...testProps} handleItemChange={mockHandleItemChange} />
      );
      return container;
    });

    const htmlElement = cut.querySelector('.selectionMenu');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders labels with passed items', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(
        <SelectionMenu {...testProps} handleItemChange={mockHandleItemChange} />
      );
      return container;
    });

    const htmlElement = cut.querySelector('.selectionMenu');
    fireEvent.click(htmlElement!);
    const labels = cut.querySelectorAll(`.${menuClass}`);

    expect(labels).toHaveLength(2);
    expect(labels[0]).toHaveTextContent('General');
    expect(labels[1]).toHaveTextContent('All Transactions');
  });

  it('renders caret icon', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(
        <SelectionMenu {...testProps} handleItemChange={mockHandleItemChange} />
      );
      return container;
    });

    const htmlElement = cut.querySelector('.selectionMenuIcon');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('src', '/images/icon-caret-down.svg');
  });

  it('renders passed mobile icon in mobile view', async () => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(true);
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(
        <SelectionMenu {...testProps} handleItemChange={mockHandleItemChange} />
      );
      return container;
    });

    const htmlElement = cut.querySelector('.selectionMenuIcon');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('src', mobileIcon);
  });

  it('calls handleItemChange when a different option is selected', async () => {
    await act(async (): Promise<HTMLElement> => {
      const { container } = render(
        <SelectionMenu {...testProps} handleItemChange={mockHandleItemChange} />
      );
      return container;
    });

    const menuWrapper = screen.getByTestId('selection-menu');
    const menu = menuWrapper.querySelector('.selectionMenu');
    fireEvent.click(menu!);
    const optionElement = screen.getByText('All Transactions');
    fireEvent.click(optionElement);

    expect(mockHandleItemChange).toHaveBeenCalledWith('all');
  });
});
