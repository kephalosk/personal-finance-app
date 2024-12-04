import { getTransactions } from '../services/TransactionService';
import { BillsHelper } from './BillsHelper';
import { mockedBills } from '../../fixtures/MockedBills';
import { mockedTodayAugust1st } from '../../fixtures/MockedToday';
import { EPTransaction } from '../../model/entrypoints/EPTransaction';

jest.mock('../services/TransactionService', () => ({
  getTransactions: jest.fn(),
}));

describe('BillsHelper', () => {
  let today: Date;
  beforeEach(() => {
    (getTransactions as jest.Mock).mockResolvedValue(mockedBills);
    today = mockedTodayAugust1st;
  });

  it('returns only recurring bills and no duplicates', async () => {
    const result = await BillsHelper.getRecurringBillsFromTransactions();

    expect(result).toEqual(mockedBills);
  });

  it('calculates paid, upcoming, and due bills sums and indices correctly', () => {
    const result = BillsHelper.getPaidUpcomingAndDueBillsSumAndIndex(mockedBills, today);

    expect(result.paidBillsSum).toBe(0);
    expect(result.paidBillsIndex).toBe(0);
    expect(result.upcomingBillsSum).toBe(190);
    expect(result.upcomingBillsIndex).toBe(4);
    expect(result.dueBillsSum).toBe(180);
    expect(result.dueBillsIndex).toBe(3);
  });

  it('handles no bills correctly', () => {
    const result = BillsHelper.getPaidUpcomingAndDueBillsSumAndIndex([], today);

    expect(result.paidBillsSum).toBe(0);
    expect(result.paidBillsIndex).toBe(0);
    expect(result.upcomingBillsSum).toBe(0);
    expect(result.upcomingBillsIndex).toBe(0);
    expect(result.dueBillsSum).toBe(0);
    expect(result.dueBillsIndex).toBe(0);
  });

  it('handles all paid bills correctly', () => {
    const mockedBillsToday: EPTransaction[] = [
      {
        ...mockedBills[0],
        date: today.toDateString(),
        dateRaw: new Date(today),
      },
    ];
    const result = BillsHelper.getPaidUpcomingAndDueBillsSumAndIndex(mockedBillsToday, today);

    expect(result.paidBillsSum).toBe(10);
    expect(result.paidBillsIndex).toBe(1);
    expect(result.upcomingBillsSum).toBe(0);
    expect(result.upcomingBillsIndex).toBe(0);
    expect(result.dueBillsSum).toBe(0);
    expect(result.dueBillsIndex).toBe(0);
  });
});
