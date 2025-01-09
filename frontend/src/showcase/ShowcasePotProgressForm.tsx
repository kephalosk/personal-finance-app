import OverlayCardBox from '../components/overlay/OverlayCardBox';
import React from 'react';
import ShowcaseWrapper from './ShowcaseWrapper';
import { mockedPot } from '../fixtures/MockedPots';
import PotProgressForm from '../components/pots/potprogress/PotProgressForm';

const ShowcaseEditBudgetForm = () => {
  return (
    <ShowcaseWrapper>
      <OverlayCardBox
        title={`Add to „${mockedPot.name}“`}
        description="Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance."
        submitText="Confirm Addition"
        isHidden={false}
        handleEvent={(): void => {}}
        onClose={(): void => {}}
      >
        <PotProgressForm
          pot={mockedPot}
          inputAmount={400}
          isAddition={true}
          hasValidInput={true}
          handleInputChange={(): void => {}}
          isHidden={false}
        />
      </OverlayCardBox>
    </ShowcaseWrapper>
  );
};

export default ShowcaseEditBudgetForm;
