import './SearchbarInput.scss';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

interface Props {
  onInputChange: (currentInput: string) => void;
}

export interface SearchbarInputHandle {
  clearInput: () => void;
}

const SearchbarInput = forwardRef<SearchbarInputHandle, Props>(({ onInputChange }: Props, ref) => {
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
            src="/images/icon-search.svg"
          />
        </div>
      </div>
    </>
  );
});

SearchbarInput.displayName = 'SearchbarInput';

export default SearchbarInput;
