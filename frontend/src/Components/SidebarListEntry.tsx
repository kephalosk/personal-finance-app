import './SidebarListEntry.scss';
import PropTypes from 'prop-types';
import { SidebarListEntryProps } from '../Types/SidebarListEntryProps';

SidebarListEntry.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

function SidebarListEntry({ name, imgSrc, imgAlt, className }: SidebarListEntryProps) {
  return (
    <div className={`entryRow ${className ? className : ''}`} tabIndex={0}>
      <img src={imgSrc} alt={imgAlt} aria-hidden="true" />
      <label>{name}</label>
    </div>
  );
}

export default SidebarListEntry;
