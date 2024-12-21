import './CardHeaderDropdownList.scss';
import CardHeaderDropdownItem from './CardHeaderDropdownItem';
import { CardHeaderItemNameEnum } from '../../model/enum/CardHeaderItemNameEnum';
import { CardHeaderItemOperationEnum } from '../../model/enum/CardHeaderItemOperationEnum';
import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import React, { ReactNode, useEffect, useRef } from 'react';

interface Props {
  itemName: CardHeaderItemNameEnum;
  isDropdownVisible: boolean;
  handleSelection: (
    itemOperation: CardHeaderItemOperationEnum,
    itemName: CardHeaderItemNameEnum
  ) => void;
  hideDropdown: () => void;
}

const CardHeaderDropdownList: ({
  itemName,
  isDropdownVisible,
  hideDropdown,
  handleSelection,
}: Props) => ReactNode = ({
  itemName,
  isDropdownVisible,
  hideDropdown,
  handleSelection,
}: Props): ReactNode => {
  const clickableRefs: React.MutableRefObject<(HTMLDivElement | null)[]> = useRef<
    (HTMLDivElement | null)[]
  >([]);

  useEffect((): (() => void) => {
    const handleOutsideClick: (event: MouseEvent) => void = (event: MouseEvent): void => {
      const target: HTMLElement | null = event.target as HTMLElement;
      if (
        target &&
        !target.classList.contains('cardHeaderDropdownItem') &&
        !target.classList.contains('cardHeaderDropdownItemLabel') &&
        !target.classList.contains('cardHeaderDropdownListLine') &&
        target.classList.value !== ''
      ) {
        hideDropdown();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
    // hideDropdown is a callback function that only sets the value of isDropdownVisible
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDropdownClick: (
    itemOperation: CardHeaderItemOperationEnum,
    itemName: CardHeaderItemNameEnum
  ) => void = (
    itemOperation: CardHeaderItemOperationEnum,
    itemName: CardHeaderItemNameEnum
  ): void => {
    handleSelection(itemOperation, itemName);
    hideDropdown();
  };

  const handleDropdownKeyDown: (
    event: React.KeyboardEvent<HTMLDivElement>,
    itemOperation: CardHeaderItemOperationEnum,
    itemName: CardHeaderItemNameEnum,
    index: number
  ) => void = (
    event: React.KeyboardEvent<HTMLDivElement>,
    itemOperation: CardHeaderItemOperationEnum,
    itemName: CardHeaderItemNameEnum,
    index: number
  ): void => {
    if (event.key === 'Enter') {
      handleSelection(itemOperation, itemName);
      hideDropdown();
    }
    if (event.key === 'Tab' && !event.shiftKey && index === clickableRefs.current.length - 1) {
      event.preventDefault();
      clickableRefs.current[0]?.focus();
    }
    if (event.key === 'Tab' && event.shiftKey && index === 0) {
      event.preventDefault();
      clickableRefs.current[clickableRefs.current.length - 1]?.focus();
    }
    if (event.key === 'Escape') {
      hideDropdown();
    }
  };

  return (
    <div className={`cardHeaderDropdownList ${isDropdownVisible ? 'isVisible' : ''}`}>
      <CardHeaderDropdownItem
        itemOperation={CardHeaderItemOperationEnum.EDIT}
        itemName={itemName}
        itemColor={ColorNameEnum.BLACK}
        handleDropdownClick={handleDropdownClick}
        handleDropdownKeyDown={handleDropdownKeyDown}
        index={0}
        clickableRefs={clickableRefs}
      />
      <hr className="cardHeaderDropdownListLine" />
      <CardHeaderDropdownItem
        itemOperation={CardHeaderItemOperationEnum.DELETE}
        itemName={itemName}
        itemColor={ColorNameEnum.RED}
        handleDropdownClick={handleDropdownClick}
        handleDropdownKeyDown={handleDropdownKeyDown}
        index={1}
        clickableRefs={clickableRefs}
      />
    </div>
  );
};

export default CardHeaderDropdownList;
