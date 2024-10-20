import { render, screen } from '@testing-library/react';
import { SidebarListEntry } from './SidebarListEntry';
import { SidebarListEntryProps } from '../../types/SidebarListEntryProps';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { SidebarMinimizeProps } from '../../constants/SidebarMinimizeProps';

describe('SidebarListEntry', () => {
  const name: string = 'testName';
  const imgSrc: string = 'testImgSrc';
  const imgAlt: string = 'testImgAlt';
  const linkTarget: string = 'testLinkTarget';

  const testProps: SidebarListEntryProps = {
    name,
    imgSrc,
    imgAlt,
    linkTarget,
  };

  it('passes the name of a sidebarListEntry', () => {
    render(
      <MemoryRouter>
        <SidebarListEntry {...testProps} />
      </MemoryRouter>
    );

    const labelElement: HTMLElement = screen.getByText(name);

    expect(labelElement).toBeInTheDocument();
  });

  it('passes the icon of a sidebarListEntry', () => {
    render(
      <MemoryRouter>
        <SidebarListEntry {...testProps} />
      </MemoryRouter>
    );

    const imgElement: HTMLElement = screen.getByAltText(imgAlt);

    expect(imgElement).toHaveAttribute('src', imgSrc);
  });

  it('passes the linkTarget of a sidebarListEntry', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <SidebarListEntry {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = getByRole('link');

    expect(htmlElement).toHaveAttribute('href', `/${linkTarget}`);
  });

  it('passes isActive state of a sidebarListEntry', () => {
    const { container } = render(
      <MemoryRouter>
        <SidebarListEntry {...testProps} isActive={true} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.active');

    expect(htmlElement).toBeInTheDocument();
  });

  it('ignores the icon for assistive technologies', () => {
    render(
      <MemoryRouter>
        <SidebarListEntry {...testProps} />
      </MemoryRouter>
    );

    const imgElement: HTMLElement = screen.getByAltText(imgAlt);

    expect(imgElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not render a link for SidebarMinimize', () => {
    const { container } = render(
      <MemoryRouter>
        <SidebarListEntry {...testProps} className={SidebarMinimizeProps.className} />
      </MemoryRouter>
    );

    const linkElement = container.querySelector('.link');
    const divElement = container.querySelector('.div');

    expect(linkElement).not.toBeInTheDocument();
    expect(divElement).toBeInTheDocument();
  });
});
