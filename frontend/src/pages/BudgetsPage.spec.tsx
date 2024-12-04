import { render, screen } from '@testing-library/react';
import BudgetsPage from './BudgetsPage';
import { MemoryRouter } from 'react-router-dom';
import useIsSmallScreen from '../globals/hooks/useIsSmallScreen';
import { getTransactions } from '../globals/services/TransactionService';
import { mockedTransactions } from '../fixtures/MockedTransactions';
import { act } from 'react';
import { getBudgets } from '../globals/services/BudgetService';
import { mockedBudgets } from '../fixtures/MockedBudgets';

jest.mock('../globals/services/TransactionService', () => ({
  getTransactions: jest.fn(),
}));

jest.mock('../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../globals/services/BudgetService', () => ({
  getBudgets: jest.fn(),
}));

describe('BudgetsPage', () => {
  beforeEach(() => {
    (getTransactions as jest.Mock).mockResolvedValue(mockedTransactions);
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
    (getBudgets as jest.Mock).mockResolvedValue(mockedBudgets);
  });

  it('renders div budgetsPage', async () => {
    const cut = await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <BudgetsPage />
        </MemoryRouter>
      );
      return container;
    });

    const htmlElement = cut.querySelector('.budgetsPage');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component HeaderBar', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <BudgetsPage />
        </MemoryRouter>
      );
    });

    const component = screen.getByTestId('header-bar');

    expect(component).toBeInTheDocument();
  });

  it('renders div budgetsDetails', async () => {
    const cut = await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <BudgetsPage />
        </MemoryRouter>
      );
      return container;
    });

    const htmlElement = cut.querySelector('.budgetsDetails');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div budgetsDetailsLeft', async () => {
    const cut = await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <BudgetsPage />
        </MemoryRouter>
      );
      return container;
    });

    const htmlElement = cut.querySelector('.budgetsDetailsLeft');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component HeaderBar', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <BudgetsPage />
        </MemoryRouter>
      );
    });

    const component = screen.getByTestId('budgets-diagram-card');

    expect(component).toBeInTheDocument();
  });

  it('renders div budgetsDetailsRight', async () => {
    const cut = await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <BudgetsPage />
        </MemoryRouter>
      );
      return container;
    });

    const htmlElement = cut.querySelector('.budgetsDetailsRight');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BudgetCard', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <BudgetsPage />
        </MemoryRouter>
      );
    });

    const components = screen.getAllByTestId('budget-card');

    expect(components).toHaveLength(2);
  });
});
