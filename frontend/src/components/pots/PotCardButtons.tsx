import './PotCardButtons.scss';
import React, { ReactNode } from 'react';

const PotCardButtons: () => ReactNode = (): ReactNode => {
  const handleAddMoney: () => void = (): void => {};

  return (
    <div className="potCardButtons" data-testid="pot-card-buttons">
      <button className="potCardButton add" onClick={handleAddMoney}>
        + Add Money
      </button>
      <button className="potCardButton withdraw">Withdraw</button>
    </div>
  );
};

export default PotCardButtons;
