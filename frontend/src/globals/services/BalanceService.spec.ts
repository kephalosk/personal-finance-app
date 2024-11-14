import { EPBalance } from '../../model/entrypoints/EPBalance';
import { getBalance } from './BalanceService';
import axios from 'axios';
import { mockedBalanceDTO } from '../../fixtures/MockedBalanceDTO';

jest.mock('axios');

describe('BalanceService', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockedBalanceDTO });
  });
  const epBalance: EPBalance = {
    current: 300000,
    income: 10000,
    expenses: 1200,
  };

  it('maps object APIBalanceDTO to EPBalance correctly', async () => {
    const balance = await getBalance();
    expect(balance).toEqual(epBalance);
  });

  it('returns fallback values if fetching balance fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

    const balance = await getBalance();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unable to fetch Balance:')
    );
    expect(balance).toEqual({
      current: 4836,
      income: 3814.25,
      expenses: 1700.5,
    });
  });
});
