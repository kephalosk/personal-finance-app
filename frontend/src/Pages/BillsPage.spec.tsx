import { render, screen } from '@testing-library/react';
import { BillsPage } from './BillsPage';

describe('BillsPage', () => {
  it('renders div billsPage', () => {
    const { container } = render(<BillsPage />);

    const htmlElement = container.querySelector('.billsPage');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders h1 headline Recurring Bills', () => {
    const { container } = render(<BillsPage />);

    const htmlElement = container.querySelector('.billsPage');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Recurring Bills');
  });

  it('renders div billsPageDetails', () => {
    const { container } = render(<BillsPage />);

    const htmlElement = container.querySelector('.billsPageDetails');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billsPageDetailsOverview', () => {
    const { container } = render(<BillsPage />);

    const htmlElement = container.querySelector('.billsPageDetailsOverview');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BillTotal', () => {
    render(<BillsPage />);

    const htmlElement = screen.getByTestId('bill-total');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BillSummary', () => {
    render(<BillsPage />);

    const htmlElement = screen.getByTestId('bill-summary');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BillCard', () => {
    render(<BillsPage />);

    const htmlElement = screen.getByTestId('bill-card');

    expect(htmlElement).toBeInTheDocument();
  });

  it('filters multiple recurring bills only once', () => {
    render(<BillsPage />);

    const htmlElement = screen.getAllByTestId('bill-card-table-row');

    expect(htmlElement).toHaveLength(8);
  });
});
