import { render, screen } from '@testing-library/react';
import { SidebarMinimize } from './SidebarMinimize';
import { SidebarMinimizeProps } from '../../constants/SidebarMinimizeProps';

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

  it('passes the correct class of SidebarMinimize', () => {
    const { container } = render(<SidebarMinimize />);

    const htmlElement: HTMLElement | null = container.querySelector(
      `.${SidebarMinimizeProps.className}`
    );

    expect(htmlElement).toBeInTheDocument();
  });
});
