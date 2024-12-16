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
  onItemClick: (category: Category) => void;
  handleColorKeyDown: (
    event: React.KeyboardEvent<HTMLDivElement>,
    category: Category,
    index: number
  ) => void;
  clickableRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  index: number;
}

const OverlayDropdownCategory: ({
  selectedItem,
  handleCategoryChange,
  budgetCategories,
}: Props) => React.ReactNode = ({
  selectedItem,
  handleCategoryChange,
  budgetCategories,
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

  const dropdownCategoryContainer: string = 'dropdownCategoryContainer';
  const dropdownCategoryBar: string = 'dropdownCategoryBar';
  const dropdownCategoryIcon: string = 'dropdownCategoryIcon';
  const dropdownCategoryItemContainer: string = 'dropdownCategoryItemContainer';
  const dropdownCategoryItem: string = 'dropdownCategoryItem';
  const dropdownCategoryItemLabel: string = 'dropdownCategoryItemLabel';
  const dropdownCategoryListLine: string = 'dropdownCategoryListLine';
  useEffect((): (() => void) => {
    const handleOutsideClick: (event: MouseEvent) => void = (event: MouseEvent): void => {
      const target: HTMLElement | null = event.target as HTMLElement;
      if (
        target &&
        !target.classList.contains(dropdownCategoryContainer) &&
        !target.classList.contains(dropdownCategoryBar) &&
        !target.classList.contains(dropdownCategoryIcon) &&
        !target.classList.contains(dropdownCategoryItemContainer) &&
        !target.classList.contains(dropdownCategoryItem) &&
        !target.classList.contains(dropdownCategoryItemLabel) &&
        !target.classList.contains(dropdownCategoryListLine) &&
        !target.classList.contains('dropdownCategoryListItem') &&
        !target.classList.contains('dropdownCategoryListItemContainer') &&
        !target.classList.contains('dropdownCategoryListItemLabel')
      ) {
        console.log('handleOutsideClick');
        console.log('target.classList', target.classList);
        console.log('showCategories', showCategories);
        setShowCategories(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleClick: () => void = (): void => {
    console.log('handleClick');
    console.log('!showCategories', !showCategories);
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
    <div className={`${dropdownCategoryContainer}`} data-testid="dropdown-category">
      <DropdownCategoryBar
        selectedItem={selectedItem}
        handleClick={handleClick}
        handleKeyDown={handleKeyDown}
      />
      <div className={`dropdownCategoryList ${showCategories ? 'isOpen' : ''}`}>
        <DropdownCategoryListItem
          category={selectedItem}
          onItemClick={onItemClick}
          handleCategoryKeyDown={handleCategoryKeyDown}
          clickableRefs={clickableRefs}
          index={-1}
        />
        {visibleCategories.map((category: BudgetCategory, index: number) => (
          <div
            key={index}
            className={`dropdownCategoryListEntry ${category.disabled ? 'disabled' : ''}`}
          >
            <hr className={`${dropdownCategoryListLine} ${category.disabled ? 'disabled' : ''}`} />
            <DropdownCategoryListItem
              category={category}
              onItemClick={onItemClick}
              handleCategoryKeyDown={handleCategoryKeyDown}
              clickableRefs={clickableRefs}
              index={index}
            />
          </div>
        ))}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default OverlayDropdownCategory;
