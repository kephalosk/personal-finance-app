import data from '../data.json';
import { APIBalanceDTO } from '../../model/api/APIBalanceDTO';
import { EPBalance } from '../../model/entrypoints/EPBalance';

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
