import { render, screen } from '@testing-library/react';
import { OverviewBills } from './OverviewBills';

describe('OverviewBills', () => {
  it('renders div overviewBills', () => {
    const { container } = render(<OverviewBills />);

    const htmlElement = container.querySelector('.overviewBills');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component OverviewHeader', () => {
    render(<OverviewBills />);

    const reactComponent = screen.getByTestId('overview-header');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewBillsContent', () => {
    const { container } = render(<OverviewBills />);

    const htmlElement = container.querySelector('.overviewBillsContent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component BillRow 3 times', () => {
    render(<OverviewBills />);

    const reactComponents = screen.getAllByTestId('bill-row');

    expect(reactComponents).toHaveLength(3);
  });
});
