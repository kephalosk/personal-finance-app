import { OverviewSummary } from './OverviewSummary';
import { render, screen } from '@testing-library/react';

describe('OverviewSummary', () => {
  it('renders div overviewSummary', () => {
    const { container } = render(<OverviewSummary />);

    const htmlElement = container.querySelector('.overviewSummary');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component SummaryCard 3 times', () => {
    render(<OverviewSummary />);

    const reactComponents = screen.getAllByTestId('summary-card');

    expect(reactComponents).toHaveLength(3);
  });

  it('renders react component SummaryCard with title Current Balance', () => {
    render(<OverviewSummary />);

    const reactComponent = screen.getByText('Current Balance');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders react component SummaryCard with title Income', () => {
    render(<OverviewSummary />);

    const reactComponent = screen.getByText('Income');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders react component SummaryCard with title Expenses', () => {
    render(<OverviewSummary />);

    const reactComponent = screen.getByText('Expenses');

    expect(reactComponent).toBeInTheDocument();
  });
});
