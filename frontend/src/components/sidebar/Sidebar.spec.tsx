import { Sidebar } from './Sidebar';
import { fireEvent, render, screen } from '@testing-library/react';
import { SidebarPages } from '../../constants/SidebarPages';
import { SidebarMinimizeProps } from '../../constants/SidebarMinimizeProps';
import { MemoryRouter, useLocation } from 'react-router-dom';
import React from 'react';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

function initializeComponent() {
  (useLocation as jest.Mock).mockReturnValue({
    pathname: '/',
  });
  render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );
}

function getInitializedContainer(): HTMLElement {
  (useLocation as jest.Mock).mockReturnValue({
    pathname: '/',
  });
  const { container } = render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );
  return container;
}

describe('Sidebar', () => {
  it('renders section sidebar', () => {
    const container = getInitializedContainer();

    const htmlElement = container.querySelector('.sidebar');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders the project icon', () => {
    const container = getInitializedContainer();

    const icon = container.querySelector('.sidebarTitle');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', './src/assets/images/project-big.png');
  });

  it('renders the project icon small if isMinimized is true', () => {
    localStorage.setItem('isMinimized', JSON.stringify(true));
    const container = getInitializedContainer();

    const icon = container.querySelector('.sidebarTitle');

    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', './src/assets/images/project-small.png');
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
    expect(iconBeforeClick).toHaveAttribute('src', './src/assets/images/project-big.png');

    const button = container.querySelector('.sidebarMinimizeWrapper');
    fireEvent.click(button!);

    const iconAfterClick = container.querySelector('.sidebarTitle');
    expect(iconAfterClick).toHaveAttribute('src', './src/assets/images/project-small.png');
    localStorage.clear();
  });
});
