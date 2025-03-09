import './OverlayContentAddNewBudget.scss';
import OverlayDropdownCategory from './dropdownCategory/OverlayDropdownCategory';
import OverlayDropdownColor from './OverlayDropdownColor';
import { Color } from '../../model/Color';
import { ReactNode, RefObject, useEffect, useRef } from 'react';
import MoneyInput, { InputMoneyRef } from '../atoms/MoneyInput';
import { BudgetCategory } from '../../model/BudgetCategory';

interface Props {
  selectedCategoryItem: BudgetCategory;
  handleCategoryChange: (category: BudgetCategory) => void;
  selectedColorItem: Color;
  handleColorChange: (color: Color) => void;
  handleInputChange: (input: number) => void;
  colors: Color[];
  budgetCategories: BudgetCategory[];
  isHidden: boolean;
  hasValidInput: boolean;
}

const OverlayContentAddNewBudget: ({
  selectedCategoryItem,
  handleCategoryChange,
  selectedColorItem,
  handleColorChange,
  handleInputChange,
  colors,
  budgetCategories,
  isHidden,
  hasValidInput,
}: Props) => ReactNode = ({
  selectedCategoryItem,
  handleCategoryChange,
  selectedColorItem,
  handleColorChange,
  handleInputChange,
  colors,
  budgetCategories,
  isHidden,
  hasValidInput,
}: Props): ReactNode => {
  const inputMoneyRef: RefObject<InputMoneyRef> = useRef<InputMoneyRef>(null);

  useEffect((): void => {
    if (isHidden) {
      inputMoneyRef.current?.reset();
    }
  }, [isHidden]);

  return (
    <div className="overlayContentAddNewBudget" data-testid="overlay-content-add-new-budget">
      <label className="fieldTitle">Budget Category</label>
      <OverlayDropdownCategory
        selectedItem={selectedCategoryItem}
        handleCategoryChange={handleCategoryChange}
        budgetCategories={budgetCategories}
      />
      <label className="fieldTitle">Maximum Spend</label>
      <MoneyInput
        ref={inputMoneyRef}
        handleInputChange={handleInputChange}
        hasValidInput={hasValidInput}
        isLimitInput={true}
        cssKey={selectedCategoryItem.key}
      />
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
