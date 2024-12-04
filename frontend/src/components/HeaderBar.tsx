import './HeaderBar.scss';
import React from 'react';

interface Props {
  h1Headline: string;
  buttonText: string;
  handleClick: () => void;
}

const HeaderBar: ({ h1Headline, buttonText, handleClick }: Props) => React.ReactNode = ({
  h1Headline,
  buttonText,
  handleClick,
}: Props): React.ReactNode => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter') {
      handleClick();
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
        <button className="headerBarButton" onClick={handleClick} onKeyDown={handleKeyDown}>
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default HeaderBar;
