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
}

const DropdownCategoryListItem: ({
  category,
  onItemClick,
  handleCategoryKeyDown,
  clickableRefs,
  index,
}: Props) => ReactNode = ({
  category,
  onItemClick,
  handleCategoryKeyDown,
  clickableRefs,
  index,
}: Props): ReactNode => {
  return (
    <div className={`dropdownCategoryListItemContainer ${category.disabled ? 'disabled' : ''}`}>
      <div
        className={`dropdownCategoryListItem ${category.disabled ? 'disabled' : ''}`}
        data-testid="dropdown-category-list-item"
        onClick={() => onItemClick(category)}
        onKeyDown={(event) => handleCategoryKeyDown(event, category, index + 1)}
        tabIndex={category.disabled ? -1 : 0}
        ref={(el) => {
          if (!category.disabled) {
            clickableRefs.current[index + 1] = el;
          }
        }}
      >
        <label className="dropdownCategoryListItemLabel">{category.name}</label>
        {category.disabled && <span>Already used</span>}
      </div>
    </div>
  );
};

export default DropdownCategoryListItem;
