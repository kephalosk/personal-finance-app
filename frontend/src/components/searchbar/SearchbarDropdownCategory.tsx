import './SearchbarDropdownCategory.scss';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SearchbarDropdownCategoryProps } from '../../model/props/SearchbarDropdownCategoryProps';
import { EPTransaction } from '../../model/entrypoints/EPTransaction';
import { getTransactions } from '../../globals/services/TransactionService';
import { Item } from '../../model/Item';
import SelectionMenu from './SelectionMenu';

SearchbarDropdownCategory.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
};

export function SearchbarDropdownCategory({ onCategoryChange }: SearchbarDropdownCategoryProps) {
  const [allTransactions, setAllTransactions] = useState<EPTransaction[]>([]);

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

  const hasNewKey = (transaction: EPTransaction, allCategories: Item[]) => {
    let hasNewKey: boolean = true;
    allCategories.forEach((category: Item) => {
      if (haveSameKey(category.key, transaction.categoryKey)) {
        hasNewKey = false;
      }
    });
    return hasNewKey;
  };

  const getAllCategories = (): Item[] => {
    const allCategories: Item[] = [
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

  const allCategories: Item[] = getAllCategories();

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
    <SelectionMenu
      selectedItem={getCategoryName(selectedCategory)}
      items={allCategories}
      handleItemChange={handleCategoryChange}
      mobileIcon="/images/icon-filter-mobile.svg"
    />
  );
}
