import { SidebarListEntry } from './SidebarListEntry';
import { SidebarMinimizeProps } from '../../model/props/SidebarMinimizeProps';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './SidebarMinimize.scss';

SidebarMinimize.propTypes = {
  onMinimize: PropTypes.func.isRequired,
};

export function SidebarMinimize({ onMinimize }: SidebarMinimizeProps) {
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    const savedState = localStorage.getItem('isMinimized');
    return savedState ? JSON.parse(savedState) : false;
  });

  const handleMinimize = () => {
    setIsMinimized((prev) => !prev);
    onMinimize(!isMinimized);
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  };

  useEffect(() => {
    localStorage.setItem('isMinimized', JSON.stringify(isMinimized));
  }, [isMinimized]);

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
}
