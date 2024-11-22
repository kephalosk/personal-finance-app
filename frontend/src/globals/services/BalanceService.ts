import { APIBalanceDTO } from '../../model/api/APIBalanceDTO';
import { EPBalance } from '../../model/entrypoints/EPBalance';
import axios, { AxiosResponse } from 'axios';
import data from '../data.json';
import { AppConfig } from '../../config';

export async function getBalance(): Promise<EPBalance> {
  const apiUrl = `${AppConfig.API_BACKEND_HOST}/balance`;

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
    current: Number(balance.current),
    income: Number(balance.income),
    expenses: Number(balance.expenses),
  };
}
