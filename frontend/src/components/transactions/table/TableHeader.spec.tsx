import { render } from '@testing-library/react';
import React from 'react';
import { TableHeader } from './TableHeader';

describe('TableHeader', () => {
  it('renders div transactionsTableHeader', () => {
    const { container } = render(<TableHeader />);

    const htmlElement = container.querySelector('.transactionsTableHeader');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders column label tableColumnName', () => {
    const { container } = render(<TableHeader />);

    const htmlElement = container.querySelector('.tableColumnName');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Recipient / Sender');
  });

  it('renders column label tableColumnCategory', () => {
    const { container } = render(<TableHeader />);

    const htmlElement = container.querySelector('.tableColumnCategory');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Category');
  });

  it('renders column label tableColumnDate', () => {
    const { container } = render(<TableHeader />);

    const htmlElement = container.querySelector('.tableColumnDate');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Transaction Date');
  });

  it('renders column label tableColumnAmount', () => {
    const { container } = render(<TableHeader />);

    const htmlElement = container.querySelector('.tableColumnAmount');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Amount');
  });
});
