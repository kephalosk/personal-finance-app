import data from '../data.json';
import { APIBalanceDTO } from '../../types/APIBalanceDTO';
import { EPBalance } from '../../types/EPBalance';

export function getBalance(): EPBalance {
  const { balance } = data;
  return fromAPIBalanceDTOMapper(balance);
}

function fromAPIBalanceDTOMapper(balance: APIBalanceDTO): EPBalance {
  return {
    current: balance.current,
    income: balance.income,
    expenses: balance.expenses,
  };
}
