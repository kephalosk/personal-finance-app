import './TransactionsPage.scss';
import TransactionsDetails from '../components/overview/transactions/TransactionsDetails';
import { useEffect, useRef, useState } from 'react';
import { EPTransaction } from '../model/entrypoints/EPTransaction';
import { getTransactions } from '../globals/services/TransactionService';

const TransactionsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchedTransactions = useRef<EPTransaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async (): Promise<void> => {
      fetchedTransactions.current = await getTransactions();
      setIsLoading(false);
    };
    fetchTransactions().then();
  }, []);

  return (
    <>
      <div className="transactionsPage" data-testid="transactions-page">
        <h1>Transactions</h1>
        <TransactionsDetails
          isLoading={isLoading}
          fetchedTransactions={fetchedTransactions.current}
        />
      </div>
    </>
  );
};

export default TransactionsPage;
