import SidebarListEntry from './SidebarListEntry';
import React, { ReactNode, useEffect, useState } from 'react';
import './SidebarMinimize.scss';

interface Props {
  onMinimize: (isMinimized: boolean) => void;
}

const SidebarMinimize: ({ onMinimize }: Props) => ReactNode = ({
  onMinimize,
}: Props): ReactNode => {
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    const savedState = localStorage.getItem('isMinimized');
    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem('isMinimized', JSON.stringify(isMinimized));
  }, [isMinimized]);

  const handleMinimize = () => {
    setIsMinimized((prev) => !prev);
    onMinimize(!isMinimized);
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleMinimize();
    }
  };

  return (
    <div
      className="sidebarMinimizeWrapper"
      onClick={handleMinimize}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      data-testid="sidebar-minimize"
    >
      <SidebarListEntry
        isMinimized={isMinimized}
        name="Minimize Menu"
        imgSrc="/images/icon-minimize-menu.svg"
        altImgSrc="/images/icon-maximize-menu.svg"
        imgAlt="minimize icon"
        className="sidebarMinimize"
        hasTabIndex={false}
      />
    </div>
  );
};

export default SidebarMinimize;
