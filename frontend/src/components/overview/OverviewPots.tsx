import './OverviewPots.scss';
import { OverviewHeader } from './OverviewHeader';
import { ValueBox } from './ValueBox';

export function OverviewPots() {
  return (
    <>
      <div className="overviewPots">
        <OverviewHeader title="Pots" linkText="See Details" linkTarget="//" />
        <div className="overviewPotsContent">
          <div className="overviewPotsSummary">
            <img className="overviewPotsSummaryIcon" alt="money icon" aria-hidden="true" />
            <div className="overviewPotsSummaryContent">
              <label className="overviewPotsSummaryContentTitle">Total Saved</label>
              <label className="overviewPotsSummaryContentValue">$850</label>
            </div>
          </div>
          <div className="overviewPotsValuesLeft">
            <ValueBox title="Savings" value="159" color="dark-green" />
            <ValueBox title="Concert Ticket" value="110" color="dark-grey" />
          </div>
          <div className="overviewPotsValuesRight">
            <ValueBox title="Gift" value="40" color="light-blue" />
            <ValueBox title="New Laptop" value="10" color="beige" />
          </div>
        </div>
      </div>
    </>
  );
}
