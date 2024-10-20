import './SidebarListEntry.scss';
import PropTypes from 'prop-types';
import { SidebarListEntryProps } from '../../types/SidebarListEntryProps';
import React from 'react';
import { Link } from 'react-router-dom';

SidebarListEntry.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  linkTarget: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export function SidebarListEntry({
  name,
  imgSrc,
  imgAlt,
  linkTarget,
  className,
}: SidebarListEntryProps) {
  const target = '/';
  return (
    <Link to={linkTarget} className={`entryRow ${className ? className : ''}`} tabIndex={0}>
      <img src={imgSrc} alt={imgAlt} aria-hidden="true" />
      <label className="entryRowLabel">{name}</label>
    </Link>
  );
}
