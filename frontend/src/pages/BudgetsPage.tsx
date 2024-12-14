import './BudgetsPage.scss';
import HeaderBar from '../components/HeaderBar';
import BudgetsDiagramCard from '../components/budgets/BudgetDiagrammCard/BudgetsDiagramCard';
import BudgetCard from '../components/budgets/BudgetCard/BudgetCard';
import { addNewBudget, getBudgets } from '../globals/services/BudgetService';
import { EPBudget } from '../model/entrypoints/EPBudget';
import { EPTransaction } from '../model/entrypoints/EPTransaction';
import { getTransactions } from '../globals/services/TransactionService';
import React, { useEffect, useState } from 'react';
import OverlayCardBox from '../components/overlay/OverlayCardBox';
import OverlayContentAddNewBudget from '../components/overlay/OverlayContentAddNewBudget';
import { Color } from '../model/Color';
import Colors from '../constants/Colors';
import EnsureFirstPossibleColorIsDefined from '../globals/utils/EnsureFirstPossibleColorIsDefined';
import { toLowerCaseWithoutWhitespace } from '../globals/utils/ToLowerCaseWithoutWhitespace';

const BudgetsPage: () => React.ReactNode = (): React.ReactNode => {
  const [transactions, setTransactions] = useState<EPTransaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState<boolean>(true);
  useEffect((): void => {
    const fetchTransactions = async (): Promise<void> => {
      const fetchedTransactions: EPTransaction[] = await getTransactions();
      setTransactions(fetchedTransactions);
      setIsLoadingTransactions(false);
    };
    fetchTransactions().then();
  }, []);

  const [budgets, setBudgets] = useState<EPBudget[]>([]);
  const [isLoadingBudgets, setIsLoadingBudgets] = useState<boolean>(true);
  useEffect((): void => {
    const fetchBudgets = async (): Promise<void> => {
      const fetchedBudgets: EPBudget[] = await getBudgets();
      setBudgets(fetchedBudgets);
      sortColors(fetchedBudgets);
      setIsLoadingBudgets(false);
    };
    fetchBudgets().then();
  }, []);

  const [colors, setColors] = useState<Color[]>(Colors);
  const sortColors = (fetchedBudgets: EPBudget[]): void => {
    const markedColors: Color[] = colors.map((color: Color): Color => {
      const isColorUsed: boolean = fetchedBudgets.some(
        (budget: EPBudget): boolean => budget.color === color.name
      );
      return { ...color, disabled: isColorUsed };
    });
    const enabledColors: Color[] = markedColors.filter((color: Color) => !color.disabled);
    const disabledColors: Color[] = markedColors.filter((color: Color) => color.disabled);
    const combinedColors: Color[] = enabledColors.concat(disabledColors);

    setColors(combinedColors);

    const firstPossibleColor: Color | undefined = markedColors.find(
      (color: Color) => !color.disabled
    );
    const definedFirstPossibleColor: Color = EnsureFirstPossibleColorIsDefined(
      firstPossibleColor,
      markedColors[0]
    );
    setSelectedColorItem(definedFirstPossibleColor);
  };

  const [isHidden, setIsHidden] = useState<boolean>(true);
  const handleShowForm = (): void => {
    setIsHidden(false);
  };

  const closeForm = (): void => {
    setIsHidden(true);
    const activeElement: Element | null = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
    setSelectedCategoryItem('General');
    setHasValidInput(true);
  };

  const [selectedCategoryItem, setSelectedCategoryItem] = useState('General');
  const handleCategoryChange = (category: string): void => {
    setSelectedCategoryItem(category);
  };

  const [selectedColorItem, setSelectedColorItem] = useState(Colors[0]);
  const handleColorChange = (color: Color): void => {
    setSelectedColorItem(color);
  };

  const [spendAmount, setSpendAmount] = useState<number>(0);
  const handleInputChange = (input: number): void => {
    if (input === 0) {
      setHasValidInput(false);
    } else {
      setHasValidInput(true);
    }
    setSpendAmount(input);
  };

  const [hasValidInput, setHasValidInput] = useState<boolean>(true);
  const handleAddNewBudget = async (): Promise<void> => {
    if (spendAmount === 0) {
      setHasValidInput(false);
      return;
    }
    setHasValidInput(true);

    const newBudget: EPBudget = {
      category: selectedCategoryItem,
      categoryKey: toLowerCaseWithoutWhitespace(selectedCategoryItem),
      maximum: spendAmount,
      color: selectedColorItem.name,
    };
    await addNewBudget(newBudget);
    const fetchedBudgets: EPBudget[] = await getBudgets();
    setBudgets(fetchedBudgets);
    closeForm();
  };

  const addNewBudgetDescription: string =
    'Choose a category to set a spending budget. These categories can help you monitor spending.';

  return (
    <>
      <div className="budgetsPage" data-testid="budgets-page">
        <HeaderBar
          h1Headline="Budgets"
          buttonText="+ Add New Budget"
          handleClick={handleShowForm}
        />
        <div className="budgetsDetails">
          <div className="budgetsDetailsLeft">
            <BudgetsDiagramCard
              budgets={budgets}
              transactions={transactions}
              isLoading={isLoadingTransactions || isLoadingBudgets}
            />
          </div>
          <div className="budgetsDetailsRight">
            {budgets.map((budget: EPBudget, index: number) => (
              <BudgetCard
                key={index}
                budget={budget}
                transactions={transactions}
                isLoading={isLoadingTransactions || isLoadingBudgets}
              />
            ))}
          </div>
        </div>
        <OverlayCardBox
          title="Add New Budget"
          description={addNewBudgetDescription}
          submitText="Save Changes"
          isHidden={isHidden}
          handleEvent={handleAddNewBudget}
          onClose={closeForm}
        >
          <OverlayContentAddNewBudget
            selectedCategoryItem={selectedCategoryItem}
            handleCategoryChange={handleCategoryChange}
            selectedColorItem={selectedColorItem}
            handleColorChange={handleColorChange}
            handleInputChange={handleInputChange}
            colors={colors}
            isHidden={isHidden}
            hasValidInput={hasValidInput}
          />
        </OverlayCardBox>
      </div>
    </>
  );
};

export default BudgetsPage;
