import { render, screen } from '@testing-library/react';
import BillsPage from './BillsPage';
import { act } from 'react';
import { BillTotal } from '../components/bills/BillTotal';
import { BillSummary } from '../components/bills/BillSummary';
import { BillCard } from '../components/bills/BillCard';
import { mockedTodayAugust1st } from '../fixtures/MockedToday';
import { BillsHelper } from '../globals/helper/BillsHelper';
import { mockedBills } from '../fixtures/MockedBills';
import getTotalAmount from '../globals/utils/getTotalAmount';

jest.mock('../components/bills/BillTotal', () => ({
  BillTotal: jest.fn(() => <div data-testid="bill-total"></div>),
}));
jest.mock('../components/bills/BillSummary', () => ({
  BillSummary: jest.fn(() => <div data-testid="bill-summary"></div>),
}));
jest.mock('../components/bills/BillCard', () => ({
  BillCard: jest.fn(() => <div data-testid="bill-card"></div>),
}));

jest.mock('../globals/utils/getTotalAmount', () => jest.fn(() => 190));

describe('BillsPage', () => {
  beforeAll(() => {
    global.Date = jest.fn(() => mockedTodayAugust1st) as unknown as DateConstructor;
  });
  beforeEach(() => {
    jest.spyOn(BillsHelper, 'getRecurringBillsFromTransactions').mockResolvedValue(mockedBills);
    (getTotalAmount as jest.Mock).mockReturnValue(190);
  });
  afterAll(() => {
    global.Date = Date;
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
    expect(BillTotal).toHaveBeenNthCalledWith(1, { isLoading: true, sum: 190 }, {});
    expect(BillTotal).toHaveBeenNthCalledWith(2, { isLoading: false, sum: 190 }, {});
  });

  it('renders component BillSummary', async () => {
    await act(async (): Promise<void> => {
      render(<BillsPage />);
    });

    const htmlElement = screen.getByTestId('bill-summary');

    expect(htmlElement).toBeInTheDocument();
    expect(BillSummary).toHaveBeenNthCalledWith(
      1,
      { isLoading: true, bills: [], today: mockedTodayAugust1st },
      {}
    );
    expect(BillSummary).toHaveBeenNthCalledWith(
      2,
      { isLoading: false, bills: mockedBills, today: mockedTodayAugust1st },
      {}
    );
  });

  it('renders component BillCard', async () => {
    await act(async (): Promise<void> => {
      render(<BillsPage />);
    });

    const htmlElement = screen.getByTestId('bill-card');

    expect(htmlElement).toBeInTheDocument();
    expect(BillCard).toHaveBeenNthCalledWith(
      1,
      { isLoading: true, bills: [], today: mockedTodayAugust1st },
      {}
    );
    expect(BillCard).toHaveBeenNthCalledWith(
      2,
      { isLoading: false, bills: mockedBills, today: mockedTodayAugust1st },
      {}
    );
  });
});
