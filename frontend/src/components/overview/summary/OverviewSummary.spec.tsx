import { OverviewSummary } from './OverviewSummary';
import { render, screen } from '@testing-library/react';
import { getBalance } from '../../../globals/services/BalanceService';
import { mockedBalance } from '../../../fixtures/MockedBalance';
import { act } from 'react';

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

  it('renders react component SummaryCard 3 times', async () => {
    await act(async (): Promise<void> => {
      render(<OverviewSummary />);
    });

    const reactComponents = screen.getAllByTestId('summary-card');

    expect(reactComponents).toHaveLength(3);
  });

  it('renders react component SummaryCard with title Current Balance', async () => {
    await act(async (): Promise<void> => {
      render(<OverviewSummary />);
    });

    const reactComponent = screen.getByText('Current Balance');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders react component SummaryCard with title Income', async () => {
    await act(async (): Promise<void> => {
      render(<OverviewSummary />);
    });

    const reactComponent = screen.getByText('Income');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders react component SummaryCard with title Expenses', async () => {
    await act(async (): Promise<void> => {
      render(<OverviewSummary />);
    });

    const reactComponent = screen.getByText('Expenses');

    expect(reactComponent).toBeInTheDocument();
  });
});
