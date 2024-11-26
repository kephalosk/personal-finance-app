import './OverlayContentAddNewBudget.scss';
import OverlayDropdownCategory from './OverlayDropdownCategory';

interface Props {
  selectedItem: string;
  handleCategoryChange: (category: string) => void;
}

const OverlayContentAddNewBudget = ({ selectedItem, handleCategoryChange }: Props) => {
  return (
    <div className="overlayContentAddNewBudget" data-testid="overlay-content-add-new-budget">
      <label className="fieldTitle">Budget Category</label>
      <OverlayDropdownCategory
        selectedItem={selectedItem}
        handleCategoryChange={handleCategoryChange}
      />
      <label className="fieldTitle">Maximum Spend</label>
      <input className="inputMoney" />
      <label className="fieldTitle">Theme</label>
      <div className="dropdownColor" tabIndex={0}>
        <div className="dropdownColorCircle"></div>
        Green
        <img
          className="dropdownCategoryIcon"
          alt="caret icon"
          aria-hidden="true"
          src="/images/icon-caret-down.svg"
        />
      </div>
    </div>
  );
};

export default OverlayContentAddNewBudget;
