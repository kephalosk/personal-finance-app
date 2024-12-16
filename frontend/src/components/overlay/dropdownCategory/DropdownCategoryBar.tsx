import './DropdownCategoryBar.scss';
import React, { ReactNode } from 'react';
import { BudgetCategory } from '../../../model/BudgetCategory';

interface Props {
  selectedItem: BudgetCategory;
  handleClick: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

const DropdownCategoryBar: ({ selectedItem, handleClick, handleKeyDown }: Props) => ReactNode = ({
  selectedItem,
  handleClick,
  handleKeyDown,
}: Props): ReactNode => {
  return (
    <div className="DropdownCategoryBarContainer">
      <div
        className={`dropdownCategoryBar ${selectedItem.disabled ? 'disabled' : ''}`}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <div className={`dropdownCategoryBarItem ${selectedItem.disabled ? 'disabled' : ''}`}>
          <label className="dropdownCategoryBarItemLabel">{selectedItem.name}</label>
          {selectedItem.disabled && <span>Already used</span>}
        </div>
        <img
          className="dropdownCategoryIcon"
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
