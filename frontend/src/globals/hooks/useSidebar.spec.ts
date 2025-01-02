import { useSidebar } from './useSidebar';
import { ISidebarContext } from '../../model/ISidebarContext';
import { createContext, useContext } from 'react';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('useSidebar', (): void => {
  beforeEach(() => {
    (useContext as jest.Mock).mockReturnValue(
      createContext<ISidebarContext | undefined>(undefined)
    );
  });

  it('returns SidebarContext', (): void => {
    const result: ISidebarContext = useSidebar();

    expect(result).toBeDefined();
  });

  it('throws if SidebarContext is undefined', (): void => {
    (useContext as jest.Mock).mockReturnValue(undefined);

    expect(() => useSidebar()).toThrow('useSidebar must be used within SidebarProvider');
  });
});
