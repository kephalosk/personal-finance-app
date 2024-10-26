import './SearchbarDropdownCategory.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SearchbarDropdownCategoryProps } from '../../../types/SearchbarDropdownCategoryProps';
import { EPTransaction } from '../../../types/EPTransaction';
import { getTransactions } from '../../../globals/services/TransactionService';
import { Category } from '../../../types/Category';

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

  const haveSameKey = (key1: string, key2: string): boolean => {
    return key1 === key2;
  };

  const hasNewKey = (transaction: EPTransaction, allCategories: Category[]) => {
    let hasNewKey: boolean = true;
    allCategories.forEach((category: Category) => {
      if (haveSameKey(category.key, transaction.categoryKey)) {
        hasNewKey = false;
      }
    });
    return hasNewKey;
  };

  const getAllCategories = (): Category[] => {
    const allCategories: Category[] = [
      {
        key: 'all',
        name: 'All Transactions',
      },
    ];

    const allTransactions: EPTransaction[] = getTransactions();
    allTransactions.forEach((transaction: EPTransaction) => {
      if (hasNewKey(transaction, allCategories)) {
        allCategories.push({
          key: transaction.categoryKey,
          name: transaction.category,
        });
      }
    });

    return allCategories;
  };

  const allCategories: Category[] = getAllCategories();

  return (
    <>
      <div className="searchbarDropdownCategoryWrapper" data-testid="searchbar-dropdown-category">
        <select
          className="searchbarDropdownCategory"
          value={selectedOption}
          id="options"
          onChange={handleCategoryChange}
        >
          {allCategories.map((category) => (
            <option key={category.key} className={category.key} value={category.key}>
              {category.name}
            </option>
          ))}
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
