import './OverviewSummary.scss';
import { SummaryCard } from './SummaryCard';
import { getBalance } from '../../../globals/services/BalanceService';

export function OverviewSummary() {
  const balance = getBalance();
  return (
    <>
      <div className="overviewSummary" data-testid="overview-summary">
        <SummaryCard title="Current Balance" value={balance.current} isInverted={true} />
        <SummaryCard title="Income" value={balance.income} />
        <SummaryCard title="Expenses" value={balance.expenses} />
      </div>
    </>
  );
}
