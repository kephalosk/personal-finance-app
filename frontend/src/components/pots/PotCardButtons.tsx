import './PotCardButtons.scss';
import React, { ReactNode, useState } from 'react';
import OverlayCardBox from '../overlay/OverlayCardBox';
import PotProgressForm from './potprogress/PotProgressForm';
import { EPPot } from '../../model/entrypoints/EPPot';
import { updatePotTotal } from '../../globals/services/PotService';

interface Props {
  pot: EPPot;
  updatePage: () => Promise<void>;
}

const PotCardButtons: ({ pot, updatePage }: Props) => ReactNode = ({
  pot,
  updatePage,
}: Props): ReactNode => {
  const [isAddition, setIsAddition] = useState<boolean>(true);
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [hasValidInput, setHasValidInput] = useState<boolean>(true);
  const [inputAmount, setInputAmount] = useState<number>(0);

  const titleAdd: string = `Add to „${pot.name}“`;
  const titleWithdraw: string = `Withdraw from „${pot.name}“`;

  const descriptionAdd: string =
    'Add money to your pot to keep it separate from your main balance. As soon as you add this money, it will be deducted from your current balance.';
  const descriptionWithdraw: string =
    'Withdraw from your pot to put money back in your main balance. This will reduce the amount you have in this pot.';

  const submitTextAdd: string = 'Confirm Addition';
  const submitTextWithdraw: string = 'Confirm Withdrawal';

  const handleAddMoneyForm: () => void = (): void => {
    setIsAddition(true);
    setIsHidden(false);
  };

  const handleWithdrawMoneyForm: () => void = (): void => {
    setIsAddition(false);
    setIsHidden(false);
  };

  const handleEvent: () => Promise<void> = async (): Promise<void> => {
    if (inputAmount === 0) {
      setHasValidInput(false);
      return;
    }

    const updatedPot: EPPot = {
      ...pot,
      total: determineNewTotal(),
    };

    await updatePotTotal(updatedPot);

    await updatePage();
    closeForm();
  };

  const determineNewTotal: () => number = (): number => {
    let newTotal: number;
    if (isAddition) {
      newTotal = pot.total + inputAmount;
    } else {
      newTotal = pot.total - inputAmount;
    }
    if (newTotal < 0) {
      newTotal = 0;
    }
    return newTotal;
  };

  const closeForm = (): void => {
    setIsHidden(true);
    deselectElement();
    setHasValidInput(true);
    setInputAmount(0);
  };

  const deselectElement = (): void => {
    const activeElement: Element | null = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  };

  const handleInputChange = (input: number): void => {
    if (input === 0) {
      setHasValidInput(false);
    } else {
      setHasValidInput(true);
    }
    setInputAmount(input);
  };

  return (
    <div className="potCardButtons" data-testid="pot-card-buttons">
      <button className="potCardButton add" onClick={handleAddMoneyForm}>
        + Add Money
      </button>
      <button className="potCardButton withdraw" onClick={handleWithdrawMoneyForm}>
        Withdraw
      </button>
      <OverlayCardBox
        title={isAddition ? titleAdd : titleWithdraw}
        description={isAddition ? descriptionAdd : descriptionWithdraw}
        submitText={isAddition ? submitTextAdd : submitTextWithdraw}
        isHidden={isHidden}
        handleEvent={handleEvent}
        onClose={closeForm}
        cssKey={pot.name}
      >
        <PotProgressForm
          pot={pot}
          inputAmount={inputAmount}
          isAddition={isAddition}
          hasValidInput={hasValidInput}
          handleInputChange={handleInputChange}
          isHidden={isHidden}
        />
      </OverlayCardBox>
    </div>
  );
};

export default PotCardButtons;
