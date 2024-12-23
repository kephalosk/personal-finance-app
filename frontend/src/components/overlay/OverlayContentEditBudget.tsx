import './OverlayContentEditBudget.scss';
import OverlayContentLabel from '../atoms/OverlayContentLabel';
import OverlayDropdownCategory from './dropdownCategory/OverlayDropdownCategory';
import { EPBudget } from '../../model/entrypoints/EPBudget';
import InputMoney, { InputMoneyRef } from '../atoms/InputMoney';
import { RefObject, useEffect, useRef } from 'react';
import OverlayDropdownColor from './OverlayDropdownColor';
import { Color } from '../../model/Color';

interface Props {
  budget: EPBudget;
  isHidden: boolean;
  handleInputChange: (input: number) => void;
  hasValidInput: boolean;
  selectedColorItem: Color;
  handleColorChange: (color: Color) => void;
  colors: Color[];
}

const OverlayContentEditBudget = ({
  budget,
  isHidden,
  handleInputChange,
  hasValidInput,
  selectedColorItem,
  handleColorChange,
  colors,
}: Props) => {
  const inputMoneyRef: RefObject<InputMoneyRef> = useRef<InputMoneyRef>(null);

  const budgetCategory = {
    name: budget.category,
    key: budget.categoryKey,
    disabled: false,
  };

  useEffect((): void => {
    if (isHidden) {
      inputMoneyRef.current?.reset();
    }
  }, [isHidden]);

  return (
    <div className="overlayContentEditBudget">
      <OverlayContentLabel title="Budget Category" />
      <div className="overlayContentEditBudgetNotAllowed">
        <div className="overlayContentEditBudgetNoEvents">
          <OverlayDropdownCategory
            selectedItem={budgetCategory}
            handleCategoryChange={() => {}}
            budgetCategories={[]}
            isDisabled={true}
          />
        </div>
      </div>
      <OverlayContentLabel title={`Maximum Spend (current Maximum: $${budget.maximum})`} />
      <InputMoney
        ref={inputMoneyRef}
        handleInputChange={handleInputChange}
        hasValidInput={hasValidInput}
      />
      <OverlayContentLabel title="Theme" />
      <OverlayDropdownColor
        selectedColor={selectedColorItem}
        handleColorChange={handleColorChange}
        colors={colors}
      />
    </div>
  );
};

export default OverlayContentEditBudget;
