import './Sidebar.scss';
import { SidebarPages } from '../../constants/SidebarPages';
import { SidebarPage } from '../../types/SidebarPage';
import { SidebarListEntry } from './SidebarListEntry';
import { SidebarMinimize } from './SidebarMinimize';
import { ProjectName } from '../../constants/ProjectName';

export function Sidebar() {
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
          />
        ))}
      </div>
      <SidebarMinimize />
    </section>
  );
}
