import './Sidebar.scss';
import { SidebarPages } from '../../constants/SidebarPages';
import { SidebarPage } from '../../model/SidebarPage';
import { SidebarListEntry } from './SidebarListEntry';
import { SidebarMinimize } from './SidebarMinimize';
import { ProjectName } from '../../constants/ProjectName';
import { useLocation } from 'react-router-dom';

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <section className="sidebar" data-testid="sidebar">
      <label className="sidebarTitle">{ProjectName}</label>
      <div className="sidebarList">
        {SidebarPages.map((entry: SidebarPage) => (
          <SidebarListEntry
            key={entry.name}
            name={entry.name}
            imgSrc={entry.imgSrc}
            imgAlt={entry.imgAlt}
            linkTarget={entry.linkTarget}
            isActive={currentPath === entry.linkTarget}
          />
        ))}
      </div>
      <SidebarMinimize />
    </section>
  );
}
