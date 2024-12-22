import './CardHeader.scss';
import React, { KeyboardEvent, useState } from 'react';
import CardHeaderDropdownList from './atoms/CardHeaderDropdownList';
import { CardHeaderItemNameEnum } from '../model/enum/CardHeaderItemNameEnum';
import { CardHeaderItemOperationEnum } from '../model/enum/CardHeaderItemOperationEnum';

interface Props {
  title: string;
  color: string;
  itemName: CardHeaderItemNameEnum;
  handleSelection: (
    itemOperation: CardHeaderItemOperationEnum,
    itemName: CardHeaderItemNameEnum
  ) => void;
}

const CardHeader: ({ title, color, itemName }: Props) => React.ReactNode = ({
  title,
  color,
  itemName,
  handleSelection,
}: Props): React.ReactNode => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const handleClick = () => {
    setIsDropdownVisible(true);
  };

  const hideDropdown = () => {
    setIsDropdownVisible(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      setIsDropdownVisible(true);
    }
  };

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
            onClick={handleClick}
            onKeyDown={(event: KeyboardEvent) => handleKeyDown(event)}
          />
          <CardHeaderDropdownList
            itemName={itemName}
            isDropdownVisible={isDropdownVisible}
            handleSelection={handleSelection}
            hideDropdown={hideDropdown}
          />
        </div>
      </div>
    </>
  );
};

export default CardHeader;
