import './OverlayContentAddNewBudget.scss';
import OverlayDropdownCategory from './OverlayDropdownCategory';
import OverlayDropdownColor from './OverlayDropdownColor';
import { Color } from '../../model/Color';
import { ReactNode, useEffect, useRef } from 'react';
import InputMoney, { InputMoneyRef } from '../atoms/InputMoney';

interface Props {
  selectedCategoryItem: string;
  handleCategoryChange: (category: string) => void;
  selectedColorItem: Color;
  handleColorChange: (color: Color) => void;
  handleInputChange: (input: number) => void;
  colors: Color[];
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
  isHidden,
  hasValidInput,
}: Props) => ReactNode = ({
  selectedCategoryItem,
  handleCategoryChange,
  selectedColorItem,
  handleColorChange,
  handleInputChange,
  colors,
  isHidden,
  hasValidInput,
}: Props): ReactNode => {
  const inputMoneyRef = useRef<InputMoneyRef>(null);

  useEffect(() => {
    if (isHidden) {
      inputMoneyRef.current?.reset(); // Reset auslösen
    }
  }, [isHidden]);

  return (
    <div className="overlayContentAddNewBudget" data-testid="overlay-content-add-new-budget">
      <label className="fieldTitle">Budget Category</label>
      <OverlayDropdownCategory
        selectedItem={selectedCategoryItem}
        handleCategoryChange={handleCategoryChange}
      />
      <label className="fieldTitle">Maximum Spend</label>
      <InputMoney
        ref={inputMoneyRef}
        handleInputChange={handleInputChange}
        hasValidInput={hasValidInput}
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
