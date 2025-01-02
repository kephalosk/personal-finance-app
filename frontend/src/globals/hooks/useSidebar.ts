import { createContext, useContext, Context } from 'react';
import { ISidebarContext } from '../../model/ISidebarContext';

export const useSidebar: () => ISidebarContext = (): ISidebarContext => {
  const sidebarContext: Context<ISidebarContext | undefined> = createContext<
    ISidebarContext | undefined
  >(undefined);
  const context: ISidebarContext | undefined = useContext(sidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
};
