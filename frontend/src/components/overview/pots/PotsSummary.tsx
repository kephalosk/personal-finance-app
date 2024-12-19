import './PotsSummary.scss';
import { ReactNode } from 'react';

interface Props {
  potSum: number;
}

const PotsSummary: ({ potSum }: Props) => ReactNode = ({ potSum }: Props): ReactNode => {
  const potFormatted: string = potSum.toFixed(0);
  return (
    <>
      <div className="overviewPotsSummary" data-testid="pots-summary">
        <img
          className="overviewPotsSummaryIcon"
          alt="pot icon"
          aria-hidden="true"
          src="/images/icon-pot.svg"
        />
        <div className="overviewPotsSummaryContent">
          <label className="overviewPotsSummaryContentTitle">Total Saved</label>
          <label className="overviewPotsSummaryContentValue">${potFormatted}</label>
        </div>
      </div>
    </>
  );
};

export default PotsSummary;
