import './TransactionsSearchbar.scss';
import SearchbarInput, { SearchbarInputHandle } from './SearchbarInput';
import SearchbarDropdownSort from './SearchbarDropdownSort';
import SearchbarDropdownCategory from './SearchbarDropdownCategory';
import React, { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';
import useIsSmallScreen from '../../globals/hooks/useIsSmallScreen';
import { EPTransaction } from '../../model/entrypoints/EPTransaction';
import { SortOptionEnum } from '../../constants/SortOptionEnum';
import { useLocation } from 'react-router-dom';
import isDefined from '../../globals/helper/isDefined';

interface Props {
  fetchedTransactions: EPTransaction[];
  updateTransactions: (filteredTransactions: EPTransaction[]) => void;
}

const TransactionsSearchbar: ({ fetchedTransactions, updateTransactions }: Props) => ReactNode = ({
  fetchedTransactions,
  updateTransactions,
}: Props): ReactNode => {
  const [filteredTransactions, setFilteredTransactions] = useState(fetchedTransactions);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [currentSortOption, setCurrentSortOption] = useState<string>(SortOptionEnum.LATEST);
  const searchbarRef: MutableRefObject<SearchbarInputHandle | null> =
    useRef<SearchbarInputHandle | null>(null);
  const location = useLocation();
  const queryParams: URLSearchParams = new URLSearchParams(location.search);
  const cat: string | null = queryParams.get('cat');
  const isSmallScreen: boolean = useIsSmallScreen();
  let shadowFilteredTransactions: EPTransaction[] = [...filteredTransactions];

  useEffect((): void => {
    setFilteredTransactions(fetchedTransactions);
    updateTransactions(fetchedTransactions);
  }, [fetchedTransactions]);

  useEffect((): void => {
    if (cat) {
      handleCategoryChange(cat, fetchedTransactions);
    }
  }, [cat, fetchedTransactions]);

  const handleInputChange: (currentInput: string) => void = (currentInput: string): void => {
    const filteredByInput: EPTransaction[] = fetchedTransactions.filter((transaction) => {
      const transactionSmall: string = transaction.name.toLowerCase();
      const inputSmall: string = currentInput.toLowerCase();
      return transactionSmall.includes(inputSmall);
    });

    shadowFilteredTransactions = [...filteredByInput];

    handleCategoryChange(currentCategory, filteredByInput);
  };

  const handleCategoryChange: (category: string, usedTransactions: EPTransaction[]) => void = (
    category: string,
    usedTransactions: EPTransaction[]
  ): void => {
    if (usedTransactions.length === fetchedTransactions.length && isDefined(searchbarRef.current)) {
      searchbarRef.current?.clearInput();
    }

    const filtered: EPTransaction[] = usedTransactions.filter((transaction) => {
      return transaction.categoryKey === category || category === 'all';
    });

    setCurrentCategory(category);

    shadowFilteredTransactions = [...filtered];

    handleSortChange(currentSortOption);
  };

  const handleSortChange: (sortOption: string) => void = (sortOption: string): void => {
    let sorted: EPTransaction[] = [...shadowFilteredTransactions];
    setCurrentSortOption(sortOption);

    switch (sortOption) {
      case SortOptionEnum.LATEST:
        sorted.sort(
          (a: EPTransaction, b: EPTransaction) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case SortOptionEnum.OLDEST:
        sorted.sort(
          (a: EPTransaction, b: EPTransaction) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case SortOptionEnum.ATOZ:
        sorted.sort((a: EPTransaction, b: EPTransaction) => a.name.localeCompare(b.name));
        break;
      case SortOptionEnum.ZTOA:
        sorted.sort((a: EPTransaction, b: EPTransaction) => b.name.localeCompare(a.name));
        break;
      case SortOptionEnum.HIGHEST:
        sorted.sort((a: EPTransaction, b: EPTransaction) => b.amount - a.amount);
        break;
      case SortOptionEnum.LOWEST:
        sorted.sort((a: EPTransaction, b: EPTransaction) => a.amount - b.amount);
        break;
    }

    setFilteredTransactions(sorted);

    updateTransactions(sorted);
  };

  return (
    <div className="transactionsSearchbar" data-testid="transactions-searchbar">
      <SearchbarInput ref={searchbarRef} onInputChange={handleInputChange} />
      <div className={`${isSmallScreen ? 'searchbarSmall' : 'searchbarLabelWrapper'}`}>
        {!isSmallScreen && <label className="searchbarLabel sortBy">Sort by</label>}
        <SearchbarDropdownSort onSortChange={handleSortChange} />
        {!isSmallScreen && <label className="searchbarLabel category">Category</label>}
        <SearchbarDropdownCategory
          onCategoryChange={(category: string) =>
            handleCategoryChange(category, fetchedTransactions)
          }
          currentCategory={currentCategory}
        />
      </div>
    </div>
  );
};
export default TransactionsSearchbar;
