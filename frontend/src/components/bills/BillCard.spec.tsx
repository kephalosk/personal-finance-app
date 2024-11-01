import { render, screen } from '@testing-library/react';
import { BillCard } from './BillCard';
import { mockedBills } from '../../fixtures/MockedBills';

describe('BillCard', () => {
  const fakeToday: Date = new Date('2024-08-03T14:23:11.000Z');

  const testProps = {
    bills: mockedBills,
    today: fakeToday,
  };

  it('renders div billCard', () => {
    const { container } = render(<BillCard {...testProps} />);

    const htmlElement = container.querySelector('.billCard');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billCardSearchbar', () => {
    const { container } = render(<BillCard {...testProps} />);

    const htmlElement = container.querySelector('.billCardSearchbar');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billCardTable', () => {
    const { container } = render(<BillCard {...testProps} />);

    const htmlElement = container.querySelector('.billCardTable');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billCardTableHeader', () => {
    const { container } = render(<BillCard {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableHeader');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BillCardTableRow', () => {
    render(<BillCard {...testProps} />);

    const component = screen.getAllByTestId('bill-card-table-row');

    expect(component).toHaveLength(4);
  });
});
