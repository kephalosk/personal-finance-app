import './PotCardDetails.scss';
import React from 'react';
import { EPPot } from '../../model/entrypoints/EPPot';

interface Props {
  pot: EPPot;
}

const PotCardDetails = ({ pot }: Props) => {
  const currentPercent = (pot.total / pot.target) * 100;
  const currentPercentFormatted = currentPercent.toFixed(2);
  const totalFormatted = pot.total.toFixed(2);
  const targetFormatted = pot.target.toFixed(0);
  return (
    <>
      <div className="potCardDetails" data-testid="pot-card-details">
        <div className="potCardDetailsTotal">
          <div className="potCardDetailsTotalLabel">Total Saved</div>
          <div className="potCardDetailsTotalAmount">${totalFormatted}</div>
        </div>
        <div className="potCardBarMax">
          <div
            className={`potCardBarCurrent ${pot.color}`}
            style={
              {
                '--barCurrentWidthPercent': `${currentPercent}%`,
              } as React.CSSProperties & { [key: string]: string }
            }
          ></div>
        </div>
        <div className="potCardDetailsPercent">
          <div className="potCardDetailsPercentCurrent">{currentPercentFormatted}%</div>
          <div className="potCardDetailsPercentTotal">Target of ${targetFormatted}</div>
        </div>
      </div>
    </>
  );
};

export default PotCardDetails;
