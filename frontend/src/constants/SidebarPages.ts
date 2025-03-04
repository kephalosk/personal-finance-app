import { SidebarPage } from '../model/SidebarPage';

export const SidebarPages: SidebarPage[] = [
  {
    name: 'Overview',
    description: 'Overview Page',
    imgSrc: '/images/icon-nav-overview.svg',
    imgAlt: 'overview icon',
    linkTarget: '/',
  },
  {
    name: 'Transactions',
    description: 'Transactions Page',
    imgSrc: '/images/icon-nav-transactions.svg',
    imgAlt: 'transactions icon',
    linkTarget: '/transactions',
  },
  {
    name: 'Budgets',
    description: 'Budgets Page',
    imgSrc: '/images/icon-nav-budgets.svg',
    imgAlt: 'budgets icon',
    linkTarget: '/budgets',
  },
  {
    name: 'Pots',
    description: 'Pots Page',
    imgSrc: '/images/icon-nav-pots.svg',
    imgAlt: 'pots icon',
    linkTarget: '/pots',
  },
  {
    name: 'Recurring Bills',
    description: 'Recurring Bills Page',
    imgSrc: '/images/icon-nav-recurring-bills.svg',
    imgAlt: 'recurring bills icon',
    linkTarget: '/bills',
  },
];
