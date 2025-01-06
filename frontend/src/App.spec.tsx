import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter, useLocation } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import { useSidebar } from './globals/hooks/useSidebar';

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
  jest.fn(() => <div data-testid="showcase-add-new-budget-form"></div>)
);
jest.mock('./showcase/ShowcaseEditBudgetForm', () =>
  jest.fn(() => <div data-testid="showcase-edit-budget-form"></div>)
);
jest.mock('./showcase/ShowcaseDeleteBudgetForm', () =>
  jest.fn(() => <div data-testid="showcase-delete-budget-form"></div>)
);
jest.mock('./showcase/ShowcaseAddNewPotForm', () =>
  jest.fn(() => <div data-testid="showcase-add-new-pot-form"></div>)
);
jest.mock('./showcase/ShowcaseEditPotForm', () =>
  jest.fn(() => <div data-testid="showcase-edit-pot-form"></div>)
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

jest.mock('./globals/hooks/useSidebar', (): { __esModule: boolean; useSidebar: jest.Mock } => ({
  __esModule: true,
  useSidebar: jest.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: '/',
    });
    (useSidebar as jest.Mock).mockReturnValue({
      isHidden: false,
      setIsHidden: () => {},
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

  it('renders section content with isHidden === false', () => {
    const { container } = render(<App />);

    const htmlElement = container.querySelector('.content');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).not.toHaveClass('hidden');
  });

  it('renders section content with isHidden === true', () => {
    (useSidebar as jest.Mock).mockReturnValue({
      isHidden: true,
      setIsHidden: () => {},
    });
    const { container } = render(<App />);

    const htmlElement = container.querySelector('.content');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass('hidden');
  });

  it('renders section content with isHidden === true for MemoryRouter', () => {
    (useSidebar as jest.Mock).mockReturnValue({
      isHidden: true,
      setIsHidden: () => {},
    });
    const { container } = render(<App Router={MemoryRouter} />);

    const htmlElement = container.querySelector('.content');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass('hidden');
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
      ['ShowcaseAddNewBudgetForm', '/showcase/AddNewBudgetForm', 'showcase-add-new-budget-form'],
      ['ShowcaseEditBudgetForm', '/showcase/EditBudgetForm', 'showcase-edit-budget-form'],
      ['ShowcaseDeleteBudgetForm', '/showcase/DeleteBudgetForm', 'showcase-delete-budget-form'],
      ['ShowcaseAddNewPotForm', '/showcase/AddNewPotForm', 'showcase-add-new-pot-form'],
      ['ShowcaseEditPotForm', '/showcase/EditPotForm', 'showcase-edit-pot-form'],
    ])('renders %s on path %s', (_: string, path: string, testid: string) => {
      const { getByTestId } = render(<App Router={MemoryRouter} initialEntries={[path]} />);

      expect(getByTestId(testid)).toBeInTheDocument();
    });
  });
});
