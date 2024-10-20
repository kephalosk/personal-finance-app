import { render, screen } from '@testing-library/react';
import { OverviewBills } from './OverviewBills';
import { MemoryRouter } from 'react-router-dom';

describe('OverviewBills', () => {
  it('renders div overviewBills', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewBills />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewBills');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component OverviewHeader', () => {
    render(
      <MemoryRouter>
        <OverviewBills />
      </MemoryRouter>
    );

    const reactComponent = screen.getByTestId('overview-header');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewBillsContent', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewBills />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewBillsContent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component BillRow 3 times', () => {
    render(
      <MemoryRouter>
        <OverviewBills />
      </MemoryRouter>
    );

    const reactComponents = screen.getAllByTestId('bill-row');

    expect(reactComponents).toHaveLength(3);
  });
});
