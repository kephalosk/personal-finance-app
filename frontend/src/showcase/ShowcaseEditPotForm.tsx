import OverlayCardBox from '../components/overlay/OverlayCardBox';
import React from 'react';
import ShowcaseWrapper from './ShowcaseWrapper';
import Colors from '../constants/Colors';
import OverlayContentEditPot from '../components/overlay/OverlayContentEditPot';

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
          hasValidNameInput={true}
          handleNameInputChange={(): void => {}}
          hasValidTargetInput={true}
          handleTargetInputChange={(): void => {}}
          isHidden={false}
          selectedColorItem={Colors[0]}
          handleColorChange={(): void => {}}
        />
      </OverlayCardBox>
    </ShowcaseWrapper>
  );
};

export default ShowcaseEditBudgetForm;
