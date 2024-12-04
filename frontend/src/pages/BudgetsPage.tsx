import './BudgetsPage.scss';
import { HeaderBar } from '../components/HeaderBar';
import { BudgetsDiagramCard } from '../components/budgets/BudgetDiagrammCard/BudgetsDiagramCard';
import { BudgetCard } from '../components/budgets/BudgetCard/BudgetCard';
import { getBudgets } from '../globals/services/BudgetService';
import { EPBudget } from '../model/entrypoints/EPBudget';
import { EPTransaction } from '../model/entrypoints/EPTransaction';
import { getTransactions } from '../globals/services/TransactionService';
import React, { useEffect, useState } from 'react';
import OverlayCardBox from '../components/overlay/OverlayCardBox';
import OverlayContentAddNewBudget from '../components/overlay/OverlayContentAddNewBudget';
import { Color } from '../model/Color';
import Colors from '../constants/Colors';
import EnsureFirstPossibleColorIsDefined from '../globals/utils/EnsureFirstPossibleColorIsDefined';

const BudgetsPage = () => {
  const [transactions, setTransactions] = useState<EPTransaction[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState<boolean>(true);
  useEffect(() => {
    const fetchTransactions = async (): Promise<void> => {
      const fetchedTransactions: EPTransaction[] = await getTransactions();
      setTransactions(fetchedTransactions);
      setIsLoadingTransactions(false);
    };
    fetchTransactions().then();
  }, []);

  const [budgets, setBudgets] = useState<EPBudget[]>([]);
  const [isLoadingBudgets, setIsLoadingBudgets] = useState<boolean>(true);
  useEffect(() => {
    const fetchBudgets = async (): Promise<void> => {
      const fetchedBudgets: EPBudget[] = await getBudgets();
      setBudgets(fetchedBudgets);
      sortColors(fetchedBudgets);
      setIsLoadingBudgets(false);
    };
    fetchBudgets().then();
  }, []);

  const [colors, setColors] = useState<Color[]>(Colors);
  const sortColors = (fetchedBudgets: EPBudget[]) => {
    const markedColors = colors.map((color) => {
      const isColorUsed = fetchedBudgets.some((budget) => budget.color === color.name);
      return { ...color, disabled: isColorUsed };
    });
    const enabledColors = markedColors.filter((color) => !color.disabled);
    const disabledColors = markedColors.filter((color) => color.disabled);
    const combinedColors = enabledColors.concat(disabledColors);

    setColors(combinedColors);

    const firstPossibleColor = markedColors.find((color) => !color.disabled);
    const definedFirstPossibleColor = EnsureFirstPossibleColorIsDefined(
      firstPossibleColor,
      markedColors[0]
    );
    setSelectedColorItem(definedFirstPossibleColor);
  };

  const [isHidden, setIsHidden] = useState<boolean>(true);
  const handleShowForm = () => {
    setIsHidden(false);
  };

  const closeForm = () => {
    setIsHidden(true);
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
    setSelectedCategoryItem('General');
  };

  const [selectedCategoryItem, setSelectedCategoryItem] = useState('General');
  const handleCategoryChange = (category: string) => {
    setSelectedCategoryItem(category);
  };

  const [selectedColorItem, setSelectedColorItem] = useState(Colors[0]);
  const handleColorChange = (color: Color) => {
    setSelectedColorItem(color);
  };

  const handleAddNewBudget = () => {};

  const addNewBudgetDescription =
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
            colors={colors}
          />
        </OverlayCardBox>
      </div>
    </>
  );
};

export default BudgetsPage;
