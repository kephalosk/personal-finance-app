import { Sidebar } from './Sidebar';
import { render, screen } from '@testing-library/react';
import { ProjectName } from '../Constants/ProjectName';
import { SidebarPages } from '../Constants/SidebarPages';
import { SidebarMinimizeProps } from '../Constants/SidebarMinimizeProps';

describe('Sidebar', () => {
  it('renders the project name', () => {
    render(<Sidebar />);

    const title: HTMLElement = screen.getByText(`${ProjectName}`);

    expect(title).toBeInTheDocument();
  });

  it('renders all the SidebarPages', () => {
    render(<Sidebar />);

    SidebarPages.forEach((entry) => {
      const sidebarPage: HTMLElement = screen.getByText(entry.name);

      expect(sidebarPage).toBeInTheDocument();
    });
  });

  it('renders the SidebarMinimize option', () => {
    render(<Sidebar />);

    const sidebarMinimize: HTMLElement = screen.getByText(SidebarMinimizeProps.name);

    expect(sidebarMinimize).toBeInTheDocument();
  });
});
