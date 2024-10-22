import './SearchbarDropdownCategory.scss';

export function SearchbarDropdownCategory() {
  return (
    <>
      <div className="searchbarDropdownCategoryWrapper">
        <select
          className="searchbarDropdownCategory"
          value="selected"
          id="options"
          onChange={() => {}}
        >
          <option className="all" value="all">
            All Transactions
          </option>
          <option className="entertainment" value="entertainment">
            Entertainment
          </option>
          <option className="bills" value="bills">
            Bills
          </option>
          <option className="groceries" value="groceries">
            Groceries
          </option>
          <option className="dining" value="dining">
            Dining Out
          </option>
          <option className="transportation" value="transportation">
            Transportation
          </option>
          <option className="personalcare" value="personalcare">
            Personal Care
          </option>
          <option className="education" value="education">
            Education
          </option>
          <option className="lifestyle" value="lifestyle">
            Lifestyle
          </option>
          <option className="shopping" value="shopping">
            Shopping
          </option>
          <option className="general" value="general">
            General
          </option>
        </select>
        <img
          className="searchbarDropdownCategoryIcon"
          alt="icon of caret down"
          aria-hidden="true"
          src="./src/assets/images/icon-caret-down.svg"
        />
      </div>
    </>
  );
}
