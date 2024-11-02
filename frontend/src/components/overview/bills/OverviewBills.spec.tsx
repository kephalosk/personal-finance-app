import { render, screen } from '@testing-library/react';
import { OverviewBills } from './OverviewBills';
import { MemoryRouter } from 'react-router-dom';
import { mockedBills } from '../../../fixtures/MockedBills';
import { mockedTodayAugust3rd } from '../../../fixtures/MockedToday';

describe('OverviewBills', () => {
  const bills = mockedBills;
  const today = mockedTodayAugust3rd;
  const testProps = {
    bills,
    today,
  };

  const billsPaid = 130;
  const billsUpcoming = 60;
  const billsDue = 50;

  it('renders div overviewBills', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewBills {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewBills');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component OverviewHeader', () => {
    render(
      <MemoryRouter>
        <OverviewBills {...testProps} />
      </MemoryRouter>
    );

    const reactComponent = screen.getByTestId('overview-header');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewBillsContent', () => {
    const { container } = render(
      <MemoryRouter>
        <OverviewBills {...testProps} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.overviewBillsContent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component BillRow with paid Bills sum with passed bills and today', () => {
    render(
      <MemoryRouter>
        <OverviewBills {...testProps} />
      </MemoryRouter>
    );

    const reactComponents = screen.getAllByTestId('bill-row');
    const billRowPaid = reactComponents.at(0)!.querySelector('.overviewBillsRowValue');

    expect(billRowPaid!.textContent).toEqual(`$${billsPaid}.00`);
  });

  it('renders component BillRow with upcoming Bills sum with passed bills and today', () => {
    render(
      <MemoryRouter>
        <OverviewBills {...testProps} />
      </MemoryRouter>
    );

    const reactComponents = screen.getAllByTestId('bill-row');
    const billRowUpcoming = reactComponents.at(1)!.querySelector('.overviewBillsRowValue');

    expect(billRowUpcoming!.textContent).toEqual(`$${billsUpcoming}.00`);
  });

  it('renders component BillRow with due Bills sum with passed bills and today', () => {
    render(
      <MemoryRouter>
        <OverviewBills {...testProps} />
      </MemoryRouter>
    );

    const reactComponents = screen.getAllByTestId('bill-row');
    const billRowDue = reactComponents.at(2)!.querySelector('.overviewBillsRowValue');

    expect(billRowDue!.textContent).toEqual(`$${billsDue}.00`);
  });
});
