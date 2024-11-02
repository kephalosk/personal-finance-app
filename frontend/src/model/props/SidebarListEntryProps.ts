import { SidebarPage } from '../SidebarPage';

export interface SidebarListEntryProps extends SidebarPage {
  imgSrc: string;
  imgAlt: string;
  altImgSrc?: string;
  linkTarget?: string;
  className?: string;
  isActive?: boolean;
  isMinimized?: boolean;
}
