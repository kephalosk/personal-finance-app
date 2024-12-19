import './DropdownCategoryListItem.scss';
import React, { ReactNode } from 'react';
import { BudgetCategory } from '../../../model/BudgetCategory';

interface Props {
  category: BudgetCategory;
  onItemClick: (category: BudgetCategory) => void;
  handleCategoryKeyDown: (
    event: React.KeyboardEvent<HTMLDivElement>,
    category: BudgetCategory,
    index: number
  ) => void;
  clickableRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  index: number;
  dropdownCategoryListItemContainerClass: string;
  dropdownCategoryListItemClass: string;
  dropdownCategoryListItemLabelClass: string;
}

const DropdownCategoryListItem: ({
  category,
  onItemClick,
  handleCategoryKeyDown,
  clickableRefs,
  index,
  dropdownCategoryListItemContainerClass,
  dropdownCategoryListItemClass,
  dropdownCategoryListItemLabelClass,
}: Props) => ReactNode = ({
  category,
  onItemClick,
  handleCategoryKeyDown,
  clickableRefs,
  index,
  dropdownCategoryListItemContainerClass,
  dropdownCategoryListItemClass,
  dropdownCategoryListItemLabelClass,
}: Props): ReactNode => {
  return (
    <div
      className={`${dropdownCategoryListItemContainerClass} ${category.disabled ? 'disabled' : ''}`}
      data-testid="dropdown-category-list-item"
    >
      <div
        className={`${dropdownCategoryListItemClass} ${category.disabled ? 'disabled' : ''}`}
        onClick={() => onItemClick(category)}
        onKeyDown={(event) => handleCategoryKeyDown(event, category, index + 1)}
        tabIndex={category.disabled ? -1 : 0}
        ref={(el) => {
          if (!category.disabled) {
            clickableRefs.current[index + 1] = el;
          }
        }}
      >
        <label className={dropdownCategoryListItemLabelClass}>{category.name}</label>
        {category.disabled && <span className="dropdownCategoryListItemInfo">Already used</span>}
      </div>
    </div>
  );
};

export default DropdownCategoryListItem;
