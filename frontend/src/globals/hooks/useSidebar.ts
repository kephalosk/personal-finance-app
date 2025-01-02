import { createContext, useContext, Context } from 'react';
import { ISidebarContext } from '../../model/ISidebarContext';

const SidebarContext: Context<ISidebarContext | undefined> = createContext<
  ISidebarContext | undefined
>(undefined);

export const useSidebar: () => ISidebarContext = (): ISidebarContext => {
  const context: ISidebarContext | undefined = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
};
