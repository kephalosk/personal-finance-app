import './DropdownCategoryBar.scss';
import React, { ReactNode } from 'react';
import { BudgetCategory } from '../../../model/BudgetCategory';

interface Props {
  selectedItem: BudgetCategory;
  handleClick: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  dropdownCategoryBarClass: string;
  dropdownCategoryIconClass: string;
}

const DropdownCategoryBar: ({
  selectedItem,
  handleClick,
  handleKeyDown,
  dropdownCategoryBarClass,
  dropdownCategoryIconClass,
}: Props) => ReactNode = ({
  selectedItem,
  handleClick,
  handleKeyDown,
  dropdownCategoryBarClass,
  dropdownCategoryIconClass,
}: Props): ReactNode => {
  return (
    <div className="DropdownCategoryBarContainer" data-testid="dropdown-category-bar">
      <div
        className={`${dropdownCategoryBarClass} ${selectedItem.disabled ? 'disabled' : ''}`}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <div className={`dropdownCategoryBarItem ${selectedItem.disabled ? 'disabled' : ''}`}>
          <label className="dropdownCategoryBarItemLabel">{selectedItem.name}</label>
          {selectedItem.disabled && (
            <span className="dropdownCategoryBarItemInfo">Already used</span>
          )}
        </div>
        <img
          className={dropdownCategoryIconClass}
          alt="caret icon"
          aria-hidden="true"
          src="/images/icon-caret-down.svg"
        />
      </div>
      <label className={`dropdownCategoryValidation ${selectedItem.disabled ? 'visible' : ''}`}>
        There is already a Budget for every Category!
      </label>
    </div>
  );
};

export default DropdownCategoryBar;
