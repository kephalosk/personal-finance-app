import OverlayCardBox from '../components/overlay/OverlayCardBox';
import OverlayContentEditBudget from '../components/overlay/OverlayContentEditBudget';
import React from 'react';
import { mockedBudgets } from '../fixtures/MockedBudgets';
import ShowcaseWrapper from './ShowcaseWrapper';

const ShowcaseEditBudgetForm = () => {
  return (
    <ShowcaseWrapper>
      <OverlayCardBox
        title="Edit Budget"
        description="As your budgets change, feel free to update your spending limits."
        submitText="Save Changes"
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
    </ShowcaseWrapper>
  );
};

export default ShowcaseEditBudgetForm;
