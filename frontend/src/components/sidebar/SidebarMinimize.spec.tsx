import { render, screen } from '@testing-library/react';
import { SidebarMinimize } from './SidebarMinimize';
import { SidebarMinimizeProps } from '../../constants/SidebarMinimizeProps';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

describe('SidebarMinimize', () => {
  it('has the correct name of SidebarMinimize', () => {
    render(<SidebarMinimize />);

    const labelElement: HTMLElement = screen.getByText(SidebarMinimizeProps.name);

    expect(labelElement).toBeInTheDocument();
  });

  it('passes the correct icon of SidebarMinimize', () => {
    render(<SidebarMinimize />);

    const imgElement: HTMLElement = screen.getByAltText(SidebarMinimizeProps.imgAlt);

    expect(imgElement).toHaveAttribute('src', SidebarMinimizeProps.imgSrc);
  });

  it('does not render a link for SidebarMinimize', () => {
    const { container } = render(
      <MemoryRouter>
        <SidebarMinimize />
      </MemoryRouter>
    );

    const linkElement = container.querySelector('.link');
    const divElement = container.querySelector('.div');

    expect(linkElement).not.toBeInTheDocument();
    expect(divElement).toBeInTheDocument();
  });
});
