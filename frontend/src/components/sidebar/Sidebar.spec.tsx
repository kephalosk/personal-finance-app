import Sidebar from './Sidebar';
import { fireEvent, render, screen } from '@testing-library/react';
import { SidebarPages } from '../../constants/SidebarPages';
import { useLocation } from 'react-router-dom';
import React from 'react';
import useIsTabletScreen from '../../globals/hooks/useIsTabletScreen';
import SidebarListEntry from './SidebarListEntry';
import { useSidebar } from '../../globals/hooks/useSidebar';

jest.mock('./SidebarListEntry', () => jest.fn(() => <div data-testid="sidebar-list-entry"></div>));
jest.mock('./SidebarMinimize', () =>
  jest.fn((props) => <div data-testid="sidebar-minimize" onClick={props.onMinimize}></div>)
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

jest.mock('../../globals/hooks/useIsTabletScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../../globals/hooks/useSidebar', () => ({
  __esModule: true,
  useSidebar: jest.fn(),
}));

const projectIconBig = '/images/project-big.png';
const projectIconSmall = '/images/project-small.png';

const mockOnMinimize = jest.fn();
const testProps = {
  onMinimize: mockOnMinimize,
};

describe('Sidebar', () => {
  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/',
    });
    (useIsTabletScreen as jest.Mock).mockReturnValue(false);
    (useSidebar as jest.Mock).mockReturnValue(false);
  });

  it('renders div sidebarLeft', () => {
    const { container } = render(<Sidebar {...testProps} />);

    const htmlElement = container.querySelector('.sidebarLeft');

    expect(htmlElement).toBeInTheDocument();
  });

  it('sets class minimized for sidebarLeft when isMinimized is true', () => {
    localStorage.setItem('isMinimized', JSON.stringify(true));
    const { container } = render(<Sidebar {...testProps} />);

    const htmlElement = container.querySelector('.sidebarLeft');

    expect(htmlElement).toHaveClass('minimized');
    localStorage.clear();
  });

  it('sets class hidden for sidebarLeft when isHidden is true', () => {
    (useSidebar as jest.Mock).mockReturnValue({ isHidden: true });
    (useIsTabletScreen as jest.Mock).mockReturnValue(false);
    const { container } = render(<Sidebar {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.sidebarLeft');

    expect(htmlElement).toHaveClass('hidden');
    localStorage.clear();
  });

  it('does not set class hidden for sidebarLeft when isHidden is false', () => {
    (useSidebar as jest.Mock).mockReturnValue({ isHidden: false });
    (useIsTabletScreen as jest.Mock).mockReturnValue(false);
    const { container } = render(<Sidebar {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.sidebarLeft');

    expect(htmlElement).not.toHaveClass('hidden');
    localStorage.clear();
  });

  it('renders div sidebarBottom', () => {
    (useIsTabletScreen as jest.Mock).mockReturnValue(true);
    const { container } = render(<Sidebar {...testProps} />);

    const htmlElement = container.querySelector('.sidebarBottom');

    expect(htmlElement).toBeInTheDocument();
  });

  it('sets class minimized for sidebarBottom when isMinimized is true', () => {
    (useIsTabletScreen as jest.Mock).mockReturnValue(true);
    localStorage.setItem('isMinimized', JSON.stringify(true));
    const { container } = render(<Sidebar {...testProps} />);

    const htmlElement = container.querySelector('.sidebarBottom');

    expect(htmlElement).toHaveClass('minimized');
    localStorage.clear();
  });

  it('sets class hidden for sidebarBottom when isHidden is true', () => {
    (useSidebar as jest.Mock).mockReturnValue({ isHidden: true });
    (useIsTabletScreen as jest.Mock).mockReturnValue(true);
    const { container } = render(<Sidebar {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.sidebarBottom');

    expect(htmlElement).toHaveClass('hidden');
    localStorage.clear();
  });

  it('does not set class hidden for sidebarBottom when isHidden is false', () => {
    (useSidebar as jest.Mock).mockReturnValue({ isHidden: false });
    (useIsTabletScreen as jest.Mock).mockReturnValue(true);
    const { container } = render(<Sidebar {...testProps} />);

    const htmlElement: HTMLElement | null = container.querySelector('.sidebarBottom');

    expect(htmlElement).not.toHaveClass('hidden');
    localStorage.clear();
  });

  it('renders the project icon', () => {
    const { container } = render(<Sidebar {...testProps} />);

    const icon = container.querySelector('.sidebarTitle');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/images/project-big.png');
  });

  it('renders the project icon small if isMinimized is true', () => {
    localStorage.setItem('isMinimized', JSON.stringify(true));
    const { container } = render(<Sidebar {...testProps} />);

    const icon = container.querySelector('.sidebarTitle');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/images/project-small.png');
    localStorage.clear();
  });

  describe('SidebarPages for Desktop', () => {
    it('renders div sidebarList', () => {
      const { container } = render(<Sidebar {...testProps} />);

      const htmlElement = container.querySelector('.sidebarList');

      expect(htmlElement).toBeInTheDocument();
    });

    SidebarPages.forEach((entry) => {
      it(`renders link to page ${entry.name}`, () => {
        render(<Sidebar {...testProps} />);
        expect(SidebarListEntry).toHaveBeenCalledWith(
          {
            description: expect.any(String),
            imgAlt: expect.any(String),
            imgSrc: expect.any(String),
            isActive: expect.any(Boolean),
            isMinimized: expect.any(Boolean),
            linkTarget: expect.any(String),
            name: entry.name,
          },
          {}
        );
      });
    });
  });

  describe('SidebarPages for Tablet and Mobile', () => {
    it('renders div sidebarList', () => {
      (useIsTabletScreen as jest.Mock).mockReturnValue(true);
      const { container } = render(<Sidebar {...testProps} />);

      const htmlElement = container.querySelector('.sidebarList');

      expect(htmlElement).toBeInTheDocument();
    });

    SidebarPages.forEach((entry) => {
      it(`renders link to page ${entry.name}`, () => {
        (useIsTabletScreen as jest.Mock).mockReturnValue(true);
        render(<Sidebar {...testProps} />);
        expect(SidebarListEntry).toHaveBeenCalledWith(
          {
            description: expect.any(String),
            imgAlt: expect.any(String),
            imgSrc: expect.any(String),
            isActive: expect.any(Boolean),
            isMinimized: expect.any(Boolean),
            linkTarget: expect.any(String),
            name: entry.name,
          },
          {}
        );
      });
    });
  });

  it('renders the SidebarMinimize option on Desktop', () => {
    render(<Sidebar {...testProps} />);

    const minimize = screen.getByTestId('sidebar-minimize');

    expect(minimize).toBeInTheDocument();
  });

  it('renders the SidebarMinimize option on Tablet or Phone', () => {
    (useIsTabletScreen as jest.Mock).mockReturnValue(true);
    render(<Sidebar {...testProps} />);

    const minimize = screen.getByTestId('sidebar-minimize');

    expect(minimize).toBeInTheDocument();
  });

  it('changes state isMinimized if sidebarMinimizeWrapper is clicked', () => {
    localStorage.setItem('isMinimized', JSON.stringify(false));
    render(<Sidebar {...testProps} />);
    const projectIcon = screen.getByAltText('project icon');
    expect(projectIcon).toHaveAttribute('src', projectIconBig);

    const minimize = screen.getByTestId('sidebar-minimize');
    fireEvent.click(minimize!);

    const projectIcon2 = screen.getByAltText('project icon');
    expect(projectIcon2).toHaveAttribute('src', projectIconSmall);
    localStorage.clear();
  });

  it('calls callback function onMinimize when SidebarMinimize is clicked on Desktop', () => {
    render(<Sidebar {...testProps} />);

    const minimize = screen.getByTestId('sidebar-minimize');
    fireEvent.click(minimize!);

    expect(mockOnMinimize).toHaveBeenCalled();
  });

  it('calls callback function onMinimize when SidebarMinimize is clicked on Tablet or Phone', () => {
    (useIsTabletScreen as jest.Mock).mockReturnValue(true);
    render(<Sidebar {...testProps} />);

    const minimize = screen.getByTestId('sidebar-minimize');
    fireEvent.click(minimize!);

    expect(mockOnMinimize).toHaveBeenCalled();
  });
});
