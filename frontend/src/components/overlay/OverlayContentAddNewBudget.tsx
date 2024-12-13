import './OverlayContentAddNewBudget.scss';
import OverlayDropdownCategory from './OverlayDropdownCategory';
import OverlayDropdownColor from './OverlayDropdownColor';
import { Color } from '../../model/Color';
import { ReactNode, useEffect, useRef, useState } from 'react';
import InputMoney, { InputMoneyRef } from '../atoms/InputMoney';

interface Props {
  selectedCategoryItem: string;
  handleCategoryChange: (category: string) => void;
  selectedColorItem: Color;
  handleColorChange: (color: Color) => void;
  colors: Color[];
  isHidden: boolean;
}

const OverlayContentAddNewBudget: ({
  selectedCategoryItem,
  handleCategoryChange,
  selectedColorItem,
  handleColorChange,
  colors,
  isHidden,
}: Props) => ReactNode = ({
  selectedCategoryItem,
  handleCategoryChange,
  selectedColorItem,
  handleColorChange,
  colors,
  isHidden,
}: Props): ReactNode => {
  const inputMoneyRef = useRef<InputMoneyRef>(null);

  useEffect(() => {
    if (isHidden) {
      inputMoneyRef.current?.reset(); // Reset auslösen
    }
  }, [isHidden]);

  const handleInputChange = (input: string) => {
    //TODO fe-23-add-new-budget-part2
  };

  return (
    <div className="overlayContentAddNewBudget" data-testid="overlay-content-add-new-budget">
      <label className="fieldTitle">Budget Category</label>
      <OverlayDropdownCategory
        selectedItem={selectedCategoryItem}
        handleCategoryChange={handleCategoryChange}
      />
      <label className="fieldTitle">Maximum Spend</label>
      <InputMoney ref={inputMoneyRef} handleInputChange={handleInputChange} />
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
