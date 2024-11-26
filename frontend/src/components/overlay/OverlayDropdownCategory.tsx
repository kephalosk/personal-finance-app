import './OverlayDropdownCategory.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Categories } from '../../constants/Categories';
import { Category } from '../../model/Category';

interface Props {
  selectedItem: string;
  handleCategoryChange: (category: string) => void;
}

const OverlayDropdownCategory: ({
  selectedItem,
  handleCategoryChange,
}: Props) => React.ReactNode = ({ selectedItem, handleCategoryChange }: Props) => {
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const itemClass: string = 'dropdownCategoryListItem';
  const visibleCategories: Category[] = Categories.filter((category: Category): boolean => {
    return category.name !== selectedItem;
  });
  const visibleRefs: React.MutableRefObject<(HTMLLabelElement | null)[]> = useRef<
    (HTMLLabelElement | null)[]
  >([]);

  useEffect((): (() => void) => {
    const handleOutsideClick: (event: MouseEvent) => void = (event: MouseEvent): void => {
      const target: HTMLElement | null = event.target as HTMLElement;
      if (target && !target.classList.contains(itemClass)) {
        setShowCategories(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect((): void => {
    visibleRefs.current = visibleRefs.current.slice(0, visibleCategories.length);
  }, [visibleCategories.length]);

  const handleClick: () => void = (): void => {
    setShowCategories(!showCategories);
  };

  const handleCategoryKeyDown: (
    event: React.KeyboardEvent<HTMLLabelElement>,
    category: string,
    visibleIndex: number
  ) => void = (
    event: React.KeyboardEvent<HTMLLabelElement>,
    category: string,
    visibleIndex: number
  ): void => {
    if (event.key === 'Enter') {
      handleCategoryChange(category);
    }
    if (event.key === 'Tab' && !event.shiftKey && visibleIndex === visibleRefs.current.length - 1) {
      event.preventDefault();
      visibleRefs.current[0]?.focus();
    }
    if (event.key === 'Tab' && event.shiftKey && visibleIndex === 0) {
      event.preventDefault();
      visibleRefs.current[visibleRefs.current.length - 1]?.focus();
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
    <div
      className="dropdownCategory"
      data-testid="dropdown-category"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {selectedItem}
      <div className={`dropdownCategoryList ${showCategories ? 'isOpen' : ''}`}>
        <label className={itemClass}>{selectedItem}</label>
        {visibleCategories.map((category: Category, index: number) => (
          <div key={index}>
            <hr className="dropdownCategoryListLine" />
            <label
              className={itemClass}
              tabIndex={0}
              onClick={() => handleCategoryChange(category.name)}
              onKeyDown={(event) => handleCategoryKeyDown(event, category.name, index)}
              ref={(el) => {
                visibleRefs.current[index] = el;
              }}
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>
      <img
        className="dropdownCategoryIcon"
        alt="caret icon"
        aria-hidden="true"
        src="/images/icon-caret-down.svg"
      />
    </div>
  );
};

export default OverlayDropdownCategory;
