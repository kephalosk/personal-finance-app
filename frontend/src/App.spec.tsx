import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  it('renders div webapp', () => {
    const { container } = render(<App />);

    const htmlElement = container.querySelector('.webapp');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component Sidebar', () => {
    render(<App />);

    const reactComponent = screen.getByTestId('sidebar');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders section content', () => {
    const { container } = render(<App />);

    const htmlElement = container.querySelector('.content');

    expect(htmlElement).toBeInTheDocument();
  });

  describe('Router', () => {
    it('renders OverviewPage by default', () => {
      const { getByTestId } = render(<App />);

      expect(getByTestId('overview-page')).toBeInTheDocument();
    });

    it('renders OverviewPage on empty path /', () => {
      const { getByTestId } = render(<App Router={MemoryRouter} initialEntries={['/']} />);

      expect(getByTestId('overview-page')).toBeInTheDocument();
    });

    it('renders TransactionsPage on path /transactions', () => {
      const { getByTestId } = render(
        <App Router={MemoryRouter} initialEntries={['/transactions']} />
      );

      expect(getByTestId('transactions-page')).toBeInTheDocument();
    });

    it('renders BudgetsPage on path /budgets', () => {
      const { getByTestId } = render(<App Router={MemoryRouter} initialEntries={['/budgets']} />);

      expect(getByTestId('budgets-page')).toBeInTheDocument();
    });

    it('renders PotsPage on path /pots', () => {
      const { getByTestId } = render(<App Router={MemoryRouter} initialEntries={['/pots']} />);

      expect(getByTestId('pots-page')).toBeInTheDocument();
    });

    it('renders BillsPage on path /bills', () => {
      const { getByTestId } = render(<App Router={MemoryRouter} initialEntries={['/bills']} />);

      expect(getByTestId('bills-page')).toBeInTheDocument();
    });

    it('renders NoPage on undefined paths', () => {
      const { getByTestId } = render(
        <App Router={MemoryRouter} initialEntries={['/undefinedURL']} />
      );

      expect(getByTestId('no-page')).toBeInTheDocument();
    });
  });
});
