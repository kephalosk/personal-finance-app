import './HeaderBar.scss';
import PropTypes from 'prop-types';
import { HeaderBarProps } from '../types/HeaderBarProps';

HeaderBar.propTypes = {
  h1Headline: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export function HeaderBar({ h1Headline, buttonText }: HeaderBarProps) {
  return (
    <>
      <div className="headerBar" data-testid="header-bar">
        <h1 className="headerBarTitle">{h1Headline}</h1>
        <button className="headerBarButton">{buttonText}</button>
      </div>
    </>
  );
}
