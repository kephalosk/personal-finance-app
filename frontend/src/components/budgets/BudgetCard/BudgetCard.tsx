import './BudgetCard.scss';
import CardHeader from '../../CardHeader';
import ValueBox from '../../overview/ValueBox';
import BudgetCardList from './BudgetCardList';
import React, { ReactNode, useEffect, useState } from 'react';
import { EPTransaction } from '../../../model/entrypoints/EPTransaction';
import { ColorNameEnum } from '../../../model/enum/ColorNameEnum';
import useIsSmallScreen from '../../../globals/hooks/useIsSmallScreen';
import LoadingSpinner from '../../LoadingSpinner';
import { EPBudget } from '../../../model/entrypoints/EPBudget';
import { CardHeaderItemNameEnum } from '../../../model/enum/CardHeaderItemNameEnum';
import OverlayCardBox from '../../overlay/OverlayCardBox';
import { CardHeaderItemOperationEnum } from '../../../model/enum/CardHeaderItemOperationEnum';
import { editBudget } from '../../../globals/services/BudgetService';
import OverlayContentEditBudget from '../../overlay/OverlayContentEditBudget';
import { Color } from '../../../model/Color';
import Colors from '../../../constants/Colors';
import { getColorObject } from '../../../globals/utils/getColorObject';

interface Props {
  budget: EPBudget;
  transactions: EPTransaction[];
  isLoading: boolean;
  updatePage: () => Promise<void>;
  fetchedBudgets: EPBudget[];
}

const BudgetCard: ({
  budget,
  transactions,
  isLoading,
  updatePage,
  fetchedBudgets,
}: Props) => ReactNode = ({
  budget,
  transactions,
  isLoading,
  updatePage,
  fetchedBudgets,
}: Props): ReactNode => {
  const budgetTransactions: EPTransaction[] = transactions.filter((transaction: EPTransaction) => {
    return transaction.categoryKey === budget.categoryKey;
  });

  const link: string = `../transactions?cat=${budget.categoryKey}`;

  let spent: number = 0;
  budgetTransactions.forEach((transaction: EPTransaction): void => {
    const amountToAdd: number = transaction.amount < 0 ? transaction.amount : 0;
    spent = spent + amountToAdd;
  });
  spent = spent * -1;

  const remaining: number = budget.maximum - spent;
  const remainingPositive: number = remaining > 0 ? remaining : 0;

  const spentPercent: number = (spent / budget.maximum) * 100;

  const maximumFormatted: string = budget.maximum.toFixed(2);

  const isSmallScreen: boolean = useIsSmallScreen();

  const [isEditBudgetHidden, setIsEditBudgetHidden] = useState<boolean>(true);
  const handleSelection = (itemOperation: CardHeaderItemOperationEnum) => {
    if (itemOperation === CardHeaderItemOperationEnum.EDIT) {
      setIsEditBudgetHidden(false);
    }
  };

  const closeForm: () => void = (): void => {
    setIsEditBudgetHidden(true);
    const activeElement: Element | null = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
    setHasValidInput(true);
    setSpendAmount(0);
  };

  const [spendAmount, setSpendAmount] = useState<number>(0);
  const handleInputChange: (input: number) => void = (input: number): void => {
    if (input === 0) {
      setHasValidInput(false);
    } else {
      setHasValidInput(true);
    }
    setSpendAmount(input);
  };

  const [hasValidInput, setHasValidInput] = useState<boolean>(true);
  const handleEditBudget = async () => {
    if (spendAmount === 0) {
      setHasValidInput(false);
      return;
    }
    setHasValidInput(true);

    const editedBudget: EPBudget = {
      category: budget.category,
      categoryKey: budget.categoryKey,
      maximum: spendAmount,
      color: budget.color,
    };
    await editBudget(editedBudget);
    await updatePage();
    closeForm();
  };

  const colorObject: Color = getColorObject(budget.color);
  const [selectedColorItem, setSelectedColorItem] = useState(colorObject);
  const handleColorChange: (color: Color) => void = (color: Color): void => {
    setSelectedColorItem(color);
  };

  const [colors, setColors] = useState<Color[]>(Colors);
  const sortColors: (fetchedBudgets: EPBudget[]) => void = (fetchedBudgets: EPBudget[]): void => {
    const markedColors: Color[] = colors.map((color: Color): Color => {
      const isColorUsed: boolean = fetchedBudgets.some(
        (budgetFetched: EPBudget): boolean =>
          budgetFetched.color === color.name && color.name !== budget.color
      );
      return { ...color, disabled: isColorUsed };
    });
    const enabledColors: Color[] = markedColors.filter((color: Color) => !color.disabled);
    const updatedColors: Color[] = enabledColors.filter((color: Color) => color !== colorObject);
    const disabledColors: Color[] = markedColors.filter((color: Color) => color.disabled);
    const combinedColors: Color[] = [colorObject, ...updatedColors, ...disabledColors];

    setColors(combinedColors);
    setSelectedColorItem(colorObject);
    console.log('colorObject.displayName', colorObject.displayName);
    console.log('budget.color', budget.color);
    console.log('-----------');
  };

  useEffect((): void => {
    sortColors(fetchedBudgets);
    // sortColors should sort all colors when fetched budgets have changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedBudgets]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="budgetCard" data-testid="budget-card">
          <CardHeader
            title={budget.category}
            color={budget.color}
            itemName={CardHeaderItemNameEnum.BUDGET}
            handleSelection={handleSelection}
          />
          <div className="budgetCardBar">
            <label className="budgetCardBarLabel">Maximum of ${maximumFormatted}</label>
            <div className="budgetCardBarMax">
              <div
                className={`budgetCardBarCurrent ${budget.color}`}
                style={
                  {
                    '--barCurrentWidthPercent': `${spentPercent}%`,
                  } as React.CSSProperties & { [key: string]: string }
                }
              ></div>
            </div>
            <div className="budgetCardBarValues">
              <ValueBox title="Spent" value={spent} color={budget.color} />
              <ValueBox
                title={`${isSmallScreen ? 'Free' : 'Remaining'}`}
                value={remainingPositive}
                color={ColorNameEnum.SEPIA}
              />
            </div>
          </div>
          <BudgetCardList transactions={budgetTransactions} link={link} />
          <OverlayCardBox
            title="Edit Budget"
            description="As your budgets change, feel free to update your spending limits."
            submitText="Save Changes"
            isHidden={isEditBudgetHidden}
            handleEvent={handleEditBudget}
            onClose={closeForm}
          >
            <OverlayContentEditBudget
              budget={budget}
              isHidden={isEditBudgetHidden}
              handleInputChange={handleInputChange}
              hasValidInput={hasValidInput}
              selectedColorItem={selectedColorItem}
              handleColorChange={handleColorChange}
              colors={colors}
            />
          </OverlayCardBox>
        </div>
      )}
    </>
  );
};

export default BudgetCard;
