import { SidebarListEntry } from './SidebarListEntry';
import { SidebarMinimizeProps } from '../../model/props/SidebarMinimizeProps';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

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
  };

  useEffect(() => {
    localStorage.setItem('isMinimized', JSON.stringify(isMinimized));
  }, [isMinimized]);

  return (
    <div className="sidebarMinimizeWrapper" onClick={handleMinimize}>
      <SidebarListEntry
        isMinimized={isMinimized}
        name="Minimize Menu"
        imgSrc="/images/icon-minimize-menu.svg"
        altImgSrc="/images/icon-maximize-menu.svg"
        imgAlt="minimize icon"
        className="sidebarMinimize"
      />
    </div>
  );
}
