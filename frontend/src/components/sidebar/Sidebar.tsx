import './Sidebar.scss';
import { SidebarPages } from '../../constants/SidebarPages';
import { SidebarPage } from '../../model/SidebarPage';
import SidebarListEntry from './SidebarListEntry';
import SidebarMinimize from './SidebarMinimize';
import { useLocation } from 'react-router-dom';
import { ReactNode, useState } from 'react';
import useIsTabletScreen from '../../globals/hooks/useIsTabletScreen';

interface Props {
  onMinimize: (isMinimized: boolean) => void;
}

const Sidebar: ({ onMinimize }: Props) => ReactNode = ({ onMinimize }: Props): ReactNode => {
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('isMinimized') ?? 'false');
  });

  const location = useLocation();
  const currentPath = location.pathname;

  const handleSidebarMinimize = (minimized: boolean) => {
    setIsMinimized(minimized);
    onMinimize(!isMinimized);
  };

  const projectIconBig = '/images/project-big.png';
  const projectIconSmall = '/images/project-small.png';

  const isTabletScreen = useIsTabletScreen();

  return (
    <>
      {isTabletScreen ? (
        <section
          className={`sidebarBottom ${isMinimized ? 'minimized' : ''}`}
          data-testid="sidebar"
        >
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
          <SidebarMinimize onMinimize={handleSidebarMinimize} />
        </section>
      ) : (
        <div className={`sidebarLeft ${isMinimized ? 'minimized' : ''}`} data-testid="sidebar">
          <img
            className="sidebarTitle"
            alt="project icon"
            src={`${isMinimized ? projectIconSmall : projectIconBig}`}
          />
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
          <SidebarMinimize onMinimize={handleSidebarMinimize} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
