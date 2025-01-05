import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { SidebarProvider } from './SidebarProvider';

describe('SidebarProvider', (): void => {
  const children: ReactNode = <div data-testid="children"></div>;

  const testProps: {
    children: ReactNode;
  } = {
    children,
  };

  it('renders div sidebarProvider', (): void => {
    render(<SidebarProvider {...testProps}>{children}</SidebarProvider>);

    const sidebarContextProvider: HTMLElement = screen.getByTestId('sidebar-context-provider');

    expect(sidebarContextProvider).toBeInTheDocument();
  });

  it('renders children', (): void => {
    render(<SidebarProvider {...testProps}>{children}</SidebarProvider>);

    const component: HTMLElement = screen.getByTestId('children');

    expect(component).toBeInTheDocument();
  });
});
