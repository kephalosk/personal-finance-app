import { Sidebar } from './Sidebar';
import { render, screen } from '@testing-library/react';
import { ProjectName } from '../../constants/ProjectName';
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

function getInitializedContainer() {
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

  it('renders the project name', () => {
    initializeComponent();

    const title: HTMLElement = screen.getByText(`${ProjectName}`);

    expect(title).toBeInTheDocument();
  });

  it('renders all the SidebarPages', () => {
    initializeComponent();

    SidebarPages.forEach((entry) => {
      const sidebarPage: HTMLElement = screen.getByText(entry.name);

      expect(sidebarPage).toBeInTheDocument();
    });
  });

  it('renders the SidebarMinimize option', () => {
    initializeComponent();

    const sidebarMinimize: HTMLElement = screen.getByText(SidebarMinimizeProps.name);

    expect(sidebarMinimize).toBeInTheDocument();
  });
});
