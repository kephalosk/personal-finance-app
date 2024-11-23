import './SelectionMenu.scss';
import { Category } from '../../model/Category';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  selectedItem: string;
  items: Category[];
  handleItemChange: (item: string) => void;
  hasSmallerWidth?: boolean;
}

function SelectionMenu({ selectedItem, items, handleItemChange, hasSmallerWidth = false }: Props) {
  const [showSelection, setShowSelection] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLLabelElement | null>(null);

  const handleDropdownClick = () => {
    setShowSelection(!showSelection);
  };

  const menuClass = 'categorySelectionElement';

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

  return (
    <div
      className={`searchbarDropdownCategory ${hasSmallerWidth ? 'smallerWidth' : ''}`}
      onClick={handleDropdownClick}
    >
      {selectedItem}
      {showSelection && (
        <div className="categorySelection">
          <label ref={dropdownRef} className={`${menuClass} selected`}>
            {selectedItem}
          </label>
          {items.map((category: Category, index: number) => (
            <div key={category.key}>
              {category.name !== selectedItem && (
                <label
                  ref={dropdownRef}
                  className={`${menuClass}`}
                  onClick={() => handleItemChange(category.key)}
                >
                  {category.name}
                </label>
              )}
              {index < items.length - 1 && <hr className="categorySelectionLine" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectionMenu;
