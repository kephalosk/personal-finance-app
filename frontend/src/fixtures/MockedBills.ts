import { EPTransaction } from '../model/entrypoints/EPTransaction';

export const mockedBills: EPTransaction[] = [
  {
    avatar: '/images/avatars/pixel-playground.jpg',
    name: 'Pixel Playground',
    category: 'Entertainment',
    categoryKey: 'entertainment',
    date: '2024-08-11T18:45:38Z',
    dateRaw: new Date('2024-08-11T18:45:38Z'),
    amount: -10.0,
    recurring: true,
  },
  {
    avatar: '/images/avatars/elevate-education.jpg',
    name: 'Elevate Education',
    category: 'Education',
    categoryKey: 'education',
    date: '2024-08-04T11:15:22Z',
    dateRaw: new Date('2024-08-04T11:15:22Z'),
    amount: -50.0,
    recurring: true,
  },
  {
    avatar: '/images/avatars/serenity-spa-and-wellness.jpg',
    name: 'Serenity Spa & Wellness',
    category: 'Personal Care',
    categoryKey: 'personalcare',
    date: '2024-08-03T14:00:37Z',
    dateRaw: new Date('2024-08-03T14:00:37Z'),
    amount: -30.0,
    recurring: true,
  },
  {
    avatar: '/images/avatars/spark-electric-solutions.jpg',
    name: 'Spark Electric Solutions',
    category: 'Bills',
    categoryKey: 'bills',
    date: '2024-08-02T09:25:11Z',
    dateRaw: new Date('2024-08-02T09:25:11Z'),
    amount: -100.0,
    recurring: true,
  },
];
