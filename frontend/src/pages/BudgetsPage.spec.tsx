import { render, screen } from '@testing-library/react';
import { BudgetsPage } from './BudgetsPage';
import { MemoryRouter } from 'react-router-dom';
import useIsSmallScreen from '../globals/hooks/useIsSmallScreen';

jest.mock('../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('BudgetsPage', () => {
  beforeEach(() => {
    (useIsSmallScreen as jest.Mock).mockReturnValue(false);
  });

  it('renders div budgetsPage', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetsPage />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetsPage');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component HeaderBar', () => {
    render(
      <MemoryRouter>
        <BudgetsPage />
      </MemoryRouter>
    );

    const component = screen.getByTestId('header-bar');

    expect(component).toBeInTheDocument();
  });

  it('renders div budgetsDetails', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetsPage />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetsDetails');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div budgetsDetailsLeft', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetsPage />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetsDetailsLeft');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component HeaderBar', () => {
    render(
      <MemoryRouter>
        <BudgetsPage />
      </MemoryRouter>
    );

    const component = screen.getByTestId('budgets-diagram-card');

    expect(component).toBeInTheDocument();
  });

  it('renders div budgetsDetailsRight', () => {
    const { container } = render(
      <MemoryRouter>
        <BudgetsPage />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.budgetsDetailsRight');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BudgetCard 4 times', () => {
    render(
      <MemoryRouter>
        <BudgetsPage />
      </MemoryRouter>
    );

    const components = screen.getAllByTestId('budget-card');

    expect(components).toHaveLength(4);
  });
});
