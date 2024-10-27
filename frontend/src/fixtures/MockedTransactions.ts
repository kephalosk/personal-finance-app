import { EPTransaction } from '../types/EPTransaction';

export const mockedTransactions: EPTransaction[] = [
  {
    avatar: './src/assets/images/avatars/emma-richardson.jpg',
    name: 'Emma Richardson',
    category: 'General',
    categoryKey: 'general',
    date: '19 Aug 2024',
    amount: 75.5,
    recurring: false,
  },
  {
    avatar: './src/assets/images/avatars/savory-bites-bistro.jpg',
    name: 'Savory Bites Bistro',
    category: 'Dining Out',
    categoryKey: 'diningout',
    date: '19 Aug 2024',
    amount: -55.5,
    recurring: false,
  },
];
