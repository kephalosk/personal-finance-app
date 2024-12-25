import OverlayCardBox from '../components/overlay/OverlayCardBox';
import React from 'react';
import OverlayContentDeleteBudget from '../components/overlay/OverlayContentDeleteBudget';
import { OverlayCardBoxButtonTypeEnum } from '../model/enum/OverlayCardBoxButtonTypeEnum';

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
      buttonType={OverlayCardBoxButtonTypeEnum.ABORT}
    >
      <OverlayContentDeleteBudget handleClick={() => {}} />
    </OverlayCardBox>
  );
};

export default ShowcaseEditBudgetForm;
