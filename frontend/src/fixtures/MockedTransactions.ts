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

export const mockedTransactionsEntertainment: EPTransaction[] = [
  {
    avatar: './src/assets/images/avatars/james-thompson.jpg',
    name: 'James Thompson',
    category: 'Entertainment',
    categoryKey: 'entertainment',
    date: '11 Aug 2024',
    amount: -5,
    recurring: false,
  },
  {
    avatar: './src/assets/images/avatars/pixel-playground.jpg',
    name: 'Pixel Playground',
    category: 'Entertainment',
    categoryKey: 'entertainment',
    date: '15 Aug 2024',
    amount: -10,
    recurring: true,
  },
  {
    avatar: './src/assets/images/avatars/rina-sato.jpg',
    name: 'Rina Sato',
    category: 'Entertainment',
    categoryKey: 'entertainment',
    date: '13 Jul 2024',
    amount: -10,
    recurring: false,
  },
];

export const mockedTransactionsWithDifferentCategoriesAndCategoryAsNames: EPTransaction[] = [
  {
    avatar: './src/assets/images/avatars/james-thompson.jpg',
    name: 'Entertainment',
    category: 'Entertainment',
    categoryKey: 'entertainment',
    date: '11 Aug 2024',
    amount: -5,
    recurring: false,
  },
  {
    avatar: './src/assets/images/avatars/pixel-playground.jpg',
    name: 'School',
    category: 'School',
    categoryKey: 'school',
    date: '15 Aug 2024',
    amount: -10,
    recurring: true,
  },
  {
    avatar: './src/assets/images/avatars/rina-sato.jpg',
    name: 'Bills',
    category: 'Bills',
    categoryKey: 'bills',
    date: '13 Jul 2024',
    amount: -10,
    recurring: false,
  },
];
