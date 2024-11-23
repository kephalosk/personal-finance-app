import './HeaderBar.scss';
import PropTypes from 'prop-types';
import { HeaderBarProps } from '../model/props/HeaderBarProps';
import React from 'react';

HeaderBar.propTypes = {
  h1Headline: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export function HeaderBar({ h1Headline, buttonText }: HeaderBarProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter') {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
      }
    }
  };
  return (
    <>
      <div className="headerBar" data-testid="header-bar">
        <h1 className="headerBarTitle">{h1Headline}</h1>
        <button className="headerBarButton" onKeyDown={handleKeyDown}>
          {buttonText}
        </button>
      </div>
    </>
  );
}
