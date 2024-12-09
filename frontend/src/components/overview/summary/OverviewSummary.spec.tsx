import OverviewSummary from './OverviewSummary';
import { render, screen } from '@testing-library/react';
import { getBalance } from '../../../globals/services/BalanceService';
import { mockedBalance } from '../../../fixtures/MockedBalance';
import { act } from 'react';
import SummaryCard from './SummaryCard';

jest.mock('./SummaryCard', () => jest.fn(() => <div data-testid="summary-card"></div>));

jest.mock('../../../globals/services/BalanceService', () => ({
  getBalance: jest.fn(),
}));

describe('OverviewSummary', () => {
  beforeEach(() => {
    (getBalance as jest.Mock).mockResolvedValue({ data: mockedBalance });
  });

  it('renders div overviewSummary', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<OverviewSummary />);
      return container;
    });

    const htmlElement = cut.querySelector('.overviewSummary');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders components SummaryCard 3 times', async () => {
    await act(async (): Promise<void> => {
      render(<OverviewSummary />);
    });

    const components = screen.getAllByTestId('summary-card');

    expect(components).toHaveLength(3);
  });

  it('renders react component SummaryCard with title Current Balance', async () => {
    await act(async (): Promise<void> => {
      render(<OverviewSummary />);
    });

    const components = screen.getAllByTestId('summary-card');

    expect(components[0]).toBeInTheDocument();
    expect(SummaryCard).toHaveBeenNthCalledWith(
      1,
      { isInverted: true, isLoading: true, title: 'Current Balance', value: 0 },
      {}
    );
  });

  it('renders react component SummaryCard with title Income', async () => {
    await act(async (): Promise<void> => {
      render(<OverviewSummary />);
    });

    const components = screen.getAllByTestId('summary-card');

    expect(components[1]).toBeInTheDocument();
    expect(SummaryCard).toHaveBeenNthCalledWith(
      2,
      { isLoading: true, title: 'Income', value: 0 },
      {}
    );
  });

  it('renders react component SummaryCard with title Expenses', async () => {
    await act(async (): Promise<void> => {
      render(<OverviewSummary />);
    });

    const components = screen.getAllByTestId('summary-card');

    expect(components[2]).toBeInTheDocument();
    expect(SummaryCard).toHaveBeenNthCalledWith(
      3,
      { isLoading: true, title: 'Expenses', value: 0 },
      {}
    );
  });
});
