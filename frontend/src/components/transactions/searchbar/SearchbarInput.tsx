import './SearchbarInput.scss';

export function SearchbarInput() {
  return (
    <>
      <div className="searchbarInputContainer">
        <div className="searchbarInputRelative">
          <input className="searchbarInput" placeholder="Search transactions" />
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
