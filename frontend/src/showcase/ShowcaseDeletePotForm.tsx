import OverlayCardBox from '../components/overlay/OverlayCardBox';
import React from 'react';
import { OverlayCardBoxButtonTypeEnum } from '../model/enum/OverlayCardBoxButtonTypeEnum';
import ShowcaseWrapper from './ShowcaseWrapper';
import OverlayContentDeletePot from '../components/overlay/OverlayContentDeletePot';
import { mockedPot } from '../fixtures/MockedPots';

const ShowcaseDeletePotForm = () => {
  const descriptionDeletePot: string =
    'Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.';
  return (
    <ShowcaseWrapper>
      <OverlayCardBox
        title={`Delete '${mockedPot.name}'`}
        description={descriptionDeletePot}
        submitText="No, Go Back"
        isHidden={false}
        handleEvent={() => {}}
        onClose={() => {}}
        isButtonDisabled={false}
        buttonType={OverlayCardBoxButtonTypeEnum.ABORT}
      >
        <OverlayContentDeletePot handleClick={() => {}} />
      </OverlayCardBox>
    </ShowcaseWrapper>
  );
};

export default ShowcaseDeletePotForm;
