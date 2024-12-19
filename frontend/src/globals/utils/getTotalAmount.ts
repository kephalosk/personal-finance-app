import { EPTransaction } from '../../model/entrypoints/EPTransaction';

const getTotalAmount: (transactions: EPTransaction[]) => number = (
  transactions: EPTransaction[]
): number => {
  let transactionsTotal: number = 0;
  transactions.forEach((transaction: EPTransaction) => {
    transactionsTotal = transactionsTotal + transaction.amount;
  });
  return transactionsTotal * -1;
};

export default getTotalAmount;
