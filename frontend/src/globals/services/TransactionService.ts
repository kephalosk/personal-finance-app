import data from '../data.json';
import { EPTransaction } from '../../model/entrypoints/EPTransaction';
import { APITransactionDTO } from '../../model/api/APITransactionDTO';
import { toLowerCaseWithoutWhitespace } from '../utils/ToLowerCaseWithoutWhitespace';
import axios, { AxiosResponse } from 'axios';
import { AppConfig } from '../../config';

export async function getTransactions(): Promise<EPTransaction[]> {
  const apiUrl = `${AppConfig.API_BACKEND_HOST}/transactions`;

  try {
    const response: AxiosResponse<APITransactionDTO[]> =
      await axios.get<APITransactionDTO[]>(apiUrl);

    const fetchedTransactions: APITransactionDTO[] = response.data;

    return fromAPITransactionDTOMapper(fetchedTransactions);
  } catch (error) {
    console.error(`Unable to fetch Transactions: ${error}`);
    const { transactions } = data;
    return fromAPITransactionDTOMapper(transactions);
  }
}

function fromAPITransactionDTOMapper(transactions: APITransactionDTO[]): EPTransaction[] {
  const epTransactions: EPTransaction[] = [];
  transactions.forEach((apiTransactionDTO: APITransactionDTO) => {
    const newTransaction: EPTransaction = {
      avatar: apiTransactionDTO.avatar,
      name: apiTransactionDTO.name,
      category: apiTransactionDTO.category,
      categoryKey: toLowerCaseWithoutWhitespace(apiTransactionDTO.category),
      date: formatDate(apiTransactionDTO.date),
      dateRaw: new Date(apiTransactionDTO.date),
      amount: Number(apiTransactionDTO.amount),
      recurring: apiTransactionDTO.recurring,
    };
    epTransactions.push(newTransaction);
  });
  return epTransactions;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}
