import './BudgetCard.scss';
import React, { ReactNode, useState } from 'react';
import { EPTransaction } from '../../../model/entrypoints/EPTransaction';
import { ColorNameEnum } from '../../../model/enum/ColorNameEnum';
import { EPBudget } from '../../../model/entrypoints/EPBudget';
import { CardHeaderItemNameEnum } from '../../../model/enum/CardHeaderItemNameEnum';
import { CardHeaderItemOperationEnum } from '../../../model/enum/CardHeaderItemOperationEnum';
import { Color } from '../../../model/Color';
import CardHeader from '../../CardHeader';
import ValueBox from '../../overview/ValueBox';
import BudgetCardList from './BudgetCardList';
import LoadingSpinner from '../../LoadingSpinner';
import OverlayCardBox from '../../overlay/OverlayCardBox';
import OverlayContentEditBudget from '../../overlay/OverlayContentEditBudget';
import useIsSmallScreen from '../../../globals/hooks/useIsSmallScreen';
import getColorObject from '../../../globals/utils/getColorObject';
import { deleteBudget, editBudget } from '../../../globals/services/BudgetService';
import OverlayContentDeleteBudget from '../../overlay/OverlayContentDeleteBudget';
import { OverlayCardBoxButtonTypeEnum } from '../../../model/enum/OverlayCardBoxButtonTypeEnum';

interface Props {
  transactions: EPTransaction[];
  fetchedBudgets: EPBudget[];
  budget: EPBudget;
  updatePage: () => Promise<void>;
  isLoading: boolean;
}

const BudgetCard: ({
  transactions,
  fetchedBudgets,
  budget,
  updatePage,
  isLoading,
}: Props) => ReactNode = ({
  transactions,
  fetchedBudgets,
  budget,
  updatePage,
  isLoading,
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
  const [isDeleteBudgetHidden, setIsDeleteBudgetHidden] = useState<boolean>(true);
  const handleSelection = (itemOperation: CardHeaderItemOperationEnum) => {
    if (itemOperation === CardHeaderItemOperationEnum.EDIT) {
      setIsEditBudgetHidden(false);
    }
    if (itemOperation === CardHeaderItemOperationEnum.DELETE) {
      setIsDeleteBudgetHidden(false);
    }
  };

  const [hasFormToGetAReset, setHasFormToGetAReset] = useState<boolean>(false);
  const closeForm: () => void = (): void => {
    setIsEditBudgetHidden(true);
    setIsDeleteBudgetHidden(true);
    const activeElement: Element | null = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
    setHasValidInput(true);
    setSpendAmount(0);
    setHasFormToGetAReset(true);
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
  const handleEditBudget = async (): Promise<void> => {
    if (spendAmount === 0) {
      setHasValidInput(false);
      return;
    }
    setHasValidInput(true);

    const editedBudget: EPBudget = {
      category: budget.category,
      categoryKey: budget.categoryKey,
      maximum: spendAmount,
      color: selectedColorItem.name,
    };
    await editBudget(editedBudget);
    await updatePage();
    closeForm();
  };

  const handleDeleteBudget = async (): Promise<void> => {
    await deleteBudget(budget);
    await updatePage();
    closeForm();
  };

  const initialBudgetColorObject: Color = getColorObject(budget.color);
  const [selectedColorItem, setSelectedColorItem] = useState(initialBudgetColorObject);
  const propagateColorChange: (color: Color) => void = (color: Color): void => {
    setSelectedColorItem(color);
    setHasFormToGetAReset(false);
  };

  const descriptionDeleteBudget: string =
    'Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.';

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
              fetchedBudgets={fetchedBudgets}
              budget={budget}
              hasValidInput={hasValidInput}
              handleInputChange={handleInputChange}
              isHidden={isEditBudgetHidden}
              propagateColorChange={propagateColorChange}
              hasFormToGetAReset={hasFormToGetAReset}
            />
          </OverlayCardBox>
          <OverlayCardBox
            title={`Delete '${budget.category}'`}
            description={descriptionDeleteBudget}
            submitText="No, Go Back"
            isHidden={isDeleteBudgetHidden}
            handleEvent={closeForm}
            onClose={closeForm}
            buttonType={OverlayCardBoxButtonTypeEnum.ABORT}
          >
            <OverlayContentDeleteBudget handleClick={handleDeleteBudget} />
          </OverlayCardBox>
        </div>
      )}
    </>
  );
};

export default BudgetCard;
