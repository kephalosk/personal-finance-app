import { createContext, ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import SidebarProvider from './SidebarProvider';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  createContext: jest.fn(),
}));

describe('SidebarProvider', (): void => {
  const children: ReactNode = <div data-testid="children"></div>;

  const testProps: {
    children: ReactNode;
  } = {
    children,
  };

  beforeEach((): void => {
    (createContext as jest.Mock).mockReturnValue({
      Provider: ({ children }: { children: ReactNode }) => (
        <div data-testid="sidebar-context-provider">{children}</div>
      ),
    });
  });

  it('renders component SidebarContext.Provider', (): void => {
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
