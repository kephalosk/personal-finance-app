import './Sidebar.scss';
import { SidebarPages } from '../../constants/SidebarPages';
import { SidebarPage } from '../../model/SidebarPage';
import SidebarListEntry from './SidebarListEntry';
import SidebarMinimize from './SidebarMinimize';
import { useLocation } from 'react-router-dom';
import { ReactNode, useState } from 'react';
import useIsTabletScreen from '../../globals/hooks/useIsTabletScreen';
import { useSidebar } from '../../globals/hooks/useSidebar';

interface Props {
  onMinimize: (isMinimized: boolean) => void;
}

const Sidebar: ({ onMinimize }: Props) => ReactNode = ({ onMinimize }: Props): ReactNode => {
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('isMinimized') ?? 'false');
  });
  const { isHidden } = useSidebar();

  const location = useLocation();
  const currentPath = location.pathname;

  const handleSidebarMinimize = (minimized: boolean) => {
    setIsMinimized(minimized);
    onMinimize(!isMinimized);
  };

  const projectIconBig = '/images/project-big.png';
  const projectIconSmall = '/images/project-small.png';

  const isTabletScreen = useIsTabletScreen();

  const SidebarList = () => (
    <div className="sidebarList">
      {SidebarPages.map((entry: SidebarPage) => (
        <SidebarListEntry
          key={entry.name}
          name={entry.name}
          imgSrc={entry.imgSrc}
          imgAlt={entry.imgAlt}
          linkTarget={entry.linkTarget}
          isActive={currentPath === entry.linkTarget}
          isMinimized={isMinimized}
        />
      ))}
    </div>
  );

  return (
    <>
      {isTabletScreen ? (
        <section
          className={`sidebarBottom ${isMinimized ? 'minimized' : ''} ${isHidden ? 'hidden' : ''}`}
          data-testid="sidebar"
        >
          <SidebarList />
          <SidebarMinimize onMinimize={handleSidebarMinimize} />
        </section>
      ) : (
        <div
          className={`sidebarLeft ${isMinimized ? 'minimized' : ''} ${isHidden ? 'hidden' : ''}`}
          data-testid="sidebar"
        >
          <img
            className="sidebarTitle"
            alt="project icon"
            src={`${isMinimized ? projectIconSmall : projectIconBig}`}
          />
          <SidebarList />
          <SidebarMinimize onMinimize={handleSidebarMinimize} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
