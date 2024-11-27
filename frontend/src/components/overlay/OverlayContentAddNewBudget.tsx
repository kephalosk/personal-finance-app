import './OverlayContentAddNewBudget.scss';
import OverlayDropdownCategory from './OverlayDropdownCategory';
import OverlayDropdownColor from './OverlayDropdownColor';
import { Color } from '../../model/Color';

interface Props {
  selectedCategoryItem: string;
  handleCategoryChange: (category: string) => void;
  selectedColorItem: Color;
  handleColorChange: (color: Color) => void;
  colors: Color[];
}

const OverlayContentAddNewBudget = ({
  selectedCategoryItem,
  handleCategoryChange,
  selectedColorItem,
  handleColorChange,
  colors,
}: Props) => {
  return (
    <div className="overlayContentAddNewBudget" data-testid="overlay-content-add-new-budget">
      <label className="fieldTitle">Budget Category</label>
      <OverlayDropdownCategory
        selectedItem={selectedCategoryItem}
        handleCategoryChange={handleCategoryChange}
      />
      <label className="fieldTitle">Maximum Spend</label>
      <input className="inputMoney" />
      <label className="fieldTitle">Theme</label>
      <OverlayDropdownColor
        selectedColor={selectedColorItem}
        handleColorChange={handleColorChange}
        colors={colors}
      />
    </div>
  );
};

export default OverlayContentAddNewBudget;
