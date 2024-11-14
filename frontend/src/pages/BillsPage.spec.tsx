import { render, screen } from '@testing-library/react';
import { BillsPage } from './BillsPage';
import useIsSmallScreen from '../globals/hooks/useIsSmallScreen';
import { getTransactions } from '../globals/services/TransactionService';
import { mockedTransactions11Records } from '../fixtures/MockedTransactions';
import { act } from 'react';

jest.mock('../globals/services/TransactionService', () => ({
  getTransactions: jest.fn(),
}));

jest.mock('../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('BillsPage', () => {
  beforeEach(() => {
    (getTransactions as jest.Mock).mockResolvedValue(mockedTransactions11Records);
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
  });

  it('renders div billsPage', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<BillsPage />);
      return container;
    });

    const htmlElement = cut.querySelector('.billsPage');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders h1 headline Recurring Bills', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<BillsPage />);
      return container;
    });

    const htmlElement = cut.querySelector('.billsPage');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Recurring Bills');
  });

  it('renders div billsPageDetails', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<BillsPage />);
      return container;
    });

    const htmlElement = cut.querySelector('.billsPageDetails');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billsPageDetailsOverview', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<BillsPage />);
      return container;
    });

    const htmlElement = cut.querySelector('.billsPageDetailsOverview');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BillTotal', async () => {
    await act(async (): Promise<void> => {
      render(<BillsPage />);
    });

    const htmlElement = screen.getByTestId('bill-total');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BillSummary', async () => {
    await act(async (): Promise<void> => {
      render(<BillsPage />);
    });

    const htmlElement = screen.getByTestId('bill-summary');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BillCard', async () => {
    await act(async (): Promise<void> => {
      render(<BillsPage />);
    });

    const htmlElement = screen.getByTestId('bill-card');

    expect(htmlElement).toBeInTheDocument();
  });

  it('filters multiple recurring bills only once', async () => {
    await act(async (): Promise<void> => {
      render(<BillsPage />);
    });

    const htmlElement = screen.getAllByTestId('bill-card-table-row');

    expect(htmlElement).toHaveLength(4);
  });
});
