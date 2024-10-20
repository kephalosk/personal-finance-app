import './PotsSummary.scss';

export function PotsSummary() {
  return (
    <>
      <div className="overviewPotsSummary" data-testid="pots-summary">
        <img
          className="overviewPotsSummaryIcon"
          alt="pot icon"
          aria-hidden="true"
          src="./src/assets/images/icon-pot.svg"
        />
        <div className="overviewPotsSummaryContent">
          <label className="overviewPotsSummaryContentTitle">Total Saved</label>
          <label className="overviewPotsSummaryContentValue">$850</label>
        </div>
      </div>
    </>
  );
}
