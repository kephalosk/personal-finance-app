import './PotProgressForm.scss';
import PotProgressDisplay from './PotProgressDisplay';
import OverlayContentLabel from '../../atoms/OverlayContentLabel';
import MoneyInput, { InputMoneyRef } from '../../atoms/MoneyInput';
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
    <div className={`potProgressForm ${pot.name}`} data-testid="pot-progress-form">
      <PotProgressDisplay
        target={pot.target}
        oldTotal={pot.total}
        difference={inputAmount}
        isAddition={isAddition}
      />
      <OverlayContentLabel title={`Amount to ${isAddition ? 'Add' : 'Withdraw'}`} />
      <MoneyInput
        ref={inputMoneyRef}
        handleInputChange={handleInputChange}
        hasValidInput={hasValidInput}
        isLimitInput={false}
        maxInput={isAddition ? -1 : pot.total}
        cssKey={isAddition ? 'add' : 'withdraw'}
      />
    </div>
  );
};

export default PotProgressForm;
