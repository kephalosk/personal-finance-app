import OverlayCardBox from '../components/overlay/OverlayCardBox';
import OverlayContentEditBudget from '../components/overlay/OverlayContentEditBudget';
import React from 'react';
import { mockedBudgets } from '../fixtures/MockedBudgets';

const ShowcaseEditBudgetForm = () => {
  return (
    <OverlayCardBox
      title="Add New Budget"
      description="As your budgets change, feel free to update your spending limits."
      submitText="Add Budget"
      isHidden={false}
      handleEvent={() => {}}
      onClose={() => {}}
      isButtonDisabled={false}
    >
      <OverlayContentEditBudget
        fetchedBudgets={mockedBudgets}
        budget={mockedBudgets[0]}
        handleInputChange={() => {}}
        propagateColorChange={() => {}}
        isHidden={false}
        hasValidInput={true}
        hasFormToGetAReset={false}
      />
    </OverlayCardBox>
  );
};

export default ShowcaseEditBudgetForm;
