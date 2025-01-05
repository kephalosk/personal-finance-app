import './SidebarProvider.scss';
import { Context, createContext, ReactNode, useState } from 'react';
import { ISidebarContext } from '../../model/ISidebarContext';

interface Props {
  children: ReactNode;
}

const SidebarContext: Context<ISidebarContext | undefined> = createContext<
  ISidebarContext | undefined
>(undefined);

const SidebarProvider: ({ children }: Props) => ReactNode = ({ children }: Props): ReactNode => {
  const [isHidden, setIsHidden] = useState(false);

  const value = {
    isHidden,
    setIsHidden,
  };

  return (
    <SidebarContext.Provider data-testid="sidebar-context-provider" value={value}>
      <div className="sidebarProvider" data-testid="sidebar-context-provider">
        {children}
      </div>
    </SidebarContext.Provider>
  );
};

export { SidebarProvider, SidebarContext };
