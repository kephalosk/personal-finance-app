import './CardHeaderDropdownItemLabel.scss';
import React, { ReactNode } from 'react';
import { CardHeaderItemOperationEnum } from '../../model/enum/CardHeaderItemOperationEnum';
import { CardHeaderItemNameEnum } from '../../model/enum/CardHeaderItemNameEnum';
import { ColorNameEnum } from '../../model/enum/ColorNameEnum';

interface Props {
  itemOperation: CardHeaderItemOperationEnum;
  itemName: CardHeaderItemNameEnum;
  itemColor: ColorNameEnum.BLACK | ColorNameEnum.RED;
  handleDropdownClick: (itemOperation: CardHeaderItemOperationEnum) => void;
  handleDropdownKeyDown: (
    event: React.KeyboardEvent<HTMLDivElement>,
    itemOperation: CardHeaderItemOperationEnum,
    index: number
  ) => void;
  index: number;
  clickableRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const CardHeaderDropdownItemLabel: ({
  itemOperation,
  itemName,
  itemColor,
  handleDropdownClick,
  handleDropdownKeyDown,
  index,
  clickableRefs,
}: Props) => ReactNode = ({
  itemOperation,
  itemName,
  itemColor,
  handleDropdownClick,
  handleDropdownKeyDown,
  index,
  clickableRefs,
}: Props): ReactNode => {
  return (
    <div
      className={`cardHeaderDropdownItem ${itemColor}`}
      data-testid="card-header-dropdown-item"
      tabIndex={0}
      onClick={() => handleDropdownClick(itemOperation)}
      onKeyDown={(event) => handleDropdownKeyDown(event, itemOperation, index)}
      ref={(el) => {
        clickableRefs.current[index] = el;
      }}
    >
      <label className={'cardHeaderDropdownItemLabel'}>
        {itemOperation} {itemName}
      </label>
    </div>
  );
};

export default CardHeaderDropdownItemLabel;
