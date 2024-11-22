import { render, screen } from '@testing-library/react';
import { TransactionsPage } from './TransactionsPage';
import React, { act } from 'react';
import { getTransactions } from '../globals/services/TransactionService';
import useIsSmallScreen from '../globals/hooks/useIsSmallScreen';
import { mockedTransactions11Records } from '../fixtures/MockedTransactions';

jest.mock('../globals/services/TransactionService', () => ({
  getTransactions: jest.fn(),
}));

jest.mock('../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('TransactionsPage', () => {
  beforeEach(() => {
    (getTransactions as jest.Mock).mockResolvedValue(mockedTransactions11Records);
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
  });

  it('renders div transactionsPage', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<TransactionsPage />);
      return container;
    });

    const htmlElement = cut.querySelector('.transactionsPage');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders headline h1 of TransactionsDetails', async () => {
    const cut: HTMLElement = await act(async (): Promise<HTMLElement> => {
      const { container } = render(<TransactionsPage />);
      return container;
    });

    const htmlElement = cut.querySelector('h1');

    expect(htmlElement).toHaveTextContent('Transactions');
  });

  it('renders react component TransactionsDetails', async () => {
    await act(async (): Promise<void> => {
      render(<TransactionsPage />);
    });

    const reactComponent = screen.getByTestId('transactions-details');

    expect(reactComponent).toBeInTheDocument();
  });
});
