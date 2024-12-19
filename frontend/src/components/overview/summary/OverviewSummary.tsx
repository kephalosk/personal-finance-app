import './OverviewSummary.scss';
import SummaryCard from './SummaryCard';
import { getBalance } from '../../../globals/services/BalanceService';
import { ReactNode, useEffect, useState } from 'react';
import { EPBalance } from '../../../model/entrypoints/EPBalance';

const OverviewSummary: () => ReactNode = (): ReactNode => {
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
    const fetchBalance: () => Promise<void> = async (): Promise<void> => {
      const balanceData: EPBalance = await getBalance();
      setBalance(balanceData);
      setIsLoading(false);
    };
    fetchBalance().then();
  }, []);

  return (
    <>
      <div className="overviewSummary" data-testid="overview-summary">
        <SummaryCard
          title="Current Balance"
          value={balance.current}
          isInverted={true}
          isLoading={isLoading}
        />
        <SummaryCard title="Income" value={balance.income} isLoading={isLoading} />
        <SummaryCard title="Expenses" value={balance.expenses} isLoading={isLoading} />
      </div>
    </>
  );
};

export default OverviewSummary;
