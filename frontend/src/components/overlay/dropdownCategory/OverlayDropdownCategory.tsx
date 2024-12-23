import './OverlayDropdownCategory.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Category } from '../../../model/Category';
import { BudgetCategory } from '../../../model/BudgetCategory';
import ScrollToTop from '../../ScrollToTop';
import DropdownCategoryListItem from './DropdownCategoryListItem';
import DropdownCategoryBar from './DropdownCategoryBar';

interface Props {
  selectedItem: BudgetCategory;
  handleCategoryChange: (category: BudgetCategory) => void;
  budgetCategories: BudgetCategory[];
  isDisabled?: boolean;
}

const OverlayDropdownCategory: ({
  selectedItem,
  handleCategoryChange,
  budgetCategories,
  isDisabled,
}: Props) => React.ReactNode = ({
  selectedItem,
  handleCategoryChange,
  budgetCategories,
  isDisabled = false,
}: Props) => {
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const visibleCategories: BudgetCategory[] = budgetCategories.filter(
    (category: Category): boolean => {
      return category.name !== selectedItem.name;
    }
  );
  const clickableRefs: React.MutableRefObject<(HTMLDivElement | null)[]> = useRef<
    (HTMLDivElement | null)[]
  >([]);
  const clickableCategories: BudgetCategory[] = budgetCategories.filter(
    (category: BudgetCategory) => !category.disabled
  );

  useEffect((): void => {
    clickableRefs.current = clickableRefs.current.slice(0, clickableCategories.length);
  }, [clickableCategories.length]);

  const dropdownCategoryBarClass: string = 'dropdownCategoryBar';
  const dropdownCategoryIconClass: string = 'dropdownCategoryIcon';
  const dropdownCategoryListItemContainerClass: string = 'dropdownCategoryListItemContainer';
  const dropdownCategoryListItemClass: string = 'dropdownCategoryListItem';
  const dropdownCategoryListItemLabelClass: string = 'dropdownCategoryListItemLabel';
  const dropdownCategoryListLineClass: string = 'dropdownCategoryListLine';
  useEffect((): (() => void) => {
    const handleOutsideClick: (event: MouseEvent) => void = (event: MouseEvent): void => {
      const target: HTMLElement | null = event.target as HTMLElement;
      if (
        target &&
        !target.classList.contains(dropdownCategoryBarClass) &&
        !target.classList.contains(dropdownCategoryIconClass) &&
        !target.classList.contains(dropdownCategoryListItemContainerClass) &&
        !target.classList.contains(dropdownCategoryListItemClass) &&
        !target.classList.contains(dropdownCategoryListItemLabelClass) &&
        !target.classList.contains(dropdownCategoryListLineClass)
      ) {
        setShowCategories(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleClick: () => void = (): void => {
    setShowCategories(!showCategories);
  };

  const onItemClick: (category: BudgetCategory) => void = (category: BudgetCategory): void => {
    handleCategoryChange(category);
    if (showCategories) {
      setShowCategories(false);
    }
  };

  const handleCategoryKeyDown: (
    event: React.KeyboardEvent<HTMLDivElement>,
    category: BudgetCategory,
    visibleIndex: number
  ) => void = (
    event: React.KeyboardEvent<HTMLDivElement>,
    category: BudgetCategory,
    visibleIndex: number
  ): void => {
    if (event.key === 'Enter') {
      handleCategoryChange(category);
      if (showCategories) {
        setShowCategories(false);
      }
    }
    if (
      event.key === 'Tab' &&
      !event.shiftKey &&
      visibleIndex === clickableRefs.current.length - 1
    ) {
      event.preventDefault();
      clickableRefs.current[0]?.focus();
    }
    if (event.key === 'Tab' && event.shiftKey && visibleIndex === 0) {
      event.preventDefault();
      clickableRefs.current[clickableRefs.current.length - 1]?.focus();
    }
    if (event.key === 'Escape') {
      setShowCategories(false);
    }
  };

  const handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void = (
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className="dropdownCategoryContainer" data-testid="dropdown-category">
      <DropdownCategoryBar
        selectedItem={selectedItem}
        handleClick={handleClick}
        handleKeyDown={handleKeyDown}
        dropdownCategoryBarClass={dropdownCategoryBarClass}
        dropdownCategoryIconClass={dropdownCategoryIconClass}
        isDisabled={isDisabled}
      />
      <div className={`dropdownCategoryList ${showCategories ? 'isOpen' : ''}`}>
        <DropdownCategoryListItem
          category={selectedItem}
          onItemClick={onItemClick}
          handleCategoryKeyDown={handleCategoryKeyDown}
          clickableRefs={clickableRefs}
          index={-1}
          dropdownCategoryListItemContainerClass={dropdownCategoryListItemContainerClass}
          dropdownCategoryListItemClass={dropdownCategoryListItemClass}
          dropdownCategoryListItemLabelClass={dropdownCategoryListItemLabelClass}
        />
        {visibleCategories.map((category: BudgetCategory, index: number) => (
          <div
            key={index}
            className={`dropdownCategoryListEntry ${category.disabled ? 'disabled' : ''}`}
          >
            <hr
              className={`${dropdownCategoryListLineClass} ${category.disabled ? 'disabled' : ''}`}
            />
            <DropdownCategoryListItem
              category={category}
              onItemClick={onItemClick}
              handleCategoryKeyDown={handleCategoryKeyDown}
              clickableRefs={clickableRefs}
              index={index}
              dropdownCategoryListItemContainerClass={dropdownCategoryListItemContainerClass}
              dropdownCategoryListItemClass={dropdownCategoryListItemClass}
              dropdownCategoryListItemLabelClass={dropdownCategoryListItemLabelClass}
            />
          </div>
        ))}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default OverlayDropdownCategory;
