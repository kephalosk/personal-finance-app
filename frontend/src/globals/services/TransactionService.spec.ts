import { getTransactions } from './TransactionService';
import axios from 'axios';
import { mockedTransactionsDTO } from '../../fixtures/MockedTransactionsDTO';
import { mockedTransactions } from '../../fixtures/MockedTransactions';
import { EPTransaction } from '../../model/entrypoints/EPTransaction';

jest.mock('axios');

describe('TransactionService', () => {
  const firstEPTransaction: EPTransaction = {
    avatar: '/images/avatars/emma-richardson.jpg',
    name: 'Emma Richardson',
    category: 'General',
    categoryKey: 'general',
    date: '19 Aug 2024',
    dateRaw: new Date('2024-08-19T14:23:11.000Z'),
    amount: 75.5,
    recurring: false,
  };

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockedTransactionsDTO });
  });

  it('maps array APITransactionDTO to array EPTransaction correctly', async () => {
    const transactions = await getTransactions();
    expect(transactions).toEqual(mockedTransactions);
  });

  it('returns fallback values if fetching transactions fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

    const transactions = await getTransactions();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unable to fetch Transactions:')
    );
    expect(transactions).toHaveLength(49);
    expect(transactions.at(0)).toEqual(firstEPTransaction);
  });
});
