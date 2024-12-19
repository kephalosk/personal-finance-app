import { render, screen } from '@testing-library/react';
import React, { act } from 'react';
import OverviewPage from './OverviewPage';
import { mockedTransactions } from '../fixtures/MockedTransactions';
import { getTransactions } from '../globals/services/TransactionService';
import { BillsHelper } from '../globals/helper/BillsHelper';
import { mockedBills } from '../fixtures/MockedBills';
import { getBalance } from '../globals/services/BalanceService';
import { mockedBalance } from '../fixtures/MockedBalance';
import { getPots } from '../globals/services/PotService';
import { mockedPots } from '../fixtures/MockedPots';
import { getBudgets } from '../globals/services/BudgetService';
import { mockedBudgets } from '../fixtures/MockedBudgets';
import OverviewPots from '../components/overview/pots/OverviewPots';
import OverviewTransactions from '../components/overview/transactions/OverviewTransactions';
import OverviewBudgets from '../components/overview/budgets/OverviewBudgets';
import OverviewBills from '../components/overview/bills/OverviewBills';
import { mockedTodayAugust1st } from '../fixtures/MockedToday';

jest.mock('../components/overview/summary/OverviewSummary', () =>
  jest.fn(() => <div data-testid="overview-summary"></div>)
);
jest.mock('../components/overview/pots/OverviewPots', () =>
  jest.fn(() => <div data-testid="overview-pots"></div>)
);
jest.mock('../components/overview/transactions/OverviewTransactions', () =>
  jest.fn(() => <div data-testid="overview-transactions"></div>)
);
jest.mock('../components/overview/budgets/OverviewBudgets', () =>
  jest.fn(() => <div data-testid="overview-budgets"></div>)
);
jest.mock('../components/overview/bills/OverviewBills', () =>
  jest.fn(() => <div data-testid="overview-bills"></div>)
);

jest.mock('../globals/services/TransactionService', () => ({
  getTransactions: jest.fn(),
}));
jest.mock('../globals/services/BalanceService', () => ({
  getBalance: jest.fn(),
}));
jest.mock('../globals/services/PotService', () => ({
  getPots: jest.fn(),
}));
jest.mock('../globals/services/BudgetService', () => ({
  getBudgets: jest.fn(),
}));

describe('OverviewPage', () => {
  beforeAll(() => {
    global.Date = jest.fn(() => mockedTodayAugust1st) as unknown as DateConstructor;
  });
  beforeEach(() => {
    (getTransactions as jest.Mock).mockResolvedValue(mockedTransactions);
    (getBalance as jest.Mock).mockResolvedValue(mockedBalance);
    (getPots as jest.Mock).mockResolvedValue(mockedPots);
    (getBudgets as jest.Mock).mockResolvedValue(mockedBudgets);
    jest.spyOn(BillsHelper, 'getRecurringBillsFromTransactions').mockResolvedValue(mockedBills);
  });
  afterAll(() => {
    global.Date = Date;
  });

  it('renders div overviewPage', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<OverviewPage />);
      return container;
    });

    const htmlElement = cut.querySelector('.overviewPage');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders headline h1 Overview', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<OverviewPage />);
      return container;
    });

    const htmlElement = cut.querySelector('h1');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Overview');
  });

  it('renders react component OverviewSummary', async () => {
    await act(async (): Promise<void> => {
      render(<OverviewPage />);
    });

    const reactComponent = screen.getByTestId('overview-summary');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewPageDetails', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<OverviewPage />);
      return container;
    });

    const htmlElement = cut.querySelector('.overviewPageDetails');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div overviewPageDetailsLeft', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<OverviewPage />);
      return container;
    });

    const htmlElement = cut.querySelector('.overviewPageDetailsLeft');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component OverviewPots', async () => {
    await act(async (): Promise<void> => {
      render(<OverviewPage />);
    });

    const reactComponent = screen.getByTestId('overview-pots');

    expect(reactComponent).toBeInTheDocument();
    expect(OverviewPots).toHaveBeenCalledWith({ isLoading: true, pots: [] }, {});
    expect(OverviewPots).toHaveBeenCalledWith({ isLoading: false, pots: mockedPots }, {});
  });

  it('renders react component OverviewTransactions', async () => {
    await act(async (): Promise<void> => {
      render(<OverviewPage />);
    });

    const reactComponent = screen.getByTestId('overview-transactions');

    expect(reactComponent).toBeInTheDocument();
    expect(OverviewTransactions).toHaveBeenCalledWith({ isLoading: true, transactions: [] }, {});
    expect(OverviewTransactions).toHaveBeenCalledWith(
      { isLoading: false, transactions: mockedTransactions },
      {}
    );
  });

  it('renders div overviewPageDetailsRight', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<OverviewPage />);
      return container;
    });

    const htmlElement = cut.querySelector('.overviewPageDetailsRight');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component OverviewBudgets', async () => {
    await act(async (): Promise<void> => {
      render(<OverviewPage />);
    });

    const reactComponent = screen.getByTestId('overview-budgets');

    expect(reactComponent).toBeInTheDocument();
    expect(OverviewBudgets).toHaveBeenCalledWith(
      { isLoading: true, budgets: [], transactions: [] },
      {}
    );
    expect(OverviewBudgets).toHaveBeenCalledWith(
      { isLoading: false, budgets: mockedBudgets, transactions: mockedTransactions },
      {}
    );
  });

  it('renders react component OverviewBills', async () => {
    await act(async (): Promise<void> => {
      render(<OverviewPage />);
    });

    const reactComponent = screen.getByTestId('overview-bills');

    expect(reactComponent).toBeInTheDocument();
    expect(OverviewBills).toHaveBeenCalledWith(
      { isLoading: true, bills: [], today: mockedTodayAugust1st },
      {}
    );
    expect(OverviewBills).toHaveBeenCalledWith(
      { isLoading: false, bills: mockedBills, today: mockedTodayAugust1st },
      {}
    );
  });
});
