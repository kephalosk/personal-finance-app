import { OverviewPage } from './OverviewPage';
import { render, screen } from '@testing-library/react';

describe('OverviewPage', () => {
  it('renders div overviewPage', () => {
    const { container } = render(<OverviewPage />);

    const htmlElement = container.querySelector('.overviewPage');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders headline h1 Overview', () => {
    const { container } = render(<OverviewPage />);

    const htmlElement = container.querySelector('h1');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Overview');
  });

  it('renders react component OverviewSummary', () => {
    render(<OverviewPage />);

    const reactComponent = screen.getByTestId('overview-summary');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewDetails', () => {
    const { container } = render(<OverviewPage />);

    const htmlElement = container.querySelector('.overviewDetails');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div overviewDetailsLeft', () => {
    const { container } = render(<OverviewPage />);

    const htmlElement = container.querySelector('.overviewDetailsLeft');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component OverviewPots', () => {
    render(<OverviewPage />);

    const reactComponent = screen.getByTestId('overview-pots');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders react component OverviewTransactions', () => {
    render(<OverviewPage />);

    const reactComponent = screen.getByTestId('overview-transactions');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewDetailsRight', () => {
    const { container } = render(<OverviewPage />);

    const htmlElement = container.querySelector('.overviewDetailsRight');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component OverviewBudgets', () => {
    render(<OverviewPage />);

    const reactComponent = screen.getByTestId('overview-budgets');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders react component OverviewBills', () => {
    render(<OverviewPage />);

    const reactComponent = screen.getByTestId('overview-bills');

    expect(reactComponent).toBeInTheDocument();
  });
});
