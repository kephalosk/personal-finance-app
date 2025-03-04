import { fireEvent, render, screen } from '@testing-library/react';
import SidebarListEntry from './SidebarListEntry';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { SidebarMinimizeProps } from '../../constants/SidebarMinimizeProps';
import { ReactFutureFlags } from '../../constants/ReactFutureFlags';

describe('SidebarListEntry', () => {
  const name: string = 'testName';
  const description: string = 'testDescription';
  const imgSrc: string = 'testImgSrc';
  const imgAlt: string = 'testImgAlt';
  const linkTarget: string = 'testLinkTarget';

  const testProps = {
    name,
    description,
    imgSrc,
    imgAlt,
    linkTarget,
  };

  it('does not render a link for SidebarMinimize with passed className', () => {
    const { container } = render(
      <SidebarListEntry {...testProps} className={SidebarMinimizeProps.className} />
    );

    const linkElement = container.querySelector('.link');
    const divElement = container.querySelector('.div');

    expect(linkElement).not.toBeInTheDocument();
    expect(divElement).toBeInTheDocument();
  });

  it('blurs when SidebarMinimize is clicked', () => {
    const { container } = render(
      <SidebarListEntry {...testProps} className={SidebarMinimizeProps.className} />
    );

    const divElement = container.querySelector('.div');
    fireEvent.click(divElement!);

    expect(divElement).not.toHaveFocus();
  });

  it('renders a link for normal SidebarListEntries', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <SidebarListEntry {...testProps} className="" />
      </MemoryRouter>
    );

    const linkElement = container.querySelector('.link');
    const divElement = container.querySelector('.div');

    expect(linkElement).toBeInTheDocument();
    expect(divElement).not.toBeInTheDocument();
  });

  it('blurs when normal SidebarListEntry is clicked', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <SidebarListEntry {...testProps} className="" />
      </MemoryRouter>
    );

    const linkElement = container.querySelector('.link');
    fireEvent.click(linkElement!);

    expect(linkElement).not.toHaveFocus();
  });

  it('sets entry isActive if passed prop isActive is true', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <SidebarListEntry {...testProps} isActive={true} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.active');

    expect(htmlElement).toBeInTheDocument();
  });

  it('does not set entry isActive if passed prop isActive is false', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <SidebarListEntry {...testProps} isActive={false} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.active');

    expect(htmlElement).not.toBeInTheDocument();
  });

  it('renders div entryRowImgWrapper', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <SidebarListEntry {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.entryRowImgWrapper');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders the passed icon', () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <SidebarListEntry {...testProps} />
      </MemoryRouter>
    );

    const imgElement: HTMLElement = screen.getByAltText(imgAlt);

    expect(imgElement).toHaveAttribute('src', imgSrc);
  });

  it('renders label entryRowLabel with passed name', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <SidebarListEntry {...testProps} />
      </MemoryRouter>
    );

    const labelElement = container.querySelector('.entryRowLabel');

    expect(labelElement!.textContent).toEqual(name);
  });

  it('passes the linkTarget of a sidebarListEntry', () => {
    const { getByRole } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <SidebarListEntry {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = getByRole('link');

    expect(htmlElement).toHaveAttribute('href', `/${linkTarget}`);
  });

  it('ignores the icon for assistive technologies', () => {
    render(
      <MemoryRouter future={ReactFutureFlags}>
        <SidebarListEntry {...testProps} />
      </MemoryRouter>
    );

    const imgElement: HTMLElement = screen.getByAltText(imgAlt);

    expect(imgElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('sets entryRowLabel to minimized if isMinimized is true', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <SidebarListEntry {...testProps} isMinimized={true} />
      </MemoryRouter>
    );

    const labelElement = container.querySelector('.entryRowLabel');

    expect(labelElement).toHaveClass('minimized');
  });

  it('sets altImgSrc if isMinimized is true', () => {
    const altImgSrc = 'testAltImgSrc';
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <SidebarListEntry {...testProps} isMinimized={true} altImgSrc={altImgSrc} />
      </MemoryRouter>
    );

    const image = container.querySelector('.entryRowImg');

    expect(image).toHaveAttribute('src', altImgSrc);
  });

  it('sets class minimized by default with localStorage', () => {
    localStorage.setItem('isMinimized', JSON.stringify(true));
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <SidebarListEntry {...testProps} isMinimized={true} />
      </MemoryRouter>
    );

    const labelElement = container.querySelector('.entryRowLabel');

    expect(labelElement).toHaveClass('minimized');
    localStorage.clear();
  });

  it('does not set class minimized by default without localStorage', () => {
    localStorage.clear();
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <SidebarListEntry {...testProps} />
      </MemoryRouter>
    );

    const labelElement = container.querySelector('.entryRowLabel');

    expect(labelElement).not.toHaveClass('minimized');
  });

  it('changes class minimized when isMinimized changes', () => {
    localStorage.clear();
    const { container, rerender } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <SidebarListEntry {...testProps} isMinimized={false} />
      </MemoryRouter>
    );
    let labelElement = container.querySelector('.entryRowLabel');
    expect(labelElement).not.toHaveClass('minimized');

    rerender(
      <MemoryRouter future={ReactFutureFlags}>
        <SidebarListEntry {...testProps} isMinimized={true} />
      </MemoryRouter>
    );

    labelElement = container.querySelector('.entryRowLabel');
    expect(labelElement).toHaveClass('minimized');
  });

  it('sets default link target', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <SidebarListEntry {...testProps} linkTarget={undefined} />
      </MemoryRouter>
    );

    const linkElement = container.querySelector('.link');

    expect(linkElement).toHaveAttribute('href', '/');
  });

  it('sets tabindex to -1 when passed hasTabIndex is false for link', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <SidebarListEntry {...testProps} className="" hasTabIndex={false} />
      </MemoryRouter>
    );

    const linkElement = container.querySelector('.link');

    expect(linkElement).toHaveAttribute('tabindex', '-1');
  });

  it('sets tabindex to -1 when passed hasTabIndex is false for div', () => {
    const { container } = render(
      <SidebarListEntry
        {...testProps}
        className={SidebarMinimizeProps.className}
        hasTabIndex={false}
      />
    );

    const divElement = container.querySelector('.div');

    expect(divElement).toHaveAttribute('tabindex', '-1');
  });
});
