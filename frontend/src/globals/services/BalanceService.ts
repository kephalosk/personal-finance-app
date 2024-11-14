import { APIBalanceDTO } from '../../model/api/APIBalanceDTO';
import { EPBalance } from '../../model/entrypoints/EPBalance';
import axios, { AxiosResponse } from 'axios';
import data from '../data.json';

export async function getBalance(): Promise<EPBalance> {
  const apiUrl = 'http://localhost:3000/balance';

  try {
    const response: AxiosResponse<APIBalanceDTO> = await axios.get<APIBalanceDTO>(apiUrl);

    const fetchedBalance: APIBalanceDTO = {
      current: response.data.current,
      income: response.data.income,
      expenses: response.data.expenses,
    };

    return fromAPIBalanceDTOMapper(fetchedBalance);
  } catch (error) {
    console.error(`Unable to fetch Balance: ${error}`);
    const { balance } = data;
    return fromAPIBalanceDTOMapper(balance);
  }
}

function fromAPIBalanceDTOMapper(balance: APIBalanceDTO): EPBalance {
  return {
    current: balance.current,
    income: balance.income,
    expenses: balance.expenses,
  };
}
