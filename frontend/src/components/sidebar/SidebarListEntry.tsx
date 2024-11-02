import './SidebarListEntry.scss';
import PropTypes from 'prop-types';
import { SidebarListEntryProps } from '../../model/props/SidebarListEntryProps';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

SidebarListEntry.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  linkTarget: PropTypes.string,
  isActive: PropTypes.bool,
  className: PropTypes.string,
  isMinimized: PropTypes.bool,
};

export function SidebarListEntry({
  name,
  imgSrc,
  altImgSrc = imgSrc,
  imgAlt,
  linkTarget = '/',
  className = '',
  isActive = false,
  isMinimized = false,
}: SidebarListEntryProps) {
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

  const isLink = className !== 'sidebarMinimize';
  if (isLink) {
    return (
      <Link to={linkTarget} className={`entryRow link ${isActive ? 'active' : ''}`} tabIndex={0}>
        {content}
      </Link>
    );
  } else {
    return (
      <div className="entryRow div" tabIndex={0}>
        {content}
      </div>
    );
  }
}
