import { render, screen } from '@testing-library/react';
import { SidebarListEntry } from './SidebarListEntry';
import { SidebarListEntryProps } from '../../types/SidebarListEntryProps';

describe('SidebarListEntry', () => {
  const name: string = 'testName';
  const imgSrc: string = 'testImgSrc';
  const imgAlt: string = 'testImgAlt';

  const testProps: SidebarListEntryProps = {
    name,
    imgSrc,
    imgAlt,
  };

  const className: string = 'testClass';

  it('passes the name of a sidebarListEntry', () => {
    render(<SidebarListEntry {...testProps} />);

    const labelElement: HTMLElement = screen.getByText(name);

    expect(labelElement).toBeInTheDocument();
  });

  it('passes the icon of a sidebarListEntry', () => {
    render(<SidebarListEntry {...testProps} />);

    const imgElement: HTMLElement = screen.getByAltText(imgAlt);

    expect(imgElement).toHaveAttribute('src', imgSrc);
  });

  it('passes the class of a sidebarListEntry', () => {
    const { container } = render(<SidebarListEntry {...testProps} className={className} />);

    const htmlElement: HTMLElement | null = container.querySelector(`.${className}`);

    expect(htmlElement).toBeInTheDocument();
  });

  it('ignores the icon for assistive technologies', () => {
    render(<SidebarListEntry {...testProps} />);

    const imgElement: HTMLElement = screen.getByAltText(imgAlt);

    expect(imgElement).toHaveAttribute('aria-hidden', 'true');
  });
});
