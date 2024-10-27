import './SearchbarDropdownSort.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SearchbarDropdownSortProps } from '../../../types/SearchbarDropdownSortProps';

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
          <option className="latest" value="latest">
            Latest
          </option>
          <option className="oldest" value="oldest">
            Oldest
          </option>
          <option className="atoz" value="atoz">
            A to Z
          </option>
          <option className="ztoa" value="ztoa">
            Z to A
          </option>
          <option className="highest" value="highest">
            Highest
          </option>
          <option className="lowest" value="lowest">
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
