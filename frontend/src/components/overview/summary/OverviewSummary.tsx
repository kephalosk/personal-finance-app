import './OverviewSummary.scss';
import { SummaryCard } from './SummaryCard';

export function OverviewSummary() {
  return (
    <>
      <div className="overviewSummary" data-testid="overview-summary">
        <SummaryCard title="Current Balance" value="4,836.00" isInverted={true} />
        <SummaryCard title="Income" value="3,814.25" />
        <SummaryCard title="Expenses" value="1,700.50" />
      </div>
    </>
  );
}
