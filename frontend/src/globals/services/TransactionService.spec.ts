import { EPTransaction } from '../../types/EPTransaction';
import { getTransactions } from './TransactionService';

describe('TransactionService', () => {
  const firstEPTransaction: EPTransaction = {
    avatar: './src/assets/images/avatars/emma-richardson.jpg',
    name: 'Emma Richardson',
    category: 'General',
    categoryKey: 'general',
    date: '19 Aug 2024',
    dateRaw: new Date('2024-08-19T14:23:11.000Z'),
    amount: 75.5,
    recurring: false,
  };

  it('maps array APITransactionDTO to array EPTransaction correctly', () => {
    const transactions = getTransactions();
    expect(transactions.at(0)).toEqual(firstEPTransaction);
  });
});
