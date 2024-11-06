import './Sidebar.scss';
import { SidebarPages } from '../../constants/SidebarPages';
import { SidebarPage } from '../../model/SidebarPage';
import { SidebarListEntry } from './SidebarListEntry';
import { SidebarMinimize } from './SidebarMinimize';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export function Sidebar() {
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('isMinimized') ?? 'false');
  });

  const location = useLocation();
  const currentPath = location.pathname;

  const handleSidebarMinimize = (minimized: boolean) => {
    setIsMinimized(minimized);
  };

  const projectIconBig = '/assets/images/project-big.png';
  const projectIconSmall = '/assets/images/project-small.png';

  return (
    <section className={`sidebar ${isMinimized ? 'minimized' : ''}`} data-testid="sidebar">
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
  );
}
