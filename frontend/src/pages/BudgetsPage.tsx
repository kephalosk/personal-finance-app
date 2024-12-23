import './BudgetsPage.scss';
import HeaderBar from '../components/HeaderBar';
import BudgetsDiagramCard from '../components/budgets/BudgetDiagrammCard/BudgetsDiagramCard';
import BudgetCard from '../components/budgets/BudgetCard/BudgetCard';
import { addNewBudget, getBudgets } from '../globals/services/BudgetService';
import { EPBudget } from '../model/entrypoints/EPBudget';
import { EPTransaction } from '../model/entrypoints/EPTransaction';
import { getTransactions } from '../globals/services/TransactionService';
import { ReactNode, useEffect, useState } from 'react';
import OverlayCardBox from '../components/overlay/OverlayCardBox';
import OverlayContentAddNewBudget from '../components/overlay/OverlayContentAddNewBudget';
import { Color } from '../model/Color';
import Colors from '../constants/Colors';
import EnsureFirstPossibleColorIsDefined from '../globals/utils/EnsureFirstPossibleColorIsDefined';
import { BudgetCategory } from '../model/BudgetCategory';
import { BudgetCategories } from '../constants/BudgetCategories';
import EnsureFirstPossibleItemIsDefined from '../globals/utils/EnsureFirstPossibleItemIsDefined';

const BudgetsPage: () => ReactNode = (): ReactNode => {
  const [transactions, setTransactions] = useState<EPTransaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState<boolean>(true);
  useEffect((): void => {
    const fetchTransactions: () => Promise<void> = async (): Promise<void> => {
      const fetchedTransactions: EPTransaction[] = await getTransactions();
      setTransactions(fetchedTransactions);
      setIsLoadingTransactions(false);
    };
    fetchTransactions().then();
  }, []);

  const [budgets, setBudgets] = useState<EPBudget[]>([]);
  const [isLoadingBudgets, setIsLoadingBudgets] = useState<boolean>(true);
  useEffect((): void => {
    const fetchBudgets: () => Promise<void> = async (): Promise<void> => {
      await updatePage();
    };
    fetchBudgets().then();
    // updatePage is used only for initialization here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePage: () => Promise<void> = async (): Promise<void> => {
    setIsLoadingBudgets(true);
    const fetchedBudgets: EPBudget[] = await getBudgets();
    setBudgets(fetchedBudgets);
    sortColors(fetchedBudgets);
    sortCategories(fetchedBudgets);
    setIsLoadingBudgets(false);
  };

  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>(BudgetCategories);
  const sortCategories: (fetchedBudgets: EPBudget[]) => void = (
    fetchedBudgets: EPBudget[]
  ): void => {
    const markedCategories: BudgetCategory[] = budgetCategories.map(
      (category: BudgetCategory): BudgetCategory => {
        const isCategoryUsed: boolean = fetchedBudgets.some(
          (budget: EPBudget): boolean => budget.categoryKey === category.key
        );
        return { ...category, disabled: isCategoryUsed };
      }
    );
    const enabledCategories: BudgetCategory[] = markedCategories.filter(
      (category: BudgetCategory) => !category.disabled
    );
    const disabledCategories: BudgetCategory[] = markedCategories.filter(
      (category: BudgetCategory) => category.disabled
    );
    const combinedCategories: BudgetCategory[] = [...enabledCategories, ...disabledCategories];

    setBudgetCategories(combinedCategories);

    const firstPossibleCategory: BudgetCategory | undefined = markedCategories.find(
      (category: BudgetCategory) => !category.disabled
    );
    const definedFirstPossibleCategory: BudgetCategory = EnsureFirstPossibleItemIsDefined(
      firstPossibleCategory,
      markedCategories[0]
    );
    setSelectedCategoryItem(definedFirstPossibleCategory);
  };

  const [isHidden, setIsHidden] = useState<boolean>(true);
  const handleShowForm: () => void = (): void => {
    setIsHidden(false);
  };

  const closeForm: () => void = (): void => {
    setIsHidden(true);
    const activeElement: Element | null = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
    setHasValidInput(true);
    setSpendAmount(0);
  };

  const [selectedCategoryItem, setSelectedCategoryItem] = useState<BudgetCategory>(
    BudgetCategories[0]
  );
  const handleCategoryChange: (category: BudgetCategory) => void = (
    category: BudgetCategory
  ): void => {
    setSelectedCategoryItem(category);
  };

  const [selectedColorItem, setSelectedColorItem] = useState(Colors[0]);
  const handleColorChange: (color: Color) => void = (color: Color): void => {
    setSelectedColorItem(color);
  };

  const [colors, setColors] = useState<Color[]>(Colors);
  const sortColors: (fetchedBudgets: EPBudget[]) => void = (fetchedBudgets: EPBudget[]): void => {
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
  const handleAddNewBudget: () => Promise<void> = async (): Promise<void> => {
    if (spendAmount === 0) {
      setHasValidInput(false);
      return;
    }
    if (selectedCategoryItem.disabled) {
      return;
    }
    setHasValidInput(true);

    const newBudget: EPBudget = {
      category: selectedCategoryItem.name,
      categoryKey: selectedCategoryItem.key,
      maximum: spendAmount,
      color: selectedColorItem.name,
    };
    await addNewBudget(newBudget);
    await updatePage();
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
                updatePage={updatePage}
                fetchedBudgets={budgets}
              />
            ))}
          </div>
        </div>
        <OverlayCardBox
          title="Add New Budget"
          description={addNewBudgetDescription}
          submitText="Add Budget"
          isHidden={isHidden}
          handleEvent={handleAddNewBudget}
          onClose={closeForm}
          isButtonDisabled={selectedCategoryItem.disabled}
        >
          <OverlayContentAddNewBudget
            selectedCategoryItem={selectedCategoryItem}
            handleCategoryChange={handleCategoryChange}
            handleInputChange={handleInputChange}
            selectedColorItem={selectedColorItem}
            handleColorChange={handleColorChange}
            colors={colors}
            budgetCategories={budgetCategories}
            isHidden={isHidden}
            hasValidInput={hasValidInput}
          />
        </OverlayCardBox>
      </div>
    </>
  );
};

export default BudgetsPage;
