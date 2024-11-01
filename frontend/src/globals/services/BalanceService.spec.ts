import { EPBalance } from '../../types/EPBalance';
import { getBalance } from './BalanceService';

describe('BalanceService', () => {
  const epBalance: EPBalance = {
    current: 4836,
    income: 3814.25,
    expenses: 1700.5,
  };

  it('maps object APIBalanceDTO to EPBalance correctly', () => {
    const balance = getBalance();
    expect(balance).toEqual(epBalance);
  });
});
