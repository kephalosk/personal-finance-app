import './OverlayContentEditBudget.scss';
import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { Color } from '../../model/Color';
import { EPBudget } from '../../model/entrypoints/EPBudget';
import Colors from '../../constants/Colors';
import OverlayContentLabel from '../atoms/OverlayContentLabel';
import OverlayDropdownCategory from './dropdownCategory/OverlayDropdownCategory';
import OverlayDropdownColor from './OverlayDropdownColor';
import MoneyInput, { InputMoneyRef } from '../atoms/MoneyInput';
import getColorObject from '../../globals/utils/getColorObject';
import { BudgetCategory } from '../../model/BudgetCategory';

interface Props {
  fetchedBudgets: EPBudget[];
  budget: EPBudget;
  hasValidInput: boolean;
  handleInputChange: (input: number) => void;
  isHidden: boolean;
  propagateColorChange: (color: Color) => void;
  hasFormToGetAReset: boolean;
}

const OverlayContentEditBudget: ({
  fetchedBudgets,
  budget,
  handleInputChange,
  propagateColorChange,
  isHidden,
  hasValidInput,
  hasFormToGetAReset,
}: Props) => ReactNode = ({
  fetchedBudgets,
  budget,
  handleInputChange,
  propagateColorChange,
  isHidden,
  hasValidInput,
  hasFormToGetAReset,
}: Props): ReactNode => {
  const inputMoneyRef: RefObject<InputMoneyRef> = useRef<InputMoneyRef>(null);

  const budgetCategory: BudgetCategory = {
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
  useEffect((): void => {
    const sortedColors: Color[] = sortColors();
    const filteredColors: Color[] = sortedColors.filter(
      (color: Color): boolean => color.name !== budget.color
    );
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
            handleCategoryChange={(): void => {}}
            budgetCategories={[]}
            isDisabled={true}
          />
        </div>
      </div>
      <OverlayContentLabel title={`Maximum Spend (current Maximum: $${budget.maximum})`} />
      <MoneyInput
        ref={inputMoneyRef}
        handleInputChange={handleInputChange}
        hasValidInput={hasValidInput}
        initialValue={budget.maximum.toString()}
        isLimitInput={true}
        cssKey={budget.categoryKey}
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
