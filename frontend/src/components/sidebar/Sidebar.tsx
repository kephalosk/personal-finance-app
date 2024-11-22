import './Sidebar.scss';
import { SidebarPages } from '../../constants/SidebarPages';
import { SidebarPage } from '../../model/SidebarPage';
import { SidebarListEntry } from './SidebarListEntry';
import { SidebarMinimize } from './SidebarMinimize';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { SidebarProps } from '../../model/props/SidebarProps';
import PropTypes from 'prop-types';
import useIsTabletScreen from '../../globals/hooks/useIsTabletScreen';

SidebarMinimize.propTypes = {
  onMinimize: PropTypes.func.isRequired,
};

export function Sidebar({ onMinimize }: SidebarProps) {
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
}
