import './SidebarListEntry.scss';
import PropTypes from 'prop-types';
import { SidebarListEntryProps } from '../../model/props/SidebarListEntryProps';
import React from 'react';
import { Link } from 'react-router-dom';

SidebarListEntry.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  linkTarget: PropTypes.string,
  isActive: PropTypes.bool,
  className: PropTypes.string,
};

export function SidebarListEntry({
  name,
  imgSrc,
  imgAlt,
  linkTarget = '/',
  className = '',
  isActive = false,
}: SidebarListEntryProps) {
  const content = (
    <>
      <img src={imgSrc} alt={imgAlt} aria-hidden="true" />
      <label className="entryRowLabel">{name}</label>
    </>
  );

  const isLink = className !== 'sidebarMinimize';
  if (isLink) {
    return (
      <Link to={linkTarget} className={`entryRow link ${isActive ? 'active' : ''}`} tabIndex={0}>
        {content}
      </Link>
    );
  } else {
    return (
      <div className={`entryRow div`} tabIndex={0}>
        {content}
      </div>
    );
  }
}
