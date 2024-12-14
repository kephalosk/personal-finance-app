import './SearchbarDropdownCategory.scss';
import React, { ReactNode, useEffect, useState } from 'react';
import { EPTransaction } from '../../model/entrypoints/EPTransaction';
import { getTransactions } from '../../globals/services/TransactionService';
import { Item } from '../../model/Item';
import SelectionMenu from './SelectionMenu';
import { Categories } from '../../constants/Categories';
import { Category } from '../../model/Category';

export interface Props {
  onCategoryChange: (category: string) => void;
  currentCategory: string;
}

const SearchbarDropdownCategory: ({ onCategoryChange, currentCategory }: Props) => ReactNode = ({
  onCategoryChange,
  currentCategory,
}: Props): ReactNode => {
  const [allTransactions, setAllTransactions] = useState<EPTransaction[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(currentCategory);

  useEffect(() => {
    setSelectedCategory(currentCategory);
  }, [currentCategory]);

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

  const getAllCategories = (): Item[] => {
    const allCategories: Item[] = [
      {
        key: 'all',
        name: 'All Transactions',
      },
    ];
    Categories.forEach((category: Category): void => {
      allCategories.push({
        key: category.key,
        name: category.name,
      });
    });
    return allCategories;
  };

  const allCategories: Item[] = getAllCategories();

  const getCategoryName = (category: string): string => {
    let selectedCategory: string = '';
    allCategories.forEach((cat: Item) => {
      if (cat.key === category) {
        selectedCategory = cat.name;
      }
    });
    return selectedCategory;
  };

  return (
    <div className="searchbarDropdownCategory">
      <SelectionMenu
        selectedItem={getCategoryName(selectedCategory)}
        items={allCategories}
        handleItemChange={handleCategoryChange}
        mobileIcon="/images/icon-filter-mobile.svg"
      />
    </div>
  );
};

export default SearchbarDropdownCategory;
