import { SidebarPages } from '../Constants/SidebarPages';
import { SidebarPage } from '../Types/SidebarPage';
import SidebarListEntry from './SidebarListEntry';
import { SidebarMinimize } from './SidebarMinimize';
import { ProjectName } from '../Constants/ProjectName';

export function Sidebar() {
  return (
    <section>
      <h1>{ProjectName}</h1>
      <div className="sidebarList">
        {SidebarPages.map((entry: SidebarPage) => (
          <SidebarListEntry
            key={entry.name}
            name={entry.name}
            imgSrc={entry.imgSrc}
            imgAlt={entry.imgAlt}
          />
        ))}
      </div>
      <SidebarMinimize />
    </section>
  );
}
