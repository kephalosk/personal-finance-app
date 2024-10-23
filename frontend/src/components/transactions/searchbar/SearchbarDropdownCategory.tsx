import './SearchbarDropdownCategory.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SearchbarDropdownCategoryProps } from '../../../types/SearchbarDropdownCategoryProps';

SearchbarDropdownCategory.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
};

export function SearchbarDropdownCategory({ onCategoryChange }: SearchbarDropdownCategoryProps) {
  const [selectedOption, setSelectedOption] = useState<string>('all');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setSelectedOption(selectedCategory);
    onCategoryChange(selectedCategory);
  };

  return (
    <>
      <div className="searchbarDropdownCategoryWrapper" data-testid="searchbar-dropdown-category">
        <select
          className="searchbarDropdownCategory"
          value={selectedOption}
          id="options"
          onChange={handleCategoryChange}
        >
          <option className="all" value="all">
            All Transactions
          </option>
          <option className="entertainment" value="entertainment">
            Entertainment
          </option>
          <option className="bills" value="bills">
            Bills
          </option>
          <option className="groceries" value="groceries">
            Groceries
          </option>
          <option className="diningout" value="diningout">
            Dining Out
          </option>
          <option className="transportation" value="transportation">
            Transportation
          </option>
          <option className="personalcare" value="personalcare">
            Personal Care
          </option>
          <option className="education" value="education">
            Education
          </option>
          <option className="lifestyle" value="lifestyle">
            Lifestyle
          </option>
          <option className="shopping" value="shopping">
            Shopping
          </option>
          <option className="general" value="general">
            General
          </option>
        </select>
        <img
          className="searchbarDropdownCategoryIcon"
          alt="icon of caret down"
          aria-hidden="true"
          src="./src/assets/images/icon-caret-down.svg"
        />
      </div>
    </>
  );
}
