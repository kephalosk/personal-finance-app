import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter, useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';

jest.mock('./components/sidebar/Sidebar', () =>
  jest.fn((props) => <div data-testid="sidebar" onClick={() => props.onMinimize(true)}></div>)
);
jest.mock('./components/ScrollToTop', () => jest.fn(() => <div data-testid="scroll-to-top"></div>));
jest.mock('./pages/OverviewPage', () => jest.fn(() => <div data-testid="overview-page"></div>));
jest.mock('./pages/TransactionsPage', () =>
  jest.fn(() => <div data-testid="transactions-page"></div>)
);
jest.mock('./pages/BudgetsPage', () => jest.fn(() => <div data-testid="budgets-page"></div>));
jest.mock('./pages/PotsPage', () => jest.fn(() => <div data-testid="pots-page"></div>));
jest.mock('./pages/BillsPage', () => jest.fn(() => <div data-testid="bills-page"></div>));
jest.mock('./pages/NoPage', () => jest.fn(() => <div data-testid="no-page"></div>));
jest.mock('./showcase/ShowcaseAddNewBudgetForm', () =>
  jest.fn(() => <div data-testid="showcase"></div>)
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/',
    });
  });

  it('renders div webapp', () => {
    const { container } = render(<App />);

    const htmlElement = container.querySelector('.webapp');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component Sidebar', () => {
    render(<App />);

    const component = screen.getByTestId('sidebar');

    expect(component).toBeInTheDocument();
    expect(Sidebar).toHaveBeenCalledWith({ onMinimize: expect.any(Function) }, {});
  });

  it('renders component ScrollToTop', () => {
    render(<App />);

    const component = screen.getByTestId('scroll-to-top');

    expect(component).toBeInTheDocument();
  });

  it('renders section content', () => {
    const { container } = render(<App />);

    const htmlElement = container.querySelector('.content');

    expect(htmlElement).toBeInTheDocument();
  });

  it('sets class minimized on content section if isMinimized is true', () => {
    localStorage.setItem('isMinimized', JSON.stringify(true));
    const { container } = render(<App Router={MemoryRouter} />);

    const htmlElement = container.querySelector('.content');

    expect(htmlElement).toHaveClass('minimized');
    localStorage.clear();
  });

  it('sets class minimized on content section with MemoryRouter if isMinimized is true', () => {
    localStorage.setItem('isMinimized', JSON.stringify(true));
    const { container } = render(<App Router={MemoryRouter} />);

    const htmlElement = container.querySelector('.content');

    expect(htmlElement).toHaveClass('minimized');
    localStorage.clear();
  });

  it('does not set class minimized on content section if isMinimized is false', () => {
    localStorage.setItem('isMinimized', JSON.stringify(false));
    const { container } = render(<App />);

    const htmlElement = container.querySelector('.content');
    expect(htmlElement).not.toHaveClass('minimized');

    localStorage.clear();
  });

  it('defaults isMinimized to false if no value in localStorage', () => {
    localStorage.clear();
    const { container } = render(<App />);
    const contentSection = container.querySelector('.content');

    expect(contentSection).not.toHaveClass('minimized');
  });

  it('alters isMinimized if Sidebar onMinimize is clicked', () => {
    localStorage.setItem('isMinimized', JSON.stringify(false));
    const { container } = render(<App />);
    const htmlElement = container.querySelector('.content');
    expect(htmlElement).not.toHaveClass('minimized');

    const sidebar = screen.getByTestId('sidebar');
    fireEvent.click(sidebar!);

    expect(htmlElement).toHaveClass('minimized');
    localStorage.clear();
  });

  describe('Router', () => {
    it('renders OverviewPage by default', () => {
      const { getByTestId } = render(<App />);

      expect(getByTestId('overview-page')).toBeInTheDocument();
    });

    it.each([
      ['OverviewPage', '/', 'overview-page'],
      ['TransactionsPage', '/transactions', 'transactions-page'],
      ['BudgetsPage', '/budgets', 'budgets-page'],
      ['PotsPage', '/pots', 'pots-page'],
      ['BillsPage', '/bills', 'bills-page'],
      ['NoPage', '/undefinedURL', 'no-page'],
      ['Showcase', '/showcase', 'showcase'],
    ])('renders %s on path %s', (title: string, path: string, testid: string) => {
      const { getByTestId } = render(<App Router={MemoryRouter} initialEntries={[path]} />);

      expect(getByTestId(testid)).toBeInTheDocument();
    });
  });
});
