import './SearchbarDropdownSort.scss';
import React, { ReactNode, useState } from 'react';
import { SortOptionEnum } from '../../constants/SortOptionEnum';
import SelectionMenu from './SelectionMenu';
import { Item } from '../../model/Item';

interface Props {
  onSortChange: (newSortOption: string) => void;
}

const SearchbarDropdownSort: ({ onSortChange }: Props) => ReactNode = ({
  onSortChange,
}: Props): ReactNode => {
  const [selectedOption, setSelectedOption] = useState<string>('latest');

  const allSorts: Item[] = [
    { key: SortOptionEnum.LATEST, name: 'Latest' },
    { key: SortOptionEnum.OLDEST, name: 'Oldest' },
    { key: SortOptionEnum.ATOZ, name: 'A to Z' },
    { key: SortOptionEnum.ZTOA, name: 'Z to A' },
    { key: SortOptionEnum.HIGHEST, name: 'Highest' },
    { key: SortOptionEnum.LOWEST, name: 'Lowest' },
  ];

  const getSortName = (category: string): string => {
    let selectedCategory = '';
    allSorts.forEach((sort) => {
      if (sort.key === category) {
        selectedCategory = sort.name;
      }
    });
    return selectedCategory;
  };

  const handleSortChange = (sortKey: string) => {
    onSortChange(sortKey);
    setSelectedOption(sortKey);
  };

  return (
    <div className="dropdownSort" data-testid="dropdown-sort">
      <SelectionMenu
        selectedItem={getSortName(selectedOption)}
        items={allSorts}
        handleItemChange={handleSortChange}
        mobileIcon="/images/icon-sort-mobile.svg"
        hasSmallerWidth={true}
      />
    </div>
  );
};

export default SearchbarDropdownSort;
