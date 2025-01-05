import { useContext } from 'react';
import { SidebarContext } from '../../components/provider/SidebarProvider';
import { ISidebarContext } from '../../model/ISidebarContext';

export const useSidebar: () => ISidebarContext = (): ISidebarContext => {
  const context: ISidebarContext | undefined = useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }

  return context;
};
