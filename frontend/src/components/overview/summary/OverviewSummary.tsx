import './OverviewSummary.scss';
import { SummaryCard } from './SummaryCard';
import { getBalance } from '../../../globals/services/BalanceService';
import { useEffect, useState } from 'react';
import { EPBalance } from '../../../model/entrypoints/EPBalance';

export function OverviewSummary() {
  const [balance, setBalance] = useState<{
    current: number;
    income: number;
    expenses: number;
  }>({
    current: 0,
    income: 0,
    expenses: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBalance = async () => {
      const balanceData: EPBalance = await getBalance();
      setBalance(balanceData);
      setIsLoading(false);
    };
    fetchBalance().then();
  }, []);

  if (!balance) {
    return <></>;
  }

  return (
    <>
      <div className="overviewSummary" data-testid="overview-summary">
        <SummaryCard
          title="Current Balance"
          value={balance.current ?? 0}
          isInverted={true}
          isLoading={isLoading}
        />
        <SummaryCard title="Income" value={balance.income ?? 0} isLoading={isLoading} />
        <SummaryCard title="Expenses" value={balance.expenses ?? 0} isLoading={isLoading} />
      </div>
    </>
  );
}
