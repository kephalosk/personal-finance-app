import './SearchbarDropdownSort.scss';

export function SearchbarDropdownSort() {
  return (
    <>
      <div className="searchbarDropdownSortWrapper">
        <select className="searchbarDropdownSort" value="selected" id="options" onChange={() => {}}>
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
