import { render, screen } from '@testing-library/react';
import { mockedTransaction } from '../../fixtures/MockedTransactions';
import { BillCardTableRow } from './BillCardTableRow';

describe('BillCardTableRow', () => {
  const transaction = mockedTransaction;
  const testProps = {
    transaction,
  };

  it('renders div billCardTableRowWrapper', () => {
    const { container } = render(<BillCardTableRow {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowWrapper');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders hr', () => {
    const { container } = render(<BillCardTableRow {...testProps} />);

    const htmlElement = container.querySelector('hr');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billCardTableRow', () => {
    const { container } = render(<BillCardTableRow {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRow');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billCardTableRowName', () => {
    const { container } = render(<BillCardTableRow {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowName');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders img billCardTableRowNamePicture', () => {
    const { container } = render(<BillCardTableRow {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowNamePicture');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('src', transaction.avatar);
  });

  it('renders label billCardTableRowNameLabel', () => {
    const { container } = render(<BillCardTableRow {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowNameLabel');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(transaction.name);
  });

  it('renders label billCardTableRowDate', () => {
    const { container } = render(<BillCardTableRow {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowDate');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(transaction.date);
  });

  it('renders img exclamation mark icon', () => {
    render(<BillCardTableRow {...testProps} />);

    const htmlElement = screen.getByAltText('exclamation mark icon');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('src', './src/assets/images/icon-bill-due.svg');
  });

  it('renders img check mark icon', () => {
    render(<BillCardTableRow {...testProps} />);

    const htmlElement = screen.getByAltText('check mark icon');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('src', './src/assets/images/icon-bill-paid.svg');
  });

  it('renders label billCardTableRowAmount', () => {
    const { container } = render(<BillCardTableRow {...testProps} />);

    const htmlElement = container.querySelector('.billCardTableRowAmount');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`${transaction.amount}`);
  });
});
