import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React, { act } from 'react';
import { OverviewPage } from './OverviewPage';
import { mockedTransactions } from '../fixtures/MockedTransactions';
import useIsSmallScreen from '../globals/hooks/useIsSmallScreen';
import { getTransactions } from '../globals/services/TransactionService';
import { BillsHelper } from '../globals/helper/BillsHelper';
import { mockedBills } from '../fixtures/MockedBills';
import { getBalance } from '../globals/services/BalanceService';
import { mockedBalance } from '../fixtures/MockedBalance';
import { getPots } from '../globals/services/PotService';
import { mockedPots } from '../fixtures/MockedPots';
import { getBudgets } from '../globals/services/BudgetService';
import { mockedBudgets } from '../fixtures/MockedBudgets';

jest.mock('../globals/services/TransactionService', () => ({
  getTransactions: jest.fn(),
}));

jest.mock('../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
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
  beforeEach(() => {
    (getTransactions as jest.Mock).mockResolvedValue(mockedTransactions);
    jest.spyOn(BillsHelper, 'getRecurringBillsFromTransactions').mockResolvedValue(mockedBills);
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
    (getBalance as jest.Mock).mockResolvedValue(mockedBalance);
    (getPots as jest.Mock).mockResolvedValue(mockedPots);
    (getBudgets as jest.Mock).mockResolvedValue(mockedBudgets);
  });

  it('renders div overviewPage', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(
        <MemoryRouter>
          <OverviewPage />
        </MemoryRouter>
      );
      return container;
    });

    const htmlElement = cut.querySelector('.overviewPage');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders headline h1 Overview', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(
        <MemoryRouter>
          <OverviewPage />
        </MemoryRouter>
      );
      return container;
    });

    const htmlElement = cut.querySelector('h1');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Overview');
  });

  it('renders react component OverviewSummary', async () => {
    await act(async (): Promise<void> => {
      render(
        <MemoryRouter>
          <OverviewPage />
        </MemoryRouter>
      );
    });

    const reactComponent = screen.getByTestId('overview-summary');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewPageDetails', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(
        <MemoryRouter>
          <OverviewPage />
        </MemoryRouter>
      );
      return container;
    });

    const htmlElement = cut.querySelector('.overviewPageDetails');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div overviewPageDetailsLeft', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(
        <MemoryRouter>
          <OverviewPage />
        </MemoryRouter>
      );
      return container;
    });

    const htmlElement = cut.querySelector('.overviewPageDetailsLeft');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component OverviewPots', async () => {
    await act(async (): Promise<void> => {
      render(
        <MemoryRouter>
          <OverviewPage />
        </MemoryRouter>
      );
    });

    const reactComponent = screen.getByTestId('overview-pots');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders react component OverviewTransactions', async () => {
    await act(async (): Promise<void> => {
      render(
        <MemoryRouter>
          <OverviewPage />
        </MemoryRouter>
      );
    });

    const reactComponent = screen.getByTestId('overview-transactions');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewPageDetailsRight', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(
        <MemoryRouter>
          <OverviewPage />
        </MemoryRouter>
      );
      return container;
    });

    const htmlElement = cut.querySelector('.overviewPageDetailsRight');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component OverviewBudgets', async () => {
    await act(async (): Promise<void> => {
      render(
        <MemoryRouter>
          <OverviewPage />
        </MemoryRouter>
      );
    });

    const reactComponent = screen.getByTestId('overview-budgets');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders react component OverviewBills', async () => {
    await act(async (): Promise<void> => {
      render(
        <MemoryRouter>
          <OverviewPage />
        </MemoryRouter>
      );
    });

    const reactComponent = screen.getByTestId('overview-bills');

    expect(reactComponent).toBeInTheDocument();
  });
});
