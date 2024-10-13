import { SidebarPages } from '../Pages/SidebarPages';
import { SidebarPage } from '../Types/SidebarPage';
import SidebarListEntry from './SidebarListEntry';
import { SidebarMinimize } from './SidebarMinimize';

export function Sidebar() {
  return (
    <section>
      <h1>Philipp Kraatz&#39; finance</h1>
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
