import './OverviewPage.scss';
import { OverviewSummary } from '../components/overview/OverviewSummary';
import { OverviewPots } from '../components/overview/OverviewPots';
import { OverviewTransactions } from '../components/overview/OverviewTransactions';
import { OverviewBudgets } from '../components/overview/OverviewBudgets';
import { OverviewBills } from '../components/overview/OverviewBills';

export function OverviewPage() {
  return (
    <div className="overviewPage" data-testid="overview-page">
      <h1>Overview</h1>
      <OverviewSummary />
      <div className="overviewPageDetails">
        <div className="overviewPageDetailsLeft">
          <OverviewPots />
          <OverviewTransactions />
        </div>
        <div className="overviewPageDetailsRight">
          <OverviewBudgets />
          <OverviewBills />
        </div>
      </div>
    </div>
  );
}
