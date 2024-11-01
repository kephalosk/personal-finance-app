import './SearchbarDropdownSort.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SearchbarDropdownSortProps } from '../../model/props/SearchbarDropdownSortProps';
import { SortOptionEnum } from '../../constants/SortOptionEnum';

SearchbarDropdownSort.propTypes = {
  omSortChange: PropTypes.func,
};

export function SearchbarDropdownSort({ onSortChange }: SearchbarDropdownSortProps) {
  const [selectedOption, setSelectedOption] = useState<string>('latest');

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = event.target.value;
    setSelectedOption(newSortOption);
    onSortChange(newSortOption);
    event.target.blur();
  };

  return (
    <>
      <div className="searchbarDropdownSortWrapper" data-testid="searchbar-dropdown-sort">
        <select
          className="searchbarDropdownSort"
          value={selectedOption}
          id="options"
          onChange={handleSortChange}
        >
          <option className={SortOptionEnum.LATEST} value={SortOptionEnum.LATEST}>
            Latest
          </option>
          <option className={SortOptionEnum.OLDEST} value={SortOptionEnum.OLDEST}>
            Oldest
          </option>
          <option className={SortOptionEnum.ATOZ} value={SortOptionEnum.ATOZ}>
            A to Z
          </option>
          <option className={SortOptionEnum.ZTOA} value={SortOptionEnum.ZTOA}>
            Z to A
          </option>
          <option className={SortOptionEnum.HIGHEST} value={SortOptionEnum.HIGHEST}>
            Highest
          </option>
          <option className={SortOptionEnum.LOWEST} value={SortOptionEnum.LOWEST}>
            Lowest
          </option>
        </select>
        <img
          className="searchbarDropdownSortIcon"
          alt="icon of caret down"
          aria-hidden="true"
          src="./src/assets/images/icon-caret-down.svg"
        />
      </div>
    </>
  );
}
