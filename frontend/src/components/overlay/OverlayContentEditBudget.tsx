import './OverlayContentEditBudget.scss';
import OverlayContentLabel from '../atoms/OverlayContentLabel';
import OverlayDropdownCategory from './dropdownCategory/OverlayDropdownCategory';
import { EPBudget } from '../../model/entrypoints/EPBudget';
import InputMoney, { InputMoneyRef } from '../atoms/InputMoney';
import { RefObject, useEffect, useRef, useState } from 'react';
import OverlayDropdownColor from './OverlayDropdownColor';
import { Color } from '../../model/Color';
import getColorObject from '../../globals/utils/getColorObject';
import Colors from '../../constants/Colors';

interface Props {
  fetchedBudgets: EPBudget[];
  budget: EPBudget;
  isHidden: boolean;
  handleInputChange: (input: number) => void;
  hasValidInput: boolean;
  propagateColorChange: (color: Color) => void;
  hasFormToGetAReset: boolean;
}

const OverlayContentEditBudget = ({
  fetchedBudgets,
  budget,
  isHidden,
  handleInputChange,
  hasValidInput,
  propagateColorChange,
  hasFormToGetAReset,
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

  const [colorList, setColorList] = useState<Color[]>(Colors);
  const [selectedColorItem, setSelectedColorItem] = useState<Color>(getColorObject(budget.color));
  useEffect(() => {
    const sortedColors = sortColors();
    const filteredColors: Color[] = sortedColors.filter((color) => color.name !== budget.category);
    const updatedColors: Color[] = [getColorObject(budget.color), ...filteredColors];
    setColorList(updatedColors);
    setSelectedColorItem(getColorObject(budget.color));
    // sortColors only updates the list of colors
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budget, hasFormToGetAReset]);

  const sortColors: () => Color[] = (): Color[] => {
    const markedColors: Color[] = colorList.map((color: Color): Color => {
      const isColorUsed: boolean = fetchedBudgets.some(
        (budgetFetched: EPBudget): boolean => budgetFetched.color === color.name
      );
      return { ...color, disabled: isColorUsed };
    });
    const enabledColors: Color[] = markedColors.filter((color: Color) => !color.disabled);
    const disabledColors: Color[] = markedColors.filter((color: Color) => color.disabled);
    return [...enabledColors, ...disabledColors];
  };

  const handleColorChange: (color: Color) => void = (color: Color) => {
    setSelectedColorItem(color);
    propagateColorChange(color);
  };

  return (
    <div className="overlayContentEditBudget" data-testid="overlay-content-edit-budget">
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
        initialValue={budget.maximum.toString()}
      />
      <OverlayContentLabel title="Theme" />
      <OverlayDropdownColor
        colors={colorList}
        selectedColor={selectedColorItem}
        handleColorChange={handleColorChange}
      />
    </div>
  );
};

export default OverlayContentEditBudget;
