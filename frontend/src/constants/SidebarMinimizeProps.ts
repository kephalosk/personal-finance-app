import { SidebarPage } from '../model/SidebarPage';

interface Props extends SidebarPage {
  imgSrc: string;
  imgAlt: string;
  altImgSrc?: string;
  linkTarget?: string;
  className?: string;
  isActive?: boolean;
  isMinimized?: boolean;
  hasTabIndex?: boolean;
}

export const SidebarMinimizeProps: Props = {
  name: 'Minimize Menu',
  description: 'minimize Sidebar',
  imgSrc: '/images/icon-minimize-menu.svg',
  altImgSrc: '/images/icon-maximize-menu.svg',
  imgAlt: 'minimize icon',
  className: 'sidebarMinimize',
  linkTarget: '/',
};
