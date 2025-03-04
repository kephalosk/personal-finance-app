import { fireEvent, render, screen } from '@testing-library/react';
import SidebarMinimize from './SidebarMinimize';
import React from 'react';
import SidebarListEntry from './SidebarListEntry';

jest.mock('./SidebarListEntry', () => jest.fn(() => <div data-testid="sidebar-list-entry"></div>));

describe('SidebarMinimize', () => {
  const mockOnMinimize = jest.fn();
  const testProps = {
    onMinimize: mockOnMinimize,
  };

  it('renders div sidebarMinimizeWrapper', () => {
    const { container } = render(<SidebarMinimize {...testProps} />);

    const div = container.querySelector('.sidebarMinimizeWrapper');

    expect(div).toBeInTheDocument();
  });

  it('renders component SidebarListEntry with correct props', () => {
    render(<SidebarMinimize {...testProps} />);

    const component = screen.getByTestId('sidebar-list-entry');

    expect(component).toBeInTheDocument();
    expect(SidebarListEntry).toHaveBeenCalledWith(
      {
        description: 'minimize Sidebar',
        altImgSrc: '/images/icon-maximize-menu.svg',
        className: 'sidebarMinimize',
        hasTabIndex: false,
        imgAlt: 'minimize icon',
        imgSrc: '/images/icon-minimize-menu.svg',
        isMinimized: false,
        name: 'Minimize Menu',
      },
      {}
    );
  });

  it('passes the correct icon of SidebarMinimize if isMinimized is false', () => {
    localStorage.clear();
    render(<SidebarMinimize {...testProps} />);

    const component = screen.getByTestId('sidebar-list-entry');

    expect(component).toBeInTheDocument();
    expect(SidebarListEntry).toHaveBeenCalledWith(
      {
        description: 'minimize Sidebar',
        altImgSrc: '/images/icon-maximize-menu.svg',
        className: 'sidebarMinimize',
        hasTabIndex: false,
        imgAlt: 'minimize icon',
        imgSrc: '/images/icon-minimize-menu.svg',
        isMinimized: false,
        name: 'Minimize Menu',
      },
      {}
    );
  });

  it('sets the correct icon of SidebarMinimize if isMinimized is true in store', () => {
    localStorage.setItem('isMinimized', JSON.stringify(true));
    render(<SidebarMinimize {...testProps} />);

    const component = screen.getByTestId('sidebar-list-entry');

    expect(component).toBeInTheDocument();
    expect(SidebarListEntry).toHaveBeenCalledWith(
      {
        description: 'minimize Sidebar',
        altImgSrc: '/images/icon-maximize-menu.svg',
        className: 'sidebarMinimize',
        hasTabIndex: false,
        imgAlt: 'minimize icon',
        imgSrc: '/images/icon-minimize-menu.svg',
        isMinimized: true,
        name: 'Minimize Menu',
      },
      {}
    );
    localStorage.clear();
  });

  it('sets the correct icon of SidebarMinimize if sidebarMinimizeWrapper is clicked', () => {
    localStorage.setItem('isMinimized', JSON.stringify(false));
    const { container } = render(<SidebarMinimize {...testProps} />);
    let component = screen.getByTestId('sidebar-list-entry');
    expect(component).toBeInTheDocument();
    expect(SidebarListEntry).toHaveBeenCalledWith(
      {
        description: 'minimize Sidebar',
        altImgSrc: '/images/icon-maximize-menu.svg',
        className: 'sidebarMinimize',
        hasTabIndex: false,
        imgAlt: 'minimize icon',
        imgSrc: '/images/icon-minimize-menu.svg',
        isMinimized: false,
        name: 'Minimize Menu',
      },
      {}
    );

    const minimizeDiv = container.querySelector('.sidebarMinimizeWrapper');
    fireEvent.click(minimizeDiv!);

    component = screen.getByTestId('sidebar-list-entry');
    expect(component).toBeInTheDocument();
    expect(SidebarListEntry).toHaveBeenLastCalledWith(
      {
        description: 'minimize Sidebar',
        altImgSrc: '/images/icon-maximize-menu.svg',
        className: 'sidebarMinimize',
        hasTabIndex: false,
        imgAlt: 'minimize icon',
        imgSrc: '/images/icon-minimize-menu.svg',
        isMinimized: true,
        name: 'Minimize Menu',
      },
      {}
    );
    localStorage.clear();
  });

  it('calls callback function onMinimize when div sidebarMinimizeWrapper is clicked', () => {
    const { container } = render(<SidebarMinimize {...testProps} />);

    const divElement = container.querySelector('.sidebarMinimizeWrapper');
    fireEvent.click(divElement!);

    expect(mockOnMinimize).toHaveBeenCalled();
  });

  it('handles keydown Enter of div sidebarMinimizeWrapper', () => {
    const { container } = render(<SidebarMinimize {...testProps} />);

    const divElement = container.querySelector('.sidebarMinimizeWrapper');
    fireEvent.keyDown(divElement!, { key: 'Enter', code: 'Enter', keyCode: 13 });

    expect(mockOnMinimize).toHaveBeenCalled();
  });
});
