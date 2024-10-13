import './SidebarListEntry.scss';
import PropTypes from 'prop-types';
import { SidebarPage } from '../Types/SidebarPage';

interface SidebarListEntryProps extends SidebarPage {
  className?: string;
}

SidebarListEntry.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

function SidebarListEntry({ name, imgSrc, imgAlt, className }: SidebarListEntryProps) {
  return (
    <div className={className}>
      <img src={imgSrc} alt={imgAlt} aria-hidden="true" />
      <label>{name}</label>
    </div>
  );
}

export default SidebarListEntry;
