import data from '../data.json';
import { EPTransaction } from '../../types/EPTransaction';
import { APITransactionDTO } from '../../types/APITransactionDTO';

export function getTransactions(): EPTransaction[] {
  const { transactions } = data;
  return fromAPITransactionDTOMapper(transactions);
}

function fromAPITransactionDTOMapper(transactions: APITransactionDTO[]): EPTransaction[] {
  const epTransactions: EPTransaction[] = [];
  transactions.forEach((apiTransactionDTO: APITransactionDTO) => {
    const newTransaction: EPTransaction = {
      avatar: apiTransactionDTO.avatar,
      name: apiTransactionDTO.name,
      category: apiTransactionDTO.category,
      date: formatDate(apiTransactionDTO.date),
      amount: apiTransactionDTO.amount,
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
