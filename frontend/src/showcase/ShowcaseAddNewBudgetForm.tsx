import OverlayCardBox from '../components/overlay/OverlayCardBox';
import OverlayContentAddNewBudget from '../components/overlay/OverlayContentAddNewBudget';
import { mockedBudgetCategory } from '../fixtures/MockedBudgetCategory';
import { BudgetCategory } from '../model/BudgetCategory';
import Colors from '../constants/Colors';
import { Color } from '../model/Color';
import { BudgetCategories } from '../constants/BudgetCategories';

const ShowcaseAddNewBudgetForm = () => {
  const addNewBudgetDescription: string =
    'Choose a category to set a spending budget. These categories can help you monitor spending.';
  const isHidden: boolean = false;
  const handleAddNewBudget = () => {};
  const closeForm = () => {};
  const selectedCategoryItem: BudgetCategory = mockedBudgetCategory;
  const handleCategoryChange = () => {};
  const selectedColorItem: Color = Colors[0];
  const handleColorChange = () => {};
  const handleInputChange = () => {};
  const colors: Color[] = Colors;
  const budgetCategories: BudgetCategory[] = BudgetCategories;
  const hasValidInput = true;

  return (
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
        selectedColorItem={selectedColorItem}
        handleColorChange={handleColorChange}
        handleInputChange={handleInputChange}
        colors={colors}
        budgetCategories={budgetCategories}
        isHidden={isHidden}
        hasValidInput={hasValidInput}
      />
    </OverlayCardBox>
  );
};

export default ShowcaseAddNewBudgetForm;
