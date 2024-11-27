import './OverlayDropdownIcon.scss';
import React from 'react';

const OverlayDropdownIcon = () => {
  return (
    <img
      className="dropdownColorIcon"
      data-testid="dropdown-color-icon"
      alt="caret icon"
      aria-hidden="true"
      src="/images/icon-caret-down.svg"
    />
  );
};

export default OverlayDropdownIcon;
