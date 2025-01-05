import OverlayCardBox from '../components/overlay/OverlayCardBox';
import React from 'react';
import OverlayContentDeleteBudget from '../components/overlay/OverlayContentDeleteBudget';
import { OverlayCardBoxButtonTypeEnum } from '../model/enum/OverlayCardBoxButtonTypeEnum';
import ShowcaseWrapper from './ShowcaseWrapper';
import { mockedBudget } from '../fixtures/MockedBudgets';

const ShowcaseDeleteBudgetForm = () => {
  const descriptionDeleteBudget: string =
    'Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.';
  return (
    <ShowcaseWrapper>
      <OverlayCardBox
        title={`Delete '${mockedBudget.category}'`}
        description={descriptionDeleteBudget}
        submitText="No, Go Back"
        isHidden={false}
        handleEvent={() => {}}
        onClose={() => {}}
        isButtonDisabled={false}
        buttonType={OverlayCardBoxButtonTypeEnum.ABORT}
      >
        <OverlayContentDeleteBudget handleClick={() => {}} />
      </OverlayCardBox>
    </ShowcaseWrapper>
  );
};

export default ShowcaseDeleteBudgetForm;
