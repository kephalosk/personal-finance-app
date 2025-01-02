import './SidebarProvider.scss';
import { Context, createContext, ReactNode, useState } from 'react';
import { ISidebarContext } from '../../model/ISidebarContext';

interface Props {
  children: ReactNode;
}

const SidebarProvider: ({ children }: Props) => ReactNode = ({ children }: Props): ReactNode => {
  const [isHidden, setIsHidden] = useState(false);

  const SidebarContext: Context<ISidebarContext | undefined> = createContext<
    ISidebarContext | undefined
  >(undefined);

  return (
    <SidebarContext.Provider
      data-testid="sidebar-context-provider"
      value={{ isHidden, setIsHidden }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
