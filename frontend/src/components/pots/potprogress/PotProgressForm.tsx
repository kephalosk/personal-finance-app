import './PotProgressForm.scss';
import PotProgressDisplay from './PotProgressDisplay';
import OverlayContentLabel from '../../atoms/OverlayContentLabel';
import InputMoney, { InputMoneyRef } from '../../atoms/InputMoney';
import { EPPot } from '../../../model/entrypoints/EPPot';
import { RefObject, useEffect, useRef } from 'react';

interface Props {
  pot: EPPot;
  inputAmount: number;
  isAddition: boolean;
  hasValidInput: boolean;
  handleInputChange: (input: number) => void;
  isHidden: boolean;
}

const PotProgressForm = ({
  pot,
  inputAmount,
  isAddition,
  hasValidInput,
  handleInputChange,
  isHidden,
}: Props) => {
  const inputMoneyRef: RefObject<InputMoneyRef> = useRef<InputMoneyRef>(null);

  useEffect((): void => {
    if (isHidden) {
      inputMoneyRef.current?.reset();
    }
  }, [isHidden]);

  return (
    <div className="potProgressForm" data-testid="pot-progress-form">
      <PotProgressDisplay
        target={pot.target}
        oldTotal={pot.total}
        difference={inputAmount}
        isAddition={isAddition}
      />
      <OverlayContentLabel title={`Amount to ${isAddition ? 'Add' : 'Withdraw'}`} />
      <InputMoney
        ref={inputMoneyRef}
        handleInputChange={handleInputChange}
        hasValidInput={hasValidInput}
        isLimitInput={false}
      />
    </div>
  );
};

export default PotProgressForm;
