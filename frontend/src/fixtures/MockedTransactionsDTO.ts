import { APITransactionDTO } from '../model/api/APITransactionDTO';

export const mockedTransactionsDTO: APITransactionDTO[] = [
  {
    avatar: '/images/avatars/emma-richardson.jpg',
    name: 'Emma Richardson',
    category: 'General',
    date: '2024-08-19T14:00:37Z',
    amount: 75.5,
    recurring: false,
  },
  {
    avatar: '/images/avatars/savory-bites-bistro.jpg',
    name: 'Savory Bites Bistro',
    category: 'Dining Out',
    date: '2024-08-20T14:00:37Z',
    amount: -55.5,
    recurring: false,
  },
  {
    avatar: '/images/avatars/savory-bites-bistro.jpg',
    name: 'Savory Bites Bistro',
    category: 'Dining Out',
    date: '2024-08-20T14:00:37Z',
    amount: -55.5,
    recurring: false,
  },
];
