import './CardHeader.scss';
import React from 'react';

interface Props {
  title: string;
  color: string;
}

const CardHeader: ({ title, color }: Props) => React.ReactNode = ({
  title,
  color,
}: Props): React.ReactNode => {
  return (
    <>
      <div className="cardHeader" data-testid="card-header">
        <div className={`cardHeaderCircle ${color}`}></div>
        <label className="cardHeaderTitle">{title}</label>
        <div className="cardHeaderEditIconContainer">
          <img
            className="cardHeaderEditIcon"
            alt="ellipsis icon"
            aria-hidden="true"
            src="/images/icon-ellipsis.svg"
            tabIndex={0}
          />
          <div className="cardHeaderEditDropdown">
            <div className="cardHeaderEditDropdownEdit dropdownItem"></div>
            <div className="cardHeaderEditDropdownDelete dropdownItem"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardHeader;
