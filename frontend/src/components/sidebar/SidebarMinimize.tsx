import { SidebarListEntry } from './SidebarListEntry';

export function SidebarMinimize() {
  return (
    <SidebarListEntry
      linkTarget="/"
      name="Minimize Menu"
      imgSrc="./src/assets/images/icon-minimize-menu.svg"
      imgAlt="minimize icon"
      className="sidebarMinimize"
    />
  );
}
