import './SearchbarDropdownCategory.scss';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SearchbarDropdownCategoryProps } from '../../model/props/SearchbarDropdownCategoryProps';
import { EPTransaction } from '../../model/entrypoints/EPTransaction';
import { getTransactions } from '../../globals/services/TransactionService';
import { Category } from '../../model/Category';
import useIsSmallScreen from '../../globals/hooks/useIsSmallScreen';
import SelectionMenu from './SelectionMenu';

SearchbarDropdownCategory.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
};

export function SearchbarDropdownCategory({ onCategoryChange }: SearchbarDropdownCategoryProps) {
  const [allTransactions, setAllTransactions] = useState<EPTransaction[]>([]);
  const isSmallScreen = useIsSmallScreen();

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactions: EPTransaction[] = await getTransactions();
      setAllTransactions(transactions);
    };
    fetchTransactions().then();
  }, []);

  const handleCategoryChange = (categoryKey: string) => {
    onCategoryChange(categoryKey);
    setSelectedCategory(categoryKey);
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

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getCategoryName = (category: string): string => {
    let selectedCategory = '';
    allCategories.forEach((cat) => {
      if (cat.key === category) {
        selectedCategory = cat.name;
      }
    });
    return selectedCategory;
  };

  return (
    <>
      {!isSmallScreen && (
        <div className="searchbarDropdownCategoryWrapper" data-testid="searchbar-dropdown-category">
          <SelectionMenu
            selectedItem={getCategoryName(selectedCategory)}
            items={allCategories}
            handleItemChange={handleCategoryChange}
          />
          <img
            className="searchbarDropdownCategoryIcon"
            alt="icon of caret down"
            aria-hidden="true"
            src="/images/icon-caret-down.svg"
          />
        </div>
      )}
      {isSmallScreen && (
        <div className="searchbarDropdownCategoryWrapper" data-testid="searchbar-dropdown-category">
          <SelectionMenu
            selectedItem={getCategoryName(selectedCategory)}
            items={allCategories}
            handleItemChange={handleCategoryChange}
          />
          <img
            className="searchbarDropdownCategoryIcon"
            alt="category select icon"
            aria-hidden="false"
            src="/images/icon-filter-mobile.svg"
          />
        </div>
      )}
    </>
  );
}
