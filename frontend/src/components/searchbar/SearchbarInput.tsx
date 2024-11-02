import './SearchbarInput.scss';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { SearchbarInputProps } from '../../model/props/SearchbarInputProps';

export const SearchbarInput = forwardRef(({ onInputChange }: SearchbarInputProps, ref) => {
  const [currentInput, setCurrentInput] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = event.target.value;
    setCurrentInput(newInput);
    onInputChange(newInput);
  };

  useImperativeHandle(ref, () => ({
    clearInput() {
      setCurrentInput('');
    },
  }));

  return (
    <>
      <div className="searchbarInputContainer" data-testid="searchbar-input">
        <div className="searchbarInputRelative">
          <input
            className="searchbarInput"
            placeholder="Search transaction"
            value={currentInput}
            onChange={handleInputChange}
          />
          <img
            className="searchbarInputLense"
            alt="icon of search"
            aria-hidden="true"
            src="./src/assets/images/icon-search.svg"
          />
        </div>
      </div>
    </>
  );
});

SearchbarInput.displayName = 'SearchbarInput';
