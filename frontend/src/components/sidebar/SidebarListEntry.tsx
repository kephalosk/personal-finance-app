import './SidebarListEntry.scss';
import React, { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarPage } from '../../model/SidebarPage';

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

const SidebarListEntry: ({
  name,
  description,
  imgSrc,
  altImgSrc,
  imgAlt,
  linkTarget,
  className,
  isActive,
  isMinimized,
  hasTabIndex,
}: Props) => ReactNode = ({
  name,
  description,
  imgSrc,
  altImgSrc = imgSrc,
  imgAlt,
  linkTarget = '/',
  className = '',
  isActive = false,
  isMinimized = false,
  hasTabIndex = true,
}: Props): ReactNode => {
  const [content, setContent] = useState(() => {
    const savedState = localStorage.getItem('isMinimized');
    const wasMinimized = savedState ? JSON.parse(savedState) : false;
    return (
      <>
        <div className="entryRowImgWrapper">
          <img
            className="entryRowImg"
            src={wasMinimized ? altImgSrc : imgSrc}
            alt={imgAlt}
            aria-hidden="true"
          />
        </div>
        <label className={`entryRowLabel ${wasMinimized ? 'minimized' : ''}`}>{name}</label>
      </>
    );
  });

  useEffect(() => {
    setContent(
      <>
        <div className="entryRowImgWrapper">
          <img
            className="entryRowImg"
            src={isMinimized ? altImgSrc : imgSrc}
            alt={imgAlt}
            aria-hidden="true"
          />
        </div>
        <label className={`entryRowLabel ${isMinimized ? 'minimized' : ''}`}>{name}</label>
      </>
    );
  }, [isMinimized]);

  const blur = () => {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  };

  const isLink = className !== 'sidebarMinimize';
  if (isLink) {
    return (
      <Link
        onClick={blur}
        to={linkTarget}
        className={`entryRow link ${isActive ? 'active' : ''}`}
        tabIndex={hasTabIndex ? 0 : -1}
        data-testid="sidebar-list-entry"
        aria-label={description}
      >
        {content}
      </Link>
    );
  } else {
    return (
      <div
        onClick={blur}
        className="entryRow div"
        tabIndex={hasTabIndex ? 0 : -1}
        data-testid="sidebar-list-entry"
      >
        {content}
      </div>
    );
  }
};

export default SidebarListEntry;
