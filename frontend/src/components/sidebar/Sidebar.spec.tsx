import { Sidebar } from './Sidebar';
import { fireEvent, render, screen } from '@testing-library/react';
import { SidebarPages } from '../../constants/SidebarPages';
import { SidebarMinimizeProps } from '../../constants/SidebarMinimizeProps';
import { MemoryRouter, useLocation } from 'react-router-dom';
import React from 'react';
import { SidebarMinimize } from './SidebarMinimize';
import useIsTabletScreen from '../../globals/hooks/useIsTabletScreen';
import { ReactFutureFlags } from '../../constants/ReactFutureFlags';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

jest.mock('../../globals/hooks/useIsTabletScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockOnMinimize = jest.fn();
const testProps = {
  onMinimize: mockOnMinimize,
};

function initializeComponent() {
  (useLocation as jest.Mock).mockReturnValue({
    pathname: '/',
  });
  render(
    <MemoryRouter future={ReactFutureFlags}>
      <Sidebar {...testProps} />
    </MemoryRouter>
  );
}

function getInitializedContainer(): HTMLElement {
  (useLocation as jest.Mock).mockReturnValue({
    pathname: '/',
  });
  const { container } = render(
    <MemoryRouter future={ReactFutureFlags}>
      <Sidebar {...testProps} />
    </MemoryRouter>
  );
  return container;
}

describe('Sidebar', () => {
  beforeEach(() => {
    (useIsTabletScreen as jest.Mock).mockReturnValue(false);
  });

  it('renders section sidebarLeft', () => {
    const container = getInitializedContainer();

    const htmlElement = container.querySelector('.sidebarLeft');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div sidebarBottom', () => {
    (useIsTabletScreen as jest.Mock).mockReturnValue(true);
    const container = getInitializedContainer();

    const htmlElement = container.querySelector('.sidebarBottom');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders the project icon', () => {
    const container = getInitializedContainer();

    const icon = container.querySelector('.sidebarTitle');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/images/project-big.png');
  });

  it('renders the project icon small if isMinimized is true', () => {
    localStorage.setItem('isMinimized', JSON.stringify(true));
    const container = getInitializedContainer();

    const icon = container.querySelector('.sidebarTitle');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/images/project-small.png');
    localStorage.clear();
  });

  describe('SidebarPages', () => {
    SidebarPages.forEach((entry) => {
      it(`renders link to page ${entry.name}`, () => {
        initializeComponent();
        const sidebarPage: HTMLElement = screen.getByText(entry.name);
        expect(sidebarPage).toBeInTheDocument();
      });
    });
  });

  it('renders the SidebarMinimize option', () => {
    initializeComponent();

    const sidebarMinimize: HTMLElement = screen.getByText(SidebarMinimizeProps.name);

    expect(sidebarMinimize).toBeInTheDocument();
  });

  it('changes state isMinimized if sidebarMinimizeWrapper is clicked', () => {
    localStorage.setItem('isMinimized', JSON.stringify(false));
    const container = getInitializedContainer();
    const iconBeforeClick = container.querySelector('.sidebarTitle');
    expect(iconBeforeClick).toHaveAttribute('src', '/images/project-big.png');

    const button = container.querySelector('.sidebarMinimizeWrapper');
    fireEvent.click(button!);

    const iconAfterClick = container.querySelector('.sidebarTitle');
    expect(iconAfterClick).toHaveAttribute('src', '/images/project-small.png');
    localStorage.clear();
  });

  it('calls callback function onMinimize when div sidebarMinimizeWrapper is clicked', () => {
    const { container } = render(<SidebarMinimize {...testProps} />);

    const divElement = container.querySelector('.sidebarMinimizeWrapper');
    fireEvent.click(divElement!);

    expect(mockOnMinimize).toHaveBeenCalled();
  });
});
