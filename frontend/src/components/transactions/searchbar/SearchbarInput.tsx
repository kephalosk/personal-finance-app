import './SearchbarInput.scss';

export function SearchbarInput() {
  return (
    <>
      <div className="searchbarInputContainer" data-testid="searchbar-input">
        <div className="searchbarInputRelative">
          <input className="searchbarInput" placeholder="Search transaction" />
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
}
