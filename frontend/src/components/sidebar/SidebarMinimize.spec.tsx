import { fireEvent, render, screen } from '@testing-library/react';
import { SidebarMinimize } from './SidebarMinimize';
import { SidebarMinimizeProps } from '../../constants/SidebarMinimizeProps';
import React from 'react';

describe('SidebarMinimize', () => {
  const mockOnMinimize = jest.fn();
  const testProps = {
    onMinimize: mockOnMinimize,
  };

  it('has the correct name of SidebarMinimize', () => {
    render(<SidebarMinimize {...testProps} />);

    const labelElement: HTMLElement = screen.getByText(SidebarMinimizeProps.name);

    expect(labelElement).toBeInTheDocument();
  });

  it('passes the correct icon of SidebarMinimize', () => {
    render(<SidebarMinimize {...testProps} />);

    const imgElement: HTMLElement = screen.getByAltText(SidebarMinimizeProps.imgAlt);

    expect(imgElement).toHaveAttribute('src', SidebarMinimizeProps.imgSrc);
  });

  it('does not render a link for SidebarMinimize', () => {
    const { container } = render(<SidebarMinimize {...testProps} />);

    const linkElement = container.querySelector('.link');
    const divElement = container.querySelector('.div');

    expect(linkElement).not.toBeInTheDocument();
    expect(divElement).toBeInTheDocument();
  });

  it('calls callback function onMinimize when div sidebarMinimizeWrapper is clicked', () => {
    const { container } = render(<SidebarMinimize {...testProps} />);

    const divElement = container.querySelector('.sidebarMinimizeWrapper');
    fireEvent.click(divElement!);

    expect(mockOnMinimize).toHaveBeenCalled();
  });
});
