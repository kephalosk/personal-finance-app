import { render, screen } from '@testing-library/react';
import React from 'react';
import { BillTotal } from './BillTotal';

describe('BillTotal', () => {
  const sum = 100;
  const testProps = {
    sum,
  };

  it('renders div billTotal', () => {
    const { container } = render(<BillTotal {...testProps} />);

    const htmlElement = container.querySelector('.billTotal');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders img billTotal', () => {
    render(<BillTotal {...testProps} />);

    const htmlElement = screen.getByAltText('icon of recurring bills');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('src', './src/assets/images/icon-recurring-bills.svg');
  });

  it('renders label billTotalTitle', () => {
    const { container } = render(<BillTotal {...testProps} />);

    const htmlElement = container.querySelector('.billTotalTitle');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label billTotalAmount with passed sum', () => {
    const { container } = render(<BillTotal {...testProps} />);

    const htmlElement = container.querySelector('.billTotalAmount');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`${sum}.00`);
  });
});
