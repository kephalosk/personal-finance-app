import OverlayCardBox from '../components/overlay/OverlayCardBox';
import React from 'react';
import ShowcaseWrapper from './ShowcaseWrapper';
import OverlayContentEditPot from '../components/overlay/OverlayContentEditPot';
import { mockedPot } from '../fixtures/MockedPots';

const ShowcaseEditBudgetForm = () => {
  return (
    <ShowcaseWrapper>
      <OverlayCardBox
        title="Edit Pot"
        description="If your saving targets change, feel free to update your pots."
        submitText="Save Changes"
        isHidden={false}
        handleEvent={(): void => {}}
        onClose={(): void => {}}
      >
        <OverlayContentEditPot
          pot={mockedPot}
          hasValidNameInput={true}
          handleNameInputChange={(): void => {}}
          hasValidTargetInput={true}
          handleTargetInputChange={(): void => {}}
          isHidden={false}
          hasFormToGetAReset={false}
          propagateColorChange={(): void => {}}
        />
      </OverlayCardBox>
    </ShowcaseWrapper>
  );
};

export default ShowcaseEditBudgetForm;
