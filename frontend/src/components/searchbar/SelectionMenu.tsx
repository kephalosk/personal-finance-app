import './SelectionMenu.scss';
import { Item } from '../../model/Item';
import React, { useEffect, useState } from 'react';
import useIsSmallScreen from '../../globals/hooks/useIsSmallScreen';

interface Props {
  selectedItem: string;
  items: Item[];
  handleItemChange: (item: string) => void;
  mobileIcon: string;
  hasSmallerWidth?: boolean;
}

function SelectionMenu({
  selectedItem,
  items,
  handleItemChange,
  mobileIcon,
  hasSmallerWidth = false,
}: Props) {
  const [showSelection, setShowSelection] = useState<boolean>(false);
  const isSmallScreen = useIsSmallScreen();
  const menuClass = 'selectionMenuListElement';

  const handleDropdownClick = () => {
    setShowSelection(!showSelection);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.classList.contains(menuClass)) {
        setShowSelection(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleDropdownClick();
    }
  };

  const handleItemKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>, category: string) => {
    if (event.key === 'Enter') {
      handleItemChange(category);
    }
  };

  return (
    <div
      className="selectionMenuWrapper"
      data-testid="selection-menu"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`selectionMenu ${hasSmallerWidth ? 'smallerWidth' : ''}`}
        onClick={handleDropdownClick}
      >
        {selectedItem}
        {showSelection && (
          <div className={`selectionMenuList ${hasSmallerWidth ? 'smallerWidth' : ''}`}>
            <label className={`${menuClass} selected`}>{selectedItem}</label>
            {items.map((category: Item, index: number) => (
              <div key={index}>
                {category.name !== selectedItem && (
                  <label
                    className={`${menuClass}`}
                    onClick={() => handleItemChange(category.key)}
                    onKeyDown={(event) => handleItemKeyDown(event, category.key)}
                    tabIndex={0}
                  >
                    {category.name}
                  </label>
                )}
                {index < items.length - 1 && <hr className="selectionMenuListLine" />}
              </div>
            ))}
          </div>
        )}
      </div>
      {!isSmallScreen && (
        <img
          className="selectionMenuIcon"
          alt="icon of caret down"
          aria-hidden="true"
          src="/images/icon-caret-down.svg"
        />
      )}
      {isSmallScreen && (
        <img className="selectionMenuIcon" alt="select icon" aria-hidden="false" src={mobileIcon} />
      )}
    </div>
  );
}

export default SelectionMenu;
