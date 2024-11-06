import './PotsSummary.scss';
import { PotsSummaryProps } from '../../../model/props/PotsSummaryProps';

export function PotsSummary({ potSum }: PotsSummaryProps) {
  const potFormatted = potSum.toFixed(0);
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
}
