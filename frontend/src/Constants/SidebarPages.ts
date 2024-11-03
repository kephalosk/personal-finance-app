import { SidebarPage } from '../model/SidebarPage';

export const SidebarPages: SidebarPage[] = [
  {
    name: 'Overview',
    imgSrc: '/images/icon-nav-overview.svg',
    imgAlt: 'overview icon',
    linkTarget: '/',
  },
  {
    name: 'Transactions',
    imgSrc: '/images/icon-nav-transactions.svg',
    imgAlt: 'transactions icon',
    linkTarget: '/transactions',
  },
  {
    name: 'Budgets',
    imgSrc: '/images/icon-nav-budgets.svg',
    imgAlt: 'budgets icon',
    linkTarget: '/budgets',
  },
  {
    name: 'Pots',
    imgSrc: '/images/icon-nav-pots.svg',
    imgAlt: 'pots icon',
    linkTarget: '/pots',
  },
  {
    name: 'Recurring Bills',
    imgSrc: '/images/icon-nav-recurring-bills.svg',
    imgAlt: 'recurring bills icon',
    linkTarget: '/bills',
  },
];
