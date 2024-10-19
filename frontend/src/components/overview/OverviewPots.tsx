import './OverviewPots.scss';
import { OverviewHeader } from './OverviewHeader';
import { ValueBox } from './ValueBox';
import { PotsSummary } from './PotsSummary';

export function OverviewPots() {
  return (
    <>
      <div className="overviewPots" data-testid="overview-pots">
        <OverviewHeader title="Pots" linkText="See Details" linkTarget="//" />
        <div className="overviewPotsContent">
          <PotsSummary />
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
